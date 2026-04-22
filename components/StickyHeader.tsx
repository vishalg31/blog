"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StickyHeader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastY && currentY > 80) {
        setVisible(true);
      } else if (currentY > lastY || currentY <= 80) {
        setVisible(false);
      }
      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "#FFFFFF",
        borderBottom: "1px solid #E8E0D8",
        boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.25s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        height: 48,
      }}
    >
      <Link
        href="/"
        style={{
          fontSize: 18,
          fontWeight: 800,
          color: "#1A1714",
          fontFamily: "var(--font-playfair, Georgia, serif)",
          letterSpacing: "-0.02em",
          textDecoration: "none",
        }}
      >
        Ramble<span style={{ color: "#4A0B48" }}>On</span>
      </Link>

      <nav
        style={{
          display: "flex",
          gap: 24,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {[
          { href: "https://vishalbuilds.com", label: "Home" },
          { href: "/", label: "Blog" },
          { href: "https://vishalbuilds.com/products", label: "Products" },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={{ color: "#6B5E54", textDecoration: "none" }}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
