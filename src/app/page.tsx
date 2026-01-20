import { getAllPosts, getAllDocs } from '@/lib/posts';
import { HomePage } from './HomePage';

export default async function Page() {
  const posts = await getAllPosts();
  const docs = await getAllDocs();
  const allContent = [...posts, ...docs];
  
  return <HomePage allContent={allContent} />;
}
