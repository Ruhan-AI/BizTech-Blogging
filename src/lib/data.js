import { posts as staticPosts, authors as staticAuthors, categories as staticCategories } from "../data/posts.js";

// Topic definitions for content discovery
export const staticTopics = [
  {
    name: "SEO Systems & Growth Engines",
    slug: "seo-systems",
    categorySlug: "seo-digital-growth",
    description: "Building scalable search, content compounding, and organic acquisition systems.",
  },
  {
    name: "Link Building & Digital PR",
    slug: "link-building",
    categorySlug: "seo-digital-growth",
    description: "Contextual references, authoritative citations, and ethical editorial partnerships.",
  },
  {
    name: "People Ops & Hybrid Work",
    slug: "people-operations",
    categorySlug: "hr-people-operations",
    description: "Lean HR infrastructure, performance clarity, and remote team management.",
  },
  {
    name: "Brand Systems & Positioning",
    slug: "brand-positioning",
    categorySlug: "social-media-branding",
    description: "Distinctive brand positioning, visual identity, and social distribution systems.",
  },
  {
    name: "Web Performance & UX",
    slug: "web-performance",
    categorySlug: "website-development-design",
    description: "High-performing Next.js web products, accessibility, and speed optimization.",
  },
  {
    name: "Startup Go-to-Market",
    slug: "startup-gtm",
    categorySlug: "startup-business-strategy",
    description: "Testing offer positioning, early traction validation, and scalable operating models.",
  },
  {
    name: "Skills-First Career Growth",
    slug: "career-readiness",
    categorySlug: "vocational-career-development",
    description: "Practical career development, technical upskilling, and workplace readiness.",
  },
];

export async function getAllPosts() {
  return staticPosts;
}

export async function getPostBySlug(slug) {
  return staticPosts.find((post) => post.slug === slug);
}

export async function getPostsByCategory(categorySlug) {
  return staticPosts.filter((post) => post.categorySlug === categorySlug);
}

export async function getPostsByAuthor(authorSlug) {
  return staticPosts.filter((post) => post.author && post.author.slug === authorSlug);
}

export async function getAllAuthors() {
  return staticAuthors;
}

export async function getAuthorBySlug(slug) {
  const author = staticAuthors.find((a) => a.slug === slug);
  if (author) return author;

  const authorPosts = staticPosts.filter((p) => p.author && p.author.slug === slug);
  if (authorPosts.length > 0) {
    const firstAuthor = authorPosts[0].author;
    return {
      name: firstAuthor.name || "Guest Contributor",
      slug: slug,
      role: firstAuthor.role || "SEO Specialist & Contributor",
      initials: firstAuthor.initials || "GP",
      bio: firstAuthor.bio || "Verified contributor publishing business and technical insights.",
      location: firstAuthor.location || "Remote",
      postCount: authorPosts.length,
    };
  }
  return null;
}

export async function getAllCategories() {
  return staticCategories;
}

export async function getCategoryBySlug(slug) {
  return staticCategories.find((cat) => cat.slug === slug);
}

export async function getAllTopics() {
  return staticTopics.map((topic) => ({
    ...topic,
    articleCount: staticPosts.filter(
      (p) => p.categorySlug === topic.categorySlug || p.tags?.some((t) => t.toLowerCase().includes(topic.slug.replace("-", " "))),
    ).length,
  }));
}

export async function getTopicBySlug(slug) {
  const topics = await getAllTopics();
  return topics.find((t) => t.slug === slug);
}

export async function searchPosts(query) {
  const normalizedQuery = (query || "").trim().toLowerCase();
  if (!normalizedQuery) return [];

  return staticPosts.filter((post) => {
    const searchableText = [
      post.title,
      post.excerpt,
      post.category,
      post.author?.name,
      ...(post.tags || []),
      ...(post.content || []).flatMap((section) => [
        section.heading,
        ...(section.paragraphs || []),
        ...(section.bullets || []),
      ]),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}
