import { Container, Heading, Paragraph, Link, List, ListItem, Divider } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';

export const metadata = {
  title: 'Bootstrap Full-Stack Webapp',
  description: 'A personal AI app builder — Next.js, Tailwind v4, shadcn/ui, and a Cline agent skill that assembles UI from my own design system.',
};

export default function BootstrapFullStackPage() {
  return (
    <Container size="sm">
      <ContentWrapper>
        <Heading level={1}>Bootstrap Full-Stack Webapp</Heading>

        <Paragraph>
          This repo has been my personal starter template for years — and has evolved dramatically over that time. It started as a collection of patterns I kept rebuilding from scratch every time I started a new project, back when I was working in Flask and Django. When I moved to JavaScript, I tried to make Express work. Then I went through a whole SSG phase: Hugo, Jekyll, Eleventy. Each one taught me something, but I kept running into ceilings.
        </Paragraph>
        <Paragraph>
          Vite was the step that clicked. React components finally made sense to me, and I could build frontends fast without fighting the tooling. When Next.js came into the picture, it was the last piece — server-side rendering, API routes, file-based routing, React Server Components. Full-stack in TypeScript, no Python backend split. I consolidated everything into one repo and never looked back.
        </Paragraph>
        <Paragraph>
          The bootstrap repo became the distilled version of all of that: the patterns that survived the experiments, the component system I kept wanting to have, the boilerplate that actually reflects how I build. jaygriff.com, Strava Analyzer, and the Fitness Data Platform were all spawned from it.
        </Paragraph>

        <Divider />

        <Heading level={2}>What It Is Now</Heading>
        <Paragraph>
          The latest version is a full personal AI app builder. The stack shifted again — Tailwind v4 and shadcn/ui replaced Emotion and my custom component library, because those are the tools AI models know best. On top of that I wrote a Cline agent skill that reads a component registry and assembles polished UI from a single prompt using my actual design system, typography, and tokens.
        </Paragraph>
        <List>
          <ListItem><strong>Next.js + TypeScript</strong> — same as always</ListItem>
          <ListItem><strong>Tailwind v4</strong> — replaced Emotion for AI-friendliness</ListItem>
          <ListItem><strong>shadcn/ui</strong> — replaced my custom Primitives as the structural layer</ListItem>
          <ListItem><strong>Component registry</strong> — single source of truth for every available component</ListItem>
          <ListItem><strong>Cline build-ui skill</strong> — autonomous UI generation guided by the registry</ListItem>
        </List>
        <Paragraph>
          <Link href="/posts/making-my-own-ai-app-builder">Read about how and why I rebuilt it →</Link>
        </Paragraph>
      </ContentWrapper>
    </Container>
  );
}
