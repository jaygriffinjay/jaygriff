import { Container, Heading, Paragraph } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';

export const metadata = {
  title: 'SVG Animation Studio',
  description: 'Coding study exploring hand-coded SVG graphics and CSS animations',
};

export default function SvgAnimationStudioPage() {
  return (
    <Container size="sm">
      <ContentWrapper>
        <Heading level={1}>SVG Animation Studio</Heading>
        <Paragraph>
          Project details coming soon...
        </Paragraph>
      </ContentWrapper>
    </Container>
  );
}
