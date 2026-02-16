import { Container, Heading, Paragraph } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';

export const metadata = {
  title: 'Fitness Data Platform',
  description: 'Multi-source fitness data ETL with analytics',
};

export default function FitnessDataPlatformPage() {
  return (
    <Container>
      <ContentWrapper>
        <Heading level={1}>Fitness Data Platform</Heading>
        <Paragraph>
          Project details coming soon...
        </Paragraph>
      </ContentWrapper>
    </Container>
  );
}
