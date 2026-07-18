# BizTech Blogging

> Ideas built for real-world growth.

BizTech Blogging is a modern guest-contribution and editorial platform for
founders, marketers, people leaders, developers, and industry practitioners.
It is designed as a companion property to
[BizTech Resource Analyst](https://www.biztechra.site/), with the same bold
dark visual language and a distinct publishing-focused experience.

The current release is a polished public-facing MVP built with Next.js and
GSAP. It includes the complete reader and contributor experience, seeded
editorial content, responsive layouts, and production-ready SEO foundations.

## Highlights

- Responsive BizTech wordmark, fixed glass navigation, and mobile menu
- Editorial homepage with featured and filterable latest articles
- Six topic categories, contributor profiles, and full article pages
- Article metadata, JSON-LD, related posts, sharing links, and table of contents
- Site-wide search using the seeded content library
- Detailed **Write for Us** guidelines and contributor policies
- Accessible no-login submission form with client-side validation
- Local-only newsletter and submission confirmation states
- GSAP hero reveals, scroll-triggered motion, floating cards, and progress bar
- Reduced-motion support and WCAG-conscious semantic structure
- Generated sitemap, robots rules, metadata, favicon, and custom 404 page

## Technology

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 App Router |
| UI | React 19, custom CSS, Lucide React |
| Motion | GSAP 3 with ScrollTrigger |
| Content | Structured local JavaScript data |
| Rendering | Static generation, SSG, and dynamic search |
| Deployment target | Vercel or any compatible Node.js host |

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Featured story, categories, latest articles, and newsletter |
| `/insights/[slug]` | Full article with schema, author, TOC, and related posts |
| `/category/[slug]` | Category archive |
| `/author/[slug]` | Contributor profile and published articles |
| `/search?q=` | Search results |
| `/write-for-us` | Editorial guidelines and contribution process |
| `/submit` | No-login contributor submission form |
| `/about` | Platform purpose and editorial principles |
| `/contributor-terms` | Contributor terms |
| `/privacy-policy` | Privacy policy |
| `/sitemap.xml` | Generated XML sitemap |
| `/robots.txt` | Search crawler rules |

## Getting Started

### Prerequisites

- Node.js 20.9 or newer
- npm

### Installation

```bash
git clone https://github.com/Ruhan-AI/BizTech-Blogging.git
cd BizTech-Blogging
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

If port `3000` is already in use, choose another port:

```bash
npm run dev -- -p 3001
```

### Production Build

```bash
npm run build
npm start
```

The production build currently generates 33 routes, including static category,
author, article, policy, sitemap, and robots pages.

## Project Structure

```text
src/
├── app/
│   ├── about/
│   ├── author/[slug]/
│   ├── category/[slug]/
│   ├── insights/[slug]/
│   ├── search/
│   ├── submit/
│   ├── write-for-us/
│   ├── globals.css
│   ├── layout.js
│   ├── page.js
│   ├── robots.js
│   └── sitemap.js
├── components/
│   ├── HomePage.js
│   ├── MotionController.js
│   ├── SiteHeader.js
│   ├── SiteFooter.js
│   └── PostCard.js
├── data/
│   └── posts.js
└── styles/
    └── inner-pages.module.css
```

## Managing Editorial Content

Seed content is stored in [`src/data/posts.js`](src/data/posts.js). Each article
contains its metadata, contributor, category, visual gradient, tags, and
structured sections.

To add an article:

1. Add or reuse a contributor in `contributorProfiles`.
2. Add a new object to the exported `posts` array.
3. Use a unique `slug` and an existing `categorySlug`.
4. Add article sections through `heading`, `paragraphs`, and optional `bullets`.
5. Run `npm run build` to verify static generation and route integrity.

Category and author counts are derived automatically from the post data.

## Submission Form Status

The `/submit` workflow is intentionally a **local frontend prototype**. It
validates fields and displays a success state, but it does not transmit, email,
upload, or permanently store contributor information.

Before production submissions are enabled, connect the form to:

- A protected Next.js server action or API endpoint
- Server-side validation and sanitization
- A database or headless CMS
- Secure image/file storage
- Transactional email such as Resend or SendGrid
- Rate limiting, honeypot enforcement, and optional CAPTCHA

## SEO and Accessibility

- Page-level metadata and social sharing metadata
- Article `BlogPosting` JSON-LD
- Generated sitemap and robots configuration
- Static, human-readable article/category/author URLs
- Semantic landmarks, labels, keyboard focus styles, and skip navigation
- Responsive layouts tested at desktop and mobile breakpoints
- `prefers-reduced-motion` support for all animation-heavy experiences

## Deployment

The project is ready for Vercel:

1. Import this GitHub repository into Vercel.
2. Keep the framework preset as **Next.js**.
3. Use the default build command: `npm run build`.
4. Add production environment variables when CMS, database, storage, or email
   integrations are introduced.
5. Update `metadataBase`, sitemap URLs, and canonical domain values if the final
   production domain differs from `https://blog.biztechra.site`.

## Planned Production Integrations

- Headless CMS and editorial review dashboard
- Persistent contributor submissions and status tracking
- Transactional submission/status emails
- Secure file uploads and spam protection
- Newsletter provider integration
- Editorial analytics and workflow reporting

## Brand

BizTech Blogging is part of
[BizTech Resource Analyst](https://www.biztechra.site/), a business consulting
and digital growth agency serving startups, SMEs, and growing teams.

## License

Private BizTech project. All rights reserved.
