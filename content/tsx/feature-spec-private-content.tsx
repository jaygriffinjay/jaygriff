import { Heading, Paragraph, List, ListItem, Code } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';

export const metadata = {
  title: 'Feature Spec: Private Content System',
  slug: 'feature-spec-private-content',
  date: '2026-01-23T12:00:00Z',
  author: 'Jay Griffin, Claude Sonnet 4.5',
  authorshipNote: 'Claude wrote this spec based on Jay\'s requirements for practical offline productivity.',
  description: 'Comprehensive feature spec for private/offline content creation. Enables sensitive documents, personal todos, and local-only work within the same system used for public content.',
  type: 'doc' as const,
  tags: ['feature-spec', 'privacy', 'offline', 'architecture', 'productivity'],
};

export default function FeatureSpecPrivateContent() {
  return (
    <>
      <Heading level={2}>Problem Statement</Heading>
      <Paragraph>
        The system currently serves one purpose: public content creation and publishing. But the same components, metadata schema, and AI-assisted workflow would be equally valuable for <strong>private personal work</strong>—todos, grocery lists, sensitive documents, work notes, financial planning.
      </Paragraph>
      <Paragraph>
        Right now there's no way to use this system for private content without either:
      </Paragraph>
      <List ordered>
        <ListItem>Committing sensitive information to a public repo</ListItem>
        <ListItem>Manually managing <Code>.gitignore</Code> rules per file</ListItem>
        <ListItem>Using a separate tool entirely (defeating the "personal OS" consolidation)</ListItem>
      </List>
      <Paragraph>
        <strong>Goal:</strong> Enable the same content creation experience (components, AI assistance, metadata, localhost preview) for content that should <em>never</em> be committed or deployed.
      </Paragraph>

      <Heading level={2}>Use Cases</Heading>
      <Heading level={3}>1. Sensitive Documents</Heading>
      <List>
        <ListItem><strong>Work notes:</strong> Internal company info, meeting notes with names, salary discussions</ListItem>
        <ListItem><strong>Financial planning:</strong> Budget spreadsheets, investment strategies, account numbers</ListItem>
        <ListItem><strong>Medical records:</strong> Health history, doctor notes, prescriptions</ListItem>
        <ListItem><strong>Legal documents:</strong> Contracts, agreements, personal legal matters</ListItem>
      </List>

      <Heading level={3}>2. Personal Productivity</Heading>
      <List>
        <ListItem><strong>Todo lists:</strong> Personal tasks, job application tracking, project planning</ListItem>
        <ListItem><strong>Grocery/shopping lists:</strong> Weekly groceries, gift ideas, wishlists</ListItem>
        <ListItem><strong>Journal entries:</strong> Daily reflections, therapy notes, personal thoughts</ListItem>
        <ListItem><strong>Dream log:</strong> Recurring dreams, analysis, patterns</ListItem>
      </List>

      <Heading level={3}>3. Semi-Private Work</Heading>
      <List>
        <ListItem><strong>Draft blog posts:</strong> Work-in-progress content not ready for public view</ListItem>
        <ListItem><strong>Experimental features:</strong> Half-baked specs, brainstorming sessions</ListItem>
        <ListItem><strong>Interview prep:</strong> Company research, questions, salary negotiation notes</ListItem>
      </List>

      <Heading level={2}>Privacy Tiers</Heading>
      <Paragraph>
        Not all private content has the same requirements. Three tiers cover the spectrum:
      </Paragraph>

      <Heading level={3}>Tier 1: Local-Only (Highest Security)</Heading>
      <List>
        <ListItem><strong>Never committed:</strong> Lives in <Code>content/private/</Code>, gitignored by default</ListItem>
        <ListItem><strong>Never deployed:</strong> Only visible on localhost, impossible to accidentally publish</ListItem>
        <ListItem><strong>Full feature parity:</strong> Same components, metadata, AI assistance as public content</ListItem>
        <ListItem><strong>Use cases:</strong> Sensitive docs, medical records, financial planning, truly private journals</ListItem>
      </List>

      <Heading level={3}>Tier 2: Committed but Unpublished (Medium Security)</Heading>
      <List>
        <ListItem><strong>Version controlled:</strong> Lives in regular <Code>content/</Code> dirs, committed to private repo</ListItem>
        <ListItem><strong>Environment-gated:</strong> Only loads in development, excluded from production build</ListItem>
        <ListItem><strong>Use cases:</strong> Draft blog posts, work-in-progress specs, experimental content</ListItem>
        <ListItem><strong>Benefit:</strong> Git history for tracking changes, synced across devices via private repo</ListItem>
      </List>

      <Heading level={3}>Tier 3: Published but Authenticated (Low Security)</Heading>
      <List>
        <ListItem><strong>Public URL:</strong> Deployed to production, accessible via direct link</ListItem>
        <ListItem><strong>Not indexed:</strong> Hidden from Navigator, sitemap, search engines</ListItem>
        <ListItem><strong>Optional auth:</strong> Basic password protection or OAuth if needed</ListItem>
        <ListItem><strong>Use cases:</strong> Shareable docs for small groups, unlisted content, private portfolio pieces</ListItem>
      </List>

      <Heading level={2}>Implementation: Tier 1 (MVP)</Heading>
      <Paragraph>
        This is the 80/20 solution—maximum privacy with minimal implementation cost.
      </Paragraph>

      <Heading level={3}>Setup (10 seconds)</Heading>
      <CodeBlock language="bash" filename="terminal">
{`mkdir content/private
echo "content/private/" >> .gitignore`}
      </CodeBlock>

      <Heading level={3}>Content Discovery Update</Heading>
      <Paragraph>
        Modify <Code>src/lib/posts.ts</Code> to include private directory in development:
      </Paragraph>
      <CodeBlock language="typescript" filename="src/lib/posts.ts">
{`const contentDirs = [
  path.join(process.cwd(), 'content/tsx'),
  path.join(process.cwd(), 'content/md'),
  // Only load private content in development
  ...(process.env.NODE_ENV === 'development' 
    ? [path.join(process.cwd(), 'content/private')]
    : []
  ),
];`}
      </CodeBlock>

      <Heading level={3}>Visual Indicator</Heading>
      <Paragraph>
        Tag private content in Navigator and ContentHeader so it's obvious what won't deploy:
      </Paragraph>
      <CodeBlock language="typescript" filename="src/components/Navigator.tsx">
{`{posts.map(post => (
  <div key={post.slug}>
    <Link href={post.route}>{post.title}</Link>
    {post.isPrivate && <span style={{ color: 'orange' }}> 🔒 Local Only</span>}
  </div>
))}`}
      </CodeBlock>

      <Heading level={3}>Metadata Extension</Heading>
      <Paragraph>
        Add <Code>isPrivate</Code> flag to <Code>PostMeta</Code> (auto-detected from path):
      </Paragraph>
      <CodeBlock language="typescript" filename="src/types/post.ts">
{`export interface PostMeta {
  // ... existing fields
  isPrivate?: boolean; // Auto-set if file in content/private/
}`}
      </CodeBlock>

      <Heading level={3}>Safety Check</Heading>
      <Paragraph>
        Add build-time assertion that private content never makes it to production:
      </Paragraph>
      <CodeBlock language="typescript" filename="src/lib/posts.ts">
{`export async function getAllPosts() {
  const posts = await loadAllContent();
  
  // Safety: Fail build if private content leaked
  if (process.env.NODE_ENV === 'production') {
    const privateContent = posts.filter(p => p.isPrivate);
    if (privateContent.length > 0) {
      throw new Error(
        \`Private content leaked to production: \${privateContent.map(p => p.slug).join(', ')}\`
      );
    }
  }
  
  return posts;
}`}
      </CodeBlock>

      <Heading level={2}>Implementation: Tier 2 (Committed but Unpublished)</Heading>
      <Paragraph>
        For content you want version controlled but not deployed.
      </Paragraph>

      <Heading level={3}>Metadata Flag</Heading>
      <CodeBlock language="typescript" filename="content/tsx/draft-post.tsx">
{`export const metadata = {
  title: 'Work in Progress Post',
  slug: 'draft-post',
  draft: true, // Excluded from production builds
  // ... rest of metadata
};`}
      </CodeBlock>

      <Heading level={3}>Filter in Production</Heading>
      <CodeBlock language="typescript" filename="src/lib/posts.ts">
{`export async function getAllPosts() {
  const posts = await loadAllContent();
  
  // Filter drafts in production
  if (process.env.NODE_ENV === 'production') {
    return posts.filter(p => !p.draft);
  }
  
  return posts;
}`}
      </CodeBlock>

      <Heading level={3}>Visual Indicator</Heading>
      <CodeBlock language="typescript" filename="src/components/Navigator.tsx">
{`{post.draft && <span style={{ color: 'yellow' }}> 📝 Draft</span>}`}
      </CodeBlock>

      <Heading level={2}>Implementation: Tier 3 (Authenticated)</Heading>
      <Paragraph>
        For shareable-but-unlisted content. This is lower priority—most use cases covered by Tiers 1 & 2.
      </Paragraph>

      <Heading level={3}>Metadata Flag</Heading>
      <CodeBlock language="typescript" filename="content/tsx/unlisted-post.tsx">
{`export const metadata = {
  title: 'Unlisted Post',
  slug: 'secret-project-notes',
  unlisted: true, // Accessible via direct URL, hidden from Navigator/sitemap
  // ... rest of metadata
};`}
      </CodeBlock>

      <Heading level={3}>Hide from Discovery</Heading>
      <CodeBlock language="typescript" filename="src/components/Navigator.tsx">
{`// Filter unlisted from Navigator
const visiblePosts = posts.filter(p => !p.unlisted);`}
      </CodeBlock>
      <CodeBlock language="typescript" filename="src/app/sitemap.ts">
{`// Exclude from sitemap
const publicPosts = posts.filter(p => !p.unlisted);`}
      </CodeBlock>

      <Heading level={3}>Optional: Basic Auth</Heading>
      <Paragraph>
        If truly needed, add middleware for password protection:
      </Paragraph>
      <CodeBlock language="typescript" filename="src/middleware.ts">
{`export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  
  // Check if accessing unlisted content
  if (isUnlistedRoute(url.pathname)) {
    const auth = request.headers.get('authorization');
    if (!isValidAuth(auth)) {
      return new Response('Auth required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic' },
      });
    }
  }
  
  return NextResponse.next();
}`}
      </CodeBlock>

      <Heading level={2}>Practical Workflow Examples</Heading>

      <Heading level={3}>Sensitive Document (Tier 1: Local-Only)</Heading>
      <CodeBlock language="typescript" filename="content/private/financial-plan.tsx">
{`export const metadata = {
  title: 'Personal Financial Plan 2026',
  slug: 'financial-plan-2026',
  date: '2026-01-23',
  author: 'Jay Griffin',
  type: 'doc' as const,
  tags: ['personal', 'financial', 'sensitive'],
};

export default function FinancialPlan() {
  return (
    <>
      <Heading level={2}>Budget Overview</Heading>
      <Paragraph>
        Monthly income: $X, expenses: $Y, savings goals: $Z...
      </Paragraph>
      {/* Full plan with personal details, never commits */}
    </>
  );
}`}
      </CodeBlock>
      <Paragraph>
        <strong>Export to PDF:</strong> Print from localhost:3000 for records. Content never touches git or production server.
      </Paragraph>

      <Heading level={3}>Personal Todos (Tier 1: Local-Only)</Heading>
      <CodeBlock language="typescript" filename="content/private/todos-personal.tsx">
{`export const metadata = {
  title: 'Personal Todos - Jan 2026',
  slug: 'todos-personal-jan-2026',
  type: 'doc' as const,
  tags: ['todo', 'personal'],
};

export default function PersonalTodos() {
  return (
    <>
      <Heading level={2}>Job Applications</Heading>
      <List>
        <ListItem>Apply to Company X - deadline Feb 1</ListItem>
        <ListItem>Research Company Y salaries on Glassdoor</ListItem>
        <ListItem>Prepare portfolio walkthrough demo</ListItem>
      </List>
      
      <Heading level={2}>Groceries This Week</Heading>
      <List>
        <ListItem>Milk, eggs, bread</ListItem>
        <ListItem>Coffee beans (out on Thursday)</ListItem>
        <ListItem>Vegetables for stir-fry</ListItem>
      </List>
    </>
  );
}`}
      </CodeBlock>

      <Heading level={3}>Draft Blog Post (Tier 2: Committed but Unpublished)</Heading>
      <CodeBlock language="typescript" filename="content/tsx/draft-react-patterns.tsx">
{`export const metadata = {
  title: 'Advanced React Patterns',
  slug: 'advanced-react-patterns',
  draft: true, // Won't deploy until set to false
  date: '2026-01-20',
  author: 'Jay Griffin',
  type: 'post' as const,
  tags: ['react', 'patterns', 'architecture'],
};

export default function AdvancedReactPatterns() {
  return (
    <>
      <Heading level={2}>Work in Progress</Heading>
      <Paragraph>
        Need to flesh out examples, add code samples...
      </Paragraph>
    </>
  );
}`}
      </CodeBlock>
      <Paragraph>
        <strong>Workflow:</strong> Commit drafts to track progress. Ship when ready by changing <Code>draft: false</Code>.
      </Paragraph>

      <Heading level={2}>Integration Points</Heading>

      <Heading level={3}>Metadata Editor Integration</Heading>
      <Paragraph>
        When the metadata editor exists, it should:
      </Paragraph>
      <List>
        <ListItem><strong>Respect privacy tiers:</strong> Warn before bulk-editing private content</ListItem>
        <ListItem><strong>Support tier migration:</strong> "Move this draft to private" button</ListItem>
        <ListItem><strong>Filter by privacy:</strong> "Show only local-only content" toggle</ListItem>
      </List>

      <Heading level={3}>Search/Filter Integration</Heading>
      <Paragraph>
        Navigator should support filtering by privacy status:
      </Paragraph>
      <List>
        <ListItem>"Show Private Only" - useful for finding sensitive docs quickly</ListItem>
        <ListItem>"Hide Drafts" - clean view of published content</ListItem>
        <ListItem>"Show All" - default in dev, see everything</ListItem>
      </List>

      <Heading level={3}>AI Integration</Heading>
      <Paragraph>
        AI assistance works identically for private content. But consider:
      </Paragraph>
      <List>
        <ListItem><strong>Data privacy:</strong> Using Claude/Copilot on sensitive content sends data to AI providers</ListItem>
        <ListItem><strong>Mitigation:</strong> Use AI for structure/formatting, write sensitive details manually</ListItem>
        <ListItem><strong>Or:</strong> Use local-only AI models for truly sensitive work (requires separate setup)</ListItem>
      </List>

      <Heading level={2}>Future Enhancements</Heading>

      <Heading level={3}>Encryption at Rest</Heading>
      <Paragraph>
        For paranoid-level security, encrypt private content on disk:
      </Paragraph>
      <List>
        <ListItem>Password-protected encryption key</ListItem>
        <ListItem>Decrypt on dev server start</ListItem>
        <ListItem>Encrypted files in <Code>content/private/</Code> unreadable without key</ListItem>
      </List>

      <Heading level={3}>Multi-Device Sync</Heading>
      <Paragraph>
        Currently private content is truly local (one machine only). For cross-device:
      </Paragraph>
      <List>
        <ListItem><strong>Private git repo:</strong> Push to GitHub private repo, pull on other machines</ListItem>
        <ListItem><strong>Encrypted cloud sync:</strong> Dropbox/iCloud for <Code>content/private/</Code></ListItem>
        <ListItem><strong>Self-hosted sync:</strong> Syncthing or similar for full control</ListItem>
      </List>

      <Heading level={3}>Export Formats</Heading>
      <Paragraph>
        Generate PDFs/exports of private content for sharing:
      </Paragraph>
      <List>
        <ListItem><strong>PDF generation:</strong> Server-side rendering to PDF (puppeteer or similar)</ListItem>
        <ListItem><strong>Markdown export:</strong> Convert TSX → MD for portability</ListItem>
        <ListItem><strong>Print styling:</strong> CSS optimized for print (no nav, clean headers)</ListItem>
      </List>

      <Heading level={2}>Implementation Priority</Heading>
      <Paragraph>
        <strong>Now (10 seconds):</strong> Create <Code>content/private/</Code> and add to <Code>.gitignore</Code>. Immediately usable for sensitive documents.
      </Paragraph>
      <Paragraph>
        <strong>Soon (1 hour):</strong> Update <Code>posts.ts</Code> to load private content in dev only. Add visual indicators. Add safety checks.
      </Paragraph>
      <Paragraph>
        <strong>Later (2-3 hours):</strong> Implement <Code>draft</Code> flag for Tier 2. Add filtering to Navigator.
      </Paragraph>
      <Paragraph>
        <strong>Eventually (if needed):</strong> Tier 3 unlisted content, basic auth, encryption, multi-device sync.
      </Paragraph>

      <Heading level={2}>Why This Matters</Heading>
      <Paragraph>
        This isn't about adding features—it's about making the system <strong>indispensable for all work</strong>, not just public content.
      </Paragraph>
      <Paragraph>
        If you can use the same components, metadata, AI assistance, and workflow for:
      </Paragraph>
      <List>
        <ListItem>Public blog posts</ListItem>
        <ListItem>Work documentation (at new job)</ListItem>
        <ListItem>Personal todos and shopping lists</ListItem>
        <ListItem>Sensitive personal documents</ListItem>
        <ListItem>Draft ideas and half-baked specs</ListItem>
      </List>
      <Paragraph>
        ...then this truly becomes your <strong>personal operating system for knowledge work</strong>. Not a portfolio site you occasionally update—a tool you live in daily.
      </Paragraph>
      <Paragraph>
        That's when the productivity multiplier becomes undeniable.
      </Paragraph>
    </>
  );
}
