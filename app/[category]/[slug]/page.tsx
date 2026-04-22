import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getPostBySlug,
  getPostsByCategory,
  getAllPosts,
  CATEGORY_LABELS,
  formatDate,
  type Category,
} from "@/lib/posts";
import PostLayout from "@/components/PostLayout";
import ArticleNav from "@/components/ArticleNav";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const post = getPostBySlug(category, slug);
  if (!post) return {};
  const ogImage = post.ogImage
    ? [{ url: post.ogImage, width: 1200, height: 630 }]
    : [{ url: `/api/og?title=${encodeURIComponent(post.title)}&category=${post.category}`, width: 1200, height: 630 }];
  const postUrl = `https://blog.vishalbuilds.com/${post.category}/${post.slug}`;

  return {
    title: `${post.title} — Ramble On`,
    description: post.description,
    alternates: { canonical: postUrl },
    openGraph: {
      type: "article",
      url: postUrl,
      title: post.title,
      description: post.description,
      images: ogImage,
      publishedTime: post.date,
      authors: ["Vishal Gayakwar"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      site: "@vishalg31",
      creator: "@vishalg31",
      title: post.title,
      description: post.description,
      images: ogImage.map((i) => i.url),
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const post = getPostBySlug(category, slug);
  if (!post) notFound();

  const label = CATEGORY_LABELS[category as Category] || category;
  const relatedPosts = getPostsByCategory(category)
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: { "@type": "Person", name: "Vishal Gayakwar", url: "https://vishalbuilds.com" },
    publisher: { "@type": "Organization", name: "Ramble On", url: "https://blog.vishalbuilds.com" },
    datePublished: post.date,
    url: `https://blog.vishalbuilds.com/${post.category}/${post.slug}`,
    ...(post.ogImage && { image: `https://blog.vishalbuilds.com${post.ogImage}` }),
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ArticleNav category={category} categoryLabel={label} title={post.title} />
      <div className="article-page-body">
        {/* ─── POST LAYOUT ─── */}
        <PostLayout post={post}>
          <MDXRemote source={post.content} />
        </PostLayout>

        {/* ─── MORE FROM THIS CATEGORY ─── */}
        {relatedPosts.length > 0 && (
          <section className="more-from">
            <div className="more-from-header">
              <h2 className="more-from-title">More from {label}</h2>
              <Link href={`/${category}`} className="more-from-link">
                See all
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </Link>
            </div>
            <div className="more-posts-grid">
              {relatedPosts.map((p) => (
                <Link key={p.slug} href={`/${p.category}/${p.slug}`} style={{ textDecoration: "none" }}>
                  <div className="more-post-card">
                    <div className="more-post-cat">{label}</div>
                    <div className="more-post-title">{p.title}</div>
                    <div className="more-post-dek">{p.description}</div>
                    <div className="more-post-meta">
                      {formatDate(p.date)} · {p.readingTime} min read
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
}
