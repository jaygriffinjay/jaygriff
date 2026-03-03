import { notFound, redirect } from "next/navigation";
import { Container } from "@/components/Primitives";
import { ContentHeader } from "@/components/ContentHeader";
import { ContentWrapper } from "@/components/ContentWrapper";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import RelatedPosts from "@/components/RelatedPosts";
import { loadContentBySlug, getAllDocSlugs } from "@/lib/content-loader";
import { getAllPosts, getAllDocs } from "@/lib/posts";

// Pre-render all docs at build time
export async function generateStaticParams() {
  return await getAllDocSlugs();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await loadContentBySlug(slug, 'doc');
  if (!content) return {};
  return {
    title: content.metadata.title,
    description: content.metadata.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await loadContentBySlug(slug, 'doc');

  if (!content) {
    notFound();
  }

  const { metadata } = content;

  // Redirect commit docs to /docs/commits/{slug}
  if (metadata.type === 'doc:commit') {
    redirect(`/docs/commits/${slug}`);
  }

  const allPosts = await getAllPosts();
  const allDocs = await getAllDocs();
  const allContent = [...allPosts, ...allDocs];

  return (
    <Container size="sm">
      <article>
        <ContentHeader metadata={metadata} />
        <ContentWrapper>
          {content.type === 'tsx' && content.Component ? (
            <content.Component />
          ) : content.type === 'markdown' && content.markdownContent ? (
            <MarkdownRenderer content={content.markdownContent} />
          ) : null}
        </ContentWrapper>
        {metadata.relatedPosts && metadata.relatedPosts.length > 0 && (
          <RelatedPosts slugs={metadata.relatedPosts} allPosts={allContent} />
        )}
      </article>
    </Container>
  );
}
