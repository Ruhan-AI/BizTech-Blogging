import { getAllPosts } from "@/lib/data";

const SITE_URL = "https://blog.biztechra.site";

export async function GET() {
  const posts = await getAllPosts();

  const itemsXml = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/insights/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/insights/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category><![CDATA[${post.category}]]></category>
      <dc:creator><![CDATA[${post.author.name}]]></dc:creator>
    </item>`,
    )
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>BizTech Blogging Insights Feed</title>
    <link>${SITE_URL}</link>
    <description>Practical thinking, growth frameworks, and technical insights from business operators.</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
