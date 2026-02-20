'use client';

import { Heading, Paragraph, Link, Divider, Container, Text } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';
import type { PostMeta } from '@/types/post';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { IoDocumentTextOutline } from 'react-icons/io5';
import Image from 'next/image';
import * as Accordion from '@radix-ui/react-accordion';
import { IoChevronDown } from 'react-icons/io5';
import { useState } from 'react';
// import Timeline from '@/components/Timeline';

export const routeMetadata: PostMeta = {
  title: 'Jay Griffin - Full Stack Developer | React, Next.js, TypeScript',
  slug: 'about-me',
  date: '2026-01-21T00:00:00Z',
  updated: '2026-02-10T00:00:00Z',
  author: ['Jay Griffin'],
  description: 'I build modern web applications with React, Next.js, and TypeScript. Currently seeking full-time software development opportunities. Former accountant turned developer.',
  tags: ['about'],
  path: '/about-me',
};

const shimmer = keyframes`
  to {
    background-position: -200% 0;
  }
`;

const StyledDivider = styled.hr`
  border: none;
  border-top: 3px solid hsl(210, 100%, 60%);
  margin: -0.5rem 0 3rem 0;
`;

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

const HiringCard = styled.div`
  position: relative;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: ${props => props.theme.spacing.lg};
  margin: ${props => props.theme.spacing.xl} 0;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 10px 30px rgba(0, 0, 0, 0.2), 0 5px 15px rgba(0, 0, 0, 0.15);
`;

const HiringText = styled.div`
  text-align: center;
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: 500;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const HiringMediaRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.lg};
  margin: 0 auto ${props => props.theme.spacing.lg} auto;
  width: 100%;
  max-width: 100%;
`;

const BigEmailLink = styled.a`
  display: inline-block;
  font-size: ${props => props.theme.fontSizes.xxxl};
  font-weight: 700;
  text-decoration: none;
  color: hsl(210, 100%, 60%);
  text-shadow: 2px 2px 0 hsl(220, 100%, 45%), 5px 5px 10px rgba(0,0,0,0.5);
  
  &:hover {
    color: transparent;
    text-shadow: none;
    background: linear-gradient(
      90deg,
      hsl(190, 100%, 55%),
      hsl(200, 100%, 60%),
      hsl(210, 100%, 60%),
      hsl(220, 100%, 55%),
      hsl(230, 100%, 55%),
      hsl(240, 100%, 60%),
      hsl(220, 100%, 55%),
      hsl(190, 100%, 55%)
    );
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${shimmer} 3s linear infinite;
  }
`;

const ProfileLinks = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  width: fit-content;
  max-width: 100%;
  margin: 0 auto;
  
  a {
    display: grid;
    grid-template-columns: 48px 1fr;
    align-items: center;
    justify-items: stretch;
    flex: 0 0 auto;
    width: max-content;
    max-width: 100%;
    box-sizing: border-box;
    gap: ${props => props.theme.spacing.sm};
    padding: 0.65rem 0.9rem;
    border-radius: ${props => props.theme.radii.medium};
    color: ${props => props.theme.colors.text};
    text-decoration: none;
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: 600;
    transition: background-color 0.15s ease, color 0.15s ease;
    line-height: 1;
    white-space: nowrap;
    text-align: left;
    
    &:hover {
      background-color: ${props => props.theme.colors.border};
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
    width: max-content;

    a {
      width: 100%;
    }
  }

  .linkIconContainer {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
  }

  .linkTextContainer {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 48px;
    line-height: 1;
    transform: translateY(1px);
  }

  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    line-height: 0;
  }

  .icon svg {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
  }
`;

const AccordionRoot = styled(Accordion.Root)`
  width: 100%;
`;

const AccordionItem = styled(Accordion.Item)`
  /* border-bottom: 1px solid ${props => props.theme.colors.border}; */
  
  /* &:first-of-type {
    border-top: 1px solid ${props => props.theme.colors.border};
  } */
`;

const AccordionTrigger = styled(Accordion.Trigger)`
  all: unset;
  font-family: inherit;
  padding: ${props => props.theme.spacing.md} 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  transition: color 0.2s;
  
  &[data-state='open'] svg {
    transform: rotate(180deg);
  }
