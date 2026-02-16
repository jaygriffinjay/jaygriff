'use client';

import { Heading, Paragraph, Container, Link } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';
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

export default function MyProjectsPage() {
  return (
    <Container size="sm">
      <ContentWrapper>
        <StyledHeading>My Projects</StyledHeading>
        
        <Paragraph>
          This is where I showcase the things I build. Some are polished products, others are experiments and prototypes. All of them represent something I learned or a problem I tried to solve.
        </Paragraph>

        <StyledHeading>Locus</StyledHeading>
        
        <Paragraph>
          A Chrome extension for launching bookmarks fast. Built because the default Chrome bookmarks UI is too slow when you have hundreds of bookmarks organized in folders.
        </Paragraph>

        <Paragraph>
          <Link href="https://github.com/jaygriffinjay/Locus" target="_blank" rel="noopener noreferrer">GitHub</Link>. <Link href="/projects/locus">Read more →</Link>
        </Paragraph>

        <StyledHeading>Strava Analyzer</StyledHeading>
        
        <Paragraph>
          A web app that connects to Strava's API to fetch your running activities and visualize them better than the default Strava stats. Built because I wanted deeper insights into my weekly training patterns and streak tracking.
        </Paragraph>

        <Paragraph>
          <Link href="https://github.com/jaygriffinjay/strava-analyzer" target="_blank" rel="noopener noreferrer">GitHub</Link>. <Link href="/projects/strava-analyzer">Read more →</Link>
        </Paragraph>

        <StyledHeading>Bootstrap Full-Stack Webapp</StyledHeading>
        
        <Paragraph>
          My personal starter template for spinning up new Next.js projects fast. Built because I was tired of repeating the same setup work every time I wanted to start a new project - theme system, component library, dev tools, all the boilerplate. Projects spawned from this template: Operation Finish Stuff (productivity tracker), jaygriff.com (this entire website), Strava Analyzer (running analytics), Fitness Data Platform (multi-source fitness ETL).
        </Paragraph>

        <Paragraph>
          <Link href="https://github.com/jaygriffinjay/bootstrap-fullstack-webapp" target="_blank" rel="noopener noreferrer">GitHub</Link>. <Link href="/projects/bootstrap-fullstack-webapp">Read more →</Link>
        </Paragraph>

        <StyledHeading>Fitness Data Platform</StyledHeading>
        
        <Paragraph>
          A personal fitness analytics backend that pulls activity data from Strava (and eventually Garmin and Apple Health). Built because Strava's native analysis features are limited - they're great for recording activities, but weak on deep analytics and multi-source integration.
        </Paragraph>

        <Paragraph>
          <Link href="https://github.com/jaygriffinjay/fitness-data" target="_blank" rel="noopener noreferrer">GitHub</Link>. <Link href="/projects/fitness-data-platform">Read more →</Link>
        </Paragraph>

        <StyledHeading>SVG Animation Studio</StyledHeading>
        
        <Paragraph>
          A coding study exploring hand-coded SVG graphics and CSS animations. Started because I wanted a visually striking GitHub profile banner with animated tessellated triangles, and enjoyed the process of hand-coding SVGs and experimenting with transform properties, keyframes, and animation timing.
        </Paragraph>

        <Paragraph>
          <Link href="https://github.com/jaygriffinjay/jaygriffinjay" target="_blank" rel="noopener noreferrer">GitHub</Link>. <Link href="/projects/github-profile-readme">Read more →</Link>
        </Paragraph>

        <StyledHeading>Bootstrap Frontend Webapp</StyledHeading>
        
        <Paragraph>
          My personal frontend starter template for React + TypeScript projects. Built because I was tired of repeating the same setup work every time - theme system, component library, dev tools, architecture decisions, all the boilerplate. Copy this, customize the theme, start building features immediately instead of spending days on setup. Projects spawned from this template (or its predecessor frontend-stack): Locus (Chrome extension bookmark launcher).
        </Paragraph>

        <Paragraph>
          <Link href="https://github.com/jaygriffinjay/bootstrap-frontend-webapp" target="_blank" rel="noopener noreferrer">GitHub</Link>. <Link href="/projects/bootstrap-frontend-webapp">Read more →</Link>
        </Paragraph>

        <StyledHeading>ByTheHour</StyledHeading>
        
        <Paragraph>
          An AI-native time blocking app that schedules events using natural language. Built because traditional calendar apps force you to manually click through dropdowns and date pickers - painfully slow when you're planning multiple events. Just type "Add team meeting tomorrow at 2pm for 1 hour" and it creates the event. Tell it "Move my 3pm to 4:30pm" and it handles the edit. The whole point: schedule your day as fast as you can think.
        </Paragraph>

        <Paragraph>
          <Link href="https://bythehour.lovable.app/" target="_blank" rel="noopener noreferrer">bythehour.lovable.app</Link>. <Link href="/projects/bythehour">Read more →</Link>
        </Paragraph>

        <StyledHeading>Operation Finish Stuff</StyledHeading>
        
        <Paragraph>
          A meta productivity app I built to force myself to finish three portfolio projects. The entire UI is a task tracker with 3 hardcoded projects (Bookmark Launcher, Strava Analyzer, Blokblok) so I MUST work on them. Made me feel like a real developer because my task list looked like actual tickets.
        </Paragraph>

        <Paragraph>
          <Link href="https://operation-finish-stuff.vercel.app/" target="_blank" rel="noopener noreferrer">operation-finish-stuff.vercel.app</Link>. <Link href="https://github.com/jaygriffinjay/operation-finish-stuff" target="_blank" rel="noopener noreferrer">GitHub</Link>. <Link href="/projects/operation-finish-stuff">Read more →</Link>
        </Paragraph>

        {/* More projects will go here */}

      </ContentWrapper>
    </Container>
  );
}
