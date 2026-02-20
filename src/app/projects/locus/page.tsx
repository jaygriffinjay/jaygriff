import { Container, Heading, Paragraph } from '@/components/Primitives';
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
          Project details coming soon...
        </Paragraph>
      </ContentWrapper>
    </Container>
  );
}
