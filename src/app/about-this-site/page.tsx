import { Heading, Paragraph, List, ListItem, Link, Container } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';
import type { PostMeta } from '@/types/post';

export const routeMetadata: PostMeta = {
  title: 'About This Site',
  slug: 'about-this-site',
  date: '2026-01-21T00:00:00Z',
  updated: '2026-02-09T00:00:00Z',
  author: ['Claude Sonnet 4.5', 'Jay Griffin'],
  type: 'doc',
  projectId: 'jaygriff',
  description: 'What this site is and how it works.',
  tags: ['meta', 'about'],
  authorshipNote: 'Claude wrote this based on Jay\'s direction and edits.',
  path: '/about-this-site',
};

export default function AboutThisSite() {
  return (
    <Container size="sm">
      <ContentWrapper>
        <Heading level={1}>{routeMetadata.title}</Heading>
      
      <Paragraph>
        This is my personal website, built from scratch as both a publishing platform and development workspace. 
        It's where I document my work, share my thoughts, and build web applications.
      </Paragraph>

      <Heading level={2}>Site Highlights</Heading>

      <Paragraph>
        If you want the short version, these two pages are the best overview of what I'm building and where it's going.
      </Paragraph>

      <List>
        <ListItem>
          <Link href="/features">Features</Link> — A living index of the most important parts of the platform.
        </ListItem>
        <ListItem>
          <Link href="/roadmap">Roadmap</Link> — What I'm actively building next and why.
        </ListItem>
      </List>

      <Heading level={2}>What I Built</Heading>

      <Paragraph>
        On the surface, this looks like a standard personal website. Under the hood, it's a full-stack 
        framework for rapidly building and shipping web applications. The site itself is the primary 
        application, but it also serves as a container for other projects.
      </Paragraph>

      <Paragraph>
        When I build a new app I can do so <Link href="https://github.com/jaygriffinjay/jaygriff">within this repo</Link>, leverage the existing tooling and component system, and host it directly on 
        the site. The framework makes each new project faster and better than building standalone.
      </Paragraph>

      <Heading level={2}>What You'll Find Here</Heading>
      <Paragraph>
        Most content is software work artifacts—why I chose this tool over that, debugging sessions, architectural decisions. These are thinking out loud, not traditional articles.
      </Paragraph>

      <Paragraph>
        But since this platform is also great for personal publishing, I use it for traditional blogging about things that interest me such as fitness, finances, and other parts of life. Same infrastructure, different purposes. The software artifacts are process documentation; the life posts are actually written for readers.
      </Paragraph>

      <Heading level={2}>Tech Stack</Heading>

      <Paragraph>
        This stack is the result of years of experimentation on this project. I've rebuilt it 
        multiple times, trying different approaches until I landed on what actually works for me.
      </Paragraph>

      <Paragraph>
        <strong>Core:</strong>
      </Paragraph>
      <List>
        <ListItem><strong>Next.js and React</strong> - Full-stack web application framework</ListItem>
        <ListItem><strong>TypeScript</strong> - My language of choice</ListItem>
        <ListItem><strong>Emotion</strong> - CSS-in-JS - my styling of choice</ListItem>
      </List>

      <Paragraph>
        <strong>Content System:</strong>
      </Paragraph>
      <List>
        <ListItem><strong>TSX Components</strong> - Rich, interactive content with full React capabilities</ListItem>
        <ListItem><strong>Markdown</strong> - Simple text-based content for quick writing</ListItem>
        <ListItem><strong>Custom Primitives</strong> - Primitive component system for consistent design</ListItem>
      </List>

      <Paragraph>
        <strong>Developer Experience:</strong>
      </Paragraph>
      <List>
        <ListItem><strong>Metadata Scanner</strong> - Audits all content for completeness</ListItem>
        <ListItem><strong>Theme Editor</strong> - Live design system adjustments</ListItem>
      </List>

      <Paragraph>
        <strong>Infrastructure:</strong>
      </Paragraph>
      <List>
        <ListItem><strong>Vercel</strong> - Deployment, hosting, analytics</ListItem>
        <ListItem><strong>Cloudflare</strong> - Registrar, DNS management, email forwarding</ListItem>
        <ListItem><strong>GitHub</strong> - Source code hosting & collaboration</ListItem>
      </List>

      <Paragraph>
        <strong>What does it cost to run this?</strong>
      </Paragraph>
      <List>
        <ListItem><strong>Domain</strong> - $12/year for jaygriff.com</ListItem>
        <ListItem><strong>Domain Email</strong> - Free (Cloudflare forwarding + Gmail)</ListItem>
        <ListItem><strong>Hosting</strong> - Free (Vercel's generous free tier barring any traffic spikes)</ListItem>
        <ListItem><strong>Total</strong> - $12/year, or $1/month</ListItem>
      </List>

      <Paragraph>
        Hosting static sites is often free. For my site specifically, being a Next.js app hosted on Vercel, that means I need to pay more attention 
        to serverless and edge function usage. But for a personal site like this, the free tier 
        handles everything beautifully.
      </Paragraph>  

      <Heading level={2}>Why Build This?</Heading>
      <Paragraph>
        I've wanted my own corner of the internet since I was a teenager. Not a profile on someone else's platform, 
        but an actual space that's mine. This is that space.
      </Paragraph>

      <Paragraph>
        More practically: I needed a cross between a note taking app, a personal knowledge management system, a traditional blog, a place for my development tools and documentation, and a dev blog, all with the 
        flexibility to evolve as needs change. I needed a powerful, customized tool that makes my work better.
      </Paragraph>

      <Heading level={2}>How It Helps Me Develop Better Software</Heading>
      <Paragraph>
        This website is primarily meant to help me develop better software. It's my testbed for new features, 
        new ideas, and anything I find interesting and worth working on.
      </Paragraph>

      <Paragraph>
        It's also my development environment. I can build GUI tools directly into the browser such as component galleries, theme editors, debugging visualizations—whatever I need to develop better software. Instead of relying on scattered CLI tools or external apps, I build custom interfaces that integrate perfectly with my workflow.
      </Paragraph>

      <Paragraph>
        The site also functions as a knowledge base for learning. Software development requires constantly learning new systems and navigating and debugging them. It also requires making decisions that will affect the rest of my work down the line because I chose to do something a certain way. By capturing my thinking as it happens—why I chose this tool over that one, this method over that one, how a system works, what I learned debugging a particular issue—I build a searchable record of my own problem-solving patterns. It's learning that compounds.
      </Paragraph>

      <Paragraph>
        It also gives me endless things to work on. The site is never done. As the site gets bigger with more features and content, novel technical problems naturally arise that need solving. And even if the site doesn't need active work done on it, 
        it serves as the container for all my other development work, which means even when I'm not working on the site directly, I'm working inside of it and using it.
      </Paragraph>

      <Heading level={2}>Debugging With Visualization</Heading>
      <Paragraph>
        One thing I love doing is debugging things with it. I don't add random print statements to the console 
        to debug things. I post a comprehensive, styled, organized, interesting illustration of 
        the problem I'm having and the associated outputs as a page on my site.
      </Paragraph>

      <Paragraph>
        The fact that it's a website is secondary to the fact that I'm a visual learner who is visualizing 
        my problems in precise detail while web and browser just so happen to be the medium 
        I'm using to do so.
      </Paragraph>

      <Heading level={2}>Documenting My Thoughts</Heading>
      <Paragraph>
        I'm not a traditional writer. My software articles aren't crafted for an audience—they're artifacts of my thought process, captured in real-time with AI collaboration.
      </Paragraph>

      <Paragraph>
        Most writers try to write <em>for</em> readers. I'm just externalizing my thinking, and AI helps structure it into something coherent enough to be followable. The process is the point. You're reading my working memory, not polished essays.
      </Paragraph>

      <Paragraph>
        This gives me incredible freedom. Instead of agonizing over how to present ideas, I just think through them with text. AI helps clean up the rough edges while preserving my voice and process. The result is a constant stream of documented thinking—decisions made, problems solved, patterns noticed.
      </Paragraph>

      <Paragraph>
        By having a robust component system, content design, and AI assistance, this site helps me turn thoughts into quality web pages really, really fast, which is actually a lot of fun!
      </Paragraph>
      </ContentWrapper>
    </Container>
  );
}
