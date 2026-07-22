import { authors, categories, posts } from "@/data/posts";
import { staticTopics } from "@/lib/data";

export default function sitemap() {
  const baseUrl = "https://blog.biztechra.site";
  const staticRoutes = [
    "",
    "/latest",
    "/charts",
    "/topics",
    "/about",
    "/write-for-us",
    "/submit",
    "/search",
    "/editorial-policy",
    "/link-policy",
    "/corrections-policy",
    "/sponsorship-disclosure",
    "/privacy-policy",
    "/contributor-terms",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "daily" : "weekly",
      priority: route === "" ? 1 : 0.8,
    })),
    ...posts.map((post) => ({
      url: `${baseUrl}/insights/${post.slug}`,
      lastModified: new Date(post.date || Date.now()),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    ...categories.map((category) => ({
      url: `${baseUrl}/category/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    })),
    ...staticTopics.map((topic) => ({
      url: `${baseUrl}/topics/${topic.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.65,
    })),
    ...authors.map((author) => ({
      url: `${baseUrl}/author/${author.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    })),
  ];
}
