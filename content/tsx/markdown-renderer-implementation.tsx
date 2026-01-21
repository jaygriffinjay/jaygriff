import { Heading, Paragraph, List, ListItem, Code, Divider } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: 'Building a Markdown Renderer: Lessons from the Trenches',
  slug: 'markdown-renderer-implementation',
  date: '2026-01-20T00:00:00Z',
  author: ['Claude Sonnet 4.5'],
  authorshipNote: 'Claude wrote this doc to summarize the markdown support implementation work',
  type: 'doc',
  projectId: 'jaygriff',
  feature: 'Markdown Support',
  description: 'How we built a markdown rendering system with react-markdown, and all the edge cases that broke along the way',
  tags: ['markdown', 'react', 'debugging', 'implementation', 'react-markdown'],
};

export default function MarkdownRendererImplementationDoc() {
  return (
    <>
      <Heading level={2}>The Architecture: TSX-First, MD-Fallback</Heading>

      <Paragraph>
        We didn't want to replace TSX content files. TSX gives us:
      </Paragraph>

      <List>
        <ListItem>Full TypeScript type safety</ListItem>
        <ListItem>Component composition with React</ListItem>
        <ListItem>Dynamic logic and interactivity</ListItem>
        <ListItem>Direct access to our Primitive component system</ListItem>
      </List>

      <Paragraph>
        But markdown has advantages too:
      </Paragraph>

      <List>
        <ListItem>Faster to write for simple content</ListItem>
        <ListItem>Familiar syntax for documentation</ListItem>
        <ListItem>Portable across platforms</ListItem>
        <ListItem>Lower barrier to entry</ListItem>
      </List>

      <Paragraph>
        <strong>Solution:</strong> Support both. Check for TSX first, fall back to markdown 
        if it doesn't exist. Same slug, different file extensions.
      </Paragraph>

      <Heading level={3}>File Discovery</Heading>

      <Paragraph>
        The <Code>getAllPosts()</Code> and <Code>getAllDocs()</Code> functions scan both 
        directories:
      </Paragraph>

      <CodeBlock language="typescript">{`// Scan content/tsx/ for TSX files
const tsxPosts = await Promise.all(
  tsxFilenames
    .filter((filename) => filename.endsWith('.tsx'))
    .map(async (filename) => {
      const module = await import(\`@content/tsx/\${filename.replace('.tsx', '')}\`);
      return {
        filename: filename.replace('.tsx', ''),
        metadata: module.metadata as PostMeta,
      };
    })
);

// Scan content/md/ for markdown files
const mdPosts = mdFilenames
  .filter((filename) => filename.endsWith('.md'))
  .map((filename) => {
    const filePath = path.join(mdDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { metadata } = parseMarkdownWithJsonFrontmatter(fileContent);
    return {
      filename: filename.replace('.md', ''),
      metadata,
    };
  });

// Combine and dedupe (TSX takes priority)
const tsxSlugs = new Set(tsxPosts.map(p => p.metadata.slug));
const uniqueMdPosts = mdPosts.filter(p => !tsxSlugs.has(p.metadata.slug));
const allPosts = [...tsxPosts, ...uniqueMdPosts];`}</CodeBlock>

      <Paragraph>
        TSX always wins if both exist. This lets us migrate content incrementally.
      </Paragraph>

      <Heading level={3}>Content Loading</Heading>

      <Paragraph>
        The <Code>loadContentBySlug()</Code> function returns a discriminated union:
      </Paragraph>

      <CodeBlock language="typescript">{`export interface LoadedContent {
  type: 'tsx' | 'markdown';
  Component?: React.ComponentType;
  markdownContent?: string;
  metadata: PostMeta;
  filename: string;
}`}</CodeBlock>

      <Paragraph>
        Page components conditionally render based on the type:
      </Paragraph>

      <CodeBlock language="tsx">{`{content.type === 'tsx' && content.Component ? (
  <content.Component />
) : content.type === 'markdown' && content.markdownContent ? (
  <MarkdownRenderer content={content.markdownContent} />
) : null}`}</CodeBlock>

      <Divider />

      <Heading level={2}>Problem 1: Inline Code vs Block Code</Heading>

      <Paragraph>
        <strong>The Bug:</strong> Inline code like <Code>&lt;span&gt;</Code> was rendering 
        as full code blocks.
      </Paragraph>

      <Paragraph>
        <strong>The Cause:</strong> Our detection logic was broken. We were checking{' '}
        <Code>props.className !== undefined</Code>, but react-markdown sets{' '}
        <Code>className</Code> to <Code>undefined</Code> for inline code too.
      </Paragraph>

      <Paragraph>
        <strong>The Fix:</strong> Check if className actually <em>exists</em> as a string:
      </Paragraph>

      <CodeBlock language="tsx">{`code: ({ children, ...props }: any) => {
  // Block code has a className with content (like 'language-tsx')
  // Inline code will not have a className
  const isBlock = props.className && typeof props.className === 'string';
  if (!isBlock) {
    return <Code>{children}</Code>;
  }
  // Block code - extract language from className if present
  const language = props.className.replace('language-', '') || 'plaintext';
  return <CodeBlock language={language}>{String(children)}</CodeBlock>;
}`}</CodeBlock>

      <Paragraph>
        Only block code gets a className like <Code>language-tsx</Code>. Inline code has no 
        className at all.
      </Paragraph>

      <Heading level={2}>Problem 2: Horizontal Rules Weren't Styled</Heading>

      <Paragraph>
        <strong>The Bug:</strong> Markdown <Code>---</Code> dividers rendered as unstyled{' '}
        <Code>&lt;hr&gt;</Code> elements.
      </Paragraph>

      <Paragraph>
        <strong>The Cause:</strong> We mapped <Code>hr</Code> to our <Code>Divider</Code>{' '}
        component, but the Divider had a thick colored border that didn't match the rest of 
        the page.
      </Paragraph>

      <Paragraph>
        <strong>The Fix:</strong> Updated Divider styling to match ContentHeader borders:
      </Paragraph>

      <CodeBlock language="css">
{`/* Divider component styles */
border: none;
border-top: 1px solid rgba(255, 255, 255, 0.1);
margin: [theme.spacing.md] 0;`}
        </CodeBlock>

      <Paragraph>
        Subtle, consistent with the rest of the design. Perfect.
      </Paragraph>

      <Heading level={2}>Problem 3: Lists Rendered as Walls of Text</Heading>

      <Paragraph>
        <strong>The Bug:</strong> Markdown lists <Code>- Item 1</Code> rendered as continuous 
        paragraphs without bullets.
      </Paragraph>

      <Paragraph>
        <strong>The Cause:</strong> We weren't mapping list elements to our Primitive components.
      </Paragraph>

      <Paragraph>
        <strong>The Fix:</strong> Map <Code>ul</Code>, <Code>ol</Code>, and <Code>li</Code>:
      </Paragraph>

      <CodeBlock language="tsx">{`components={{
  ul: ({ children }) => <List>{children}</List>,
  ol: ({ children }) => <List ordered>{children}</List>,
  li: ({ children }) => <ListItem>{children}</ListItem>,
  // ... other mappings
}}`}</CodeBlock>

      <Paragraph>
        Now markdown lists use the same styled components as TSX content.
      </Paragraph>

      <Heading level={2}>Problem 4: New Markdown Files Not Appearing</Heading>

      <Paragraph>
        <strong>The Bug:</strong> Created a new markdown file with proper frontmatter, but it 
        didn't show up on the homepage or have a route.
      </Paragraph>

      <Paragraph>
        <strong>The Cause:</strong> Next.js/Turbopack caching. The dev server wasn't picking up 
        new files automatically.
      </Paragraph>

      <Paragraph>
        <strong>The Fix:</strong> Restart the dev server. Not elegant, but it works.
      </Paragraph>

      <Paragraph>
        This is a limitation of Next.js's file watching system. New content files added during 
        development require a rebuild to be discovered by <Code>generateStaticParams()</Code>.
      </Paragraph>

      <Divider />

      <Heading level={2}>The Frontmatter Decision: JSON, Not YAML</Heading>

      <Paragraph>
        We chose JSON frontmatter over YAML:
      </Paragraph>

      <CodeBlock language="markdown">{`---json
{
  "title": "Example Post",
  "slug": "example-post",
  "date": "2026-01-20T00:00:00Z",
  "author": ["Jay Griffin"],
  "type": "post",
  "tags": ["example", "markdown"]
}
---

# Content starts here`}</CodeBlock>

      <Paragraph>
        <strong>Why JSON?</strong>
      </Paragraph>

      <List>
        <ListItem>No external YAML parser dependency</ListItem>
        <ListItem>Native JavaScript parsing with <Code>JSON.parse()</Code></ListItem>
        <ListItem>Easier for LLMs to generate correctly</ListItem>
        <ListItem>Type-safe with TypeScript interfaces</ListItem>
        <ListItem>Consistent with our TSX metadata exports</ListItem>
      </List>

      <Paragraph>
        The parser is dead simple:
      </Paragraph>

      <CodeBlock language="typescript">{`export function parseMarkdownWithJsonFrontmatter(fileContent: string): ParsedMarkdown {
  const frontmatterRegex = /^---json\\n([\\s\\S]+?)\\n---\\n([\\s\\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    throw new Error('No JSON frontmatter found in markdown file');
  }

  const [, jsonString, markdown] = match;
  const metadata = JSON.parse(jsonString) as PostMeta;
  
  return {
    metadata,
    content: markdown,
  };
}`}</CodeBlock>

      <Paragraph>
        Files without valid JSON frontmatter are skipped during discovery. No crashes, just 
        silent filtering.
      </Paragraph>

      <Divider />

      <Heading level={2}>Component Mapping Philosophy</Heading>

      <Paragraph>
        The MarkdownRenderer maps every markdown element to our Primitive components:
      </Paragraph>

      <List>
        <ListItem><Code>h1-h4</Code> → <Code>Heading</Code> with levels</ListItem>
        <ListItem><Code>p</Code> → <Code>Paragraph</Code></ListItem>
        <ListItem><Code>ul/ol</Code> → <Code>List</Code> with <Code>ordered</Code> prop</ListItem>
        <ListItem><Code>li</Code> → <Code>ListItem</Code></ListItem>
        <ListItem><Code>code</Code> → <Code>Code</Code> (inline) or <Code>CodeBlock</Code> (block)</ListItem>
        <ListItem><Code>hr</Code> → <Code>Divider</Code></ListItem>
      </List>

      <Paragraph>
        This means markdown content and TSX content use <em>identical</em> styling. No visual 
        difference between the two formats.
      </Paragraph>

      <Paragraph>
        Users can't tell if a page is TSX or markdown. Perfect consistency.
      </Paragraph>

      <Divider />

      <Heading level={2}>GitHub Flavored Markdown Support</Heading>

      <Paragraph>
        We use <Code>remark-gfm</Code> for GitHub Flavored Markdown extensions:
      </Paragraph>

      <List>
        <ListItem>Tables</ListItem>
        <ListItem>Strikethrough text</ListItem>
        <ListItem>Task lists</ListItem>
        <ListItem>Autolinked URLs</ListItem>
      </List>

      <CodeBlock language="tsx">{`<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    // ... component mappings
  }}
>
  {content}
</ReactMarkdown>`}</CodeBlock>

      <Paragraph>
        Standard markdown + GFM extensions. Familiar syntax for anyone coming from GitHub.
      </Paragraph>

      <Divider />

      <Heading level={2}>The Result: Hybrid Content System</Heading>

      <Paragraph>
        Now we have:
      </Paragraph>

      <List>
        <ListItem><strong>TSX for complex content</strong> - Full React power, components, logic</ListItem>
        <ListItem><strong>Markdown for simple content</strong> - Fast to write, easy to read</ListItem>
        <ListItem><strong>Identical styling</strong> - Users can't tell the difference</ListItem>
        <ListItem><strong>Slug-based routing</strong> - Files can be renamed without breaking URLs</ListItem>
        <ListItem><strong>Type-safe metadata</strong> - JSON frontmatter parsed to PostMeta interface</ListItem>
      </List>

      <Paragraph>
        Best of both worlds. Use TSX when you need power, markdown when you need speed.
      </Paragraph>

      <Heading level={2}>Lessons Learned</Heading>

      <Paragraph>
        <strong>1. Test edge cases immediately.</strong> Inline code vs block code? Test it 
        with actual examples, not just theory.
      </Paragraph>

      <Paragraph>
        <strong>2. Check what react-markdown actually sets.</strong> Don't assume{' '}
        <Code>undefined</Code> means "not set." Log the props and see what's really there.
      </Paragraph>

      <Paragraph>
        <strong>3. Map markdown to your design system.</strong> Don't let markdown elements 
        bypass your styled components. Map everything.
      </Paragraph>

      <Paragraph>
        <strong>4. TSX-first is the right default.</strong> For a developer-focused site, TSX 
        gives you more power. Markdown is the convenience layer on top.
      </Paragraph>

      <Paragraph>
        <strong>5. Next.js caching is real.</strong> New files might need a dev server restart. 
        Document this limitation.
      </Paragraph>

      <Divider />

      <Heading level={2}>What's Next?</Heading>

      <Paragraph>
        Potential improvements:
      </Paragraph>

      <List>
        <ListItem>Custom markdown extensions (callouts, notices, warnings)</ListItem>
        <ListItem>Syntax highlighting themes (currently using Prism defaults)</ListItem>
        <ListItem>Table of contents generation for long posts</ListItem>
        <ListItem>Hot reload for new markdown files (might require custom Next.js plugin)</ListItem>
        <ListItem>Markdown preview in development</ListItem>
      </List>

      <Paragraph>
        But for now? It works. TSX when we need it, markdown when we don't. Problem solved.
      </Paragraph>
    </>
  );
}
