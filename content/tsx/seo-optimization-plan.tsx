import { Heading, Paragraph, List, ListItem, Link } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: 'Site-Wide SEO Optimization Implementation Plan',
  slug: 'seo-optimization-plan',
  date: '2026-02-09T00:00:00Z',
  author: ['Jay Griffin', 'Claude Sonnet 4.5'],
  type: 'doc',
  description: 'Comprehensive plan for implementing Next.js metadata API across the site for better SEO, including OpenGraph and Twitter Card support.',
  tags: ['seo', 'nextjs', 'optimization', 'roadmap', 'metadata'],
  path: '/docs/seo-optimization-plan',
};

export default function SEOOptimizationPlan() {
  return (
    <>
      <Heading level={1}>Site-Wide SEO Optimization Implementation Plan</Heading>

      <Paragraph>
        This document outlines the plan for implementing comprehensive SEO metadata across the site using Next.js's Metadata API. Currently, we have basic metadata but we're missing key fields that affect search rankings and social media sharing.
      </Paragraph>

      <Heading level={2}>Current State</Heading>

      <Paragraph>
        Right now we have two separate metadata systems:
      </Paragraph>

      <List>
        <ListItem><strong>Next.js metadata</strong> - Exists in layout.tsx with basic title and description, but most pages don't override it</ListItem>
        <ListItem><strong>Custom PostMeta</strong> - Our own metadata system for content organization (routeMetadata export)</ListItem>
      </List>

      <Paragraph>
        The problem: Next.js doesn't read our PostMeta for SEO. We need to export both so our content system works AND search engines get proper metadata.
      </Paragraph>

      <Heading level={2}>What We're Missing</Heading>

      <List>
        <ListItem><strong>OpenGraph metadata</strong> - For rich previews on Facebook, LinkedIn, Discord, Slack</ListItem>
        <ListItem><strong>Twitter Card metadata</strong> - For Twitter/X link previews</ListItem>
        <ListItem><strong>Page-specific metadata</strong> - Most pages use the generic site-level metadata instead of their own</ListItem>
        <ListItem><strong>Canonical URLs</strong> - To avoid duplicate content issues</ListItem>
      </List>

      <Heading level={2}>Implementation Plan</Heading>

      <Heading level={3}>Phase 1: High-Priority Pages</Heading>

      <Paragraph>
        Start with pages that are most likely to be shared or searched:
      </Paragraph>

      <List>
        <ListItem><strong>/about-me</strong> - Already updated with description, needs OpenGraph + Twitter metadata</ListItem>
        <ListItem><strong>/ (home page)</strong> - Needs dedicated metadata export</ListItem>
        <ListItem><strong>/my-stack</strong> - Good SEO target for "react developer" searches</ListItem>
      </List>

      <Heading level={3}>Phase 2: Content Pages</Heading>

      <Paragraph>
        All blog posts and docs should have rich metadata for sharing:
      </Paragraph>

      <List>
        <ListItem>Add Next.js metadata export to all TSX content files</ListItem>
        <ListItem>Keep PostMeta for our content system</ListItem>
        <ListItem>Derive Next.js metadata from PostMeta to avoid duplication</ListItem>
      </List>

      <Heading level={3}>Phase 3: Automation</Heading>

      <Paragraph>
        Make metadata generation automatic:
      </Paragraph>

      <List>
        <ListItem>Update content creation script to generate both PostMeta and Next.js metadata</ListItem>
        <ListItem>Create a helper function to convert PostMeta → Metadata</ListItem>
        <ListItem>Add linting/validation to ensure all pages have proper metadata</ListItem>
      </List>

      <Heading level={2}>Metadata Structure Template</Heading>

      <Paragraph>
        Here's what each page should export:
      </Paragraph>

      <CodeBlock language="typescript">
{`import type { Metadata } from 'next'
import type { PostMeta } from '@/types/post'

// Your custom metadata (for content system)
export const routeMetadata: PostMeta = {
  title: 'Page Title - Jay Griffin',
  slug: 'page-slug',
  date: '2026-02-09T00:00:00Z',
  author: ['Jay Griffin'],
  description: 'Clear description of what this page is about',
  tags: ['relevant', 'tags'],
  path: '/page-slug',
}

// Next.js metadata (for actual SEO)
export const metadata: Metadata = {
  title: routeMetadata.title,
  description: routeMetadata.description,

  openGraph: {
    title: routeMetadata.title,
    description: routeMetadata.description,
    url: \`https://jaygriff.com\${routeMetadata.path}\`,
    siteName: 'Jay Griffin',
    type: 'article',
    images: [
      {
        url: 'https://jaygriff.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: routeMetadata.title,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: routeMetadata.title,
    description: routeMetadata.description,
    images: ['https://jaygriff.com/twitter-image.jpg'],
  },
}`}
      </CodeBlock>

      <Heading level={2}>OpenGraph Image Generation</Heading>

      <Paragraph>
        We need to create or generate Open Graph images (1200x630px) for social sharing. Options:
      </Paragraph>

      <List>
        <ListItem><strong>Dynamic generation</strong> - Use Next.js ImageResponse API to generate OG images at build time</ListItem>
        <ListItem><strong>Static images</strong> - Create a template in Figma and generate manually</ListItem>
        <ListItem><strong>Hybrid</strong> - Default generic image, custom images for key pages</ListItem>
      </List>

      <Heading level={2}>SEO Metadata Fields Reference</Heading>

      <Heading level={3}>Basic Metadata</Heading>

      <CodeBlock language="typescript">
{`{
  title: 'Page Title',              // Browser tab, search results
  description: 'Meta description',   // Search result snippet
  keywords: ['array', 'of', 'terms'], // Mostly ignored by modern search engines
  authors: [{ name: 'Jay Griffin' }],
  robots: 'index, follow',           // Crawling instructions
  alternates: {
    canonical: 'https://jaygriff.com/path', // Preferred URL
  }
}`}
      </CodeBlock>

      <Heading level={3}>OpenGraph Metadata</Heading>

      <CodeBlock language="typescript" showHeader={true}>
{`openGraph: {
  title: 'Page Title',
  description: 'Description for social media',
  url: 'https://jaygriff.com/path',
  siteName: 'Jay Griffin',
  locale: 'en_US',
  type: 'website',
  images: [
    {
      url: 'https://jaygriff.com/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Image description',
    },
  ],
}`}
      </CodeBlock>

      <Heading level={3}>Twitter Card Metadata</Heading>

      <CodeBlock language="typescript" showHeader={true}>
{`twitter: {
  card: 'summary_large_image',
  title: 'Page Title',
  description: 'Description for Twitter',
  creator: '@yourhandle',
  images: ['https://jaygriff.com/twitter-image.jpg'],
}`}
      </CodeBlock>

      <Heading level={2}>Testing & Validation</Heading>

      <Paragraph>
        After implementing, test with these tools:
      </Paragraph>

      <List>
        <ListItem><Link href="https://www.opengraph.xyz/">OpenGraph Preview Tool</Link> - See how links look on social media</ListItem>
        <ListItem><Link href="https://cards-dev.twitter.com/validator">Twitter Card Validator</Link> - Test Twitter previews</ListItem>
        <ListItem><Link href="https://search.google.com/test/rich-results">Google Rich Results Test</Link> - Validate structured data</ListItem>
        <ListItem><strong>View source</strong> - Manually check meta tags are present in HTML</ListItem>
      </List>

      <Heading level={2}>Success Metrics</Heading>

      <List>
        <ListItem>Every page has unique title and description</ListItem>
        <ListItem>Links shared on social media show rich previews with image</ListItem>
        <ListItem>Search results show accurate, compelling descriptions</ListItem>
        <ListItem>No duplicate content issues (canonical URLs set)</ListItem>
        <ListItem>"Jay Griffin developer" searches reliably surface the site</ListItem>
      </List>

      <Heading level={2}>Resources</Heading>

      <List>
        <ListItem><Link href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata">Next.js Metadata API Documentation</Link></ListItem>
        <ListItem><Link href="https://ogp.me/">Open Graph Protocol</Link></ListItem>
        <ListItem><Link href="https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards">Twitter Card Documentation</Link></ListItem>
      </List>

      <Heading level={2}>Implementation Checklist</Heading>

      <List>
        <ListItem>Update about-me page with full metadata (OpenGraph + Twitter)</ListItem>
        <ListItem>Update home page with dedicated metadata</ListItem>
        <ListItem>Update my-stack page with SEO-optimized metadata</ListItem>
        <ListItem>Create/generate OpenGraph images (1200x630)</ListItem>
        <ListItem>Add metadata helper function (PostMeta → Metadata)</ListItem>
        <ListItem>Update content creation script to include Next.js metadata</ListItem>
        <ListItem>Audit all existing pages and add metadata where missing</ListItem>
        <ListItem>Test with social media preview tools</ListItem>
        <ListItem>Add canonical URLs to prevent duplicate content</ListItem>
        <ListItem>Monitor search console for improvements</ListItem>
      </List>

      <Heading level={2}>Notes</Heading>

      <Paragraph>
        This is a one-time implementation effort with long-term benefits. Once the infrastructure is in place, new content automatically gets proper metadata through the content creation system. The focus should be on making it automatic so we never think about it again.
      </Paragraph>
    </>
  );
}
