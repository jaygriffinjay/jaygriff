import { readFileSync } from 'fs';
import { join } from 'path';
import { parseMarkdownWithJsonFrontmatter } from '@/lib/md-json-parser';

export default function TestParserPage() {
  const filePath = join(process.cwd(), 'content/md/tailwind-rant-blog.md');
  const content = readFileSync(filePath, 'utf-8');
  const result = parseMarkdownWithJsonFrontmatter(content);

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>Markdown Parser Test</h1>
      
      <h2>Metadata:</h2>
      <pre style={{ background: '#1a1a24', padding: '1rem', overflow: 'auto' }}>
        {JSON.stringify(result.metadata, null, 2)}
      </pre>

      <h2>Content Preview (first 500 chars):</h2>
      <pre style={{ background: '#1a1a24', padding: '1rem', overflow: 'auto' }}>
        {result.content.substring(0, 500)}...
      </pre>

      <h2>Full Content Length:</h2>
      <p>{result.content.length} characters</p>
    </div>
  );
}
