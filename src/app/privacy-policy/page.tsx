import { Heading, Paragraph, Link, Container } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';
import type { PostMeta } from '@/types/post';

export const routeMetadata: PostMeta = {
  title: 'Privacy Policy',
  slug: 'privacy-policy',
  date: '2026-01-26T16:00:00Z',
  author: 'Jay Griffin',
  type: 'doc',
  description: 'Privacy policy for jaygriff.com covering analytics data collection and usage.',
  tags: ['privacy', 'legal', 'analytics', 'policy'],
  path: '/privacy-policy',
};

export default function PrivacyPolicyPage() {
  return (
    <Container size="sm">
      <ContentWrapper>
        <Heading level={1}>Privacy Policy</Heading>
        
        <Paragraph>
          This site uses <Link href="https://vercel.com/docs/analytics" target="_blank" rel="noopener noreferrer">Vercel Analytics</Link> to 
          understand how visitors use the site. This collects basic information like pageviews, device type, and approximate location 
          (country/region level). No cookies are used, and no personal information is collected or stored. This data is processed by 
          Vercel, my hosting and analytics provider.
        </Paragraph>

        <Paragraph>
          If you have questions about this policy, contact <Link href="mailto:jay@jaygriff.com">jay@jaygriff.com</Link>
        </Paragraph>
      </ContentWrapper>
    </Container>
  );
}
