import { Heading, Paragraph, List, ListItem, Code, Divider } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: 'CodeBlock Backtick Bug: Template Literals and Prism.js',
  slug: 'codeblock-backtick-bug',
  date: '2026-01-20T00:00:00Z',
  author: ['Claude Opus 4.5'],
  authorshipNote: 'Documented after debugging this issue with Jay for way too long',
  type: 'doc',
  projectId: 'jaygriff',
  feature: 'CodeBlock',
  description: 'Why template literals with backticks break Prism.js syntax highlighting in CodeBlock components, and how to fix it',
  tags: ['debugging', 'prism', 'codeblock', 'styled-components', 'gotcha'],
};

export default function CodeBlockBacktickBugDoc() {
  return (
    <>
      <Heading level={2}>The Problem</Heading>

      <Paragraph>
        When displaying styled-components code (or any code containing template literal backticks) 
        inside a <Code>CodeBlock</Code> component, Prism.js gets confused and renders the content 
        in a completely broken layout - with text appearing in wrong positions, lines jumbled, 
        and the first line often appearing at the bottom.
      </Paragraph>

      <Heading level={3}>Root Cause</Heading>

      <Paragraph>
        The issue is a collision between:
      </Paragraph>

      <List>
        <ListItem>JSX template literals (the outer backticks wrapping CodeBlock content)</ListItem>
        <ListItem>Code content that itself contains backticks (like styled-components syntax)</ListItem>
        <ListItem>Prism.js tokenization getting confused by unmatched/nested backticks</ListItem>
      </List>

      <Paragraph>
        When Prism.js parses TypeScript/JavaScript, it treats backticks as template literal 
        delimiters. If the code content has backticks that Prism interprets as opening a template 
        literal, but the structure doesn't match what it expects, the tokenization breaks and 
        the rendered output becomes garbled.
      </Paragraph>

      <Divider />

      <Heading level={2}>Broken Examples</Heading>

      <Paragraph>
        These patterns will cause rendering issues. <strong>Do not use these:</strong>
      </Paragraph>

      <Heading level={3}>❌ Template literal with escaped backticks</Heading>
      <Paragraph>
        Here's a live demonstration of the bug. This CodeBlock uses <Code>language="typescript"</Code>{' '}
        with unicode-escaped backticks (<Code>\u0060</Code>). Notice how it renders incorrectly:
      </Paragraph>

      <CodeBlock language="typescript">
{`export const Divider = styled.hr\u0060
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: \${props => props.theme.spacing.md} 0;
\u0060;`}
      </CodeBlock>

      <Paragraph>
        The content appears jumbled, with lines in wrong positions. This is what the JSX code looks like:
      </Paragraph>
      <CodeBlock language="tsx">
{`// THIS BREAKS - don't do this
<CodeBlock language="typescript">
{\`export const Divider = styled.hr\\\`
  border: none;
\\\`;\`}
</CodeBlock>`}
      </CodeBlock>

      <Paragraph>
        The <Code>\`</Code> escape sequence doesn't work inside template literals - it just 
        produces a literal backslash followed by a backtick, which Prism then misparses.
      </Paragraph>

      <Heading level={3}>❌ Unicode escapes for backticks</Heading>

      <CodeBlock language="tsx">
{`// THIS ALSO BREAKS
<CodeBlock language="typescript">
{\`export const Divider = styled.hr\\u0060
  border: none;
\\u0060;\`}
</CodeBlock>`}
      </CodeBlock>

      <Paragraph>
        Unicode escapes (<Code>\u0060</Code>) render as actual backticks in the output, 
        which Prism then tries to parse as template literal syntax.
      </Paragraph>

      <Divider />

      <Heading level={2}>Working Solutions</Heading>

      <Heading level={3}>✅ Solution 1: Use CSS language, skip the wrapper</Heading>

      <Paragraph>
        If you're showing styled-components styles, just show the CSS part without the{' '}
        <Code>styled.hr`...`</Code> wrapper. Use <Code>language="css"</Code> and omit the
        template literal backticks entirely:
      </Paragraph>

      <CodeBlock language="css">
{`/* Divider component styles */
border: none;
border-top: 1px solid rgba(255, 255, 255, 0.1);
margin: 16px 0;`}
      </CodeBlock>

      <Paragraph>
        This works because there are no backticks in the content for Prism to misparse.
      </Paragraph>

      <Heading level={3}>✅ Solution 2: Double-quoted string with newlines</Heading>

      <Paragraph>
        Use a regular double-quoted string with explicit <Code>\n</Code> newlines:
      </Paragraph>

      <CodeBlock language="tsx">
{`// WORKS - double quotes, backticks are just characters
<CodeBlock language="typescript">
  {"export const Divider = styled.hr\`\\n  border: none;\\n\`;"}
</CodeBlock>`}
      </CodeBlock>

      <Paragraph>
        In a double-quoted string, backticks are just regular characters - no escaping needed. 
        The downside is readability suffers with <Code>\n</Code> everywhere.
      </Paragraph>

      <Heading level={3}>✅ Solution 3: Use plaintext language</Heading>

      <CodeBlock language="tsx">
{`// WORKS - no syntax highlighting, no parsing issues
<CodeBlock language="plaintext">
{\`export const Divider = styled.hr\`
  border: none;
\`;\`}
</CodeBlock>`}
      </CodeBlock>

      <Paragraph>
        If you don't need syntax highlighting, <Code>plaintext</Code> tells Prism to skip 
        tokenization entirely.
      </Paragraph>

      <Divider />

      <Heading level={2}>Why This Is Hard to Debug</Heading>

      <List>
        <ListItem>
          <strong>The error is visual, not a crash</strong> - The page renders, but the text 
          appears scrambled. No error in console.
        </ListItem>
        <ListItem>
          <strong>It looks like a CSS problem</strong> - Text in wrong positions feels like 
          a layout bug, not a parsing bug.
        </ListItem>
        <ListItem>
          <strong>Escaping seems like it should work</strong> - <Code>\`</Code> is the 
          standard escape for backticks, but it doesn't help here because the issue is 
          in Prism's parsing, not JSX compilation.
        </ListItem>
        <ListItem>
          <strong>Different approaches cause different failures</strong> - Some break 
          Prism rendering, others cause React hydration errors, making it hard to 
          triangulate the root cause.
        </ListItem>
      </List>

      <Divider />

      <Heading level={2}>Wait, Why Do The Examples Above Work?</Heading>

      <Paragraph>
        Sharp-eyed readers may notice something strange: the "broken" examples in this very 
        document display correctly. What gives?
      </Paragraph>

      <Paragraph>
        The key is the <Code>language</Code> prop. All the examples above use{' '}
        <Code>language="tsx"</Code>, not <Code>language="typescript"</Code>.
      </Paragraph>

      <Paragraph>
        When Prism parses TSX, it understands JSX syntax. It sees:
      </Paragraph>

      <CodeBlock language="tsx">
{`<CodeBlock>{\`styled.hr\`...\`\`}</CodeBlock>`}
      </CodeBlock>

      <Paragraph>
        ...and correctly tokenizes the outer template literal as a JSX expression. The backticks 
        inside are just string content within that expression - they're not being parsed as 
        standalone JavaScript template literal delimiters.
      </Paragraph>

      <Paragraph>
        But when you use <Code>language="typescript"</Code> to show <em>just</em> the styled-components 
        code without the JSX wrapper:
      </Paragraph>

      <CodeBlock language="plaintext">
{`/* This is what you're trying to show */
styled.hr\`
  border: none;
\`;`}
      </CodeBlock>

      <Paragraph>
        Now Prism sees raw TypeScript with an opening backtick after <Code>styled.hr</Code>. 
        It tries to parse everything after that as template literal content, but the structure 
        doesn't match what it expects, and the tokenization goes haywire.
      </Paragraph>

      <Heading level={3}>The Abstraction Level Matters</Heading>

      <List>
        <ListItem>
          <strong>Works:</strong> Showing JSX code that contains template literals 
          (use <Code>language="tsx"</Code>)
        </ListItem>
        <ListItem>
          <strong>Breaks:</strong> Showing raw TypeScript/JavaScript with template literals 
          (use <Code>language="typescript"</Code> or <Code>language="javascript"</Code>)
        </ListItem>
      </List>

      <Paragraph>
        It's the difference between showing <em>code that uses code</em> vs showing <em>code directly</em>.
      </Paragraph>

      <Divider />

      <Heading level={2}>The Lesson</Heading>

      <Paragraph>
        When displaying code that contains template literal syntax inside a syntax-highlighted 
        CodeBlock, avoid putting backticks in the content. Either:
      </Paragraph>

      <List>
        <ListItem>Show just the relevant parts (CSS without the styled wrapper)</ListItem>
        <ListItem>Use double-quoted strings instead of template literals</ListItem>
        <ListItem>Use <Code>plaintext</Code> language to skip highlighting</ListItem>
        <ListItem>Wrap the code in JSX and use <Code>language="tsx"</Code> (meta-example)</ListItem>
        <ListItem>Accept that some code samples just can't be elegantly displayed</ListItem>
      </List>

      <Paragraph>
        This is a fundamental limitation of using Prism.js to highlight code that itself 
        contains the delimiter characters that Prism uses for parsing. The abstraction level 
        determines whether Prism can correctly tokenize the content.
      </Paragraph>
    </>
  );
}
