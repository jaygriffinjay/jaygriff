import { getAllPosts, getAllDocs, getAllAppRoutes } from '@/lib/posts';
import { HomePage } from './HomePage';

export default async function Page() {
  const [posts, docs, appRoutes] = await Promise.all([
    getAllPosts(),
    getAllDocs(),
    getAllAppRoutes(),
  ]);
  const allContent = [...posts, ...docs, ...appRoutes];
  
  return <HomePage allContent={allContent} />;
}
