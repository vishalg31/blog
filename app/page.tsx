import Link from "next/link";
import { getAllPosts, CATEGORY_LABELS, formatDate, formatDateShort, type Post } from "@/lib/posts";
import CategoryBar from "@/components/CategoryBar";
import CurrentlyBuilding from "@/components/CurrentlyBuilding";
import PostCard from "@/components/PostCard";
import Footer from "@/components/Footer";
import storiesData from "@/stories.json";

type StoryEntry = typeof storiesData[0];
type Variant = "hero" | "medium" | "small";

function StoryCard({ story, variant }: { story: StoryEntry; variant: Variant }) {
  const showVisual = variant === "hero" || variant === "medium";
  return (
    <article
      className={`post-card ${variant}-post`}
      style={variant === "hero" ? { gridColumn: "span 2", gridRow: "span 2" } : undefined}
    >
      <div className="post-cat-tag">Story</div>
      {showVisual && (
        <Link href={story.href} className="post-img" style={{ background: story.bg }}>
          {story.ogImage ? (
            <img
              src={story.ogImage}
              alt={story.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <>
              <div className="story-card-visual-title" style={{ color: story.text }}>{story.title}</div>
              <div className="story-card-visual-sub" style={{ color: story.accent }}>{story.category} &nbsp;·&nbsp; {story.date}</div>
            </>
          )}
        </Link>
      )}
      <Link href={story.href}>
        <h3 className="post-headline">{story.title}</h3>
      </Link>
      {variant !== "small" && (
        <p className="post-dek">{story.kicker}</p>
      )}
      <div className="post-meta">
        <span>Story</span>
        <span className="sep">·</span>
        <span>{story.date}</span>
      </div>
    </article>
  );
}

type FeedItem =
  | { type: "post"; data: Post; sortDate: Date }
  | { type: "story"; data: StoryEntry; sortDate: Date };

export default function HomePage() {
  const allPosts = getAllPosts();
  const recentSidebar = allPosts.slice(0, 4);

  // Merge posts + stories, sort by date descending
  const feed: FeedItem[] = [
    ...allPosts.map((p) => ({ type: "post" as const, data: p, sortDate: new Date(p.date) })),
    ...storiesData.map((s) => ({ type: "story" as const, data: s, sortDate: new Date(s.sortDate) })),
  ].sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime());

  const featuredItem = feed[0] ?? null;
  const feedItems = feed.slice(0, 6);

  return (
    <>
      {/* ─── MASTHEAD ─── */}
      <header className="masthead">
        <div className="masthead-top">
          <nav className="masthead-nav">
            <Link href="https://vishalbuilds.com">Home</Link>
            <Link href="/" className="active">Blog</Link>
            <Link href="/stories">Stories</Link>
            <Link href="https://www.vishalbuilds.com/#projects">Products</Link>
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
      {featuredItem && featuredItem.type === "post" && (
        <section className="hero-section">
          <div className="hero-inner">
            <div className="hero-main">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <div className="hero-label">Featured Essay</div>
                <Link href={`/${featuredItem.data.category}/${featuredItem.data.slug}`} style={{ display: "inline" }}>
                  <h2 className="hero-headline">{featuredItem.data.title}</h2>
                </Link>
                <p className="hero-dek">{featuredItem.data.description}</p>
              </div>
              <div className="hero-meta">
                <span>Vishal Gayakwar</span>
                <span className="dot">·</span>
                <span>{formatDate(featuredItem.data.date)}</span>
                <span className="dot">·</span>
                <span>{featuredItem.data.readingTime} min read</span>
                <Link href={`/${featuredItem.data.category}/${featuredItem.data.slug}`} className="hero-read-more">
                  Read Essay
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 7h10M8 3l4 4-4 4" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="hero-image-col">
              <div className="hero-img-placeholder">
                {featuredItem.data.ogImage ? (
                  <img src={featuredItem.data.ogImage} alt={featuredItem.data.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span style={{ fontFamily: "monospace", fontSize: 11 }}>featured post</span>
                )}
              </div>
              <div className="hero-pull-quote">
                <p>&ldquo;{featuredItem.data.description}&rdquo;</p>
                <cite>— From the essay</cite>
              </div>
            </div>
          </div>
        </section>
      )}

      {featuredItem && featuredItem.type === "story" && (
        <section className="hero-section">
          <div className="hero-inner">
            <div className="hero-main">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <div className="hero-label">Latest Story</div>
                <Link href={featuredItem.data.href} style={{ display: "inline" }}>
                  <h2 className="hero-headline">{featuredItem.data.title}</h2>
                </Link>
                <p className="hero-dek">{featuredItem.data.kicker}</p>
              </div>
              <div className="hero-meta">
                <span>Vishal Gayakwar</span>
                <span className="dot">·</span>
                <span>{featuredItem.data.date}</span>
                <span className="dot">·</span>
                <span>{featuredItem.data.category}</span>
                <Link href={featuredItem.data.href} className="hero-read-more">
                  Read Story
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 7h10M8 3l4 4-4 4" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="hero-image-col">
              <div
                className="hero-img-placeholder"
                style={featuredItem.data.ogImage ? undefined : { background: featuredItem.data.bg, flexDirection: "column", gap: 8 }}
              >
                {featuredItem.data.ogImage ? (
                  <img
                    src={featuredItem.data.ogImage}
                    alt={featuredItem.data.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <>
                    <div style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: 52, fontWeight: 900, color: featuredItem.data.text, letterSpacing: "-0.03em", lineHeight: 1 }}>
                      {featuredItem.data.title}
                    </div>
                    <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: featuredItem.data.accent }}>
                      {featuredItem.data.category}
                    </div>
                  </>
                )}
              </div>
              <div className="hero-pull-quote">
                <p>&ldquo;{featuredItem.data.kicker}&rdquo;</p>
                <cite>— From the story</cite>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── CATEGORY NAV ─── */}
      <CategoryBar active="home" />

      {/* ─── MAIN CONTENT ─── */}
      <main className="main-content">

        {/* Post Grid — latest posts + stories mixed by date */}
        <section className="post-grid-section">
          <div className="section-rule">
            <h2>Latest Posts</h2>
          </div>

          <div className="post-grid">
            {feedItems.map((item, i) => {
              let variant: Variant = "small";
              if (i === 0) variant = "hero";
              else if (i === 1 || i === 2) variant = "medium";

              if (item.type === "story") {
                return <StoryCard key={`story-${item.data.slug}`} story={item.data} variant={variant} />;
              }
              return <PostCard key={item.data.slug} post={item.data} variant={variant} />;
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
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
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

      {/* ─── STORIES SECTION ─── */}
      {storiesData.length > 0 && (
        <section className="stories-home-section">
          <div className="section-rule">
            <h2>Stories</h2>
          </div>
          <div className="stories-home-grid">
            {storiesData.map((story) => (
              <StoryCard key={story.slug} story={story} variant="medium" />
            ))}
          </div>
          <Link href="/stories" className="stories-home-viewall">
            View all stories
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 7h10M8 3l4 4-4 4" />
            </svg>
          </Link>
        </section>
      )}

      <Footer />
    </>
  );
}
