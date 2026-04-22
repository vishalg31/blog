import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "posts");

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  description: string;
  ogImage: string;
  readingTime: number;
  content: string;
};

export type Category = "builder" | "cricket" | "movies";

const CATEGORIES: Category[] = ["builder", "cricket", "movies"];

export const CATEGORY_LABELS: Record<Category, string> = {
  builder: "Builder Journey",
  cricket: "Cricket",
  movies: "Movies",
};

export const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  builder:
    "Raw, honest dispatches from building products alone. The wins, the pivots, the things I wish someone had told me.",
  cricket:
    "Analysis, opinions, and love letters to the sport. IPL, Test cricket, and everything in between.",
  movies:
    "Some films hit different when you're a builder. Essays on cinema that rewired how I think.",
};

function calcReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function parsePost(filePath: string, category: string): Post {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug: data.slug || path.basename(filePath, ".mdx"),
    title: data.title || "",
    date: data.date ? String(data.date) : "",
    category: data.category || category,
    tags: Array.isArray(data.tags) ? data.tags : [],
    description: data.description || "",
    ogImage: data.ogImage || "",
    readingTime: calcReadingTime(content),
    content,
  };
}

export function getAllPosts(): Post[] {
  const posts: Post[] = [];

  for (const category of CATEGORIES) {
    const dir = path.join(POSTS_DIR, category);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      posts.push(parsePost(path.join(dir, file), category));
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getPostBySlug(
  category: string,
  slug: string
): Post | undefined {
  return getAllPosts().find((p) => p.category === category && p.slug === slug);
}

export function getAllCategories(): Category[] {
  return CATEGORIES;
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
