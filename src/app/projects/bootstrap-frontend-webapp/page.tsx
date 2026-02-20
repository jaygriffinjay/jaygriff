import { Container, Heading, Paragraph } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';

export const metadata = {
  title: 'Bootstrap Frontend Webapp',
  description: 'React + TypeScript starter template with visual theme editor',
};

export default function BootstrapFrontendPage() {
  return (
    <Container size="sm">
      <ContentWrapper>
        <Heading level={1}>Bootstrap Frontend Webapp</Heading>
        <Paragraph>
          Project details coming soon...
        </Paragraph>
      </ContentWrapper>
    </Container>
  );
}
