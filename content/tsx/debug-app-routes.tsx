import { Heading, Paragraph } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';
import type { PostMeta } from '@/types/post';
import { getAllAppRoutes } from '@/lib/posts';

export const metadata: PostMeta = {
  title: 'Debug: App Routes Discovery',
  slug: 'debug-app-routes',
  date: '2026-01-26T14:00:00Z',
  description: 'Testing the getAllAppRoutes() function to see what routes are discovered.',
  type: 'doc',
  tags: ['debug', 'testing'],
  author: 'Claude Sonnet 4.5',
  authorshipNote: '🤖 AI-Generated (100%)',
};

export default async function DebugAppRoutes() {
  let routes;
  let error;

  try {
    routes = await getAllAppRoutes();
  } catch (e) {
    error = e;
  }

  return (
    <>
      <Heading level={2}>App Routes Discovery Test</Heading>
      
      {error && (
        <>
          <Heading level={3}>Error</Heading>
          <Paragraph>Failed to get app routes:</Paragraph>
          <CodeBlock language="text">{String(error)}</CodeBlock>
        </>
      )}

      {routes && (
        <>
          <Heading level={3}>Found {routes.length} routes</Heading>
          <CodeBlock language="json">
            {JSON.stringify(routes, null, 2)}
          </CodeBlock>
        </>
      )}
    </>
  );
}
