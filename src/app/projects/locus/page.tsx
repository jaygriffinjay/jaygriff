import { Container, Heading, Paragraph, Link } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';

export const metadata = {
  title: 'Locus - Chrome Extension',
  description: 'Fast bookmark launcher with fuzzy search and keyboard navigation',
};

export default function LocusPage() {
  return (
    <Container size="sm">
      <ContentWrapper>
        <Heading level={1}>Locus</Heading>
        <Paragraph>
          Locus is a Chrome extension for launching bookmarks fast — fuzzy search, keyboard navigation, instant access to hundreds of bookmarks without touching the mouse.
        </Paragraph>

        <a
          href="https://chromewebstore.google.com/detail/locus/mamfkhoggkjbacfkibdbcfmoonjbecmp"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            margin: '1.5rem 0',
            padding: '1.25rem 1.5rem',
            border: '1px solid hsl(210, 100%, 40%)',
            borderRadius: '10px',
            background: 'hsla(210, 100%, 50%, 0.08)',
            textDecoration: 'none',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'hsl(210, 100%, 65%)' }}>
            Locus on Chrome Web Store →
          </span>
          <span style={{ display: 'block', fontSize: '0.85rem', color: 'hsl(210, 20%, 60%)', marginTop: '0.35rem' }}>
            Free — install and try it
          </span>
        </a>

        <video
          src="https://assets.jaygriff.com/locus-demo.mp4"
          poster="/images/projects/locus-banner.png"
          controls
          style={{ width: '100%', borderRadius: '8px', margin: '1rem 0 1.5rem' }}
        />

        <Paragraph>
          The origin story is simple: I used an extension called <Link href="https://chromewebstore.google.com/detail/holmes/gokficnebmomagijbakglkcmhdbchbhn">Holmes</Link> every day. It was part of my workflow. Then Chrome's Manifest V3 migration broke it, the developer never updated it, and it quietly died. I missed it immediately and needed a replacement.
        </Paragraph>
        <Paragraph>
          Rather than hunt for a replacement that might also disappear, I built it myself. (After many months, Holmes has since been updated to Manifest V3 — but I now have my own version. No reason to go back!)
        </Paragraph>

        <Paragraph>
          The source is on <Link href="https://github.com/jaygriffinjay/Locus">GitHub</Link> — open source and free to use.
        </Paragraph>

        <Heading level={2}>Stack</Heading>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.9' }}>
          <li><strong>React 19</strong> — UI for the extension popup</li>
          <li><strong>TypeScript</strong> — strict typing throughout</li>
          <li><strong>Vite</strong> — build tooling with static asset copy for the Chrome extension manifest</li>
          <li><strong>styled-components</strong> — component-scoped styling</li>
          <li><strong>Fuse.js</strong> — fuzzy search over the bookmark tree</li>
          <li><strong>Lucide React</strong> — icons</li>
          <li><strong>Chrome Extensions API</strong> (Manifest V3) — bookmark access and tab management</li>
        </ul>
      </ContentWrapper>
    </Container>
  );
}
