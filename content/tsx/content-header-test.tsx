import { ContentHeader } from '@/components/ContentHeader';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: 'ContentHeader Component Test Cases',
  slug: 'content-header-test',
  date: '2026-02-02T10:00:00Z',
  description: 'Edge case testing for the ContentHeader component with various metadata configurations.',
  tags: ['dev', 'testing', 'components'],
  type: 'post',
  author: ['Jay Griffin', 'Claude Sonnet 4.5'],
  authorshipNote: 'This is an extremely long authorship note to test tooltip overflow behavior and the auto-flip positioning logic. The content was collaboratively created through an iterative development process involving extensive AI-assisted code generation, edge case identification, and component refinement. This note intentionally contains multiple sentences to test how the tooltip handles very tall content that might overflow the viewport boundaries.',
  updated: [
    '2026-02-03T10:00:00Z',
    '2026-02-02T15:00:00Z',
    '2026-02-02T12:00:00Z',
    '2026-02-01T18:00:00Z',
    '2026-01-31T14:00:00Z',
    '2026-01-30T10:00:00Z',
    '2026-01-29T16:00:00Z',
    '2026-01-28T11:00:00Z',
    '2026-01-27T09:00:00Z',
    '2026-01-26T13:00:00Z',
  ],
};

const testCases: PostMeta[] = [
  {
    title: 'Minimal Post',
    slug: 'minimal',
    date: '2026-01-15T10:00:00Z',
    description: 'Testing with minimal metadata.',
    type: 'post',
  },
  {
    title: 'Full Featured Post',
    slug: 'full-featured',
    date: '2026-01-15T10:00:00Z',
    description: 'This post has all the metadata fields populated to test how everything looks together.',
    tags: ['design', 'development', 'testing'],
    author: ['Jay Griffin'],
    authorshipNote: 'Written collaboratively with AI assistance',
    updated: '2026-02-02T10:00:00Z',
    type: 'post',
  },
  {
    title: 'Multiple Authors with Long Names',
    slug: 'multiple-authors',
    date: '2026-01-20T10:00:00Z',
    description: 'Testing how the layout handles multiple authors with longer names.',
    author: ['Jay Griffin', 'Claude Sonnet 4.5', 'Another Really Long Author Name'],
    authorshipNote: 'This is a collaborative effort between human and AI, demonstrating the authorship note tooltip functionality.',
    type: 'post',
  },
  {
    title: 'Commit Type with Hash',
    slug: 'commit-test',
    date: '2026-01-25T10:00:00Z',
    description: 'Testing the commit badge display and GitHub link.',
    type: 'doc:commit',
    commitHash: 'a44f4bf7c2e1d3f9e8b6a5c4d3e2f1a0b9c8d7e6',
    tags: ['ui', 'components'],
  },
  {
    title: 'Only Updated Date (No Authorship Note)',
    slug: 'only-updated',
    date: '2026-01-10T10:00:00Z',
    description: 'Testing updated date tooltip without authorship note.',
    author: 'Jay Griffin',
    updated: '2026-02-01T10:00:00Z',
    type: 'post',
  },
  {
    title: 'Only Authorship Note (No Updated Date)',
    slug: 'only-authorship',
    date: '2026-01-10T10:00:00Z',
    description: 'Testing authorship note tooltip without updated date.',
    author: ['Jay Griffin', 'Claude'],
    authorshipNote: 'AI-assisted content creation',
    type: 'post',
  },
  {
    title: 'Very Long Description to Test Wrapping',
    slug: 'long-description',
    date: '2026-01-15T10:00:00Z',
    description: 'This is an exceptionally long description that goes on and on to test how the layout handles text wrapping and spacing when there is a lot of descriptive content. It should wrap nicely across multiple lines without breaking the visual hierarchy or causing layout issues. This is important for accessibility and readability on different screen sizes.',
    tags: ['testing', 'layout', 'typography', 'responsive', 'accessibility', 'ux', 'design-system'],
    author: 'Jay Griffin',
    type: 'post',
  },
  {
    title: 'Doc Type with Feature and Project',
    slug: 'doc-with-metadata',
    date: '2026-01-18T10:00:00Z',
    description: 'Testing doc-specific metadata fields.',
    type: 'doc',
    projectId: 'website-v3',
    feature: 'content-system',
    tags: ['documentation'],
  },
  {
    title: 'Empty Tags Array',
    slug: 'empty-tags',
    date: '2026-01-15T10:00:00Z',
    description: 'Testing with empty tags array.',
    tags: [],
    author: 'Jay Griffin',
    type: 'post',
  },
  {
    title: 'Both Tooltips Active',
    slug: 'both-tooltips',
    date: '2025-12-01T10:00:00Z',
    author: ['Jay Griffin', 'Claude Sonnet 4.5'],
    authorshipNote: 'Collaborative writing',
    updated: '2026-02-02T10:00:00Z',
    description: 'Testing both authorship and updated date tooltips at the same time.',
    tags: ['tooltips', 'ui'],
    type: 'post',
  },
  {
    title: 'Multiple Update Dates',
    slug: 'multiple-updates',
    date: '2025-11-01T10:00:00Z',
    author: 'Jay Griffin',
    updated: [
      '2026-02-02T10:00:00Z',
      '2026-01-15T10:00:00Z',
      '2025-12-20T10:00:00Z',
      '2025-12-01T10:00:00Z',
    ],
    description: 'Testing multiple update dates displayed in tooltip.',
    tags: ['updates', 'history'],
    type: 'post',
  },
  {
    title: 'Many Updates (10 dates)',
    slug: 'many-updates',
    date: '2025-01-01T10:00:00Z',
    author: 'Jay Griffin',
    updated: [
      '2026-02-02T10:00:00Z',
      '2026-01-28T10:00:00Z',
      '2026-01-20T10:00:00Z',
      '2026-01-15T10:00:00Z',
      '2025-12-20T10:00:00Z',
      '2025-12-01T10:00:00Z',
      '2025-11-15T10:00:00Z',
      '2025-10-01T10:00:00Z',
      '2025-09-15T10:00:00Z',
      '2025-08-01T10:00:00Z',
    ],
    description: 'Testing tooltip with many update dates to see how it handles scrolling/overflow.',
    tags: ['updates', 'edge-cases'],
    type: 'post',
  },
];

export default function ContentHeaderTest() {
  return (
    <div>
      {testCases.map((testMetadata, index) => (
        <div 
          key={testMetadata.slug}
          style={{
            marginBottom: '4rem',
            padding: '2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
          }}
        >
          <div style={{ 
            fontSize: '0.75rem', 
            color: 'rgba(255, 255, 255, 0.4)',
            marginBottom: '1rem',
            fontFamily: 'monospace',
          }}>
            Test Case #{index + 1}: {testMetadata.slug}
          </div>
          <ContentHeader metadata={testMetadata} />
        </div>
      ))}
    </div>
  );
}
