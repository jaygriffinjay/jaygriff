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
          Features: fuzzy search with Fuse.js, keyboard navigation (arrow keys + Enter to open), quick copy URLs to clipboard, special handling for internal Chrome URLs like chrome:// and edge:// pages, favicon display for visual scanning.
        </Paragraph>

        <Paragraph>
          Tech: React, TypeScript, Vite, styled-components, Lucide icons. Open source on <Link href="https://github.com/jaygriffinjay/Locus" target="_blank" rel="noopener noreferrer">GitHub</Link>.
        </Paragraph>

        <StyledHeading>Strava Analyzer</StyledHeading>
        
        <Paragraph>
          A web app that connects to Strava's API to fetch your running activities and visualize them better than the default Strava stats. Built because I wanted deeper insights into my weekly training patterns and streak tracking.
        </Paragraph>

        <Paragraph>
          Features: OAuth connection to Strava, localStorage caching (no backend needed), weekly distance bar charts with clickable drill-down to see individual activities per day, activity links direct to Strava, running streak calculations, pace trend analysis, monthly aggregations. Full analytics suite calculating total distance, time, elevation, and average pace.
        </Paragraph>

        <Paragraph>
          Tech: Next.js 16 App Router, Emotion CSS-in-JS, Recharts for data visualization, Radix UI primitives, custom theme system with live editor, Strava API v3 integration, TypeScript. Open source on <Link href="https://github.com/jaygriffinjay/strava-analyzer" target="_blank" rel="noopener noreferrer">GitHub</Link>.
        </Paragraph>

        <StyledHeading>Bootstrap Full-Stack Webapp</StyledHeading>
        
        <Paragraph>
          My personal starter template for spinning up new Next.js projects fast. Built because I was tired of repeating the same setup work every time I wanted to start a new project - theme system, component library, dev tools, all the boilerplate. Projects spawned from this template: Operation Finish Stuff (productivity tracker), jaygriff.com (this entire website), Strava Analyzer (running analytics), Fitness Data Platform (multi-source fitness ETL).
        </Paragraph>

        <Paragraph>
          Features: complete primitive component library (headings, paragraphs, lists, links, code blocks, callouts, containers, flex/stack layouts), live theme editor at /theme-editor (dev only) with real-time customization of colors, spacing, fonts, shadows, border radius, Emotion CSS-in-JS with both styled components and css prop, Radix UI integration for complex components (sliders, dropdowns, etc.), Prism.js syntax highlighting, localStorage persistence for theme config, fully typed theme system with TypeScript, SSR-compatible hydration handling.
        </Paragraph>

        <Paragraph>
          Tech: Next.js 16 App Router, Emotion CSS-in-JS, Radix UI primitives, Prism.js for code highlighting, custom theme system with programmatic theme generation from config values, TypeScript. This is the foundation for all my projects - clean architecture, instant setup, extensible design system. Open source on <Link href="https://github.com/jaygriffinjay/bootstrap-fullstack-webapp" target="_blank" rel="noopener noreferrer">GitHub</Link>.
        </Paragraph>

        <StyledHeading>Fitness Data Platform</StyledHeading>
        
        <Paragraph>
          A personal fitness analytics backend that pulls activity data from Strava (and eventually Garmin and Apple Health). Built because Strava's native analysis features are limited - they're great for recording activities, but weak on deep analytics and multi-source integration.
        </Paragraph>

        <Paragraph>
          Features: three-layer data architecture (raw JSON files → raw database JSONB → transformed application schema), Strava OAuth integration, bulk activity downloader saving all activities and streams as JSON, weekly/monthly distance charts with clickable drill-down, activity explorer with search and filtering, detailed stream visualizations (pace, heart rate, elevation over time), running segment analysis (auto-detect walk breaks, calculate running vs walking pace), data inspector showing raw API responses, ETL pipeline for transforming multi-source data, PostgreSQL with JSONB for flexible querying, multi-source deduplication logic. Architected for future webhook integration and cross-platform correlation analysis (sleep vs performance, training load, etc.).
        </Paragraph>

        <Paragraph>
          Tech: Next.js 16 App Router, Supabase (PostgreSQL), Recharts for data visualization, Emotion CSS-in-JS, Radix UI primitives, Strava API v3 with OAuth, planned Garmin Connect integration via python-garminconnect, TypeScript. Three-layer storage: file system for immutable backups, raw database for JSON queries, application database for optimized analysis. Open source on <Link href="https://github.com/jaygriffinjay/fitness-data" target="_blank" rel="noopener noreferrer">GitHub</Link>.
        </Paragraph>

        <StyledHeading>SVG Animation Studio</StyledHeading>
        
        <Paragraph>
          An interactive web tool for creating custom CSS-animated SVG graphics. Built because I wanted a visually striking GitHub profile banner with animated tessellated triangles, and needed a way to quickly iterate on animation parameters without manually editing SVG/CSS code.
        </Paragraph>

        <Paragraph>
          Features: real-time SVG preview with live CSS animation, keyframe editor with configurable percent positions, control all transform properties (rotate, scale, skewX, translateX, translateY), adjustable animation duration, custom SVG path input field, add/remove keyframes dynamically, generates clean CSS @keyframes code, transform-origin centered on SVG elements. Started with Node.js scripts (add_animation.js, update_animation.js) for quick SVG manipulation, then evolved into full React UI when manual editing became tedious.
        </Paragraph>

        <Paragraph>
          Tech: React 18, Vite, styled-components, React Router, CSS animations with transform properties, SVG manipulation. Simple UI for visual iteration - change values, see results instantly. MIT licensed. Open source on <Link href="https://github.com/jaygriffinjay/jaygriffinjay" target="_blank" rel="noopener noreferrer">GitHub</Link>.
        </Paragraph>

        <StyledHeading>Bootstrap Frontend Webapp</StyledHeading>
        
        <Paragraph>
          My personal frontend starter template for React + TypeScript projects. Built because I was tired of repeating the same setup work every time - theme system, component library, dev tools, architecture decisions, all the boilerplate. Copy this, customize the theme, start building features immediately instead of spending days on setup. Projects spawned from this template (or its predecessor frontend-stack): Locus (Chrome extension bookmark launcher).
        </Paragraph>

        <Paragraph>
          Features: visual theme editor with real-time preview at /theme-editor (dev-only route that disappears in production builds), generative theme system (set 3 config values, get 50+ generated design tokens), complete primitive component library (headings, paragraphs, lists, links, code blocks with Prism.js syntax highlighting, blockquotes, callouts, dividers, layout components), VSC Dark Plus theme for code blocks, copy button on code blocks, routes-as-data pattern enabling automatic tree-shaking of dev routes, feature-based folder structure (each page owns its components), structured CSS data using CSSObject instead of template literals (better for AI and tooling), localStorage persistence for theme config. Includes comprehensive documentation pages explaining architecture patterns, design decisions, and why we don't use Tailwind (spoiler: class soup is unreadable, Emotion gives full CSS power without learning overhead).
        </Paragraph>

        <Paragraph>
          Tech: React 19, Vite, TypeScript, Emotion CSS-in-JS, Radix UI primitives (accessible unstyled components), React Router, Prism.js for syntax highlighting, dedent for clean multiline strings. Dev-only routes automatically removed from production builds via tree-shaking. MIT licensed - copy it, modify it, use it however you want. Open source on <Link href="https://github.com/jaygriffinjay/bootstrap-frontend-webapp" target="_blank" rel="noopener noreferrer">GitHub</Link>.
        </Paragraph>

        <StyledHeading>ByTheHour</StyledHeading>
        
        <Paragraph>
          An AI-native time blocking app that schedules events using natural language. Built because traditional calendar apps force you to manually click through dropdowns and date pickers - painfully slow when you're planning multiple events. Just type "Add team meeting tomorrow at 2pm for 1 hour" and it creates the event. Tell it "Move my 3pm to 4:30pm" and it handles the edit. The whole point: schedule your day as fast as you can think.
        </Paragraph>

        <Paragraph>
          Features: natural language event creation, editing, and deletion using structured output parsing, hour-by-hour time block visualization, date-fns for intelligent date parsing, React Hook Form with Zod validation for structured data, calendar interface with day/week views, real-time updates with TanStack Query, Supabase backend for persistence, toast notifications via Sonner. Parses arbitrary natural language into structured event data (title, start time, duration, etc.) and translates it into calendar operations. Works great for personal use - can schedule a full day of events in under a minute with natural language instead of 10+ minutes of clicking.
        </Paragraph>

        <Paragraph>
          Tech: React 18, React Router, Supabase (PostgreSQL + real-time), TanStack Query for data fetching, full Radix UI component suite (dialogs, dropdowns, popovers, tooltips, and 20+ more), TailwindCSS with tailwind-merge and animations, React Hook Form + Zod for validation, date-fns for date manipulation, Recharts for visualizations, Lucide React icons, Sonner for toasts. Built on Lovable.dev platform. Currently in personal use - functional but not production-polished. Live at <Link href="https://bythehour.lovable.app/" target="_blank" rel="noopener noreferrer">bythehour.lovable.app</Link>.
        </Paragraph>

        <StyledHeading>Operation Finish Stuff</StyledHeading>
        
        <Paragraph>
          A meta productivity app I built to force myself to finish three portfolio projects. The entire UI is a task tracker with 3 hardcoded projects (Bookmark Launcher, Strava Analyzer, Blokblok) so I MUST work on them. Made me feel like a real developer because my task list looked like actual tickets.
        </Paragraph>

        <Paragraph>
          Features: task management with three hardcoded projects, work timer with start/stop tracking, localStorage persistence for all task state, task completion timestamps and duration tracking, inline notes modal for each task, visual active task highlighting, emoji-based UI (📝, 🗑️, ✓), tasks grouped by project with collapsible sections. The app tracks exactly how long you spend on each task. The ironic part: I built this to make progress on my portfolio projects, then proceeded to spend 100+ hours building my personal website instead. The task tracker worked great - I just chose to work on a different project entirely.
        </Paragraph>

        <Paragraph>
          Tech: Next.js 16 (App Router), Emotion CSS-in-JS, Radix UI Slider component, custom generative theme system with visual editor at /theme-editor (dev-only route tree-shaken in production), localStorage-persisted theme configuration, primitive component library (Heading, Paragraph, List, CodeBlock, etc.), Prism.js with VSC Dark Plus syntax highlighting, responsive layout with styled components, TypeScript strict mode. The theme editor is interactive - change 3 config values and watch 50+ design tokens regenerate in real-time. Deployed on Vercel at <Link href="https://operation-finish-stuff.vercel.app/" target="_blank" rel="noopener noreferrer">operation-finish-stuff.vercel.app</Link>. Open source on <Link href="https://github.com/jaygriffinjay/operation-finish-stuff" target="_blank" rel="noopener noreferrer">GitHub</Link>.
        </Paragraph>

        {/* More projects will go here */}

      </ContentWrapper>
    </Container>
  );
}
