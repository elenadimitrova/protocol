import * as _ from 'lodash';
import * as React from 'react';
import styled from 'styled-components';

import { colors } from 'ts/style/colors';

import { AboutPageLayout } from 'ts/@next/components/aboutPageLayout';
import { Column, Section, WrapGrid } from 'ts/@next/components/newLayout';
import { Heading, Paragraph } from 'ts/@next/components/text';

interface TeamMember {
    name: string;
    title: string;
    imageUrl?: string;
}

const team: TeamMember[] = [
    {
        imageUrl: '/images/@next/team/willw.jpg',
        name: 'Will Warren',
        title: 'co-founder & ceo',
    },
    {
        imageUrl: '/images/@next/team/amirb.jpg',
        name: 'Amir Bandeali',
        title: 'Co-founder & CTO',
    },
    {
        imageUrl: '/images/@next/team/fabiob.jpg',
        name: 'Fabio Berger',
        title: 'senior engineer',
    },
    {
        imageUrl: '/images/@next/team/alexv.jpg',
        name: 'Alex Xu',
        title: 'Director of operations',
    },
    {
        imageUrl: '/images/@next/team/leonidL.jpg',
        name: 'Leonid Logvinov',
        title: 'engineer',
    },
    {
        imageUrl: '/images/@next/team/benb.jpg',
        name: 'Ben Burns',
        title: 'designer',
    },
    {
        imageUrl: '/images/@next/team/brandonm.jpg',
        name: 'Brandon Millman',
        title: 'senior engineer',
    },
    {
        imageUrl: '/images/@next/team/toms.jpg',
        name: 'Tom Schmidt',
        title: 'product manager',
    },
    {
        imageUrl: '/images/@next/team/jacobe.jpg',
        name: 'Jacob Evans',
        title: 'ecosystem engineer',
    },
    {
        imageUrl: '/images/@next/team/blake.jpg',
        name: 'Blake Henderson',
        title: 'operations associate',
    },
    {
        imageUrl: '/images/@next/team/zack.jpg',
        name: 'Zack Skelly',
        title: 'lead recruiter',
    },
    {
        imageUrl: '/images/@next/team/greg.jpg',
        name: 'Greg Hysen',
        title: 'blockchain engineer',
    },
    {
        imageUrl: '/images/@next/team/remcoB.jpg',
        name: 'Remco Bloemen',
        title: 'technical fellow',
    },
    {
        imageUrl: '/images/@next/team/francesco.jpg',
        name: 'Francesco Agosti',
        title: 'engineer',
    },
    {
        imageUrl: '/images/@next/team/melo.jpg',
        name: 'Mel Oberto',
        title: 'office ops / executive assistant',
    },
    {
        imageUrl: '/images/@next/team/alexb.jpg',
        name: 'Alex Browne',
        title: 'engineer in residence',
    },
    {
        imageUrl: '/images/@next/team/peterz.jpg',
        name: 'Peter Zeitz',
        title: 'research fellow',
    },
    {
        imageUrl: '/images/@next/team/chrisk.jpg',
        name: 'Chris Kalani',
        title: 'director of design',
    },
    {
        imageUrl: '/images/@next/team/clayr.jpg',
        name: 'Clay Robbins',
        title: 'ecosystem development lead',
    },
    {
        imageUrl: '/images/@next/team/mattt.jpg',
        name: 'Matt Taylor',
        title: 'marketing lead',
    },
    {
        imageUrl: '/images/@next/team/eugenea.jpg',
        name: 'Eugene Aumson',
        title: 'engineer',
    },
    {
        imageUrl: '/images/@next/team/weijew.jpg',
        name: 'Weijie Wu',
        title: 'research fellow',
    },
    {
        imageUrl: '/images/@next/team/rahuls.jpg',
        name: 'Rahul Singireddy',
        title: 'relayer success manager',
    },
    {
        imageUrl: '/images/@next/team/jasons.jpg',
        name: 'Jason Somensatto',
        title: 'strategic legal counsel',
    },
    {
        imageUrl: '/images/@next/team/steveK.jpg',
        name: 'Steve Klebanoff',
        title: 'senior engineer',
    },
    {
        imageUrl: '/images/@next/team/xiannyN.jpg',
        name: 'Xianny Ng',
        title: 'engineer',
    },
];

const advisors: TeamMember[] = [
    {
        imageUrl: '/images/@next/team/advisors/frede.jpg',
        name: 'Fred Ehrsam',
        title: 'Advisor',
    },
    {
        imageUrl: '/images/@next/team/advisors/olafc.jpg',
        name: 'Olaf Carlson-Wee',
        title: 'Advisor',
    },
    {
        imageUrl: '/images/@next/team/advisors/joeyk.jpg',
        name: 'Joey Krug',
        title: 'Advisor',
    },
    {
        imageUrl: '/images/@next/team/advisors/lindax.jpg',
        name: 'Linda Xie',
        title: 'Advisor',
    },
    {
        imageUrl: '/images/@next/team/advisors/davids.jpg',
        name: 'David Sacks',
        title: 'Advisor',
    },
];

export const NextAboutTeam = () => (
    <AboutPageLayout
        title="We are a global, growing team"
        description="We are a distributed team with backgrounds in engineering, academic research, business, and design. The 0x Core Team is passionate about accelerating the adoption decentralized technology and believe in its potential to be an equalizing force in the world. Join us and do the most impactful work of your life."
        linkLabel="Join the team"
        linkUrl="/next/about/jobs"
    >
        <Section
            maxWidth="1170px"
            wrapWidth="100%"
            isFlex={true}
            flexBreakpoint="900px"
        >
            <Column>
                <Heading size="medium">0x Team</Heading>
            </Column>

            <Column
                width="70%"
                maxWidth="800px"
            >
                <StyledGrid isWrapped={true} isCentered={false}>
                    {_.map(team, (info: TeamMember, index: number) => (
                        <Member key={`team-${index}`} name={info.name} title={info.title} imageUrl={info.imageUrl} />
                    ))}
                </StyledGrid>
            </Column>
        </Section>

        <Section
            bgColor="#F3F6F4"
            maxWidth="1170px"
            wrapWidth="100%"
            flexBreakpoint="900px"
            isFlex={true}
        >
            <Column>
                <Heading size="medium">Advisors</Heading>
            </Column>

            <Column
                width="70%"
                maxWidth="800px"
            >
                <StyledGrid isWrapped={true} isCentered={false}>
                    {_.map(advisors, (info: TeamMember, index: number) => (
                        <Member key={`advisor-${index}`} name={info.name} title={info.title} imageUrl={info.imageUrl} />
                    ))}
                </StyledGrid>
            </Column>
        </Section>
    </AboutPageLayout>
);

const StyledGrid = styled.div`
    &:after {
        content: '';
        clear: both;
    }
`;

const Member = ({ name, title, imageUrl }: TeamMember) => (
    <StyledMember>
        <img src={imageUrl} alt={name}/>
        <Heading color={colors.textDarkPrimary} size="small" isNoMargin={true}>{name}</Heading>
        <Paragraph isMuted={0.5} style={{ textTransform: 'capitalize' }}>{title}</Paragraph>
    </StyledMember>
);

const StyledMember = styled.div`
    width: calc(25% - 15px);
    margin-bottom: 10px;
    float: left;
    margin-right: 10px;

    img, svg {
        width: 100%;
        height: auto;
        object-fit: contain;
        margin-bottom: 10px;
    }

    @media (max-width: 900px) {
        width: calc(33.3333% - 30px);
    }

    @media (max-width: 600px) {
        width: calc(50% - 15px);
    }
`;
