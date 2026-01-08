import { notFound } from 'next/navigation';
import { ThemeEditorPage } from './ThemeEditorPage';

export default function Page() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }
  
  return <ThemeEditorPage />;
}
