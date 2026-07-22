import Link from "next/link";
import { ArrowRight, Filter, Sparkles, Clock, Compass } from "lucide-react";
import PostCard from "@/components/PostCard";
import { getAllPosts, getAllCategories } from "@/lib/data";
import styles from "@/styles/inner-pages.module.css";

export const metadata = {
  title: "Latest Insights & Field Research | BizTech Blogging",
  description:
    "Explore the latest articles, growth frameworks, people operations advice, and technical perspectives from modern business leaders.",
  alternates: {
    canonical: "/latest",
  },
};

export default async function LatestPage({ searchParams }) {
  const params = await searchParams;
  const activeCategory = params?.category || "all";
  const sortBy = params?.sort || "newest";

  const allPosts = await getAllPosts();
  const categories = await getAllCategories();

  let filteredPosts = allPosts;
  if (activeCategory !== "all") {
    filteredPosts = filteredPosts.filter((p) => p.categorySlug === activeCategory);
  }

  if (sortBy === "oldest") {
    filteredPosts = [...filteredPosts].sort((a, b) => new Date(a.date) - new Date(b.date));
  } else {
    filteredPosts = [...filteredPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Latest</span>
          </div>
          <p className={styles.eyebrow}>Real-time Feed</p>
          <h1 className={styles.title}>Latest Editorial & Contributor Insights</h1>
          <p className={styles.lede}>
            Chronological insights from founders, SEO specialists, developers, and people operators building practical systems.
          </p>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "24px" }}>
            <Link
              href="/latest"
              className={styles.pill}
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                background: activeCategory === "all" ? "var(--accent)" : "rgba(255,255,255,0.05)",
                color: activeCategory === "all" ? "#ffffff" : "var(--text-secondary)",
                fontSize: "13px",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              All Articles ({allPosts.length})
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/latest?category=${cat.slug}`}
                style={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  background: activeCategory === cat.slug ? "var(--accent)" : "rgba(255,255,255,0.05)",
                  color: activeCategory === cat.slug ? "#ffffff" : "var(--text-secondary)",
                  fontSize: "13px",
                  textDecoration: "none",
                  fontWeight: "600",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {cat.shortName}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader} style={{ marginBottom: "28px" }}>
            <div>
              <p className={styles.darkEyebrow}>Editorial Stream</p>
              <h2>{filteredPosts.length} Articles Found</h2>
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className={styles.emptyState} style={{ padding: "60px 20px", textAlign: "center" }}>
              <h3>No articles found in this category yet.</h3>
              <p style={{ marginTop: "8px", color: "var(--muted)" }}>Check back soon or explore other editorial pillars.</p>
              <Link className={styles.primaryButton} href="/latest" style={{ marginTop: "20px", display: "inline-flex" }}>
                View All Articles
              </Link>
            </div>
          ) : (
            <div className={styles.postGrid}>
              {filteredPosts.map((post) => (
                <PostCard post={post} key={post.slug} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
