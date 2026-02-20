import { Container, Heading, Paragraph } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';

export const metadata = {
  title: 'Operation Finish Stuff',
  description: 'Meta productivity app with hardcoded projects and work timers',
};

export default function OperationFinishStuffPage() {
  return (
    <Container size="sm">
      <ContentWrapper>
        <Heading level={1}>Operation Finish Stuff</Heading>
        <Paragraph>
          Project details coming soon...
        </Paragraph>
      </ContentWrapper>
    </Container>
  );
}
