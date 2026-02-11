'use client';

import { Heading, Paragraph, Link, Divider, Container, Text } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';
import type { PostMeta } from '@/types/post';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { SiGithub, SiLinkedin } from 'react-icons/si';
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
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  
  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: ${props => props.theme.radii.medium};
    color: ${props => props.theme.colors.text};
    text-decoration: none;
    font-size: 1.25rem;
    transition: background-color 0.15s ease;
    line-height: 1;
    
    &:hover {
      background-color: ${props => props.theme.colors.border};
    }
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
    animation: slideDown 200ms ease-out;
  }
  
  &[data-state='closed'] {
    animation: slideUp 200ms ease-out;
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

export default function AboutMePage() {
  const allItems = Array.from({ length: 20 }, (_, i) => `item-${i + 1}`);
  const [openItems, setOpenItems] = useState<string[]>([]);
  
  const toggleAll = () => {
    if (openItems.length === allItems.length) {
      setOpenItems([]);
    } else {
      setOpenItems(allItems);
    }
  };

  return (
    <Container size="sm">
      <ContentWrapper>
        <HiringCard>
          <ProfileLinks>
            <a href="https://github.com/jaygriffinjay" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <SiGithub />
            </a>
            <a href="https://linkedin.com/in/jaygriffinjay" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <SiLinkedin />
            </a>
          </ProfileLinks>
          <Image 
            src="/images/me.jpg" 
            alt="Jay Griffin" 
            width={250}
            height={250}
            priority
            style={{ 
              width: '100%',
              maxWidth: '250px',
              height: 'auto',
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }} 
            css={{
              '@media (max-width: 768px)': {
                marginTop: '3rem'
              }
            }}
          />
          <HiringText>
            I'm currently seeking a full-time role building modern web and React-based applications!
          </HiringText>
       
             <BigEmailLink href="mailto:jay@jaygriff.com">
            Email me: jay@jaygriff.com
          </BigEmailLink>
        </HiringCard>


        <StyledHeading>Hi, I'm Jay!</StyledHeading>

      <Paragraph>
        Welcome to my website where I do my work and publish it too! Most of the work I do and most of my writing is about software. I also have a strong interest in AI and how it's currently transforming software (and the world!). This site is where I document my work, share my thoughts, and post some personal stuff too.
      </Paragraph>


      <StyledHeading>What I Do</StyledHeading>
      <Paragraph>
        I primarily work in the browser with TypeScript, React, and Next.js. But see <Link href="/my-stack">my stack</Link> for a full list!
      </Paragraph>

      <Paragraph>
        I'm very interested in the internet and the web. I work with modern web infrastructure and managed cloud services every day. I have a keen interest in computer infrastructure and distributed systems and this informs how I design my apps to be infrastructure-aware. This has led me to primarily build with Next.js on Vercel because I value a quick development cycle as well as making software that is powerful and capable of scaling up. 
      </Paragraph>

      <Paragraph>
        I'm also working with AI every day. AI is a new primitive in software development that's created a massive backlog of work getting modern software up to speed with AI-native patterns. I'm excited to build AI-native apps as well as integrate AI into all kinds of legacy workflows that haven't caught up yet.
      </Paragraph>

      <Paragraph>
        My main project is <Link href="https://github.com/jaygriffinjay/jaygriff" target="_blank" rel="noopener noreferrer">this site</Link> - a custom-built web app that serves as 
        both my workspace and my publishing platform. It is the container for a lot of my other apps because I can create them within this repo and then host and 
        demo them on this site.  While on the frontend this just looks like a website, on the backend this is a testbed 
        for my full-featured application framework I use to make all my apps. The site is just an excuse to improve the framework and 
        factor out my best work into a reusable system I endearingly call my <Link href="https://github.com/jaygriffinjay/bootstrap-fullstack-webapp" target="_blank" rel="noopener noreferrer">Bootstrap Repo</Link>, otherwise known as a "boilerplate". Learn more <Link href="/about-this-site">about this site</Link>, explore the <Link href="/features">completed features</Link>, or check out 
        the <Link href="/roadmap">future roadmap</Link>.
      </Paragraph>

      <StyledHeading>What I Write About</StyledHeading>
      <Paragraph>
        My work. Stuff I wish I had time to work on. Lots of AI. Data analysis and visualization. Money and financial modelling. Fitness tracking and analysis. Puzzles and games. Entrepreneurship and turning software into a business. And whatever I'm thinking about.
      </Paragraph>

      <StyledHeading>Background</StyledHeading>
      <Paragraph>
        I worked in public tax accounting before transitioning to software development. 
        Read the full story in <Link href="/posts/accounting-to-dev">accounting → software development?</Link>
      </Paragraph>
      {/* <Timeline /> */}

      <StyledHeading>Everything Else</StyledHeading>

      <div style={{ textAlign: 'center', marginTop: '0rem', marginBottom: '3rem' }}>
        <Text>
          Anything you might want to know about me, in question format.
        </Text>
      </div>

      <div style={{ textAlign: 'center' }}>
        <ExpandButton onClick={toggleAll}>
          {openItems.length === allItems.length ? 'Collapse All' : 'Expand All'}
        </ExpandButton>
      </div>

      <AccordionRoot type="multiple" value={openItems} onValueChange={setOpenItems}>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            What's the most satisfying part of building software?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent>
            <AccordionContentInner>
              <Paragraph>
                When I use my own apps or create an app that beats every other existing tool. A close second is just writing code and seeing it instantly do something cool.
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>
            Why do you publish your work publicly?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent>
            <AccordionContentInner>
              <Paragraph>
                Publishing creates a positive feedback loop. It keeps you accountable even if nobody is watching because someone COULD be watching. It keeps your work honest and reasoned out because someone COULD disagree with you or challenge you. It makes you want to do work that matters because someone COULD say that you're just wasting your time.
              </Paragraph>
              <Paragraph>
                Beyond the peer pressure, it makes it possible for people who care about your work to find your work. While in my own network I don't know too many people who can relate to my very specific work, there are a lot of people out there who might, and publishing is the best avenue to finding and connecting with those people.
              </Paragraph>
              <Paragraph>
                I also love the idea of evergreen content. Maybe something I publish helps someone out down the line. And the modern attention economy dictates that publishing your work can be potentially lucrative which sounds pretty cool too.
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            Do you ever "finish" things?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent>
            <AccordionContentInner>
              <Paragraph>
                I side with Pixar on this one: my work is never finished; only released.
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>
            What are you focused on right now?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent>
            <AccordionContentInner>
              <Paragraph>
                Currently I am spending significant time on this website, building new features, improving the framework, and writing content. Because all of this work is meant to accelerate my software development cycle so that one day I can just focus on building quickly while leveraging my own platform.
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>
            What makes you different from other developers?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent>
            <AccordionContentInner>
              <Paragraph>
                Being a former accountant helps me immensely with the business side of things. I have always been interested in money, business, and entrepreneurship and so I approach a lot of my software development work not just as making a product but as supporting that product with an actual business behind it.
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>
            What's the end game?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent>
            <AccordionContentInner>
              <Paragraph>
                I have enough complementary nerd interests that I don't think my work will ever be done. It will only change form. The end goal is to have the freedom to work deeply on something that ends up being truly satisfying to myself and useful to others. Kind of a fluffy answer but it's true!
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger>
            Are you good at this?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent>
            <AccordionContentInner>
              <Paragraph>
                I like to think I'm pretty good at this. I now have a lot of experience building software and I'm constantly learning and improving. I'm also not afraid to admit when I don't know something or when I make a mistake. I'm always striving to get better and to create something better. I don't claim to know everything, but I do claim to be pretty good at learning, troubleshooting and figuring things out, using tools, creating tools, searching for answers, and being proactive when something doesn't make sense to me.
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8">
          <AccordionTrigger>
            Why should anyone care?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent>
            <AccordionContentInner>
              <Paragraph>
                You're welcome to not care ¯\_(ツ)_/¯
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-9">
          <AccordionTrigger>
            Will AI replace you?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent>
            <AccordionContentInner>
              <Paragraph>
                I don't think AI will replace me. I do think it has replaced some types of work though. I work with AI every single day. It's a powerful tool that helps me work faster, solve problems, and generate ideas. I see it as an extension of my own capabilities, not a replacement. The real question is how well I can leverage AI to amplify my work and create things that wouldn't be possible without it.
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-10">
          <AccordionTrigger>
            What's your background?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent>
            <AccordionContentInner>
              <Paragraph>
                I have a bachelors degree in economics, a master's degree in accounting, and I worked in public tax accounting before transitioning to software development. I've also worked as a professional mover!
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-11">
          <AccordionTrigger>
            Do you freelance?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent>
            <AccordionContentInner>
              <Paragraph>
                Currently no! I am looking for a full-time role and I am also interested in selling my own software products. I want to focus on those things right now but maybe in the future I'll be open to freelance work.
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-12">
          <AccordionTrigger>
            How much does this website cost to run?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent>
            <AccordionContentInner>
              <Paragraph>
                $12/year for the domain. Hosting is free on Vercel. Email forwarding is free through Cloudflare. Total: $1/month.
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-13">
          <AccordionTrigger>
            What are you bad at?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent>
            <AccordionContentInner>
              <Paragraph>
                Low-level programming. I can attempt it, but it's not where I shine. I'm also not that great of an artist. 
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-14">
          <AccordionTrigger>
            What don't you know?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent>
            <AccordionContentInner>
              <Paragraph>
                A lot. Some stuff I would like to know but haven't actually had time to properly work with: mobile dev with React Native, desktop apps with Electron, containers and container orchestration, modern devops and infrastructure as code to name a few.
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-15">
          <AccordionTrigger>
            What's overrated in tech?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent>
            <AccordionContentInner>
              <Paragraph>
              I'm not a big fan of tech demos that promise the moon and back. It's really easy to say things that sound groundbreaking in the moment but then the implementation doesn't even come close.
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-16">
          <AccordionTrigger>
            What's underrated in tech?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent>
            <AccordionContentInner>
              <Paragraph>
              AI, if we can all just be super normal about it with no hype or hate, really is a super useful tool for doing better work more quickly.
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-17">
          <AccordionTrigger>
            What advice would you give beginners?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent>
            <AccordionContentInner>
              <Paragraph>
                You can ask AI to explain something to you in as much detail as you need. An exhausting amount of detail. Over and over until something clicks. So I would ask it thoughtful questions about whatever topic you're trying to learn and then follow up with more questions until you feel like you understand it. Then test and build something with that knowledge. Rinse and repeat. And just check in every once in a while and see if you actually enjoy this stuff or not. AI can be wrong but it is so good at basic programming knowledge that it is going to be right more often than not so it is a legitimate learning tool for programming.
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-18">
          <AccordionTrigger>
            What tech do you hate?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent>
            <AccordionContentInner>
              <Paragraph>
                The list is long and only getting longer. 
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-19">
          <AccordionTrigger>
            Why did you make this an FAQ?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent>
            <AccordionContentInner>
              <Paragraph>
                Because I refuse to compress my personality into three sanitized sentences. This format lets me be expressive, answer every question someone might have, and make it fun.
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-20">
          <AccordionTrigger>
            How long did this take to build?
            <ChevronIcon aria-hidden />
          </AccordionTrigger>
          <AccordionContent>
            <AccordionContentInner>
              <Paragraph>
                This site? You can <Link href="https://github.com/jaygriffinjay/jaygriff/commit/d5983cf638445d0fa0e1284f192c4de56bcc6d68#diff-b335630551682c19a781afebcf4d07bf978fb1f8ac04c6bf87428ed5106870f5" target="_blank" rel="noopener noreferrer">check the commit history</Link>. The framework underneath? Years of iteration. This FAQ? One afternoon with AI helping structure my brain dump.
              </Paragraph>
            </AccordionContentInner>
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>

      </ContentWrapper>
    </Container>
  );
}