`;

const AccordionContent = styled(Accordion.Content)`
  overflow: hidden;
  
  &[data-state='open'] {
    height: var(--radix-accordion-content-height);
    animation: slideDown 250ms ease-out;
  }
  
  &[data-state='closed'] {
    height: 0;
    animation: slideUp 250ms ease-out;
  }
  
  @keyframes slideDown {
    from {
      height: 0;
    }
    to {
      height: var(--radix-accordion-content-height);
    }
  }
  
  @keyframes slideUp {
    from {
      height: var(--radix-accordion-content-height);
    }
    to {
      height: 0;
    }
  }
`;

const AccordionContentInner = styled.div`
  padding-bottom: ${props => props.theme.spacing.lg};
  
  p {
    color: ${props => props.theme.colors.primary};
  }
`;

const ChevronIcon = styled(IoChevronDown)`
  transition: transform 200ms ease;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const ExpandButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radii.medium};
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: 600;
  cursor: pointer;
`;

const faqEntries = [
  {
    question: "What's your background?",
    answer:
      "I have a bachelor's degree in agricultural economics, a master's degree in accounting, and I worked in public tax accounting before transitioning to software development. I've also worked as a professional mover!",
  },
  {
    question: 'What are you focused on right now?',
    answer:
      'Currently I am spending significant time on this website, building new features, improving the framework, and writing content. I am also actively working to make AI-native dev tools and workflows, AI-native apps, and data analysis apps.',
  },
  {
    question: 'Do you freelance?',
    answer:
      "Currently no! I am looking for a full-time role and I am also interested in selling my own software products. I want to focus on those things right now but maybe in the future I'll be open to freelance work.",
  },
  {
    question: "What's your end goal?",
    answer:
      'I want to create my own software businesses to support my work indefinitely. I would also love to work with talented developers and learn from them.',
  },
  {
    question: 'Why should anyone care?',
    answer: '¯\\_(ツ)_/¯',
  },
  {
    question: 'Will AI replace you?',
    answer:
      "I don't think AI will replace me. I think it has replaced some types of work though. AI is just like any other innovation: it has changed how we do things, made some things obsolete, and created new opportunities.",
  },
  {
    question: 'How much does this website cost to run?',
    answer: 'Currently $1/month (barring traffic spikes).',
  },
  {
    question: 'How long did this take to build?',
    answer:
      'This site? You can check the commit history. The framework and methods used? Refined over years of iteration. This FAQ? One afternoon and some follow-up edits.',
  },
  {
    question: 'How did you learn to code?',
    answer: 'I go into detail about it in my accounting-to-dev post.',
  },
  {
    question: 'What would you build with unlimited time?',
    answer:
      'With unlimited time I think I would get bored of regular work and create and use tools for science. Either biology or space. So trying to get to the bottom of life or the universe!',
  },
  {
    question: 'What are you excited to build next?',
    answer:
      "I'm most excited to build AI-native apps. These apps can solve problems in ways we couldn't achieve even just a few years ago. This is keeping me busy because it takes plenty of real work to build them.",
  },
  {
    question: 'How do you use AI in your work?',
    answer:
      "AI has changed how I work and how I make software. I use chatbots for a laundry list of tasks and I use coding assistants every time I write or code. But AI isn't finished changing how I work. It seems like every day there is a new discovery about what you can accomplish by using agents in different ways. I am actively exploring all of that and figuring out what actually works for me and what doesn't.",
  },
  {
    question: "What's currently broken in your codebase?",
    answer:
      "My theme editor for this site is janky. Site styling isn't consistently using theme values anymore. The atomic theme values I use have weird increments I don't actually use. The editor can permanently change styling but that's not what I need in practice. I should probably repurpose it for dynamic features instead.",
  },
] as const;

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqEntries.map(entry => ({
    '@type': 'Question',
    name: entry.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: entry.answer,
    },
  })),
};

export default function AboutMePage() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  
  const toggleAll = () => {
    if (openItems.length > 0) {
      setOpenItems([]);
    } else {
      setOpenItems(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13']);
    }
  };

  return (
    <Container size="sm">
      <ContentWrapper>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <HiringCard>
          <HiringMediaRow>
            <Image 
              src="/images/me.jpg" 
              alt="Jay Griffin" 
              width={250}
              height={250}
              priority
              style={{ 
                width: '250px',
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '8px',
                display: 'block',
                marginLeft: '0',
                marginRight: '0',
                marginBottom: '0'
              }}
            />
            <ProfileLinks>
              <a href="/resume" aria-label="Resume">
                <span className="linkIconContainer" aria-hidden>
                  <span className="icon"><IoDocumentTextOutline /></span>
                </span>
                <span className="linkTextContainer">Resume</span>
              </a>
              <a href="https://github.com/jaygriffinjay" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <span className="linkIconContainer" aria-hidden>
                  <span className="icon"><SiGithub /></span>
                </span>
                <span className="linkTextContainer">GitHub</span>
              </a>
              <a href="https://linkedin.com/in/jaygriffinjay" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <span className="linkIconContainer" aria-hidden>
                  <span className="icon"><SiLinkedin /></span>
                </span>
                <span className="linkTextContainer">LinkedIn</span>
              </a>
            </ProfileLinks>
          </HiringMediaRow>
          <HiringText>
            I'm currently seeking a full-time role building modern web and React-based applications!
          </HiringText>
       
             <BigEmailLink href="mailto:jay@jaygriff.com">
            Email me: jay@jaygriff.com
          </BigEmailLink>
        </HiringCard>


        <StyledHeading>Hi, I'm Jay!</StyledHeading>

      <Paragraph>
        I'm a software developer and this is my website where I do my work and publish it too! On here I document my work, share my thoughts, and maybe even post some personal stuff.
      </Paragraph>


      <StyledHeading>What I Do</StyledHeading>
      <Paragraph>
        I primarily work in the browser with TypeScript, React, and Next.js. But see <Link href="/my-stack">my stack</Link> for a full list!
      </Paragraph>

      <Paragraph>
        I'm very interested in the internet and the web. I work with modern web infrastructure and managed cloud services daily. I have a keen interest in computer infrastructure and distributed systems and this informs how I design my apps to be infrastructure-aware. This has led me to primarily build with Next.js on Vercel because I value quick development as well as making software that is powerful and capable of scaling up. 
      </Paragraph>

      <Paragraph>
        I'm also working with AI constantly. AI is a new primitive in software development that has created a massive gap between old software and new software leveraging AI patterns. I'm excited to build AI-native apps as well as integrate AI into all kinds of legacy workflows that haven't caught up yet.
      </Paragraph>

      <Paragraph>
        My main project is <Link href="/about-this-site">this site</Link> - a custom-built web app that serves as 
        both my workspace and publishing platform. It is the container for a lot of my other apps because I can create them <Link href="https://github.com/jaygriffinjay/jaygriff" target="_blank" rel="noopener noreferrer">within this repo</Link> and then host and 
        demo them on this site.
      </Paragraph>

      <Paragraph>
        While on the frontend this just looks like a website, on the backend this is a testbed 
        for my full-featured application framework I use to make all my apps. The site is just an excuse to improve the framework and 
        factor out my best work into a reusable system I endearingly call my <Link href="https://github.com/jaygriffinjay/bootstrap-fullstack-webapp" target="_blank" rel="noopener noreferrer">Bootstrap Repo</Link>, otherwise known as a "boilerplate".
      </Paragraph>

      <Paragraph>
        Learn more <Link href="/about-this-site">about this site</Link>, explore the <Link href="/features">completed features</Link>, or check out 
        the <Link href="/roadmap">future roadmap</Link>.
      </Paragraph>

      <StyledHeading>What I Write About</StyledHeading>
      <Paragraph>
        Software. AI. Data analysis and visualization. Money and financial modelling. Fitness tracking and analysis. Business, entrepreneurship, and turning software into a business. And whatever I'm thinking about.
      </Paragraph>


      <StyledHeading>Everything Else</StyledHeading>

      <div style={{ textAlign: 'center' }}>
        <ExpandButton onClick={toggleAll}>
          {openItems.length > 0 ? 'Collapse All' : 'Expand All'}
        </ExpandButton>
      </div>

      <AccordionRoot type="multiple" value={openItems} onValueChange={setOpenItems}>
        <AccordionItem value="1">
          <AccordionTrigger>
            What's your background?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent forceMount>
            <AccordionContentInner>
              <Paragraph>
                I have a bachelor's degree in agricultural economics, a master's degree in accounting, and I worked in public tax accounting <Link href="/posts/accounting-to-dev">before transitioning to software development</Link>. I've also worked as a professional mover!
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="2">
          <AccordionTrigger>
            What are you focused on right now?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent forceMount>
            <AccordionContentInner>
              <Paragraph>
                Currently I am spending significant time on this website, building new features, improving the framework, and writing content. I am also actively working to make AI-native dev tools and workflows, AI-native apps, and data analysis apps.
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="3">
          <AccordionTrigger>
            Do you freelance?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent forceMount>
            <AccordionContentInner>
              <Paragraph>
                Currently no! I am looking for a full-time role and I am also interested in selling my own software products. I want to focus on those things right now but maybe in the future I'll be open to freelance work.
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="4">
          <AccordionTrigger>
            What's your end goal?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent forceMount>
            <AccordionContentInner>
              <Paragraph>
                I want to create my own software businesses to support my work indefinitely. I would also love to work with talented developers and learn from them.
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="5">
          <AccordionTrigger>
            Why should anyone care?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent forceMount>
            <AccordionContentInner>
              <Paragraph>
                ¯\_(ツ)_/¯
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="6">
          <AccordionTrigger>
            Will AI replace you?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent forceMount>
            <AccordionContentInner>
              <Paragraph>
                I don't think AI will replace me. I think it has replaced some types of work though. AI is just like any other innovation: it has changed how we do things, made some things obsolete, and created new opportunities.
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="7">
          <AccordionTrigger>
            How much does this website cost to run?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent forceMount>
            <AccordionContentInner>
              <Paragraph>
                Currently $1/month (barring traffic spikes).
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="8">
          <AccordionTrigger>
            How long did this take to build?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent forceMount>
            <AccordionContentInner>
              <Paragraph>
                This site? You can <Link href="https://github.com/jaygriffinjay/jaygriff/commit/d5983cf638445d0fa0e1284f192c4de56bcc6d68#diff-b335630551682c19a781afebcf4d07bf978fb1f8ac04c6bf87428ed5106870f5" target="_blank" rel="noopener noreferrer">check the commit history</Link>. The framework and methods used? Refined over years of iteration. This FAQ? One afternoon and some follow-up edits.
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="9">
          <AccordionTrigger>
            How did you learn to code?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent forceMount>
            <AccordionContentInner>
              <Paragraph>
                I go into detail about it <Link href="/posts/accounting-to-dev">in this post</Link>!
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="10">
          <AccordionTrigger>
            What would you build with unlimited time?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent forceMount>
            <AccordionContentInner>
              <Paragraph>
                With unlimited time I think I would get bored of regular work and create and use tools for science. Either biology or space. So trying to get to the bottom of life or the universe!
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="11">
          <AccordionTrigger>
            What are you excited to build next?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent forceMount>
            <AccordionContentInner>
              <Paragraph>
                I'm most excited to build AI-native apps. These apps can solve problems in ways we couldn't achieve even just a few years ago. This is keeping me busy because it takes plenty of real work to build them. 
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="12">
          <AccordionTrigger>
            How do you use AI in your work?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent forceMount>
            <AccordionContentInner>
              <Paragraph>
                AI has changed how I work and how I make software. I use chatbots for a laundry list of tasks and I use coding assistants every time I write or code. But AI isn't finished changing how I work. It seems like every day there is a new discovery about what you can accomplish by using agents in different ways. I am actively exploring all of that and figuring out what actually works for me and what doesn't. 
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="13">
          <AccordionTrigger>
            What's currently broken in your codebase?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent forceMount>
            <AccordionContentInner>
              <Paragraph>
                My theme editor for this site is janky. Site styling isn't consistently using theme values anymore. The atomic theme values I use have weird increments I don't actually use. The editor can permanently change styling but that's not what I need in practice. I should probably repurpose it for dynamic features instead.
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

      </AccordionRoot>

      </ContentWrapper>
    </Container>
  );
}
