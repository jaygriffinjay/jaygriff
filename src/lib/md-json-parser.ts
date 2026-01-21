import type { PostMeta } from '@/types/post';

interface ParsedMarkdown {
  metadata: PostMeta;
  content: string;
}

export function parseMarkdownWithJsonFrontmatter(fileContent: string): ParsedMarkdown {
  // Match ---json\n{...}\n---\n pattern
  const frontmatterRegex = /^---json\n([\s\S]+?)\n---\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    throw new Error('No JSON frontmatter found in markdown file');
  }

  const [, jsonString, markdown] = match;
  
  try {
    const metadata = JSON.parse(jsonString) as PostMeta;
    return {
      metadata,
      content: markdown,
    };
  } catch (error) {
    throw new Error(`Failed to parse JSON frontmatter: ${error}`);
  }
}
