'use client';

import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import { Sekuya } from 'next/font/google';
import { IoDownloadOutline } from 'react-icons/io5';

const sekuya = Sekuya({ subsets: ['latin'], weight: ['400'], adjustFontFallback: false });

const printStyles = css`
  @media print {
    @page {
      margin: 0.7in;
      size: letter;
    }
    
    body {
      margin: 0;
      padding: 0;
    }
    
    /* Hide non-printable elements (but not resume header) */
    nav, body > header, body > footer, .no-print {
      display: none !important;
    }
    
    /* Prevent page breaks inside elements */
    h1, h2, h3, h4, h5, h6 {
      page-break-after: avoid;
      break-after: avoid;
    }
    
    /* Control widows and orphans */
    p {
      orphans: 3;
      widows: 3;
    }
    
    /* Prevent page breaks inside these */
    .resume-section, .job-entry, .project-entry {
      page-break-inside: avoid;
      break-inside: avoid;
    }
    
    /* Links: show URL in print */
    a[href]:after {
      content: none; /* or use: " (" attr(href) ")" if you want URLs visible */
    }
  }
`;

const PageWrapper = styled.div`
  padding-top: 2.5rem;
  padding-bottom: 1.5rem;

  @media print {
    padding: 0;
  }

  @media (max-width: 900px) {
    padding: 0.5rem 1rem 1rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
`;

const ResumeActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  position: absolute;
  left: 50%;
  top: calc(100% + 0.75rem);
  transform: translateX(-50%);
  width: auto;
  min-width: 0;
  margin: 0;
`;

const ActionButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.75rem;
  border: 1px solid #cfcfcf;
  border-radius: 10px;
  background: #fff;
  color: #111;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 120ms ease, box-shadow 120ms ease, border-color 120ms ease, background-color 120ms ease;

  &:hover {
    background: #fafafa;
    border-color: #adadad;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  svg {
    font-size: 1rem;
  }
`;

const ResumeContainer = styled.div`
  width: 8.5in; /* Fixed width - never responsive */
  min-width: 8.5in; /* Prevent Safari from squishing */
  margin: 0 auto;
  position: relative;
  overflow: visible;
  padding: 0.7in;
  background: white;
  color: #000;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 10.5pt;
  line-height: 1.25;
  
  /* Safari-specific fixes */
  -webkit-text-size-adjust: 100%; /* Prevent Safari from auto-adjusting text size */
  text-size-adjust: 100%;
  
  @media print {
    padding: 0;
    margin: 0 auto !important;
    transform: none !important;
    width: 100%;
    min-width: 0;
    height: auto !important;
  }

  /* Continuously scale down as viewport shrinks, never scale up beyond 100% */
  @media (max-width: 900px) {
    margin: 4rem 0 0 0; /* Add top margin for spacing from navbar */
    flex-shrink: 0; /* Prevent flex parent from squishing */
    transform: scale(max(0.4, min(1, calc((100vw - 2rem) / 8.5in))));
    transform-origin: top center; /* Scale from top so gap doesn't grow */
    
    /* Safari sometimes needs explicit height behavior with transforms */
    height: max-content;
  }
`;

const Header = styled.header`
  text-align: center;
  padding-top: 0;
  margin-bottom: 0.5rem;
  padding-bottom: 0.35rem;
  border-bottom: 2px solid #333;

  @media print {
    margin-bottom: 0.35rem;
    padding-bottom: 0.25rem;
  }
`;

