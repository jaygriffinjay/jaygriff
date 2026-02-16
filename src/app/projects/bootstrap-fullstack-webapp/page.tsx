import { Container, Heading, Paragraph } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';

export const metadata = {
  title: 'Bootstrap Full-Stack Webapp',
  description: 'Next.js starter template with theme system and component library',
};

export default function BootstrapFullStackPage() {
  return (
    <Container>
      <ContentWrapper>
        <Heading level={1}>Bootstrap Full-Stack Webapp</Heading>
        <Paragraph>
          Project details coming soon...
        </Paragraph>
      </ContentWrapper>
    </Container>
  );
}
