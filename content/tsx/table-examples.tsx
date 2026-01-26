import { Heading, Paragraph, Table, Thead, Tbody, Tr, Th, Td, Code } from '@/components/Primitives';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: 'Table Component Examples',
  slug: 'table-examples',
  date: '2026-01-26T12:00:00Z',
  author: 'Jay Griffin',
  authorshipNote: '🤖 AI-Generated (100%)',
  type: 'doc',
  description: 'Testing the new primitive table components with various data examples.',
  tags: ['components', 'primitives', 'tables', 'examples'],
};

export default function TableExamples() {
  return (
    <>
      <Heading level={2}>Basic Table Example</Heading>
      <Paragraph>
        A simple table showing content metadata fields and their types.
      </Paragraph>
      
      <Table>
        <Thead>
          <Tr>
            <Th>Field</Th>
            <Th>Type</Th>
            <Th>Required</Th>
            <Th>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td><Code>title</Code></Td>
            <Td>string</Td>
            <Td>Yes</Td>
            <Td>Display title for the content</Td>
          </Tr>
          <Tr>
            <Td><Code>slug</Code></Td>
            <Td>string</Td>
            <Td>Yes</Td>
            <Td>URL-friendly identifier</Td>
          </Tr>
          <Tr>
            <Td><Code>date</Code></Td>
            <Td>string</Td>
            <Td>Yes</Td>
            <Td>ISO 8601 formatted date</Td>
          </Tr>
          <Tr>
            <Td><Code>tags</Code></Td>
            <Td>string[]</Td>
            <Td>No</Td>
            <Td>Array of topic tags</Td>
          </Tr>
          <Tr>
            <Td><Code>author</Code></Td>
            <Td>string | string[]</Td>
            <Td>No</Td>
            <Td>Single or multiple authors</Td>
          </Tr>
        </Tbody>
      </Table>

      <Heading level={2}>Feature Comparison Table</Heading>
      <Paragraph>
        Comparing different content authorship categories.
      </Paragraph>
      
      <Table>
        <Thead>
          <Tr>
            <Th>Category</Th>
            <Th>Badge</Th>
            <Th>Author</Th>
            <Th>AI Involvement</Th>
            <Th>Accuracy</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>AI-Generated</Td>
            <Td>🤖 (100%)</Td>
            <Td>Model name</Td>
            <Td>Full creation</Td>
            <Td>May contain errors</Td>
          </Tr>
          <Tr>
            <Td>AI-Assisted</Td>
            <Td>🔧 (Hybrid)</Td>
            <Td>Jay Griffin</Td>
            <Td>Partial editing</Td>
            <Td>Better, not guaranteed</Td>
          </Tr>
          <Tr>
            <Td>Human-Written</Td>
            <Td>✍️ (100%)</Td>
            <Td>Jay Griffin</Td>
            <Td>None</Td>
            <Td>No guarantee</Td>
          </Tr>
        </Tbody>
      </Table>

      <Heading level={2}>Project Status Table</Heading>
      <Paragraph>
        Sample project roadmap with status indicators.
      </Paragraph>
      
      <Table>
        <Thead>
          <Tr>
            <Th>Feature</Th>
            <Th>Status</Th>
            <Th>Priority</Th>
            <Th>Notes</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Table Components</Td>
            <Td>✅ Complete</Td>
            <Td>High</Td>
            <Td>Added as primitive #10</Td>
          </Tr>
          <Tr>
            <Td>Content Audit Page</Td>
            <Td>🚧 In Progress</Td>
            <Td>High</Td>
            <Td>Displays all metadata</Td>
          </Tr>
          <Tr>
            <Td>Search Hotkeys</Td>
            <Td>📋 Planned</Td>
            <Td>Medium</Td>
            <Td>Cmd+K to open</Td>
          </Tr>
          <Tr>
            <Td>RSS Feed</Td>
            <Td>💭 Idea</Td>
            <Td>Low</Td>
            <Td>Auto-generated from metadata</Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
}
