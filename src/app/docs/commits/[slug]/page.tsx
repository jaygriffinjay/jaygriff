import { notFound } from "next/navigation";
import { Container } from "@/components/Primitives";
import { ContentHeader } from "@/components/ContentHeader";
import { ContentWrapper } from "@/components/ContentWrapper";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { loadContentBySlug, getAllDocSlugs } from "@/lib/content-loader";

// Pre-render all commit docs at build time
export async function generateStaticParams() {
  return await getAllDocSlugs();
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
      </article>
    </Container>
  );
}
