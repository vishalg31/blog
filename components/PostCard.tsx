import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/posts";
import { CATEGORY_LABELS, formatDateShort } from "@/lib/posts";

type Variant = "hero" | "medium" | "small";

interface Props {
  post: Post;
  variant: Variant;
}

export default function PostCard({ post, variant }: Props) {
  const href = `/${post.category}/${post.slug}`;
  const label = CATEGORY_LABELS[post.category as keyof typeof CATEGORY_LABELS] || post.category;

  return (
    <article
      className={`post-card ${variant}-post`}
      style={
        variant === "hero"
          ? { gridColumn: "span 2", gridRow: "span 2" }
          : undefined
      }
    >
      <div className="post-cat-tag">{label}</div>

      {(variant === "hero" || variant === "medium") && (
        <Link href={href} className="post-img">
          {post.ogImage ? (
            <Image
              src={post.ogImage}
              alt={post.title}
              width={600}
              height={variant === "hero" ? 338 : 300}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, #4A0B48 0%, #2D0830 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  fontSize: variant === "hero" ? 28 : 22,
                  fontWeight: 800,
                  color: "#fff",
                  fontFamily: "var(--font-playfair, Georgia, serif)",
                  letterSpacing: "-0.02em",
                }}
              >
                Ramble<span style={{ color: "#E8C5E7" }}>On</span>
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.45)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {label}
              </div>
            </div>
          )}
        </Link>
      )}

      <Link href={href}>
        <h3 className="post-headline">{post.title}</h3>
      </Link>

      {variant !== "small" && (
        <p className="post-dek">{post.description}</p>
      )}

      <div className="post-meta">
        <span>{label}</span>
        <span className="sep">·</span>
        <span>{formatDateShort(post.date)}</span>
        <span className="sep">·</span>
        <span>{post.readingTime} min read</span>
      </div>
    </article>
  );
}
