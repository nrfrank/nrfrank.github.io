# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Nathan Frank's personal website built with the Dante Astro theme. It's deployed to GitHub Pages at nrfrank.github.io and focuses on showcasing Nathan's work as an enterprise ML platform leader with a clean, minimal aesthetic.

## Development Commands

- `npm run dev` - Start development server (localhost:4321)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run format` - Format code with Prettier

## Architecture

### Tech Stack
- **[Dante Astro Theme](https://github.com/JustGoodUI/dante-astro-theme)** - Minimal portfolio/blog theme
- **Astro 5.5+** - Static site generator with islands architecture
- **Tailwind CSS 4.0+** - Utility-first CSS with new CSS-first architecture
- **MDX** - Markdown with JSX support for content pages
- **GitHub Pages** - Static hosting with automated deployment

### Brand Identity
- **Accent Color**: #1E477B (defined as CSS custom properties)
- **Typography**: Inter Variable (sans-serif) + Newsreader Variable (serif)
- **Design**: Minimal, content-focused aesthetic with dark mode support
- **Theme**: Professional, confident, plain-spoken tone

### Project Structure

```
/src
  /components - Dante theme components (Header, Footer, Hero, Button, ThemeToggle)
  /data - Site configuration (site-config.ts)
  /layouts - Base layout with SEO optimization
  /pages - Route pages with dynamic routing
  /content - Content collections for blog posts and projects
  /styles - Global CSS with Tailwind 4.0 and theme styles
/public
  favicon.svg - Site favicon
  resume.pdf - Downloadable resume
```

### Key Components

- **BaseLayout.astro**: Main layout with SEO, schema markup, header/footer
- **Hero.astro**: Homepage hero with bio and call-to-action buttons
- **Button.astro**: Styled button component with accent colors
- **ThemeToggle.astro**: Dark/light mode switcher with localStorage persistence
- **site-config.ts**: Centralized configuration for all site metadata and content

### Content Management

Content is managed through Astro's Content Collections system:

**Projects** (`/src/content/projects/*.md`):
```yaml
---
title: "Project Title"
description: "Brief description"
publishDate: "2024-01-01"
isFeatured: true
seo:
  image:
    src: "/project-image.jpg"
    alt: "Project description"
---
```

**Blog Posts** (`/src/content/blog/*.md`):
```yaml
---
title: "Blog Post Title"
description: "Brief description"
publishDate: "2024-01-01"
isFeatured: false
tags: ["tag1", "tag2"]
seo:
  image:
    src: "/post-image.jpg"
    alt: "Post description"
---
```

**Static Pages** (`/src/content/pages/*.md`):
```yaml
---
title: "Page Title"
description: "Page description"
seo:
  title: "SEO Title"
  description: "SEO description"
---
```

### Styling System

- **Tailwind CSS 4.0**: New CSS-first architecture with @theme directive
- **CSS Custom Properties**: Theme colors defined in `:root` and `html.dark`
- **Design Tokens**: Accent color (#1E477B) integrated throughout
- **Dark Mode**: Automatic theme switching with system preference detection
- **Typography**: Professional serif/sans-serif combination from @fontsource-variable

### Site Configuration

All site settings are centralized in `/src/data/site-config.ts`:
- Site metadata (title, description, URL)
- Navigation structure (header and footer links)
- Social media links
- Hero section content
- Content pagination settings

### Deployment

Automated deployment via GitHub Actions to GitHub Pages:
- Triggers on pushes to `main` branch
- Builds with Node.js 20 and deploys to `dist/`
- Uses Astro's static file generation (`build: { format: 'file' }`)
- Requires Pages to be enabled in repository settings

### Development Notes

- All pages are statically generated at build time using Astro's Content Collections
- Empty content collections (blog/projects) are ready for future content
- Theme uses modern Tailwind CSS 4.0 with @theme and CSS custom properties
- Responsive design with mobile-first approach
- Professional minimal aesthetic emphasizes content over decoration
- Built-in RSS feed generation for blog content
- Comprehensive SEO optimization with schema markup

### Content Strategy

The site structure supports Nathan's professional brand:
- **Homepage**: Bio-focused with professional introduction
- **Projects**: Showcase of speaking engagements, case studies, technical work
- **Blog**: Platform for technical writing and thought leadership
- **Static Pages**: About, contact, and other supplementary content

Content should maintain a professional tone while showing the human side of technical leadership, following Nathan's "hybrid approach" to brand voice.