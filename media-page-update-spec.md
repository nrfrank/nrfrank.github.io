# Implementation Spec: Media Page Updates

**Site**: nrfrank.github.io
**Repo**: https://github.com/nrfrank/nrfrank.github.io
**Stack**: Astro 5.5+, MDX, Tailwind CSS 4.0, content collections
**Target file**: `src/content/pages/media.md` (or `.mdx` if it already uses MDX)

---

## 0. Add image assets

Add the following images to `/public/assets/` (or wherever `nathan-preview.jpg` currently lives — match the existing convention):

| Filename                    | Description                                                            |
| --------------------------- | ---------------------------------------------------------------------- |
| `speaking-solo-gtg.jpg`     | Close-up presenter shot, clicker in hand, expressive gesture           |
| `speaking-panel-mlops.jpg`  | Panel shot with MLflow/Spark/Streamlit logos visible on slide behind   |
| `speaking-audience-gtg.jpg` | Wide shot with audience silhouettes in foreground, presenter at podium |

These files will be provided separately. Do not generate or source them — just wire up the references.

---

## 1. Add a speaker bio section at the top of the page

Insert the following content **above** the existing "Topics I Cover" section. This should render as a short prose paragraph followed by the hero image.

**Bio text** (use exactly as written):

> I'm Nathan Frank — Director of ML Platform & Operations at Grainger, where I lead the teams and infrastructure that help data science, ML engineering, and analytics teams ship faster. My background spans astrophysics, sports technology, and enterprise ML platforms, which means I translate comfortably between researchers, engineers, and business stakeholders. I speak about production ML systems, enterprise AI adoption, and the organizational realities of scaling AI in large companies.

**Hero image** (place immediately after the bio paragraph):

- Source: `speaking-solo-gtg.jpg`
- Alt text: `"Nathan Frank speaking at GTG Tech Conference"`
- Display: full content width, consistent with how other images render in the theme

If the page currently renders a headshot (`nathan-preview.jpg`) near the top, **replace it** with `speaking-solo-gtg.jpg`. Do not show both.

---

## 2. Restructure the talk list into a single section

**Remove** the current two-section structure ("Featured Appearances" and "All Media").

**Replace** with a single section titled **"Talks & Appearances"**, in **reverse chronological order**:

---

### Talk entry structure

Each entry should include:

- Title (linked if a URL exists)
- Format + Venue + Date (e.g., "Panel at Tech in Motion Chicago • March 5, 2026")
- Description (1–2 sentences)
- Tags (match existing tag style)
- Audience line (match existing format)
- Optional: inline image (see per-entry notes below)

---

### Full ordered talk list

**1. Modernizing Legacy Systems with Applied AI**

- Format/Venue/Date: Panel at Tech in Motion Chicago • March 5, 2026
- Description: A panel discussion with Chicago tech leaders on driving AI innovation in legacy industries—scaling solutions, reshaping enterprise roles, and operating AI systems responsibly.
- Tags: Applied AI, Legacy Modernization, Enterprise AI, AI at Scale, Responsible AI
- Audience: Engineering leaders, architects, and technologists working in established enterprises looking to adopt and scale AI.
- Link: https://techinmotion.com/blog/bringing-legacy-tech-systems-into-the-age-of-ai
- Link label: View Panel
- Image: `speaking-audience-gtg.jpg` — place inline below the description
- Image alt: `"Nathan Frank presenting to a live audience at a tech conference"`

**2. Ctrl+F for the Enterprise: Because "Where Was That Again?" Shouldn't Be a Daily Question**

- Format/Venue/Date: Talk at GTG Tech Conference • August 19, 2025
- Description: Why centralized enterprise search matters and how to do it right. Introduces Onyx, an open-source, AI-powered search and assistant piloted at Grainger, with real-world deployment insights.
- Tags: Enterprise Search, AI Assistants, RAG, Knowledge Management, Onyx, Open Source
- Audience: Team leads, product managers, and technical stakeholders (platform/IT, data/ML, security/architecture) who want faster, trusted answers across internal tools, docs, and conversations.
- Link: https://sessionize.com/nathan-frank/
- Link label: View on Sessionize _(changed from "View Talk" — no direct recording exists)_
- Image: none

**3. Testing Patterns for Data and Machine Learning**

- Format/Venue/Date: Workshop at GTG Tech Conference • August 14, 2024
- Description: A hands-on workshop for Python data and ML practitioners on bringing software testing discipline to the PyData/PySpark stack. Covers sensible defaults, project setup, and real-world patterns.
- Tags: Testing Strategies, TDD, Python, Pandas/NumPy, PySpark, pytest, Data Validation, CI/CD
- Audience: Data scientists, ML engineers, and data engineers working in Python/PySpark who want practical, copy-pasteable testing patterns to improve quality and speed.
- Link: https://sessionize.com/nathan-frank/
- Link label: View on Sessionize _(changed from "View Talk" — no direct recording exists)_
- Image: none

**4. Challenges Operationalizing Machine Learning (And Some Solutions)**

- Format/Venue/Date: Talk at GTG Tech Conference • September 13, 2023
- Description: Demystifies MLOps by mapping it to proven DevOps and SRE practices while highlighting what is unique to machine learning. Covers workflow pitfalls, team communication, and simple starting points.
- Tags: MLOps, Production ML, SRE/DevOps, Team Collaboration
- Audience: Leaders and practitioners building and operating ML systems in production, including data scientists, ML engineers, product managers, SRE and DevOps teams.
- Link: https://sessionize.com/nathan-frank/
- Link label: View on Sessionize
- Image: `speaking-panel-mlops.jpg` — place inline below the description
- Image alt: `"Nathan Frank on a panel discussing MLOps tooling"`

**5. Challenges Operationalizing ML (And Some Solutions)**

- Format/Venue/Date: Podcast at MLOps Community • December 29, 2023
- Description: A concise guide to taking ML from experiment to production with an SRE/DevOps mindset. It clarifies what is unique to MLOps and how to start with paved road patterns that scale.
- Tags: MLOps, SRE/DevOps, Production ML, ML Engineering, Team Dynamics, DevX
- Audience: Engineering leaders, ML platform teams, and DS/MLEs shipping models at scale.
- Link: https://home.mlops.community/public/videos/challenges-operationalizing-ml-and-some-solutions
- Link label: View Podcast
- Image: none

---

## 3. Keep the rest of the page as-is

The following sections should remain unchanged:

- "Topics I Cover"
- "Speaking Availability"
- "Get in Touch"

No changes to navigation, footer, or any other page.

---

## 4. Optional: Homepage image swap (lower priority, separate commit)

On the homepage (`src/pages/index.astro` or the Hero component), consider swapping the current headshot for `speaking-audience-gtg.jpg`. This is a separate change from the media page work and should be done in a separate commit if at all. Do not block the media page changes on this.

---

## Notes for Claude Code

- The existing page likely uses MDX (`.mdx`) given the site uses MDX for rich content. Check the actual file extension before editing.
- Image rendering: follow the pattern already used in the theme for inline images. Do not introduce new image components or styling — match what exists.
- Do not change frontmatter fields unless required to support image references.
- Run `npm run dev` and verify the media page renders correctly before committing.
- Run `npm run build` to confirm no build errors before pushing.
