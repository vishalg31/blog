import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getPostsByCategory,
  getAllCategories,
  CATEGORY_LABELS,
  CATEGORY_DESCRIPTIONS,
  formatDate,
  type Category,
} from "@/lib/posts";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return getAllCategories().map((cat) => ({ category: cat }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const label = CATEGORY_LABELS[category as Category];
  if (!label) return {};
  return {
    title: `${label} — Ramble On`,
    description: CATEGORY_DESCRIPTIONS[category as Category],
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categories = getAllCategories();
  if (!categories.includes(category as Category)) notFound();

  const cat = category as Category;
  const posts = getPostsByCategory(cat);
  const label = CATEGORY_LABELS[cat];
  const desc = CATEGORY_DESCRIPTIONS[cat];
  const featured = posts[0];
  const twoCols = posts.slice(1, 3);
  const listPosts = posts.slice(3);

  return (
    <>
      {/* ─── MASTHEAD ─── */}
      <header className="masthead">
        <div className="masthead-top">
          <nav className="masthead-nav">
            <Link href="https://vishalbuilds.com">Home</Link>
            <Link href="/" className="active">Blog</Link>
            <Link href="https://www.vishalbuilds.com/#projects">Products</Link>
          </nav>
        </div>
        <div className="masthead-title">
          <h1 className="masthead-logo-text">Ramble<span>On</span></h1>
          <p className="masthead-subtitle">Personal Musings</p>
        </div>
        <div className="masthead-bottom">
          <span className="masthead-vol">Vol. I &nbsp;·&nbsp; blog.vishalbuilds.com</span>
        </div>
      </header>

      {/* ─── BREADCRUMB ─── */}
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span>›</span>
        <span style={{ color: "#1A1714" }}>{label}</span>
      </div>

      {/* ─── CATEGORY BANNER ─── */}
      <section className="cat-banner">
        <div className="cat-banner-left">
<h1 className="cat-banner-title">{label}</h1>
          <p className="cat-banner-desc">{desc}</p>
        </div>
      </section>

      {/* ─── PAGE BODY ─── */}
      <div className="page-body">
        <div className="post-list">

          {/* Featured post */}
          {featured && (
            <Link href={`/${cat}/${featured.slug}`} style={{ textDecoration: "none" }}>
              <div className="featured-post">
                <div className="fp-content">
                  <div>
                    <div className="fp-label">Latest Essay</div>
                    <h2 className="fp-title">{featured.title}</h2>
                    <p className="fp-dek">{featured.description}</p>
                  </div>
                  <div className="fp-meta">
                    <span>{formatDate(featured.date)}</span>
                    <span className="sep">·</span>
                    <span>{featured.readingTime} min read</span>
                  </div>
                </div>
                <div className="fp-img">
                  {featured.ogImage ? (
                    <img src={featured.ogImage} alt={featured.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <span style={{ fontSize: 11, fontFamily: "monospace" }}>post image</span>
                  )}
                </div>
              </div>
            </Link>
          )}

          {/* Two-col row */}
          {twoCols.length > 0 && (
            <div className="two-col-row">
              {twoCols.map((post) => (
                <Link key={post.slug} href={`/${cat}/${post.slug}`} style={{ textDecoration: "none" }}>
                  <article className="post-card-b">
                    <div className="pcb-img">
                      {post.ogImage ? (
                        <img src={post.ogImage} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <span style={{ fontSize: 10, fontFamily: "monospace" }}>post image</span>
                      )}
                    </div>
                    <div className="pcb-cat">{label}</div>
                    <h3 className="pcb-title">{post.title}</h3>
                    <p className="pcb-dek">{post.description}</p>
                    <div className="pcb-meta">
                      <span>{formatDate(post.date)}</span>
                      <span className="sep">·</span>
                      <span>{post.readingTime} min read</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {/* Remaining list posts */}
          {listPosts.length > 0 && (
            <>
              <div className="post-list-divider"><span>More Essays</span></div>
              {listPosts.map((post) => (
                <Link key={post.slug} href={`/${cat}/${post.slug}`} style={{ textDecoration: "none" }}>
                  <div className="post-row">
                    <div className="pr-img">
                      {post.ogImage && (
                        <img src={post.ogImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      )}
                    </div>
                    <div>
                      <div className="pr-cat">{label}</div>
                      <div className="pr-title">{post.title}</div>
                      <div className="pr-meta">
                        <span>{formatDate(post.date)}</span>
                        <span className="sep">·</span>
                        <span>{post.readingTime} min</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}

          {posts.length === 0 && (
            <div style={{ padding: "60px 0", textAlign: "center", color: "#7A6A5E" }}>
              No posts yet. Check back soon.
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="cat-page-sidebar">
          <div className="sidebar-section">
            <div className="cat-sidebar-title">About Vishal</div>
            <div className="about-strip">
              <div className="about-avatar">VG</div>
              <div className="about-name">Vishal Gayakwar</div>
              <p className="about-bio">
                Builder, writer, cricket nerd. I make products and write about what happens. Based in India.
              </p>
            </div>
          </div>

          <div className="sidebar-section">
            <div className="cat-sidebar-title">Other Categories</div>
            {getAllCategories()
              .filter((c) => c !== cat)
              .map((c) => (
                <Link
                  key={c}
                  href={`/${c}`}
                  className="sidebar-post"
                  style={{ display: "block" }}
                >
                  <div className="sidebar-post-cat">{CATEGORY_LABELS[c]}</div>
                  <div className="sidebar-post-meta">
                    {getPostsByCategory(c).length} posts
                  </div>
                </Link>
              ))}
          </div>
        </aside>
      </div>

      <Footer />
    </>
  );
}
