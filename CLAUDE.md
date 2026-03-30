# Project: cjstahoviak.github.io

Personal portfolio and blog for Calvin Stahoviak — roboticist and computer scientist. Deployed to GitHub Pages at `https://cjstahoviak.github.io`.

---

## Tech Stack

- **Framework:** Astro 5 (static site generation, zero JS by default)
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite` plugin — no `tailwind.config` file, all theming lives in `src/styles/global.css` using `@theme` directives)
- **Language:** TypeScript throughout
- **Content:** Astro content collections with glob loader for blog posts (Markdown in `src/content/blog/`)
- **Deployment:** GitHub Actions → GitHub Pages (`.github/workflows/deploy.yml`)
- **Fonts:** Google Fonts (Inter + JetBrains Mono), loaded via `<link>` in BaseLayout

### Key architectural decisions

- **No JS frameworks.** All interactivity (theme toggle, typing effect, mobile nav) is vanilla JS in `<script>` tags within Astro components. Astro only ships JS for these hydrated scripts.
- **CSS custom properties for theming**, not Tailwind's `dark:` variant. Colors are defined as CSS variables in `@theme` and overridden via `html.light` selectors. This means most components use inline `style` attributes referencing `var(--color-*)` rather than Tailwind utility classes for colors.
- **Tailwind v4 uses `@theme` blocks** in CSS instead of a `tailwind.config.js` file. All theme tokens (colors, fonts) are in `src/styles/global.css`.
- **Content collections** use Astro 5's glob loader API. Config is at `src/content.config.ts` (not `src/content/config.ts`). Blog posts use `post.id` for routing (not `post.slug`).

---

## Design System

### Philosophy

Swiss-grid minimalism with a computer terminal aesthetic. Precision-engineered, not generic dark-mode tech. Think: Teenage Engineering product interfaces, Vercel's branding, Warp terminal's marketing site, Designer's Republic / Wipeout visual identity, Mirror's Edge environmental design.

**Key principles:**
- Typography as a graphic element — large, bold, tight-tracked mono headings
- Strict grid-based layouts with visible structure and deliberate negative space
- Geometric shapes (lines, rectangles, circles) as intentional decorative elements
- Terminal-inspired touches done tastefully — cursor blinks, mono labels, code-like formatting
- Fast, subtle animations (fade-in, slide-up) — never slow or heavy
- Professional but not corporate tone

### Color Palette

All colors are defined as CSS custom properties in `src/styles/global.css` under the `@theme` block.

**Accent colors (same in both modes):**
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-accent-blue` | `#0066FF` | Primary accent — links, CTAs, active states, timeline dots |
| `--color-accent-coral` | `#FF3366` | Secondary accent — alternate timeline entries, demo links, decorative elements |
| `--color-accent-yellow` | `#CCFF00` | Tertiary accent — status indicators, "active" badges, terminal dots |

**Dark mode (default):**
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#0A0A0A` | Page background |
| `--color-surface` | `#141414` | Cards, elevated panels, code blocks |
| `--color-elevated` | `#1E1E1E` | Tags, nested surfaces |
| `--color-border` | `#2A2A2A` | Borders, dividers, timeline lines |
| `--color-text` | `#FAFAFA` | Primary text |
| `--color-text-secondary` | `#999999` | Body text, descriptions, muted labels |

**Light mode** (activated by `html.light` class):
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg-light` | `#F5F5F0` | Page background (warm off-white) |
| `--color-surface-light` | `#FFFFFF` | Cards |
| `--color-elevated-light` | `#EEEEE9` | Tags, nested surfaces |
| `--color-border-light` | `#D4D4D0` | Borders |
| `--color-text-light` | `#0A0A0A` | Primary text |
| `--color-text-secondary-light` | `#525252` | Body text |

**Important:** Light mode is NOT just an inverted dark mode. It uses warm off-whites (`#F5F5F0`, `#EEEEE9`) rather than pure white, and the accent colors remain unchanged.

### Typography

| Role | Font | Weight | Notes |
|------|------|--------|-------|
| Headings | JetBrains Mono | 700 | Tight tracking (`tracking-tight` / `tracking-tighter`). Used for all `h1`–`h4`, nav links, labels, dates, tags, terminal text |
| Body | Inter | 400–500 | Standard line height. Used for paragraphs, descriptions |
| Code/Terminal | JetBrains Mono | 400 | Used in code blocks, the terminal stats block, status labels |

Tailwind tokens: `font-mono` → JetBrains Mono, `font-sans` → Inter.

### Component Patterns

**Cards** (ProjectCard, publication entries, award cards, blog post links):
- Background: `var(--color-surface)`, border: `var(--color-border)`, rounded-lg
- Hover: `hover:-translate-y-1` with transition
- Accent line on hover: bottom border that scales in from left (`scale-x-0 → scale-x-100`)
- Status dots: small colored circles (yellow=active, green=published, gray=completed)

**Timeline entries** (experience, education):
- Left-aligned with a vertical line and dot markers
- Dots have a border in the accent color with a fill that scales in on hover
- Alternating accent colors per entry (blue → coral → yellow)

**Tags/badges:**
- Small mono text, `var(--color-elevated)` background with `var(--color-border)` border
- Used consistently across projects, blog posts, publications

