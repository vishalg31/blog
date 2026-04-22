import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

const CATEGORY_LABELS: Record<string, string> = {
  builder: "Builder Journey",
  cricket: "Cricket",
  movies: "Movies",
};

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Ramble On";
  const category = searchParams.get("category") ?? "";
  const catLabel = CATEGORY_LABELS[category] || category;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: "#4A0B48",
          }}
        />
        {catLabel ? (
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#4A0B48",
              marginBottom: 32,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {catLabel}
          </div>
        ) : null}
        <div
          style={{
            fontSize: title.length > 60 ? 48 : 60,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#1A1714",
            flex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #D9CFC3",
            paddingTop: 24,
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 800, color: "#1A1714", display: "flex" }}>
            <span>Ramble</span>
            <span style={{ color: "#4A0B48" }}>On</span>
          </div>
          <div
            style={{
              fontSize: 14,
              color: "#A89A8E",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            rambleon.vishalbuilds.com
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
