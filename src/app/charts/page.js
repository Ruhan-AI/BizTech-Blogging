import Link from "next/link";
import { ArrowRight, ShieldCheck, BarChart2, Info, Activity, Flame, Layers } from "lucide-react";
import { getAllPosts, getAllAuthors, getAllTopics } from "@/lib/data";
import styles from "@/styles/inner-pages.module.css";

export const metadata = {
  title: "Leaderboards & Performance Methodology | BizTech Charts",
  description:
    "Audited performance rankings for top articles, active contributors, and trending business topics on BizTech Blogging.",
  alternates: {
    canonical: "/charts",
  },
};

export default async function ChartsPage() {
  const posts = await getAllPosts();
  const authors = await getAllAuthors();
  const topics = await getAllTopics();

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
            Audited performance rankings for top-performing articles, verified domain experts, and category clusters evaluated by reader engagement and editorial scoring.
          </p>
        </div>
      </section>

      {/* Auditability & Methodology Section */}
      <section className={styles.section} style={{ paddingBlock: "1.5rem" }}>
        <div className={styles.container}>
          <div
            style={{
              padding: "24px 28px",
              borderRadius: "16px",
              background: "rgba(139, 92, 246, 0.08)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <div>
              <h3 style={{ margin: "0 0 6px 0", color: "#fff", fontSize: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Activity size={18} style={{ color: "var(--accent-3)" }} /> Auditability & Ranking Methodology
              </h3>
              <p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.85)", lineHeight: "1.5" }}>
                Rankings are recalculated every 24 hours based on an auditable composite score: 40% Reader Dwell Time, 35% Editorial Quality Assessment, 15% Social Sharing Velocity, and 10% Exponential Recency Decay.
              </p>
            </div>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", fontSize: "12px", color: "var(--accent-3)" }}>
              <span>✓ 24h Update Cycle</span>
              <span>✓ Zero Paid Placement</span>
              <span>✓ DOM Source-of-Truth</span>
            </div>
          </div>
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
            {topAuthors.map((author) => (
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
