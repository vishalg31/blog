import Link from "next/link";
import type { Metadata } from "next";
import stories from "@/stories.json";

export const metadata: Metadata = {
  title: "Stories — Vishal Builds",
  description:
    "Products and automation stories from Vishal Gayakwar. Long-form accounts of things I've built, broken, and shipped.",
  openGraph: {
    title: "Stories — Vishal Builds",
    description:
      "Products and automation stories from Vishal Gayakwar.",
    url: "https://blog.vishalbuilds.com/stories",
  },
};

type Story = {
  slug: string;
  title: string;
  kicker: string;
  category: string;
  date: string;
  sortDate: string;
  href: string;
  bg: string;
  accent: string;
  text: string;
  tagText: string;
  visual: string;
  ogImage?: string;
};

/* ── Per-story graphic components ── */
function ApexGraphic() {
  return (
    <svg
      viewBox="0 0 480 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", display: "block" }}
      aria-hidden="true"
    >
      {/* Background */}
      <rect width="480" height="360" fill="#0A0A0A" />

      {/* Subtle grid */}
      {[60, 120, 180, 240, 300].map((y) => (
        <line key={y} x1="0" y1={y} x2="480" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}
      {[80, 160, 240, 320, 400].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="360" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}

      {/* Blockmark — 2×2 grid, top-right (mirrors APEX hero) */}
      <rect x="406" y="22" width="20" height="20" fill="rgba(255,255,255,0.12)" />
      <rect x="430" y="22" width="20" height="20" fill="#E6FF3D" />
      <rect x="406" y="46" width="20" height="20" fill="transparent" />
      <rect x="430" y="46" width="20" height="20" fill="rgba(255,255,255,0.12)" />

      {/* APEX wordmark — "AP" paper, "EX" accent */}
      <text
        x="24"
        y="268"
        fontFamily="'Space Grotesk', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="700"
        fontSize="148"
        letterSpacing="-5"
        fill="#F5F4EF"
      >
        AP
      </text>
      <text
        x="222"
        y="268"
        fontFamily="'Space Grotesk', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="700"
        fontSize="148"
        letterSpacing="-5"
        fill="#E6FF3D"
      >
        EX
      </text>

      {/* Separator */}
      <line x1="24" y1="296" x2="456" y2="296" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

      {/* Bottom label */}
      <text
        x="24"
        y="324"
        fontFamily="ui-monospace, 'Cascadia Code', monospace"
        fontSize="10"
        letterSpacing="2.5"
        fill="rgba(255,255,255,0.22)"
      >
        AGENTIC AUTOMATION · 2026
      </text>

      {/* Case count chip — bottom right */}
      <text
        x="432"
        y="324"
        fontFamily="ui-monospace, 'Cascadia Code', monospace"
        fontSize="10"
        letterSpacing="1.5"
        fill="rgba(230,255,61,0.55)"
        textAnchor="end"
      >
        32s / case
      </text>
    </svg>
  );
}

function ModelBoostGraphic() {
  return (
    <svg
      viewBox="0 0 480 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", display: "block" }}
      aria-hidden="true"
    >
      {/* Background */}
      <rect width="480" height="360" fill="#EFE9D9" />

      {/* Subtle horizontal grid */}
      {[72, 144, 216, 288].map((y) => (
        <line key={y} x1="0" y1={y} x2="480" y2={y} stroke="rgba(26,26,26,0.05)" strokeWidth="1" />
      ))}

      {/* Accent bar — top-right, mirrors hero */}
      <rect x="476" y="0" width="4" height="180" fill="url(#accentGrad)" />
      <defs>
        <linearGradient id="accentGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#E85D5D" />
          <stop offset="100%" stopColor="#E85D5D" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* "MODEL" wordmark */}
      <text
        x="24"
        y="200"
        fontFamily="'Bebas Neue', 'Arial Narrow', Arial, sans-serif"
        fontWeight="400"
        fontSize="148"
        letterSpacing="-2"
        fill="#1A1A1A"
      >
        MODEL
      </text>

      {/* "BOOST" wordmark in accent */}
      <text
        x="24"
        y="328"
        fontFamily="'Bebas Neue', 'Arial Narrow', Arial, sans-serif"
        fontWeight="400"
        fontSize="148"
        letterSpacing="-2"
        fill="#E85D5D"
      >
        BOOST
      </text>

      {/* Separator */}
      <line x1="24" y1="340" x2="456" y2="340" stroke="rgba(26,26,26,0.10)" strokeWidth="1" />

      {/* Bottom label */}
      <text
        x="24"
        y="356"
        fontFamily="ui-monospace, 'Cascadia Code', monospace"
        fontSize="10"
        letterSpacing="2.5"
        fill="rgba(26,26,26,0.32)"
      >
        FORECASTING · 2026
      </text>

      {/* Stat chip — bottom right */}
      <text
        x="456"
        y="356"
        fontFamily="ui-monospace, 'Cascadia Code', monospace"
        fontSize="10"
        letterSpacing="1.5"
        fill="rgba(232,93,93,0.65)"
        textAnchor="end"
      >
        40% → 24% WAPE
      </text>
    </svg>
  );
}

