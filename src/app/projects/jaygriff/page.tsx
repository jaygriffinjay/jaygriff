import { Container, Heading, Paragraph, Link, List, ListItem, Divider } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';

export const metadata = {
  title: 'jaygriff.com',
  description: 'The ongoing evolution of this site — content system, stack migrations, and the features they unlock.',
};

export default function JaygriffProjectPage() {
  return (
    <Container size="sm">
      <ContentWrapper>
        <Heading level={1}>jaygriff.com</Heading>

        <Paragraph>
          This site is itself a project — one that's been running longer than anything else I've built and has gone through more architectural changes than I'd care to admit. It started as a collection of patterns I kept rebuilding from scratch, and has evolved into something I actually care about as a software artifact.
        </Paragraph>
        <Paragraph>
          What follows is the honest version of that evolution — the decisions, the dead ends, and where it's headed.
        </Paragraph>

        <Divider />

        <Heading level={2}>The Stack Evolution</Heading>
        <Paragraph>
          The progression went: Flask/Django → Express → Hugo/Jekyll/Eleventy (SSG phase) → Vite + React → Next.js. Each step taught me something. The SSG phase taught me the limits of static. Vite taught me what good developer experience actually felt like. Next.js brought the backend back without the split — server components, API routes, file-based routing, full-stack TypeScript in one repo.
        </Paragraph>
        <Paragraph>
          The full-stack Next.js template that powers this site also became its own project: <Link href="/projects/bootstrap-fullstack-webapp">Bootstrap Full-Stack Webapp</Link>.
        </Paragraph>

        <Heading level={3}>Styling: Emotion → Tailwind + shadcn</Heading>
        <Paragraph>
          The site launched with Emotion for CSS-in-JS. It worked fine. But the migration to Tailwind + shadcn wasn't about Emotion being bad — it was about AI. Tailwind and shadcn have massive training corpus coverage. AI models generate better component code with them. The styling system is now the foundation for an AI app builder workflow built on top of the bootstrap template.
        </Paragraph>
        <Paragraph>
          <Link href="/posts/styling-migration">Read: Tailwind Wins →</Link>
        </Paragraph>

        <Heading level={3}>Content: Frontmatter → SQLite</Heading>
        <Paragraph>
          The content system started with frontmatter — YAML metadata at the top of every file. It worked until it didn't. No validation, no referential integrity, slug typos that silently fail, and painful querying. Adding a <code>relatedPosts</code> field across 70+ files in one session was the breaking point.
        </Paragraph>
        <Paragraph>
          The migration is to SQLite. File-based, git-friendly, no infrastructure overhead. The schema separates articles, tags, and code snippets into proper relational tables. Files stay as files; the metadata and relationships move into the database.
        </Paragraph>
        <Paragraph>
          <Link href="/posts/frontmatter-is-a-dead-end">Read: Frontmatter Is a Dead End →</Link>
          {' · '}
          <Link href="/posts/migrating-to-sqlite">Read: Why I'm Moving to SQLite →</Link>
        </Paragraph>

        <Divider />

        <Heading level={2}>What the Block Data Model Unlocks</Heading>
        <Paragraph>
          The next layer after SQLite is a block data model — treating content as structured blocks rather than flat markdown files. This is what makes the following features tractable:
        </Paragraph>
        <List>
          <ListItem><strong>Comment system</strong> — per-block or per-article comments stored in SQLite alongside content</ListItem>
          <ListItem><strong>WYSIWYG editor</strong> — in-browser editing that writes back to the block store</ListItem>
          <ListItem><strong>Rich querying</strong> — surface related content, tag clusters, cross-references without frontmatter hacks</ListItem>
          <ListItem><strong>Search</strong> — full-text search across all content with SQLite FTS</ListItem>
          <ListItem><strong>Structured content types</strong> — posts, docs, commits, specs all in one unified table with proper type discrimination</ListItem>
        </List>
        <Paragraph>
          This is currently in active development in the block data model branch. The content system as it exists today is the last version of the frontmatter era.
        </Paragraph>

        <Divider />

        <Heading level={2}>Current Stack</Heading>
        <List>
          <ListItem><strong>Next.js App Router + TypeScript</strong> — full-stack framework</ListItem>
          <ListItem><strong>Tailwind v4 + shadcn/ui</strong> — styling and component layer (migrating from Emotion)</ListItem>
          <ListItem><strong>TSX + Markdown content system</strong> — file-based content discovery via <code>getAllPosts()</code></ListItem>
          <ListItem><strong>SQLite + better-sqlite3</strong> — target data layer (migration in progress)</ListItem>
          <ListItem><strong>Vercel</strong> — hosting and deployment</ListItem>
          <ListItem><strong>Cloudflare</strong> — DNS and CDN</ListItem>
        </List>
      </ContentWrapper>
    </Container>
  );
}
