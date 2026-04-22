"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Props {
  category: string;
  categoryLabel: string;
  title: string;
}

export default function ArticleNav({ category, categoryLabel, title }: Props) {
  const [progress, setProgress] = useState(0);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const update = () => {
      const content = document.getElementById("article-content");
      if (content) {
        const { top, height } = content.getBoundingClientRect();
        setProgress(Math.min(Math.max((window.innerHeight - top) / height, 0), 1) * 100);
      }
      const articleHeader = document.querySelector(".article-header");
      if (articleHeader) {
        setShowTitle(articleHeader.getBoundingClientRect().bottom < 56);
      }
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="article-nav-bar">
      <div className="article-nav-progress">
        <div style={{ height: "100%", width: `${progress}%`, background: "#4A0B48", transition: "width 0.1s linear" }} />
      </div>

      <div className="article-nav-inner">
        {/* Left: back arrow */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link href={`/${category}`} className="article-nav-back">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 7H2M6 3L2 7l4 4" />
            </svg>
            <span className="article-nav-back-label">{categoryLabel}</span>
          </Link>
        </div>

        {/* Center: Blog → title on scroll */}
        <div className="article-nav-center">
          {showTitle ? (
            <span className="article-nav-title">{title}</span>
          ) : (
            <Link href="/" className="article-nav-logo">Blog</Link>
          )}
        </div>

        {/* Right: nav links (desktop only) */}
        <nav className="article-nav-links" style={{ justifySelf: "end" }}>
          <Link href="https://vishalbuilds.com">Home</Link>
          <Link href="/">Blog</Link>
          <Link href="https://www.vishalbuilds.com/#projects">Products</Link>
        </nav>
      </div>
    </div>
  );
}