const VISUALS: Record<string, React.ReactNode> = {
  "model-boost": <ModelBoostGraphic />,
  apex: <ApexGraphic />,
};

export default function StoriesPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap');

        /* ── Top nav bar ── */
        .stories-topnav {
          border-bottom: 1px solid #E8E0D8;
          padding: 0 40px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #FDFAF6;
        }
        .stories-topnav-brand {
          font-family: var(--font-playfair, Georgia, serif);
          font-size: 18px;
          font-weight: 800;
          color: #1A1714;
          letter-spacing: -0.02em;
          text-decoration: none;
        }
        .stories-topnav-brand span { color: #4A0B48; }
        .stories-topnav-links {
          display: flex;
          gap: 24px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-family: system-ui, sans-serif;
        }
        .stories-topnav-links a {
          color: #6B5E54;
          text-decoration: none;
          transition: color 0.15s;
        }
        .stories-topnav-links a:hover,
        .stories-topnav-links a.active { color: #1A1714; }

        .stories-page {
          max-width: 1080px;
          margin: 0 auto;
          padding: 56px 40px 72px;
          min-height: calc(100vh - 48px - 54px);
        }

        /* ── Inline footer ── */
        .stories-footer {
          border-top: 2px solid #1A1714;
          padding: 16px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
          background: #FFFFFF;
        }
        .stories-footer-brand {
          font-family: var(--font-playfair, Georgia, serif);
          font-size: 18px;
          font-weight: 800;
          color: #1A1714;
          letter-spacing: -0.02em;
          text-decoration: none;
        }
        .stories-footer-brand span { color: #4A0B48; }
        .stories-footer-links {
          display: flex;
          gap: 18px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-family: system-ui, sans-serif;
        }
        .stories-footer-links a {
          color: #7A6A5E;
          text-decoration: none;
          transition: color 0.15s;
        }
        .stories-footer-links a:hover { color: #4A0B48; }

        /* ── Page header ── */
        .stories-header {
          margin-bottom: 72px;
          padding-bottom: 40px;
          border-bottom: 2px solid #1A1714;
        }
        .stories-eyebrow {
          font-family: ui-monospace, 'Cascadia Code', monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #8A8A85;
          margin-bottom: 20px;
        }
        .stories-title {
          font-family: var(--font-playfair, Georgia, serif);
          font-size: clamp(56px, 10vw, 112px);
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: -0.03em;
          color: #1A1714;
          margin-bottom: 24px;
        }
        .stories-subtitle {
          font-size: 17px;
          line-height: 1.65;
          color: #6B5E54;
          max-width: 52ch;
        }
        .stories-count {
          font-family: ui-monospace, 'Cascadia Code', monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #8A8A85;
          margin-bottom: 24px;
        }

        /* ── Grid ── */
        .stories-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px 20px;
        }

        /* ── Wrapper (entire story entry) ── */
        .sc-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0;
          text-decoration: none;
          color: inherit;
        }

        /* ── Visual card ── */
        .sc-card {
          position: relative;
          overflow: hidden;
          display: block;
          aspect-ratio: 4 / 3;
          /* scale fires AFTER the accent line draws (290ms delay) */
          transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-wrapper:hover .sc-card {
          transform: scale(1.013);
          transition-delay: 290ms;
        }

        /* Category tag — overlaid top-left on visual */
        .sc-tag {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 2;
          font-family: ui-monospace, 'Cascadia Code', monospace;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          background: var(--sc-accent);
          color: var(--sc-tag-text);
          padding: 5px 11px;
        }

        /* Accent line — draws left to right on hover, before scale */
        .sc-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          width: 0%;
          background: var(--sc-accent);
          z-index: 3;
        }
        .sc-wrapper:hover .sc-card::after {
          animation: sc-line-draw 300ms ease-out forwards;
        }
        @keyframes sc-line-draw {
          from { width: 0%; }
          to   { width: 100%; }
        }

        /* ── Caption below the card (Pudding style) ── */
        .sc-caption {
          padding: 14px 2px 0;
        }
        .sc-caption-title {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #1A1714;
          margin-bottom: 5px;
          transition: color 180ms ease;
        }
        .sc-wrapper:hover .sc-caption-title {
          color: #000;
        }
        .sc-caption-kicker {
          font-size: 13px;
          line-height: 1.55;
          color: #6B5E54;
          margin-bottom: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .sc-caption-meta {
          font-family: ui-monospace, 'Cascadia Code', monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #B0A89E;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .sc-caption-cta {
          opacity: 0;
          color: #1A1714;
          font-weight: 600;
          letter-spacing: 0.06em;
          transition: opacity 180ms ease;
        }
        .sc-wrapper:hover .sc-caption-cta {
          opacity: 1;
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .stories-topnav { padding: 0 20px; }
          .stories-topnav-links { gap: 16px; font-size: 10px; }
          .stories-page { padding: 40px 24px 56px; }
          .stories-grid { grid-template-columns: 1fr; gap: 28px; }
          .stories-footer { padding: 14px 20px; }
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .sc-card { transition: none; }
          .sc-wrapper:hover .sc-card { transform: none; }
          .sc-card::after { display: none; }
        }
      `}</style>

      <nav className="stories-topnav">
        <Link href="/" className="stories-topnav-brand">
          Ramble<span>On</span>
        </Link>
        <div className="stories-topnav-links">
          {[
            { href: "/", label: "Blog" },
            { href: "/stories", label: "Stories" },
            { href: "https://www.vishalbuilds.com/#projects", label: "Products" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={label === "Stories" ? "active" : undefined}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      <main className="stories-page">
        <header className="stories-header">
          <div className="stories-eyebrow">
            Vishal Gayakwar &nbsp;&middot;&nbsp; Products &amp; Automation
          </div>
          <h1 className="stories-title">Stories</h1>
          <p className="stories-subtitle">
            Long-form accounts of things I&rsquo;ve built, broken, and shipped.
            Told the way they actually happened.
          </p>
        </header>

        <div className="stories-count">
          {stories.length} {stories.length === 1 ? "story" : "stories"}
        </div>

        <div className="stories-grid">
          {(stories as Story[]).map((s) => (
            <Link key={s.slug} href={s.href} className="sc-wrapper">
              {/* Visual card */}
              <div
                className="sc-card"
                style={
                  {
                    background: s.bg,
                    ["--sc-accent"]: s.accent,
                    ["--sc-tag-text"]: s.tagText,
                  } as React.CSSProperties
                }
              >
                <span className="sc-tag">{s.category}</span>
                {VISUALS[s.visual] ?? null}
              </div>

              {/* Caption below — Pudding style */}
              <div className="sc-caption">
                <div className="sc-caption-title">{s.title}</div>
                <div className="sc-caption-kicker">{s.kicker}</div>
                <div className="sc-caption-meta">
                  {s.category} &nbsp;&middot;&nbsp; {s.date}
                  <span className="sc-caption-cta">Read story &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="stories-footer">
        <Link href="/" className="stories-footer-brand">
          Ramble<span>On</span>
        </Link>
        <div style={{
          fontFamily: "ui-monospace, 'Cascadia Code', monospace",
          fontSize: 10,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#8A8A85",
        }}>
          Made by Vishal
        </div>
        <div className="stories-footer-links">
          <a href="https://vishalbuilds.com/about" target="_blank" rel="noopener noreferrer">About</a>
          <a href="https://www.linkedin.com/in/vishalgayakwar/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:vgvishal31@gmail.com">Email</a>
        </div>
      </footer>
    </>
  );
}
