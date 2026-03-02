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
        <Paragraph>
          The origin story is simple: I used an extension called <Link href="https://chromewebstore.google.com/detail/holmes/gokficnebmomagijbakglkcmhdbchbhn">Holmes</Link> every day. It was part of my workflow. Then Chrome's Manifest V3 migration broke it, the developer never updated it, and it quietly died. I missed it immediately and needed a replacement.
        </Paragraph>
        <Paragraph>
          Rather than hunt for a replacement that might also disappear, I built it myself. (After many months, Holmes has since been updated to Manifest V3 — but I now have my own version. No reason to go back!)
        </Paragraph>
        <Paragraph>
          <Link href="https://chromewebstore.google.com/detail/locus/mamfkhoggkjbacfkibdbcfmoonjbecmp">Locus on Chrome Web Store →</Link>
        </Paragraph>
      </ContentWrapper>
    </Container>
  );
}
