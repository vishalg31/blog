import Link from "next/link";
import { getAllPosts, CATEGORY_LABELS, formatDate, formatDateShort } from "@/lib/posts";
import CategoryBar from "@/components/CategoryBar";
import CurrentlyBuilding from "@/components/CurrentlyBuilding";
import PostCard from "@/components/PostCard";
import Footer from "@/components/Footer";

export default function HomePage() {
  const allPosts = getAllPosts();
  const featured = allPosts[0];
  const gridPosts = allPosts.slice(0, 6);
  const recentSidebar = allPosts.slice(0, 4);

  return (
    <>
      {/* ─── MASTHEAD ─── */}
      <header className="masthead">
        <div className="masthead-top">
          <nav className="masthead-nav">
            <Link href="https://vishalbuilds.com">Home</Link>
            <Link href="/" className="active">Blog</Link>
            <Link href="https://vishalbuilds.com/products">Products</Link>
          </nav>
        </div>
        <div className="masthead-title">
          <h1 className="masthead-logo-text">
            Ramble<span>On</span>
          </h1>
          <p className="masthead-subtitle">
            Personal Musings
          </p>
        </div>
        <div className="masthead-bottom">
          <span className="masthead-vol">
            Vol. I &nbsp;·&nbsp; Est. 2026 &nbsp;·&nbsp; blog.vishalbuilds.com
          </span>
        </div>
      </header>

      {/* ─── HERO SECTION ─── */}
      {featured && (
        <section className="hero-section">
          <div className="hero-inner">
            <div className="hero-main">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <div className="hero-label">Featured Essay</div>
                <Link href={`/${featured.category}/${featured.slug}`} style={{ display: "inline" }}>
                  <h2 className="hero-headline">{featured.title}</h2>
                </Link>
                <p className="hero-dek">{featured.description}</p>
              </div>
              <div className="hero-meta">
                <span>Vishal Gayakwar</span>
                <span className="dot">·</span>
                <span>{formatDate(featured.date)}</span>
                <span className="dot">·</span>
                <span>{featured.readingTime} min read</span>
                <Link
                  href={`/${featured.category}/${featured.slug}`}
                  className="hero-read-more"
                >
                  Read Essay
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M2 7h10M8 3l4 4-4 4" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="hero-image-col">
              <div className="hero-img-placeholder">
                {featured.ogImage ? (
                  <img
                    src={featured.ogImage}
                    alt={featured.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <span style={{ fontFamily: "monospace", fontSize: 11 }}>
                    featured post
                  </span>
                )}
              </div>
              <div className="hero-pull-quote">
                <p>&ldquo;{featured.description}&rdquo;</p>
                <cite>— From the essay</cite>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── CATEGORY NAV ─── */}
      <CategoryBar active="home" />

      {/* ─── MAIN CONTENT ─── */}
      <main className="main-content">

        {/* Post Grid */}
        <section className="post-grid-section">
          <div className="section-rule">
            <h2>Latest Posts</h2>
          </div>

          <div className="post-grid">
            {gridPosts.map((post, i) => {
              let variant: "hero" | "medium" | "small" = "small";
              if (i === 0) variant = "hero";
              else if (i === 1 || i === 2) variant = "medium";
              return <PostCard key={post.slug} post={post} variant={variant} />;
            })}
          </div>

          <div style={{ marginTop: 20, textAlign: "right" }}>
            <Link
              href="/builder"
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#4A0B48",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              View all posts
              <svg
                width="12"
                height="12"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="sidebar">
          <div className="building-strip sidebar-section">
            <CurrentlyBuilding />
          </div>

          <div className="sidebar-section">
            <div className="sidebar-section-title">Recent Posts</div>
            {recentSidebar.map((post) => (
              <Link
                key={post.slug}
                href={`/${post.category}/${post.slug}`}
                className="sidebar-post"
                style={{ display: "block" }}
              >
                <div className="sidebar-post-cat">
                  {CATEGORY_LABELS[post.category as keyof typeof CATEGORY_LABELS]}
                </div>
                <div className="sidebar-post-title">{post.title}</div>
                <div className="sidebar-post-meta">
                  {formatDateShort(post.date)} · {post.readingTime} min
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </main>

      <Footer />
    </>
  );
}
