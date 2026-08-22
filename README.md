# Nathan Frank — Personal Website

> Engineering & AI/ML leader turning complex platforms into well-governed, widely adopted products.

[![Deploy to GitHub Pages](https://github.com/nrfrank/nrfrank.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/nrfrank/nrfrank.github.io/actions/workflows/deploy.yml)

**Live Site**: [nrfrank.github.io](https://nrfrank.github.io)

## Overview

A modern, fast, and maintainable personal website built with the Dante Astro theme. Designed to showcase Nathan's expertise in enterprise ML platform leadership with a clean, minimal aesthetic that emphasizes content and readability.

## Tech Stack & Features

### Core Technologies

- **[Dante Astro Theme](https://github.com/JustGoodUI/dante-astro-theme)** - Minimal portfolio/blog theme
- **[Astro 5.5+](https://astro.build)** - Modern static site generator with islands architecture
- **[Tailwind CSS 4.0+](https://tailwindcss.com)** - Utility-first CSS with new CSS-first architecture
- **[MDX](https://mdxjs.com/)** - Markdown with JSX support for rich content pages

### Key Features

- **🌙 Dark Mode** - Class-based dark mode with localStorage persistence
- **📱 Responsive Design** - Mobile-first approach with clean card layouts
- **⚡ Performance Optimized** - Static generation with minimal JavaScript
- **🔍 SEO Ready** - Schema markup, meta tags, and sitemap generation
- **🚀 GitHub Pages** - Automated deployment with GitHub Actions
- **♿ Accessible** - Semantic HTML and proper contrast ratios

### Brand Identity

- **Accent Color**: `#1E477B` (confident blue)
- **Typography**: Inter Variable (sans-serif) + Newsreader Variable (serif)
- **Design Philosophy**: Minimal, content-focused with confident, plain-spoken tone
- **Layout**: Clean typography, generous whitespace, focus on readability

## Quick Start

### Prerequisites

- Node.js 22+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/nrfrank/nrfrank.github.io.git
cd nrfrank.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see the site in development mode.

### Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run format   # Format code with Prettier
```

## Project Architecture

### Directory Structure

```
├── src/
│   ├── components/         # Dante theme components
│   │   ├── Header.astro   # Site header with navigation
│   │   ├── Footer.astro   # Site footer with social links
│   │   ├── Hero.astro     # Homepage hero section
│   │   ├── Button.astro   # Styled button component
│   │   └── ThemeToggle.astro # Dark/light mode toggle
│   ├── data/
│   │   └── site-config.ts # Site configuration and metadata
│   ├── layouts/
│   │   └── BaseLayout.astro # Main layout with SEO
│   ├── pages/             # File-based routing
│   │   ├── index.astro    # Homepage
│   │   ├── blog/          # Blog collection pages
│   │   ├── projects/      # Projects collection pages
│   │   └── [...id].astro  # Dynamic pages (about, contact, etc.)
│   ├── content/           # Content collections
│   │   ├── blog/          # Blog posts (empty, ready for content)
│   │   ├── projects/      # Projects (empty, ready for content)
│   │   └── pages/         # Static pages content
│   └── styles/
│       └── global.css     # Tailwind CSS and theme styles
├── public/
│   ├── favicon.svg        # Site favicon
│   └── resume.pdf         # Downloadable resume
└── .github/workflows/
    └── deploy.yml         # GitHub Pages deployment
```

### Theme Architecture

- **BaseLayout.astro**: Main layout with SEO optimization and consistent structure
- **Hero.astro**: Homepage component with bio and call-to-action buttons
- **site-config.ts**: Centralized configuration for site metadata, navigation, and content
- **Content Collections**: Astro's type-safe content management for blog posts and projects

### Styling Approach

- **Tailwind CSS 4.0**: New CSS-first architecture with @theme directive
- **CSS Custom Properties**: Theme colors defined in `:root` and `html.dark`
- **Design tokens**: Accent color (#1E477B) and typography system
- **Dark mode**: Automatic theme switching with localStorage persistence

## Content Management

### Adding Projects

Create markdown files in `/src/content/projects/` with this frontmatter:

```yaml
---
title: 'Project Title'
description: 'Brief description of the project'
publishDate: '2024-01-01'
isFeatured: true
seo:
  image:
    src: '/project-image.jpg'
    alt: 'Project description'
---
Project content goes here in markdown format.
```

### Adding Blog Posts

Create markdown files in `/src/content/blog/` with this frontmatter:

```yaml
---
title: 'Blog Post Title'
description: 'Brief description'
publishDate: '2024-01-01'
isFeatured: false
tags: ['tag1', 'tag2']
seo:
  image:
    src: '/post-image.jpg'
    alt: 'Post description'
---
Blog post content in markdown format.
```

### Adding Static Pages

1. Create markdown files in `/src/content/pages/`
2. Use this frontmatter structure:
   ```yaml
   ---
   title: 'Page Title'
   description: 'Page description'
   seo:
     title: 'SEO Title'
     description: 'SEO description'
   ---
   ```
3. Content is automatically available at `/{filename}`

### Site Configuration

Edit `/src/data/site-config.ts` to update:

- Site metadata (title, description, URL)
- Navigation links
- Social media links
- Hero section content

## Development

### Customization

- **Colors**: Update CSS custom properties in `/src/styles/global.css`
- **Typography**: Fonts defined using @fontsource-variable imports
- **Layout**: Edit `/src/layouts/BaseLayout.astro` for site-wide changes
- **Site Config**: Update `/src/data/site-config.ts` for metadata and navigation

### Component Development

- Use TypeScript interfaces for props when beneficial
- Follow Astro's component patterns
- Maintain responsive design principles
- Test in both light and dark modes

### Content Guidelines

- **Writing tone**: Confident, plain-spoken, professional
- **Metrics**: Use specific numbers and outcomes
- **Links**: Always include descriptive labels
- **Dates**: Use ISO format (YYYY-MM-DD) for consistency

## Deployment

### GitHub Pages (Automatic)

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch:

1. **Build Process**: GitHub Actions runs `npm ci && npm run build`
2. **Deployment**: Uploads the `dist/` folder to GitHub Pages
3. **Domain**: Available at `nrfrank.github.io`

### Manual Deployment

```bash
npm run build    # Generates dist/ folder
# Upload dist/ contents to your hosting provider
```

### Custom Domain (Optional)

1. Add `CNAME` file to `/public/` with your domain
2. Configure DNS records with your domain provider
3. Enable custom domain in GitHub Pages settings

## Maintenance

### Regular Updates

- **Dependencies**: Run `npm audit` and update packages quarterly
- **Content**: Update talks, case studies, and resume as needed
- **Performance**: Monitor Core Web Vitals and optimize as necessary

### Content Workflow

1. Create/edit content files in appropriate directories
2. Test locally with `npm run dev`
3. Commit and push to trigger automatic deployment
4. Verify changes on live site

### Performance Considerations

- **Images**: Optimize images before adding to `/public/assets/`
- **PDFs**: Keep slide decks under 10MB when possible
- **Build size**: Monitor bundle size with `npm run build`
- **Lighthouse**: Regularly check performance scores

## Contributing

This is a personal website, but contributions for bug fixes or improvements are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source under the MIT License. Feel free to use it as inspiration for your own site, but please don't copy the personal content.

---

Built with ❤️ using [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com), and [MDX](https://mdxjs.com).
