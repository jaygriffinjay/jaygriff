import { Heading, Paragraph, List, ListItem, Code } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: 'App Routes Path Strategy',
  slug: 'app-routes-path-strategy',
  date: '2026-01-26T15:00:00Z',
  description: 'Analysis and decision on how to handle path metadata for app routes: derive from file structure vs explicit metadata.',
  type: 'doc',
  tags: ['architecture', 'routing', 'metadata', 'design-decision'],
  author: 'Claude Sonnet 4.5',
  authorshipNote: '🤖 AI-Generated (100%)',
};

export default function AppRoutesPathStrategy() {
  return (
    <>
      <Heading level={2}>The Problem</Heading>
      <Paragraph>
        App routes live in <Code>src/app/</Code> with file-based routing. We want to list them alongside content 
        in navigation, search, and the homepage. The question: should we store the URL path in metadata, or derive it?
      </Paragraph>

      <Heading level={2}>Options Considered</Heading>

      <Heading level={3}>Option 1: Always Derive Path</Heading>
      <Paragraph>
        Calculate path from file structure in <Code>getAllAppRoutes()</Code>:
      </Paragraph>
      <CodeBlock language="typescript">{`// app/metadata-scanner/page.tsx → /metadata-scanner
// app/dev/test-parser/page.tsx → /dev/test-parser`}</CodeBlock>
      <Paragraph><strong>Pros:</strong></Paragraph>
      <List>
        <ListItem>No redundancy - file structure is source of truth</ListItem>
        <ListItem>Can't get out of sync</ListItem>
        <ListItem>Less metadata to maintain</ListItem>
      </List>
      <Paragraph><strong>Cons:</strong></Paragraph>
      <List>
        <ListItem>No flexibility - path locked to file location</ListItem>
        <ListItem>Can't reorganize URLs without moving files</ListItem>
      </List>

      <Heading level={3}>Option 2: Always Specify Path in Metadata</Heading>
      <Paragraph>
        Require <Code>path</Code> in every <Code>routeMetadata</Code> export:
      </Paragraph>
      <CodeBlock language="typescript">{`export const routeMetadata = {
  title: 'Metadata Scanner',
  slug: 'metadata-scanner',
  path: '/metadata-scanner',  // Required
  // ...
};`}</CodeBlock>
      <Paragraph><strong>Pros:</strong></Paragraph>
      <List>
        <ListItem>Explicit - always know the URL</ListItem>
        <ListItem>Full flexibility to route anywhere</ListItem>
      </List>
      <Paragraph><strong>Cons:</strong></Paragraph>
      <List>
        <ListItem>Redundant - duplicates Next.js routing info</ListItem>
        <ListItem>Can drift from actual route (file says /dev, metadata says /tools)</ListItem>
        <ListItem>More to maintain for every route</ListItem>
      </List>

      <Heading level={3}>Option 3: Optional Path Override (Recommended)</Heading>
      <Paragraph>
        Derive path by default, allow metadata to override:
      </Paragraph>
      <CodeBlock language="typescript">{`// Default: path derived from file location
export const routeMetadata = {
  title: 'Metadata Scanner',
  slug: 'metadata-scanner',
  // No path needed - will be /metadata-scanner
};

// Override when needed
export const routeMetadata = {
  title: 'Parser Test',
  slug: 'test-parser',
  path: '/dev/parser',  // Override: file is at app/dev/test-parser but want /dev/parser
};`}</CodeBlock>
      <Paragraph><strong>Pros:</strong></Paragraph>
      <List>
        <ListItem>Best of both worlds - minimal by default, flexible when needed</ListItem>
        <ListItem>No redundancy in common case (95%+ of routes)</ListItem>
        <ListItem>Escape hatch for edge cases (URL structure differs from file structure)</ListItem>
      </List>
      <Paragraph><strong>Cons:</strong></Paragraph>
      <List>
        <ListItem>Slightly more complex logic (check metadata first, then derive)</ListItem>
      </List>

      <Heading level={2}>Decision: Option 3</Heading>
      <Paragraph>
        Use optional <Code>path</Code> override. This minimizes redundancy while preserving flexibility 
        for the rare case where URL structure should differ from file structure.
      </Paragraph>

      <Heading level={2}>Implementation</Heading>

      <Heading level={3}>In getAllAppRoutes()</Heading>
      <CodeBlock language="typescript">{`export async function getAllAppRoutes() {
  // ...scan files...
  
  for (const pagePath of pageFiles) {
    const derivedPath = '/' + pagePath.replace('/page.tsx', '').replace('page.tsx', '');
    const module = await import(\`@/app/\${pagePath.replace('.tsx', '')}\`);
    
    if (module.routeMetadata) {
      routes.push({
        filename: pagePath,
        metadata: {
          ...module.routeMetadata,
          // Use metadata path if provided, otherwise use derived path
          path: module.routeMetadata.path || derivedPath,
        },
      });
    }
  }
}`}</CodeBlock>

      <Heading level={3}>In PostMeta Interface</Heading>
      <CodeBlock language="typescript">{`export interface PostMeta {
  // ... other fields ...
  path?: string; // Optional - overrides derived path for app routes
}`}</CodeBlock>

      <Heading level={3}>In Navigation/Routing Logic</Heading>
      <CodeBlock language="typescript">{`// HomePage, Navigator, etc.
const href = item.metadata.path || (
  // Fallback for content files without path
  item.metadata.type === 'doc:commit' 
    ? \`/docs/commits/\${item.metadata.slug}\`
    : item.metadata.type === 'doc'
    ? \`/docs/\${item.metadata.slug}\`
    : \`/posts/\${item.metadata.slug}\`
);`}</CodeBlock>

      <Heading level={2}>Examples</Heading>

      <Heading level={3}>Standard Case (No Override)</Heading>
      <CodeBlock language="typescript">{`// File: app/metadata-scanner/page.tsx
export const routeMetadata = {
  title: 'Metadata Scanner',
  slug: 'metadata-scanner',
  description: '...',
  // NO path specified
};

// Result: path auto-derived as "/metadata-scanner"`}</CodeBlock>

      <Heading level={3}>Override Case</Heading>
      <CodeBlock language="typescript">{`// File: app/experimental/new-feature/page.tsx
export const routeMetadata = {
  title: 'New Feature',
  slug: 'new-feature',
  path: '/features/new',  // Override: want /features/new instead of /experimental/new-feature
};

// Result: path is "/features/new"`}</CodeBlock>

      <Heading level={2}>When to Use Path Override</Heading>
      <List>
        <ListItem><strong>URL restructuring:</strong> Want to change public URLs without moving files</ListItem>
        <ListItem><strong>Vanity URLs:</strong> File is deeply nested but want short URL</ListItem>
        <ListItem><strong>Migration:</strong> Moving to new structure but keeping old URLs</ListItem>
        <ListItem><strong>Organizational mismatch:</strong> File organization differs from user-facing structure</ListItem>
      </List>

      <Heading level={2}>Conclusion</Heading>
      <Paragraph>
        The optional path override strategy balances DRY principles with practical flexibility. 
        Most routes need no <Code>path</Code> metadata. The few that do can override cleanly 
        without polluting every route's metadata.
      </Paragraph>
    </>
  );
}
