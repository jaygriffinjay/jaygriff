import { getAllPosts, getAllDocs } from '@/lib/posts';
import { Table, Thead, Tbody, Tr, Th, Td, Heading, Paragraph, Container } from '@/components/Primitives';
import type { PostMeta } from '@/types/post';

export const routeMetadata: PostMeta = {
  title: 'Metadata Scanner',
  slug: 'metadata-scanner',
  date: '2026-01-26T00:00:00Z',
  description: 'View all content metadata in a comprehensive table showing every field from PostMeta interface.',
  type: 'doc',
  tags: ['tools', 'metadata', 'admin'],
  author: 'Claude Sonnet 4.5',
  authorshipNote: '🤖 AI-Generated (100%)',
};

export default async function MetadataScannerPage() {
  const [posts, docs] = await Promise.all([getAllPosts(), getAllDocs()]);
  const allContent = [...docs, ...posts].sort((a, b) => 
    new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );

  const formatArray = (arr?: string | string[]) => {
    if (!arr) return '-';
    return Array.isArray(arr) ? arr.join(', ') : arr;
  };

  return (
    <Container size="full">
      <Heading level={1}>Metadata Scanner</Heading>
      <Paragraph>
        Showing all {allContent.length} content files ({docs.length} docs, {posts.length} posts)
      </Paragraph>

      <Table>
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Slug</Th>
            <Th>Type</Th>
            <Th>Author</Th>
            <Th>Authorship Note</Th>
            <Th>Description</Th>
            <Th>Project ID</Th>
            <Th>Feature</Th>
            <Th>Tags</Th>
            <Th>Date</Th>
            <Th>Updated</Th>
            <Th>Draft</Th>
            <Th>Image</Th>
            <Th>Source URL</Th>
            <Th>Commit Hash</Th>
            <Th>Related Posts</Th>
          </Tr>
        </Thead>
        <Tbody>
          {allContent.map((item) => {
            const m = item.metadata;
            return (
              <Tr key={m.slug}>
                <Td>{m.title}</Td>
                <Td>{m.slug}</Td>
                <Td>{m.type || 'post'}</Td>
                <Td>{formatArray(m.author)}</Td>
                <Td>{m.authorshipNote || '-'}</Td>
                <Td>{m.description}</Td>
                <Td>{m.projectId || '-'}</Td>
                <Td>{m.feature || '-'}</Td>
                <Td>{formatArray(m.tags)}</Td>
                <Td>{new Date(m.date).toLocaleDateString()}</Td>
                <Td>{m.updated ? new Date(m.updated).toLocaleDateString() : '-'}</Td>
                <Td>{m.draft ? 'Yes' : '-'}</Td>
                <Td>{m.image || '-'}</Td>
                <Td>{m.sourceUrl || '-'}</Td>
                <Td>{m.commitHash || '-'}</Td>
                <Td>{formatArray(m.relatedPosts)}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Container>
  );
}
