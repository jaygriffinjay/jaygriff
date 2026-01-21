// Server-side utility to load individual content by slug
import { getAllPosts, getAllDocs } from './posts';
import type { PostMeta } from '@/types/post';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { parseMarkdownWithJsonFrontmatter } from './md-json-parser';

export type ContentType = 'post' | 'doc';

export interface LoadedContent {
  type: 'tsx' | 'markdown';
  Component?: React.ComponentType;
  markdownContent?: string;
  metadata: PostMeta;
  filename: string;
}

export async function loadContentBySlug(
  slug: string,
  type: ContentType
): Promise<LoadedContent | null> {
  // Get all content of the requested type
  const allContent = type === 'post' ? await getAllPosts() : await getAllDocs();
  
  // Find content with matching slug
  const match = allContent.find(item => item.metadata.slug === slug);
  
  if (!match) {
    return null;
  }
  
  // Check if TSX version exists
  const tsxPath = join(process.cwd(), 'content/tsx', `${match.filename}.tsx`);
  if (existsSync(tsxPath)) {
    const module = await import(`@content/tsx/${match.filename}`);
    return {
      type: 'tsx',
      Component: module.default,
      metadata: module.metadata,
      filename: `${match.filename}.tsx`,
    };
  }
  
  // Otherwise it's markdown
  const mdPath = join(process.cwd(), 'content/md', `${match.filename}.md`);
  if (existsSync(mdPath)) {
    const fileContent = readFileSync(mdPath, 'utf-8');
    const { metadata, content } = parseMarkdownWithJsonFrontmatter(fileContent);
    
    return {
      type: 'markdown',
      markdownContent: content,
      metadata,
      filename: `${match.filename}.md`,
    };
  }
  
  return null;
}

// Static generation helpers for build-time pre-rendering
export async function getAllPostSlugs() {
  const posts = await getAllPosts();
  return posts.map(post => ({ slug: post.metadata.slug }));
}

export async function getAllDocSlugs() {
  const docs = await getAllDocs();
  return docs.map(doc => ({ slug: doc.metadata.slug }));
}
