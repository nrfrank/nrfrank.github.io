---
name: media-updates
description: >-
  Add, update, or audit media appearances, talks, panels, podcasts, and workshops on the personal site.
  Use when adding new speaking engagements, managing media content collections in src/content/media/,
  or optimizing and placing speaking photos in public/.
---

# Media Updates Skill

This skill guides the creation, editing, and maintenance of speaking engagements and media appearances on Nathan Frank's personal site (`nrfrank.github.io`).

---

## 1. Architecture Overview

- **Content Collection**: All entries live in `src/content/media/*.md` and are typed via the `media` schema in `src/content.config.ts`.
- **Media Listing Page (`/media`)**:
  - Rendered by `src/pages/media.astro`.
  - Displays entries sorted in **reverse chronological order** using `src/components/MediaCard.astro`.
  - Features an anchor link ID matching the markdown file slug (`#<id>`).
- **Homepage Integration (`/`)**:
  - Rendered by `src/pages/index.astro`.
  - Displays entries where `isFeatured: true` using `src/components/MediaPreview.astro`.
  - Links directly to `/media#<id>`.
  - **Design rule**: Homepage previews are strictly typographic and minimal—they do **not** render inline images.

---

## 2. Visual Hierarchy & Image Guidelines

### Selective Visual Anchoring

- **Do not put images on every card.** Adding images to all entries clutters the list and turns the page into an image gallery, diluting the editorial focus.
- Reserve in-card images for the **latest flagship appearance** or standout milestone at the top of the timeline.
- As new major talks or panels are added, re-evaluate whether to rotate the in-card image to the new top entry.

### Hero vs. Card Image Differentiation

- **Top Hero Image (`/speaking-solo-gtg.jpg`)**: A solo stage/podium shot with clicker in hand. Establishes Nathan's personal authority as a speaker and workshop leader.
- **Card Image (`/speaking-ai-infra-summit-panel.jpg`)**: An active panel discussion shot showing Nathan speaking alongside industry peers, with backdrop and summit branding. Establishes executive credibility and panel collaboration.
- This contrast demonstrates range (solo keynotes vs. high-level executive panels).

### Image Specs & Placement

- **Aspect Ratio**: Always prefer **3:2 or 16:9 landscape** images for media cards. Avoid portrait/vertical images in cards, as they create excessive vertical push on mobile screens.
- **Optimization Standard**:
  - Width: `1600px` (or max width `1920px`) for high-DPI/Retina crispness.
  - Format: Web-optimized JPEG (quality ~85) or WebP.
  - File size: target under `500KB` (typically 200–350KB).
  - Storage: Store directly in `/public/` with descriptive kebab-case naming (e.g. `public/speaking-<event>-<panel|solo>.jpg`).
  - Helper command:
    ```bash
    sips -s format jpeg -s formatOptions 85 -Z 1600 "/path/to/source.jpg" --out "public/speaking-<name>.jpg"
    ```
- **Alt Text**: Descriptive and contextual (e.g. `"Nathan Frank speaking on the Scaling AI in Practice panel at AI Infra Summit"`).

### Media Format Diversity

Create visual interest across the chronological timeline by varying formats:

- **Still photo card** (e.g., AI Infra Summit)
- **Interactive video clip embed** (e.g., Tech in Motion Chicago using `video: { url, startTime, endTime, label }`)
- **Podcast external link** (e.g., MLOps Community)
- **Clean text-only cards** (e.g., GTG Tech workshops and talks)

---

## 3. Creating a New Media Entry

Create a new file in `src/content/media/<kebab-case-slug>.md`.

### Frontmatter Schema Reference

```markdown
---
title: 'Exact Title of Talk or Panel'
description: '1-2 sentence high-level summary of the talk or discussion.'
date: YYYY-MM-DD
venue: 'Event or Host Name' # e.g. "AI Infra Summit", "Tech in Motion Chicago", "MLOps Community"
type: 'panel' # 'talk' | 'podcast' | 'interview' | 'workshop' | 'panel'
url: 'https://...' # Direct event or session URL (optional)
topics:
  - 'Topic 1'
  - 'Topic 2'
audience: '1-sentence describing the intended target audience.'
isFeatured: true # true if it should appear on the homepage 'Speaking & Media' list
image: '/speaking-my-event.jpg' # Optional: path in /public/ (use selectively)
imageAlt: 'Nathan Frank speaking at...' # Required if image is provided
video: # Optional: for YouTube clips
  url: 'https://www.youtube.com/watch?v=...'
  startTime: '36:29' # optional start timestamp
  endTime: '37:40' # optional end timestamp
  label: 'Watch Panel Clip'
seo:
  title: 'Nathan Frank - Event Title'
  description: '15-160 character description for search engines.'
  image:
    src: '/speaking-my-event.jpg'
    alt: 'Nathan Frank speaking at...'
---

### [Panel/Talk/Workshop] Overview

Detailed overview of the event, context, and background.

**_Key topics & takeaways_**

- **Takeaway 1**: Core insight or architectural principle discussed.
- **Takeaway 2**: Practical trade-offs or lesson learned.
- **Takeaway 3**: Advice for practitioners or engineering leaders.
```

### Date Handling Rules

- Always specify dates in `YYYY-MM-DD` ISO format.
- `src/components/FormattedDate.astro` renders with `timeZone: 'UTC'` to prevent local negative time zone offsets from shifting calendar dates back by one day.

---

## 4. Verification & Testing Procedure

After adding or modifying any media entry or asset:

```bash
# 1. Run unit test suite
npm test

# 2. Verify Astro static build and content collection schema
ASTRO_TELEMETRY_DISABLED=1 npm run build

# 3. Check code formatting and linting
npm run lint:check
npm run format:check
```

### Manual Visual Verification

1. Run `npm run dev` and open `http://localhost:4321/media`.
2. Check that the new entry sits in the correct reverse-chronological position.
3. Verify that images render crisply, tags render as pills, and external links open in a new tab with the proper label.
4. If `isFeatured: true`, check `http://localhost:4321/` to confirm it appears at the top of "Speaking & Media" and deep-links to `/media#<id>`.
