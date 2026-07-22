import Link from "next/link";
import { Compass, Hash, ArrowRight, Layers } from "lucide-react";
import { getAllTopics, getAllCategories } from "@/lib/data";
import styles from "@/styles/inner-pages.module.css";

export const metadata = {
  title: "Topics & Editorial Clusters | BizTech Blogging",
  description:
    "Explore dedicated topic clusters on organic growth, link building, people operations, brand positioning, web performance, and career development.",
  alternates: {
    canonical: "/topics",
  },
};

export default async function TopicsHubPage() {
  const topics = await getAllTopics();
  const categories = await getAllCategories();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Topics</span>
          </div>
          <p className={styles.eyebrow}>Editorial Clusters</p>
          <h1 className={styles.title}>Knowledge Topics & Curated Hubs</h1>
          <p className={styles.lede}>
            Targeted editorial topics connecting practitioner experience, technical execution, and strategic business growth.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.darkEyebrow}>Topic Clusters</p>
              <h2>Explore Knowledge Areas</h2>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginTop: "28px" }}>
            {topics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                style={{
                  padding: "24px",
                  borderRadius: "16px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.2s ease",
                }}
              >
                <div>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "var(--accent-3)",
                      marginBottom: "12px",
                    }}
                  >
                    <Hash size={14} /> {topic.slug}
                  </span>
                  <h3 style={{ color: "#ffffff", fontSize: "18px", margin: "0 0 8px 0" }}>{topic.name}</h3>
                  <p style={{ color: "var(--muted)", fontSize: "13px", lineHeight: "1.6", margin: 0 }}>{topic.description}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "20px",
                    paddingTop: "16px",
                    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                    {topic.articleCount} {topic.articleCount === 1 ? "Article" : "Articles"}
                  </span>
                  <span style={{ fontSize: "13px", color: "var(--accent-3)", fontWeight: "bold", display: "flex", alignItems: "center", gap: "4px" }}>
                    Explore Cluster <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.darkEyebrow}>Editorial Pillars</p>
              <h2>Categories Overview</h2>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginTop: "24px" }}>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                style={{
                  padding: "20px",
                  borderRadius: "16px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  textDecoration: "none",
                }}
              >
                <h3 style={{ color: "#fff", fontSize: "16px", margin: "0 0 6px 0" }}>{cat.name}</h3>
                <p style={{ color: "var(--muted)", fontSize: "12px", margin: 0, lineHeight: "1.5" }}>{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