**Section headers:**
- `text-3xl md:text-5xl font-mono font-bold tracking-tight`
- Often followed by a short colored bar (`h-1 w-16 rounded`) in an accent color
- Subtitle in `var(--color-text-secondary)`

**The terminal block** (homepage):
- Mimics a terminal window with three colored dots (coral, yellow, green)
- Monospaced text with `$` prompt in accent-blue
- Cursor blink animation at the end

### Dark/Light Mode Implementation

- Default is **dark** mode (`html` has class `dark`)
- Toggle adds/removes `light` class on `<html>`
- Preference is persisted to `localStorage` under key `theme`
- A blocking inline script in `<head>` reads localStorage before paint to prevent flash
- Components reference `var(--color-*)` tokens; light mode overrides use `html.light` CSS selectors
- Theme toggle icons swap between sun (dark mode) and moon (light mode)
- Both `initThemeToggle` and `initTypingEffect` re-run on `astro:after-swap` for View Transitions compatibility

### Animations

- `animate-fade-in`: opacity 0→1, 0.6s ease-out
- `animate-slide-up`: opacity 0→1 + translateY(1.5rem→0), 0.6s ease-out
- `cursor-blink`: `::after` pseudo-element with `█` character, 1s step blink in accent-blue
- Staggered delays via inline `animation-delay` + `opacity: 0` (animation fills forward)
- Hover transitions: `transition-all duration-200` or `duration-300`
- No heavy or slow animations — everything should feel snappy

### Grid & Layout

- Max content width: `max-w-6xl` (72rem / 1152px) centered with `mx-auto px-6`
- Grid backgrounds: subtle 4rem × 4rem grid lines at 30% opacity (`.grid-overlay`)
- Geometric decoration: rotated border rectangles, small filled circles/squares, positioned absolutely
- Responsive: mobile-first, breakpoints at `sm:`, `md:`, `lg:`
- Navigation: fixed top bar with backdrop blur, 16 (h-16) height

---

## File Structure

```
src/
├── components/
│   ├── Navigation.astro    # Fixed top nav with mobile menu
│   ├── Footer.astro        # Site footer with links and contact
│   ├── ThemeToggle.astro   # Dark/light mode toggle button
│   ├── TypingEffect.astro  # Typing animation (accepts phrases array)
│   ├── ProjectCard.astro   # Project display card with tags, links, status
│   ├── TimelineEntry.astro # Timeline item for experience/education
│   └── SkillCategory.astro # Labeled group of skill tags
├── content/
│   └── blog/               # Markdown blog posts
├── content.config.ts       # Astro 5 content collection schema
├── layouts/
│   ├── BaseLayout.astro    # Root layout (head, nav, footer, fonts, meta)
│   └── BlogPostLayout.astro # Blog post wrapper with header and back link
├── pages/
│   ├── index.astro         # Home — hero, featured projects, terminal block
│   ├── about.astro         # Bio, skills, experience, education, awards
│   ├── projects.astro      # Project card grid
│   ├── publications.astro  # Publication list with citation formatting
│   └── blog/
│       ├── index.astro     # Blog index (sorted by date)
│       └── [id].astro      # Individual blog post (dynamic route)
├── styles/
│   └── global.css          # Tailwind v4 @theme, base styles, animations, prose
└── env.d.ts
public/
├── calvin_stahoviak.jpg    # Headshot
├── Calvin_Stahoviak_Resume.pdf
├── Calvin_Stahoviak_CV.pdf
└── favicon.svg             # Geometric "C" favicon
```

---

## Content Management

### Adding a blog post

Create `src/content/blog/<slug>.md` with frontmatter:

```markdown
---
title: "Post Title"
description: "Short summary."
date: 2026-04-01
tags: ["robotics", "python"]
---

Content here.
```

The post auto-appears on `/blog` and is routed to `/blog/<slug>`.

### Blog post schema

Defined in `src/content.config.ts`:
- `title`: string (required)
- `description`: string (required)
- `date`: coerced Date (required)
- `tags`: string array (optional)

### Prose styling

Blog post content is rendered inside a `<div class="prose">` container. Prose styles are defined in `src/styles/global.css` (not via `@tailwindcss/typography` — they're handwritten to match the design system).

---

## Commands

```bash
npm run dev      # Dev server at http://localhost:4321
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
```

---

## Conventions

- **No JS frameworks** — keep interactivity in vanilla `<script>` tags
- **Color via CSS variables** — use `var(--color-*)` in `style` attributes, not Tailwind color utilities (e.g., `text-red-500`), for any color that should respond to the theme
- **Tailwind for layout/spacing** — use utility classes for margins, padding, flex, grid, responsive breakpoints, font sizing, etc.
- **Monospaced elements** — dates, tags, status labels, navigation links, section subtitles should all use `font-mono`
- **Accent color rotation** — when listing multiple timeline entries or categories, cycle through blue → coral → yellow for visual variety
- **Status indicators** — small colored dots: yellow = active/in-progress, green = published/complete, gray = archived
- **Hover effects** — cards lift (`hover:-translate-y-1`), links color-shift to accent-blue, accent underlines scale in from left
- **Animation stagger** — hero elements use incremental `animation-delay` (0s, 0.15s, 0.3s, 0.45s) with initial `opacity: 0`
