// Server-side utility to discover all posts and their metadata
import fs from 'fs';
import path from 'path';
import type { PostMeta, Post } from '@/types/post';
import { parseMarkdownWithJsonFrontmatter } from './md-json-parser';

export async function getAllPosts(): Promise<Post[]> {
  const tsxDirectory = path.join(process.cwd(), 'content/tsx');
  const mdDirectory = path.join(process.cwd(), 'content/md');
  
  // Get TSX posts
  const tsxFilenames = fs.readdirSync(tsxDirectory);
  const tsxPosts = await Promise.all(
    tsxFilenames
      .filter((filename) => filename.endsWith('.tsx'))
      .map(async (filename) => {
        const module = await import(`@content/tsx/${filename.replace('.tsx', '')}`);
        return {
          filename: filename.replace('.tsx', ''),
          metadata: module.metadata as PostMeta,
        };
      })
  );
  
  // Get MD posts
  const mdFilenames = fs.readdirSync(mdDirectory);
  const mdPosts = mdFilenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(mdDirectory, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      try {
        const { metadata } = parseMarkdownWithJsonFrontmatter(fileContent);
        return {
          filename: filename.replace('.md', ''),
          metadata,
        };
      } catch (error) {
        // Skip MD files without valid JSON frontmatter
        console.warn(`Skipping ${filename}: missing or invalid JSON frontmatter`);
        return null;
      }
    })
    .filter((post): post is { filename: string; metadata: PostMeta } => post !== null);
  
  // Combine and dedupe (TSX takes priority)
  const tsxSlugs = new Set(tsxPosts.map(p => p.metadata.slug));
  const uniqueMdPosts = mdPosts.filter(p => !tsxSlugs.has(p.metadata.slug));
  const allPosts = [...tsxPosts, ...uniqueMdPosts];
  
  // Filter to only return actual posts (not docs)
  return allPosts.filter((p) => !p.metadata.type || p.metadata.type === 'post');
}

export async function getAllDocs(): Promise<Post[]> {
  const tsxDirectory = path.join(process.cwd(), 'content/tsx');
  const mdDirectory = path.join(process.cwd(), 'content/md');
  
  // Get TSX docs
  const tsxFilenames = fs.readdirSync(tsxDirectory);
  const tsxDocs = await Promise.all(
    tsxFilenames
      .filter((filename) => filename.endsWith('.tsx'))
      .map(async (filename) => {
        const module = await import(`@content/tsx/${filename.replace('.tsx', '')}`);
        return {
          filename: filename.replace('.tsx', ''),
          metadata: module.metadata as PostMeta,
        };
      })
  );
  
  // Get MD docs
  const mdFilenames = fs.readdirSync(mdDirectory);
  const mdDocs = mdFilenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(mdDirectory, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      try {
        const { metadata } = parseMarkdownWithJsonFrontmatter(fileContent);
        return {
          filename: filename.replace('.md', ''),
          metadata,
        };
      } catch (error) {
        // Skip MD files without valid JSON frontmatter
        console.warn(`Skipping ${filename}: missing or invalid JSON frontmatter`);
        return null;
      }
    })
    .filter((doc): doc is { filename: string; metadata: PostMeta } => doc !== null);
  
  // Combine and dedupe (TSX takes priority)
  const tsxSlugs = new Set(tsxDocs.map(d => d.metadata.slug));
  const uniqueMdDocs = mdDocs.filter(d => !tsxSlugs.has(d.metadata.slug));
  const allDocs = [...tsxDocs, ...uniqueMdDocs];
  
  // Filter to only return docs (including doc:commit, doc:* variants)
  return allDocs.filter((d) => d.metadata.type?.startsWith('doc'));
}

export async function getPostBySlug(slug: string): Promise<string | null> {
  const posts = await getAllPosts();
  const post = posts.find((p) => p.metadata.slug === slug);
  return post ? post.filename : null;
}

export async function getDocBySlug(slug: string): Promise<string | null> {
  const docs = await getAllDocs();
  const doc = docs.find((d) => d.metadata.slug === slug);
  return doc ? doc.filename : null;
}
