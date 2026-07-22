import Link from "next/link";
import { ShieldCheck, FileText, CheckCircle2, Clock, XCircle, Users, BarChart } from "lucide-react";
import { getAllPosts } from "@/lib/data";
import styles from "@/styles/inner-pages.module.css";

export const metadata = {
  title: "Editorial Admin Dashboard | BizTech Operations",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardPage() {
  const posts = await getAllPosts();
  const guestPosts = posts.filter((p) => p.isGuestPost);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Admin</span>
          </div>
          <p className={styles.eyebrow}>Editorial Operations</p>
          <h1 className={styles.title}>BizTech Editorial Portal</h1>
          <p className={styles.lede}>
            Review submissions, audit contextual reference links, manage contributor verification, and schedule publication queues.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
            <div style={{ padding: "20px", borderRadius: "14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <span style={{ fontSize: "12px", color: "var(--muted)" }}>Total Published Insights</span>
              <h2 style={{ fontSize: "28px", color: "#fff", margin: "6px 0 0 0" }}>{posts.length}</h2>
            </div>
            <div style={{ padding: "20px", borderRadius: "14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <span style={{ fontSize: "12px", color: "var(--muted)" }}>Guest Contributions</span>
              <h2 style={{ fontSize: "28px", color: "var(--accent-3)", margin: "6px 0 0 0" }}>{guestPosts.length}</h2>
            </div>
            <div style={{ padding: "20px", borderRadius: "14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <span style={{ fontSize: "12px", color: "var(--muted)" }}>Awaiting Review Queue</span>
              <h2 style={{ fontSize: "28px", color: "var(--accent-2)", margin: "6px 0 0 0" }}>0</h2>
            </div>
          </div>

          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.darkEyebrow}>Recent Submissions</p>
              <h2>Editorial Queue</h2>
            </div>
          </div>

          <div style={{ overflowX: "auto", marginTop: "20px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", color: "var(--muted)" }}>
                  <th style={{ padding: "12px 16px" }}>Article Title</th>
                  <th style={{ padding: "12px 16px" }}>Author / Company</th>
                  <th style={{ padding: "12px 16px" }}>Category</th>
                  <th style={{ padding: "12px 16px" }}>Validation Plan</th>
                  <th style={{ padding: "12px 16px" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.slug} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding: "14px 16px", color: "#fff", fontWeight: "600" }}>
                      <Link href={`/insights/${post.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                        {post.title}
                      </Link>
                    </td>
                    <td style={{ padding: "14px 16px", color: "var(--text-secondary)" }}>{post.author.name}</td>
                    <td style={{ padding: "14px 16px", color: "var(--text-secondary)" }}>{post.category}</td>
                    <td style={{ padding: "14px 16px", color: "var(--accent-3)" }}>
                      {post.planSelected ? (post.planSelected === "free" ? "7 Days Free" : "Premium Subscription") : "Standard Editorial"}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ padding: "4px 10px", borderRadius: "12px", background: "rgba(52, 211, 153, 0.15)", color: "#34d399", fontSize: "12px" }}>
                        Published
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
