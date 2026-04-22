import type { Post } from "@/lib/posts";
import { CATEGORY_LABELS, formatDate } from "@/lib/posts";
import ShareBar from "./ShareBar";

interface Props {
  post: Post;
  children: React.ReactNode;
  siteUrl?: string;
}

export default function PostLayout({ post, children, siteUrl = "https://blog.vishalbuilds.com" }: Props) {
  const label = CATEGORY_LABELS[post.category as keyof typeof CATEGORY_LABELS] || post.category;
  const postUrl = `${siteUrl}/${post.category}/${post.slug}`;

  return (
    <>
      {/* Article header */}
      <div className="article-header">
        <div className="article-cat-tag">{label}</div>
        <h1 className="article-title">{post.title}</h1>
        <p className="article-dek">{post.description}</p>
        <div className="article-byline">
          <div className="byline-avatar">VG</div>
          <div style={{ flex: 1 }}>
            <div className="byline-name">Vishal Gayakwar</div>
            <div className="byline-meta">
              <span>{formatDate(post.date)}</span>
              <span className="sep">·</span>
              <span>{label}</span>
            </div>
          </div>
          <div className="reading-badge">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="6" cy="6" r="5" /><path d="M6 3.5V6l1.5 1.5" />
            </svg>
            {post.readingTime} min read
          </div>
        </div>
      </div>

      {/* Hero image */}
      {post.ogImage && (
        <div className="article-hero-img">
          <div className="article-hero-img-inner" style={{ overflow: "hidden" }}>
            <img
              src={post.ogImage}
              alt={post.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      )}

      {/* Article body + aside */}
      <div className="article-layout">
        <article className="article-body" id="article-content">
          {children}
        </article>

        <aside className="article-aside">
          <ShareBar url={postUrl} title={post.title} />

          <div className="aside-section">
            <div className="aside-label">Tags</div>
            <div className="aside-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="aside-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
