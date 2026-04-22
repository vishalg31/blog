import Link from "next/link";

const PROJECTS = [
  {
    name: "Tailor",
    desc: "A product to refine CVs based on job descriptions using AI, helping applications feel more targeted, structured, and useful.",
    progress: 40,
    status: "Active · In progress",
    url: null,
  },
  {
    name: "This Blog",
    desc: "Rebuilding from scratch — custom Next.js, MDX, newspaper design.",
    progress: 85,
    status: "Active · v0.1",
    url: null,
  },
  {
    name: "InvestCore",
    desc: "A smart investment calculator for SIPs, FDs, and goal planning.",
    progress: 100,
    status: "Completed · Live",
    url: "https://invest.vishalbuilds.com/",
  },
];

export default function CurrentlyBuilding() {
  return (
    <div className="building-strip">
      <div className="building-header">
        <div className="live-dot" />
        <h3>Currently Building</h3>
      </div>
      {PROJECTS.map((p) => (
        <div className="building-item" key={p.name}>
          <div className="building-name">
            {p.url ? (
              <Link
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#4A0B48", textDecoration: "none", borderBottom: "1px solid rgba(74,11,72,0.3)" }}
              >
                {p.name} ↗
              </Link>
            ) : (
              p.name
            )}
          </div>
          <div className="building-desc">{p.desc}</div>
          <div className="building-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${p.progress}%` }} />
            </div>
            <span className="progress-pct">{p.progress}%</span>
          </div>
          <div className="building-status">{p.status}</div>
        </div>
      ))}
      <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #D9CFC3", fontSize: 12, color: "#7A6A5E" }}>
        See all products I've built at my homepage{" "}
        <Link
          href="https://vishalbuilds.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#4A0B48", textDecoration: "none", borderBottom: "1px solid rgba(74,11,72,0.3)" }}
        >
          vishalbuilds.com ↗
        </Link>
      </div>
    </div>
  );
}
