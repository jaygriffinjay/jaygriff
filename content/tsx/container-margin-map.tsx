import { Heading, Paragraph, List, ListItem, Code } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: 'Container & Margin Behavior Map',
  slug: 'container-margin-map',
  date: '2026-02-19T20:30:00Z',
  updated: ['2026-02-23T00:00:00Z'],
  description:
    'A detailed map of how my global body spacing, Container primitive margins, and page-level overrides combine across the site.',
  tags: ['layout', 'css', 'spacing', 'primitives', 'docs'],
  type: 'doc',
  author: ['Jay Griffin', 'GPT-5.3-Codex'],
};

export default function ContainerMarginMap() {
  return (
    <>
      <Heading level={1}>Container &amp; Margin Behavior Map</Heading>

      <Paragraph>
        I keep forgetting where my spacing is actually coming from, so this is my attempt at tracing layout spacing. The short version: I have spacing applied in multiple layers (<Code>body</Code>, <Code>Container</Code>, and page-level overrides), and those layers stack unless I explicitly override them.
      </Paragraph>

      <Heading level={2}>Where spacing is defined</Heading>

      <CodeBlock language="text" filename="layout-spacing-file-tree.txt">
{`src/
├─ styles/
│  └─ GlobalStyles.tsx        # body padding-top (global, including media query)
├─ components/
│  └─ Primitives.tsx          # Container primitive margin-top + margin-bottom
└─ app/
   └─ projects/
      └─ page.tsx             # ProjectsContainer local override for this page only`}
      </CodeBlock>

      <Heading level={2}>Layer 1: Global body spacing</Heading>

      <Paragraph>
        I apply base top spacing globally in <Code>GlobalStyles</Code> because the navbar is fixed.
      </Paragraph>

      <CodeBlock language="tsx" filename="src/styles/GlobalStyles.tsx">
{`body: {
  // ...
  paddingTop: '4rem',
  '@media (max-width: 768px)': {
    paddingTop: '1rem',
  },
}`}
      </CodeBlock>

      <Paragraph>
        This means every page starts with global top offset unless a page layout changes body behavior (which mine currently does not).
      </Paragraph>

      <Heading level={2}>Layer 2: Container primitive spacing</Heading>

      <Paragraph>
        My <Code>Container</Code> primitive has both top and bottom margins baked in.
      </Paragraph>

      <CodeBlock language="tsx" filename="src/components/Primitives.tsx">
{`export const Container = styled.div<{ size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' }>
  width: 100%;
  max-width: ...;
  margin-left: auto;
  margin-right: auto;
  margin-top: 4rem;
  margin-bottom: 20rem;
  padding: 0 ...;

  @media (max-width: 768px) {
    margin-bottom: 12rem;
  }
`}
      </CodeBlock>

      <Paragraph>
        So by default, pages using <Code>Container</Code> get:
      </Paragraph>

      <List>
        <ListItem><Code>+4rem</Code> top margin from <Code>Container</Code></ListItem>
        <ListItem><Code>+20rem</Code> bottom margin from <Code>Container</Code> on desktop, <Code>+12rem</Code> on mobile</ListItem>
        <ListItem>plus body top padding from global styles</ListItem>
      </List>

      <Heading level={2}>Layer 3: Projects page local override</Heading>

      <Paragraph>
        On my projects page, I override <Code>Container</Code> so the section can end tightly, while still restoring top breathing room on small screens.
      </Paragraph>

      <CodeBlock language="tsx" filename="src/app/projects/page.tsx">
{`const ProjectsContainer = styled(Container)
  margin-top: 0;
  margin-bottom: 0;

  @media (max-width: 768px) {
    margin-top: 4rem;
    margin-bottom: 0;
  }
;

// usage
<ProjectsContainer size="lg">
  <ContentWrapper>
    ...
  </ContentWrapper>
</ProjectsContainer>`}
      </CodeBlock>

      <Heading level={2}>Computed behavior across the site</Heading>

      <Paragraph>
        This is how spacing effectively resolves right now:
      </Paragraph>

      <CodeBlock language="text" filename="spacing-summary.txt">
{`Most pages (using plain Container):
- Desktop: body padding-top 4rem + container margin-top 4rem = 8rem top spacing
- Mobile:  body padding-top 1rem + container margin-top 4rem = 5rem top spacing
- Bottom:  container margin-bottom 20rem (desktop), 12rem (mobile)

/projects page (using ProjectsContainer override):
- Desktop: body padding-top 4rem + container margin-top 0 = 4rem top spacing
- Mobile:  body padding-top 1rem + container margin-top 4rem = 5rem top spacing
- Bottom:  container margin-bottom 0`}
      </CodeBlock>

      <Heading level={2}>Why this felt confusing</Heading>

      <List>
        <ListItem>I had spacing at both the global <Code>body</Code> layer and the <Code>Container</Code> layer.</ListItem>
        <ListItem>I then added a page-level override on top of both.</ListItem>
        <ListItem>When I added a mobile <Code>Container</Code> bottom margin globally, I also had to explicitly keep <Code>/projects</Code> at <Code>margin-bottom: 0</Code> on mobile.</ListItem>
      </List>

      <Heading level={2}>Rules I follow now</Heading>

      <Paragraph>
        Going forward, when spacing looks wrong, I check these in order:
      </Paragraph>

      <List>
        <ListItem><Code>GlobalStyles.tsx</Code> body padding</ListItem>
        <ListItem><Code>Primitives.tsx</Code> container margins</ListItem>
        <ListItem>Any local styled override on that route</ListItem>
      </List>

      <Paragraph>
        If I keep this hierarchy clear, I can predict layout without trial-and-error.
      </Paragraph>
    </>
  );
}
