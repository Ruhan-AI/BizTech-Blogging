import Link from "next/link";
import { Award, Flame, Users, TrendingUp, ArrowRight, BarChart2, ShieldCheck } from "lucide-react";
import { getAllPosts, getAllAuthors, getAllTopics } from "@/lib/data";
import styles from "@/styles/inner-pages.module.css";

export const metadata = {
  title: "Leaderboards & Trending Performance | BizTech Charts",
  description:
    "Data-backed performance rankings for top articles, active contributors, and trending business topics on BizTech Blogging.",
  alternates: {
    canonical: "/charts",
  },
};

export default async function ChartsPage() {
  const posts = await getAllPosts();
  const authors = await getAllAuthors();
  const topics = await getAllTopics();

  // Rank top posts
  const topPosts = [...posts].slice(0, 10);
  const topAuthors = [...authors].sort((a, b) => (b.postCount || 0) - (a.postCount || 0));

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Charts</span>
          </div>
          <p className={styles.eyebrow}>Data Intelligence</p>
          <h1 className={styles.title}>BizTech Hot Leaderboards & Trends</h1>
          <p className={styles.lede}>
            Explore top-performing editorial articles, verified contributors, and trending topics evaluated by reading depth and editorial quality.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.darkEyebrow}>Performance Ranking</p>
              <h2>Top Ranked Articles</h2>
            </div>
            <span style={{ fontSize: "12px", color: "var(--accent-3)", display: "flex", alignItems: "center", gap: "6px" }}>
              <ShieldCheck size={15} /> Evaluated by Reader Depth & Recency Decay
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "24px" }}>
            {topPosts.map((post, idx) => (
              <div
                key={post.slug}
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr auto",
                  alignItems: "center",
                  padding: "18px 24px",
                  borderRadius: "16px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ fontSize: "22px", fontWeight: "900", color: idx < 3 ? "var(--accent-3)" : "var(--muted)" }}>
                  #{String(idx + 1).padStart(2, "0")}
                </div>
                <div>
                  <span className={styles.categoryPill} style={{ fontSize: "11px", marginBottom: "6px" }}>
                    {post.category}
                  </span>
                  <h3 style={{ fontSize: "17px", margin: "4px 0 6px 0", color: "#ffffff" }}>
                    <Link href={`/insights/${post.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                      {post.title}
                    </Link>
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0 }}>
                    By {post.author.name} • {post.readTime}
                  </p>
                </div>
                <div>
                  <Link
                    href={`/insights/${post.slug}`}
                    className={styles.secondaryButton}
                    style={{ padding: "8px 14px", fontSize: "12px", display: "inline-flex", alignItems: "center", gap: "6px" }}
                  >
                    Read <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.darkEyebrow}>Top Contributors</p>
              <h2>Verified Writers & Domain Experts</h2>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "24px" }}>
            {topAuthors.map((author, i) => (
              <Link
                key={author.slug}
                href={`/author/${author.slug}`}
                style={{
                  padding: "20px",
                  borderRadius: "16px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  {author.initials}
                </div>
                <div>
                  <strong style={{ display: "block", color: "#fff", fontSize: "16px" }}>{author.name}</strong>
                  <span style={{ fontSize: "12px", color: "var(--muted)", display: "block", marginTop: "2px" }}>{author.role}</span>
                  <span style={{ fontSize: "11px", color: "var(--accent-3)", fontWeight: "bold", marginTop: "4px", display: "block" }}>
                    {author.postCount} {author.postCount === 1 ? "Article" : "Articles"} Published
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
