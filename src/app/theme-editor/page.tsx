import { notFound } from 'next/navigation';
import { ThemeEditorPage } from './ThemeEditorPage';
import type { PostMeta } from '@/types/post';

export const routeMetadata: PostMeta = {
  title: 'Theme Editor',
  slug: 'theme-editor',
  date: '2026-01-19T00:00:00Z',
  description: 'Visual theme editing with live preview.',
  type: 'doc',
  tags: ['tools', 'theme', 'design'],
  author: 'Jay Griffin',
};

export default function Page() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }
  
  return <ThemeEditorPage />;
}
