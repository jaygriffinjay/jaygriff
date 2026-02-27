'use client';

import { Container } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';
import { ProjectGallery } from '@/components/ProjectVisualCard/ProjectVisualCard';
import type { ProjectData } from '@/components/ProjectVisualCard/ProjectVisualCard';
import type { PostMeta } from '@/types/post';
import styled from '@emotion/styled';

export const routeMetadata: PostMeta = {
  title: 'My Projects',
  slug: 'projects',
  date: '2026-02-13T00:00:00Z',
  author: ['Jay Griffin'],
  description: 'A collection of projects and experiments I\'ve built',
  tags: ['projects'],
  type: 'doc',
  path: '/projects',
};

const StyledHeading = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  text-shadow: 2px 2px 0 hsl(220, 100%, 45%), 5px 5px 10px rgba(0,0,0,0.5);
  color: hsl(210, 100%, 60%);
  font-weight: 700;
  margin: 3rem 0 3rem 0;
  font-family: ${props => props.theme.fonts.heading};
  line-height: 1.2;
`;

const FileTreeBlock = styled.pre`
  margin: 1rem 0 1.2rem;
  padding: 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 10px;
  background: ${props => props.theme.colors.hover};
  color: ${props => props.theme.colors.text};
  overflow-x: auto;
  font-size: 0.88rem;
  line-height: 1.35;
`;

const ProjectsContainer = styled(Container)`
  margin-top: 0;
  margin-bottom: 0;

  @media (max-width: 768px) {
    margin-top: 4rem;
    margin-bottom: 0;
  }
`;

const projects: ProjectData[] = [
  {
    id: 'bythehour',
    title: 'ByTheHour',
    description: 'An AI-native time blocking app that schedules events using natural language. Built because traditional calendar apps force manual dropdown/date-picker workflows when planning multiple events. Type "Add team meeting tomorrow at 2pm for 1 hour" and it creates it. Tell it "Move my 3pm to 4:30pm" and it handles the edit.',
    imageSrc: '/images/projects/bythehour2.png',
    imageAlt: 'ByTheHour app screenshot',
    imageWidth: 1600,
    imageHeight: 1000,
    logoSrc: '/images/projects/bythehour-logo.png',
    logoAlt: 'ByTheHour logo',
    links: [
      { label: 'Read more →', href: '/projects/bythehour' },
    ],
  },
  {
    id: 'strava-analyzer',
    title: 'Strava Analyzer',
    description: 'A webapp that connects to Strava\'s API to fetch your running activities and visualize them better than the default Strava stats. Built because I wanted deeper insights into my weekly training patterns and streak tracking.',
    imageSrc: '/images/projects/strava-analyzer2.png',
    imageAlt: 'Strava Analyzer screenshot',
    imageWidth: 1600,
    imageHeight: 1000,
    links: [
      { label: 'Read more →', href: '/projects/strava-analyzer' },
    ],
  },
  {
    id: 'locus',
    title: 'Locus',
    description: 'A Chrome extension for launching bookmarks fast. Built because the default Chrome bookmarks UI is too slow when you have hundreds of bookmarks organized in folders.',
    videoSrc: 'https://assets.jaygriff.com/locus-demo.mp4',
    videoPosterSrc: '/images/projects/locus-banner.png',
    imageSrc: '/images/projects/locus-banner.png',
    imageAlt: 'Locus bookmark launcher screenshot',
    imageWidth: 1600,
    imageHeight: 1000,
    links: [
      { label: 'Read more →', href: '/projects/locus' },
    ],
  },
  {
    id: 'bootstrap-fullstack',
    title: 'Bootstrap Full-Stack Webapp',
    description: 'My personal starter template for spinning up new Next.js projects fast. Theme system, component library, dev tools, all the boilerplate. Projects spawned from this template: jaygriff.com, Strava Analyzer, Fitness Data Platform.',
    imageSrc: '/images/projects/bootstrap-fullstack-webapp.png',
    imageAlt: 'Bootstrap Full-Stack Webapp gallery app screenshot',
    imageWidth: 1280,
    imageHeight: 1333,
    links: [
      { label: 'Read more →', href: '/projects/bootstrap-fullstack-webapp' },
    ],
  },
  {
    id: 'bootstrap-frontend',
    title: 'Bootstrap Frontend Webapp',
    description: 'My personal frontend starter template for React + TypeScript projects. Copy this, customize the theme, start building features immediately. Projects spawned from this template: Locus (Chrome extension bookmark launcher).',
    placeholderGradient: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
    links: [
      { label: 'Read more →', href: '/projects/bootstrap-frontend-webapp' },
    ],
  },
  {
    id: 'fitness-data',
    title: 'Fitness Data Platform',
    description: 'A personal fitness analytics backend that pulls activity data from Strava (and eventually Garmin and Apple Health). Built because Strava\'s native analysis features are limited — great for recording activities, but weak on deep analytics and multi-source integration.',
    placeholderGradient: 'linear-gradient(135deg, #11998e, #38ef7d)',
    links: [
      { label: 'Read more →', href: '/projects/fitness-data-platform' },
    ],
  },
  {
    id: 'svg-animation-studio',
    title: 'SVG Animation Studio',
    description: 'A coding study exploring hand-coded SVG graphics and CSS animations. Started because I wanted a visually striking GitHub profile banner with animated tessellated triangles, and enjoyed hand-coding SVGs and experimenting with transform properties, keyframes, and animation timing.',
    imageSrc: '/images/projects/globe.svg',
    imageAlt: 'Hand-coded SVG globe animation',
    imageWidth: 1280,
    imageHeight: 720,
    links: [
      { label: 'Read more →', href: '/projects/github-profile-readme' },
    ],
  },
];

export default function MyProjectsPage() {
  return (
    <ProjectsContainer size="lg">
      <ContentWrapper>
        <ProjectGallery projects={projects} />

        {/* More projects will go here */}

      </ContentWrapper>
    </ProjectsContainer>
  );
}
