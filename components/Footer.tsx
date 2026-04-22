import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <Link href="/" className="footer-brand">
        Ramble<span>On</span>
      </Link>
      <div className="footer-copy">© 2026 · Ramble On by Vishal Gayakwar</div>
      <div className="footer-socials">
        <a href="https://vishalbuilds.com/about" target="_blank" rel="noopener noreferrer">
          About
        </a>
        <a href="https://www.linkedin.com/in/vishalgayakwar/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="mailto:vgvishal31@gmail.com">Email</a>
      </div>
    </footer>
  );
}