const Name = styled.h1`
  font-size: 2.5rem;
  margin: 0 0 0.25rem 0;
  font-weight: 700;
  font-family: ${sekuya.style.fontFamily};
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #444;
  width: 100%;
  box-sizing: border-box;

  @media print {
    font-size: 0.84rem;
  }
  
  a {
    color: #000;
    text-decoration: none;
    font-weight: 700;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Section = styled.section`
  margin-bottom: 0.45rem;
  
  &.resume-section {
    page-break-inside: avoid;
  }

  @media print {
    margin-bottom: 0.35rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 13pt;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  padding-bottom: 0.1rem;
  border-bottom: 2px solid #333;
  color: #333;
  display: inline-block;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 0.20rem;

  @media print {
    margin-bottom: 0.12rem;
  }
`;

const SectionLink = styled.a`
  font-size: 9pt;
  font-weight: 600;
  color: #444;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Summary = styled.p`
  margin: 0 0 1rem 0;
  line-height: 1.6;
  
  @media print {
    margin: 0 0 0.5rem 0;
    line-height: 1.35;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.2rem 1rem;
  margin: 0 0 0.3rem 0;
`;

const SkillItem = styled.span`
  font-weight: 500;
  white-space: normal;
  
  &.full-width {
    grid-column: span 2;
  }
`;

const ProjectEntry = styled.div`
  margin-bottom: 0.4rem;
  
  &.project-entry {
    page-break-inside: avoid;
  }

  @media print {
    margin-bottom: 0.3rem;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 10.5pt;
  font-weight: 700;
  margin: 0 0 0.05rem 0;
`;

const ProjectDescription = styled.p`
  margin: 0 0 0.5rem 0;
  line-height: 1.5;
  
  @media print {
    margin: 0 0 0.25rem 0;
    line-height: 1.3;
  }
`;

const BulletList = styled.ul`
  margin: 0;
  padding-left: 1.2rem;
  
  li {
    margin-bottom: 0.02rem;
    line-height: 1.25;
  }

  @media print {
    li {
      margin-bottom: 0;
      line-height: 1.2;
    }
  }
`;

const JobEntry = styled.div`
  margin-bottom: 0.4rem;
  
  &.job-entry {
    page-break-inside: avoid;
  }

  @media print {
    margin-bottom: 0.3rem;
  }
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.15rem;

  @media print {
    margin-bottom: 0.1rem;
  }
`;

const JobTitle = styled.h3`
  font-size: 10.5pt;
  font-weight: 700;
  margin: 0;
`;

const JobDates = styled.span`
  font-size: 9pt;
  color: #444;
  font-weight: 500;
  font-style: italic;
`;

export default function ResumePage() {
  return (
    <>
      <Global styles={printStyles} />
      <PageWrapper>
        <ResumeContainer>
          <Header>
            <Name>Jay Griffin</Name>
            <ContactInfo>
              <a href="https://jaygriff.com" target="_blank" rel="noopener noreferrer">jaygriff.com</a>
              <span aria-hidden="true">•</span>
              <a href="mailto:jay@jaygriff.com">jay@jaygriff.com</a>
              <span aria-hidden="true">•</span>
              <a href="https://github.com/jaygriffinjay" target="_blank" rel="noopener noreferrer">github.com/jaygriffinjay</a>
              <span aria-hidden="true">•</span>
              <a href="https://www.linkedin.com/in/jaygriffinjay" target="_blank" rel="noopener noreferrer">linkedin.com/in/jaygriffinjay</a>
            </ContactInfo>
          </Header>

        <Section className="resume-section">
          <SectionHeader>
            <SectionTitle>Projects</SectionTitle>
            <SectionLink href="https://jaygriff.com/projects" target="_blank" rel="noopener noreferrer">
              jaygriff.com/projects
            </SectionLink>
          </SectionHeader>

          <ProjectEntry className="project-entry">
            <ProjectTitle>
              jaygriff.com
              {' '}— Personal Platform
            </ProjectTitle>
            <BulletList>
              <li>Full-stack content and development platform powering posts, docs, and webapps in one repo</li>
              <li>Built custom component system, dev tools, and content pipeline for rapid iteration</li>
            </BulletList>
          </ProjectEntry>
          <ProjectEntry className="project-entry">
            <ProjectTitle>
              ByTheHour
              {' '}— AI-Native Time Blocking App
            </ProjectTitle>
            <BulletList>
              <li>Time blocking app with natural language scheduling using LLM structured outputs</li>
              <li>Creates, edits, and deletes multiple time block event details with a simple chat interface</li>
            </BulletList>
          </ProjectEntry>

          <ProjectEntry className="project-entry">
            <ProjectTitle>
              Strava Analyzer
              {' '}— Fitness Data Analytics
            </ProjectTitle>
            <BulletList>
              <li>Connects to the Strava API, analyzes user activity and stream data, and presents visualizations</li>
              <li>Runs entirely client-side to protect privacy, and uses caching to reduce API calls</li>
            </BulletList>
          </ProjectEntry>

          <ProjectEntry className="project-entry">
            <ProjectTitle>
              Locus
              {' '}— Chrome Extension
            </ProjectTitle>
            <BulletList>
              <li>Fast bookmark launcher with fuzzy search and keyboard navigation for large bookmark libraries</li>
              <li>Uses hotkeys to launch apps in the browser like Spotlight Search</li>
            </BulletList>
          </ProjectEntry>

          <ProjectEntry className="project-entry">
            <ProjectTitle>
              Bootstrap Full-Stack Webapp
              {' '}— Next.js Boilerplate
            </ProjectTitle>
            <BulletList>
              <li>Next.js boilerplate with theme system, component library, and dev tooling</li>
              <li>Bootstrapped multiple projects: jaygriff.com, Strava Analyzer, Fitness Data ETL Platform</li>
            </BulletList>
          </ProjectEntry>

          <ProjectEntry className="project-entry">
            <ProjectTitle>
              Bootstrap Frontend Webapp
              {' '}— Vite Boilerplate
            </ProjectTitle>
            <BulletList>
              <li>Lightweight Vite boilerplate using my underlying stack and tooling</li>
              <li>Bootstrapped Locus Chrome extension and other frontend projects</li>
            </BulletList>
          </ProjectEntry>
        </Section>

        <Section className="resume-section">
          <SectionHeader>
            <SectionTitle>Core Skills</SectionTitle>
            <SectionLink href="https://jaygriff.com/my-stack" target="_blank" rel="noopener noreferrer">
              jaygriff.com/my-stack
            </SectionLink>
          </SectionHeader>
          <SkillsGrid>
            <SkillItem className="full-width"><strong>Languages:</strong> TypeScript, JavaScript, Python, Shell, HTML, CSS</SkillItem>
            <SkillItem><strong>Frameworks:</strong> Next.js, React</SkillItem>
            <SkillItem><strong>APIs:</strong> OpenAI, Stripe, Strava</SkillItem>
            <SkillItem><strong>Styling:</strong> Tailwind CSS, CSS-in-JS</SkillItem>
            <SkillItem><strong>Visualization:</strong> Recharts, SVG/CSS animations</SkillItem>
            <SkillItem><strong>Data:</strong> Supabase (Postgres), Prisma ORM, SQLite</SkillItem>
            <SkillItem><strong>Tooling:</strong> Vite, Git, VS Code, Chrome DevTools</SkillItem>
          </SkillsGrid>
        </Section>

        <Section className="resume-section">
          <SectionHeader>
            <SectionTitle>Experience</SectionTitle>
          </SectionHeader>

          <JobEntry className="job-entry">
            <JobHeader>
              <JobTitle>Independent Software Developer</JobTitle>
              <JobDates>Aug 2021 – Present</JobDates>
            </JobHeader>
            <BulletList>
              <li>Developing multiple full-stack apps across web, data, and developer tools</li>
              <li>Actively maintaining open-source projects with continuous feature development and refinement</li>
            </BulletList>
          </JobEntry>

          <JobEntry className="job-entry">
            <JobHeader>
              <JobTitle>Crew Leader & Driver — Little Guys Movers</JobTitle>
              <JobDates>Jun 2025 – Present</JobDates>
            </JobHeader>
            <BulletList>
              <li>Leading moves with up to three 26ft box trucks and six crew members</li>
              <li>Mentioned by name in multiple five-star customer reviews on Google Reviews</li>
            </BulletList>
          </JobEntry>

          <JobEntry className="job-entry">
            <JobHeader>
              <JobTitle>Tax Staff Accountant — Holthouse Carlin & Van Trigt, LLP</JobTitle>
              <JobDates>Jul 2023 – Jan 2024</JobDates>
            </JobHeader>
            <BulletList>
              <li>Supported all stages of a multi-deadline engagement for a new HNW client with 12+ returns</li>
              <li>Staffed three teams preparing workpapers and returns for HNW individuals and small and medium sized business clients</li>
            </BulletList>
          </JobEntry>
        </Section>

        <Section className="resume-section">
          <SectionHeader>
            <SectionTitle>Education</SectionTitle>
          </SectionHeader>
          <JobEntry className="job-entry">
            <JobHeader>
              <JobTitle>Master of Professional Accounting — The University of Texas at Arlington</JobTitle>
              <JobDates>Sep 2019 – May 2021</JobDates>
            </JobHeader>
          </JobEntry>
          <JobEntry className="job-entry">
            <JobHeader>
              <JobTitle>Bachelor of Science in Agricultural Economics — Texas A&amp;M University</JobTitle>
              <JobDates>Sep 2016 – May 2019</JobDates>
            </JobHeader>
          </JobEntry>
        </Section>
          <ResumeActions className="no-print" aria-label="Resume actions">
            <ActionButton
              href="/Resume%20for%20Jay%20Griffin.pdf"
              download
              aria-label="Download resume PDF"
            >
              <IoDownloadOutline aria-hidden="true" />
              Download PDF
            </ActionButton>
          </ResumeActions>
        </ResumeContainer>
      </PageWrapper>
    </>
  );
}
