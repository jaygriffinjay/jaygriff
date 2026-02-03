export interface PostMeta {
  title: string;
  slug: string;
  date: string; // ISO 8601
  description: string;
  type?: 'post' | 'doc' | 'doc:commit'; // Default is 'post'
  
  author?: string | string[]; // Single author or multiple authors
  authorshipNote?: string; // Optional tooltip explaining authorship context
  feature?: string;
  projectId?: string;
  path?: string; // For app routes - explicit URL path (e.g., "/metadata-scanner")
  
  sourceUrl?: string;
  commitHash?: string; // For doc:commit type - links to GitHub commit
  
  tags?: string[];
  draft?: boolean;
  image?: string;
  updated?: string | string[]; // Single update or array of update dates (most recent first)
  
  relatedPosts?: string[]; // Array of slugs for related posts
}

export interface Post {
  filename: string;
  metadata: PostMeta;
}
