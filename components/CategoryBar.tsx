import Link from "next/link";
import { CATEGORY_LABELS, type Category } from "@/lib/posts";

interface Props {
  active?: Category | "home";
}

const categories: Category[] = ["builder", "cricket", "movies"];

export default function CategoryBar({ active }: Props) {
  return (
    <nav className="category-nav">
      <Link
        href="/"
        className={`cat-tab${active === "home" ? " active" : ""}`}
      >
        All Posts
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat}
          href={`/${cat}`}
          className={`cat-tab${active === cat ? " active" : ""}`}
        >
          {CATEGORY_LABELS[cat]}
        </Link>
      ))}
      <div className="cat-spacer" />
    </nav>
  );
}
