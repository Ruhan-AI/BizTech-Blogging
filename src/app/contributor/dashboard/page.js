import Link from "next/link";
import { User, FileText, ArrowRight, PlusCircle, CheckCircle2 } from "lucide-react";
import { getAllPosts } from "@/lib/data";
import styles from "@/styles/inner-pages.module.css";

export const metadata = {
  title: "Contributor Dashboard | BizTech Platform",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ContributorDashboardPage() {
  const posts = await getAllPosts();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Contributor Portal</span>
          </div>
          <p className={styles.eyebrow}>Writer Workspace</p>
          <h1 className={styles.title}>Contributor Dashboard</h1>
          <p className={styles.lede}>
            Manage your articles, track guest post performance, submit new drafts, and update profile details.
          </p>
          <div className={styles.heroActions} style={{ marginTop: "20px" }}>
            <Link href="/submit" className={styles.primaryButton} style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <PlusCircle size={16} /> Submit New Guest Post
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.darkEyebrow}>Your Submissions</p>
              <h2>Published & Active Insights</h2>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "24px" }}>
            {posts.slice(0, 4).map((post) => (
              <div
                key={post.slug}
                style={{
                  padding: "20px",
                  borderRadius: "16px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span className={styles.categoryPill} style={{ fontSize: "11px", marginBottom: "8px" }}>
                    {post.category}
                  </span>
                  <h3 style={{ color: "#fff", fontSize: "16px", margin: "6px 0 8px 0" }}>{post.title}</h3>
                  <p style={{ color: "var(--muted)", fontSize: "12px", margin: 0 }}>Published: {post.date}</p>
                </div>
                <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "#34d399", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <CheckCircle2 size={14} /> Live & Indexed
                  </span>
                  <Link href={`/insights/${post.slug}`} style={{ color: "var(--accent-3)", fontSize: "12px", fontWeight: "bold", textDecoration: "none" }}>
                    View <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
