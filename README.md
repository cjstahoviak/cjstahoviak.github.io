# cjstahoviak.github.io

Personal portfolio and blog — built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com).

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Adding Blog Posts

Create a new Markdown file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "A short summary of the post."
date: 2026-04-01
tags: ["robotics", "python"]
---

Your content here. Standard Markdown is supported.
```

The post will automatically appear on the blog index page and get its own URL at `/blog/<filename>`.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── content/
│   └── blog/       # Blog posts (Markdown)
├── layouts/        # Page layouts (Base, BlogPost)
├── pages/          # Route pages
│   ├── index.astro
│   ├── about.astro
│   ├── projects.astro
│   ├── publications.astro
│   └── blog/
└── styles/         # Global CSS + Tailwind theme
public/             # Static assets (images, resume PDF)
```

## Deployment

Pushes to `main` automatically deploy to GitHub Pages via the workflow in `.github/workflows/deploy.yml`.

To set up GitHub Pages:

1. Go to **Settings > Pages** in your repository.
2. Under **Build and deployment**, select **GitHub Actions** as the source.
3. Push to `main` and the site will deploy automatically.
