import { getAllPosts, getAllCategories } from "@/lib/posts";
import type { MetadataRoute } from "next";

const BASE = "https://blog.vishalbuilds.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const categories = getAllCategories();

  const postEntries = posts.map((post) => ({
    url: `${BASE}/${post.category}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryEntries = categories.map((cat) => ({
    url: `${BASE}/${cat}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...categoryEntries,
    ...postEntries,
  ];
}
