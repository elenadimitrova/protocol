import * as _ from 'lodash';

import { getPcToInstructionIndexMapping } from './instructions';
import { LocationByOffset, SourceRange } from './types';

const RADIX = 10;

export interface SourceLocation {
    offset: number;
    length: number;
    fileIndex: number;
}

/**
 * Receives a string with newlines and returns a map of byte offset to LineColumn
 * @param str A string to process
 */
export function getLocationByOffset(str: string): LocationByOffset {
    const locationByOffset: LocationByOffset = { 0: { line: 1, column: 0 } };
    let currentOffset = 0;
    for (const char of str.split('')) {
        const location = locationByOffset[currentOffset];
        const isNewline = char === '\n';
        locationByOffset[currentOffset + 1] = {
            line: location.line + (isNewline ? 1 : 0),
            column: isNewline ? 0 : location.column + 1,
        };
        currentOffset++;
    }
    return locationByOffset;
}

/**
 * Parses a sourcemap string.
 * The solidity sourcemap format is documented here: https://github.com/ethereum/solidity/blob/develop/docs/miscellaneous.rst#source-mappings
 * @param sourceCodes sources contents by index
 * @param srcMap source map string
 * @param bytecodeHex contract bytecode
 * @param sources sources file names by index
 */
export function parseSourceMap(
    sourceCodes: { [fileIndex: number]: string },
    srcMap: string,
    bytecodeHex: string,
    sources: { [fileIndex: number]: string },
): { [programCounter: number]: SourceRange } {
    const bytecode = Uint8Array.from(Buffer.from(bytecodeHex, 'hex'));
    const pcToInstructionIndex: { [programCounter: number]: number } = getPcToInstructionIndexMapping(bytecode);
    const locationByOffsetByFileIndex: { [fileIndex: number]: LocationByOffset } = {};
    _.map(sourceCodes, (sourceCode: string, fileIndex: number) => {
        locationByOffsetByFileIndex[fileIndex] = _.isUndefined(sourceCode) ? {} : getLocationByOffset(sourceCode);
    });
    const entries = srcMap.split(';');
    let lastParsedEntry: SourceLocation = {} as any;
    const instructionIndexToSourceRange: { [instructionIndex: number]: SourceRange } = {};
    _.each(entries, (entry: string, i: number) => {
        // tslint:disable-next-line:no-unused-variable
        const [instructionIndexStrIfExists, lengthStrIfExists, fileIndexStrIfExists, jumpTypeStrIfExists] = entry.split(
            ':',
        );
        const instructionIndexIfExists = parseInt(instructionIndexStrIfExists, RADIX);
        const lengthIfExists = parseInt(lengthStrIfExists, RADIX);
        const fileIndexIfExists = parseInt(fileIndexStrIfExists, RADIX);
        const offset = _.isNaN(instructionIndexIfExists) ? lastParsedEntry.offset : instructionIndexIfExists;
        const length = _.isNaN(lengthIfExists) ? lastParsedEntry.length : lengthIfExists;
        const fileIndex = _.isNaN(fileIndexIfExists) ? lastParsedEntry.fileIndex : fileIndexIfExists;
        const parsedEntry = {
            offset,
            length,
            fileIndex,
        };
        if (parsedEntry.fileIndex !== -1 && !_.isUndefined(locationByOffsetByFileIndex[parsedEntry.fileIndex])) {
            const locationByOffset = locationByOffsetByFileIndex[parsedEntry.fileIndex];
            const sourceRange = {
                location: {
                    start: locationByOffset[parsedEntry.offset],
                    end: locationByOffset[parsedEntry.offset + parsedEntry.length],
                },
                fileName: sources[parsedEntry.fileIndex],
            };
            if (sourceRange.location.start === undefined || sourceRange.location.end === undefined) {
                throw new Error(`Error while processing sourcemap: location out of range in ${sourceRange.fileName}`);
            }
            instructionIndexToSourceRange[i] = sourceRange;
        } else {
            // Some assembly code generated by Solidity can't be mapped back to a line of source code.
            // Source: https://github.com/ethereum/solidity/issues/3629
        }
        lastParsedEntry = parsedEntry;
    });
    const pcsToSourceRange: { [programCounter: number]: SourceRange } = {};
    for (const programCounterKey of _.keys(pcToInstructionIndex)) {
        const pc = parseInt(programCounterKey, RADIX);
        const instructionIndex: number = pcToInstructionIndex[pc];
        pcsToSourceRange[pc] = instructionIndexToSourceRange[instructionIndex];
    }
    return pcsToSourceRange;
}
