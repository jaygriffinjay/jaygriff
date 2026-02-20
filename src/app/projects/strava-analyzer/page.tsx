import { Container, Heading, Paragraph } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';

export const metadata = {
  title: 'Strava Analyzer',
  description: 'Running analytics with weekly charts and drill-down visualizations',
};

export default function StravaAnalyzerPage() {
  return (
    <Container size="sm">
      <ContentWrapper>
        <Heading level={1}>Strava Analyzer</Heading>
        <Paragraph>
          Project details coming soon...
        </Paragraph>
      </ContentWrapper>
    </Container>
  );
}
