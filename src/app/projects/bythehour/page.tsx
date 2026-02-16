import { Container, Heading, Paragraph } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';

export const metadata = {
  title: 'ByTheHour',
  description: 'AI-native time blocking app with natural language event scheduling',
};

export default function ByTheHourPage() {
  return (
    <Container>
      <ContentWrapper>
        <Heading level={1}>ByTheHour</Heading>
        <Paragraph>
          Project details coming soon...
        </Paragraph>
      </ContentWrapper>
    </Container>
  );
}
