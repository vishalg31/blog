# Ramble On — Blog Author Guide

## Folder Structure

```
posts/
├── builder/        ← Builder Journey articles
├── cricket/        ← Cricket articles
└── movies/         ← Movies articles

public/blog/
├── builder/        ← Images for builder posts
├── cricket/        ← Images for cricket posts
└── movies/         ← Images for movies posts
```

---

## Creating a New Article

### Step 1 — Create the MDX file

Create a new `.mdx` file in the correct category folder.
Example: `posts/builder/my-new-post.mdx`

Use this frontmatter template at the top:

```mdx
---
title: "Your Post Title"
slug: "your-post-title"
date: 2026-05-01
category: builder
tags: [tag1, tag2, tag3]
description: "One sentence summary of the post."
ogImage: "/blog/builder/your-image.jpg"
---

Your content starts here.
```

**Rules:**
- `slug` must match the filename (e.g. `my-new-post.mdx` → `slug: "my-new-post"`)
- `category` must be one of: `builder`, `cricket`, `movies`
- `ogImage` is optional — if missing, an auto-generated image is used
- `readingTime` is auto-calculated, do not add it manually

---

## Writing Content

Standard markdown works. Key patterns:

### Headings
```mdx
## Section Title
### Subsection
```

### Bold / Italic
```mdx
**bold text**
*italic text*
```

### Blockquote (styled as pull quote)
```mdx
> This becomes a styled pull quote in the article.
```

### Adding an Image
1. Drop the image file into `public/blog/[category]/` (e.g. `public/blog/builder/my-image.jpg`)
2. In the MDX file:
```mdx
![Alt text describing the image](/blog/builder/my-image.jpg)
```

### Image with Caption + Hyperlink
```mdx
![Alt text](/blog/builder/my-image.jpg)

*Caption text — <a href="https://your-link.com" target="_blank" rel="noopener noreferrer">Link Text</a>*
```

### Hyperlink in text
```mdx
[Link text](https://example.com)
```

### Hyperlink that opens in new tab (use HTML inside MDX)
```mdx
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Link Text</a>
```

---

## Updating an Existing Article

1. Open the `.mdx` file in `posts/[category]/`
2. Edit the content directly
3. Update the `date` field if you want it to re-sort to the top
4. **Do not change the `slug`** — it will break the URL

---

## Renaming an Article

If you want a new URL:
1. Rename the `.mdx` file
2. Update `slug` in the frontmatter to match the new filename
3. Update `ogImage` path if needed

---

## Testing Locally

```bash
cd "c:/Users/gyvsh/Desktop/New folder (2)/vishal-lab/apps/blog"
npm run dev
```

Open `http://localhost:3000`

---

## Copying to Git Folder

Run the publish script — it copies everything (excluding node_modules, .next, scripts, claude.md):

```bash
cd "c:/Users/gyvsh/Desktop/New folder (2)/vishal-lab/apps/blog"
node scripts/publish-post.js
```

This auto-copies to `vishal-git/blog/`, commits, and pushes to GitHub.

**Or copy manually:**
```bash
# Copy a single changed file
cp "vishal-lab/apps/blog/posts/builder/my-new-post.mdx" "vishal-git/blog/posts/builder/my-new-post.mdx"

# Copy a new image
cp "vishal-lab/apps/blog/public/blog/builder/my-image.jpg" "vishal-git/blog/public/blog/builder/my-image.jpg"
```

---

## Pushing to GitHub (and Vercel)

```bash
cd "c:/Users/gyvsh/Desktop/New folder (2)/vishal-git/blog"
git add .
git commit -m "post: Your Post Title"
git push
```

Vercel deploys automatically after push. Live at **blog.vishalbuilds.com** within ~1 minute.

---

## Currently Building Sidebar

To update the "Currently Building" section, edit:
```
vishal-lab/apps/blog/components/CurrentlyBuilding.tsx
```

Change the `PROJECTS` array — update progress %, status, or add/remove projects.
Then copy to git:
```bash
cp "vishal-lab/apps/blog/components/CurrentlyBuilding.tsx" "vishal-git/blog/components/CurrentlyBuilding.tsx"
```

---

## Quick Reference

| Task | Where |
|------|--------|
| New post | `posts/[category]/new-file.mdx` |
| Post images | `public/blog/[category]/image.jpg` |
| Update sidebar | `components/CurrentlyBuilding.tsx` |
| Git folder | `vishal-git/blog/` |
| Live URL | `https://blog.vishalbuilds.com` |
| GitHub repo | `https://github.com/vishalg31/blog` |
