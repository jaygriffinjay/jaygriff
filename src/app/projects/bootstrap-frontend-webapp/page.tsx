import { Container, Heading, Paragraph, Link, Divider } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';

export const metadata = {
  title: 'Bootstrap Frontend Webapp',
  description: 'My Vite + React + TypeScript starter — the template that taught me what good developer experience actually feels like.',
};

export default function BootstrapFrontendPage() {
  return (
    <Container size="sm">
      <ContentWrapper>
        <Heading level={1}>Bootstrap Frontend Webapp</Heading>

        <Paragraph>
          This is my Vite + React + TypeScript starter template. I don't reach for it much anymore — pretty much everything I build now lives in the <Link href="/projects/bootstrap-fullstack-webapp">full-stack template</Link> instead. But this repo is interesting precisely because of what it represents in my progression as a developer, and Vite itself is still genuinely excellent.
        </Paragraph>

        <Heading level={2}>What Vite Did For Me</Heading>
        <Paragraph>
          Before Vite, I tolerated slow feedback loops because I didn't know any better. Hot reload that actually worked — instant, reliable, no full page refresh — changed what I considered acceptable in a dev environment. I realized I had been losing my train of thought constantly waiting to see what I actually coded. With Vite, I could just keep coding and see the results immediately. It was a revelation.
        </Paragraph>
        <Paragraph>
          It also pushed me toward TypeScript. Vite's TypeScript support was what made me consider TypeScript and see what the fuss was about. 
        </Paragraph>
        <Paragraph>
          As a build tool, Vite is still one of the fastest things out there. ESM-native, near-instant cold starts, excellent plugin ecosystem. I have nothing bad to say about it.
        </Paragraph>

        <Divider />

        <Heading level={2}>Why I Moved On</Heading>
        <Paragraph>
          The thing Vite can't give you is a backend. And it turns out a little backend goes a very long way. Server components, API routes, server-side data fetching — these things make entire categories of problems just disappear.
        </Paragraph>
        <Paragraph>
          Once I used Next.js seriously, the convenience gap was too wide. I kept reaching for server-side patterns even in projects that didn't strictly need them, because they made life easier. Eventually I stopped pretending I wanted a pure frontend build and just started everything in the full-stack template.
        </Paragraph>
        <Paragraph>
          This template still gets used for things that genuinely don't need a server — browser extensions, standalone client tools, anything that needs to run without a host. <Link href="/projects/locus">Locus</Link> was built with it. But those cases are rarer than I thought they'd be.
        </Paragraph>
      </ContentWrapper>
    </Container>
  );
}
