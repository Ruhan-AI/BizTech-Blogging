import { authors, categories, posts } from "@/data/posts";

export default function sitemap() {
  const baseUrl = "https://blog.biztechra.site";
  const staticRoutes = [
    "",
    "/about",
    "/write-for-us",
    "/submit",
    "/search",
    "/privacy-policy",
    "/contributor-terms",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "daily" : "monthly",
      priority: route === "" ? 1 : 0.7,
    })),
    ...posts.map((post) => ({
      url: `${baseUrl}/insights/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    ...categories.map((category) => ({
      url: `${baseUrl}/category/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.65,
    })),
    ...authors.map((author) => ({
      url: `${baseUrl}/author/${author.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.55,
    })),
  ];
}
