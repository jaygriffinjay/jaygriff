import type { PostMeta } from '@/types/post';
import ContactPageClient from './ContactPageClient';

export const routeMetadata: PostMeta = {
  title: 'Contact',
  slug: 'contact',
  date: '2026-03-13T00:00:00Z',
  author: 'Jay Griffin',
  type: 'doc',
  description: 'Get in touch with Jay Griffin — email, GitHub, or LinkedIn.',
  tags: ['contact', 'about'],
  path: '/contact',
};

export const metadata = { title: routeMetadata.title, description: routeMetadata.description };

export default function ContactPage() {
  return <ContactPageClient />;
}
