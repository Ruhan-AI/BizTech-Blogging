import Link from "next/link";
import { CircleCheck, Clock, ShieldCheck, FileText, ExternalLink, Mail, Phone } from "lucide-react";
import styles from "@/styles/inner-pages.module.css";

export const metadata = {
  title: "Submission Status & Tracking | BizTech Editorial",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SubmissionTrackingPage({ params }) {
  const { token } = await params;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Submission Tracking</span>
          </div>
          <p className={styles.eyebrow}>Tracking Token: {token.substring(0, 16)}...</p>
          <h1 className={styles.title}>Submission Status & Editorial Pipeline</h1>
          <p className={styles.lede}>
            Track the status of your guest contribution as it progresses through human editorial screening and production.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.narrowContainer}>
          <div
            style={{
              padding: "30px",
              borderRadius: "20px",
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "var(--accent-3)",
                  boxShadow: "0 0 12px var(--accent-3)",
                }}
              />
              <strong style={{ fontSize: "16px", color: "#fff" }}>Status: Editorial Screening / Active</strong>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "24px" }}>
              <div style={{ padding: "14px", borderRadius: "10px", background: "rgba(255,255,255,0.03)" }}>
                <span style={{ fontSize: "11px", color: "var(--muted)", display: "block" }}>Tracking Token</span>
                <code style={{ fontSize: "12px", color: "var(--accent-3)" }}>{token}</code>
              </div>
              <div style={{ padding: "14px", borderRadius: "10px", background: "rgba(255,255,255,0.03)" }}>
                <span style={{ fontSize: "11px", color: "var(--muted)", display: "block" }}>Estimated Decision</span>
                <strong style={{ fontSize: "13px", color: "#fff" }}>1-3 Business Days</strong>
              </div>
            </div>

            <h3 style={{ fontSize: "16px", color: "#fff", marginBottom: "12px" }}>Editorial Pipeline Stages</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--accent-3)", fontSize: "14px" }}>
                <CircleCheck size={18} /> 1. Submission Received & Data Persisted
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#fff", fontSize: "14px" }}>
                <Clock size={18} style={{ color: "var(--accent-2)" }} /> 2. Originality & Contextual Reference Review
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--muted)", fontSize: "14px" }}>
                <FileText size={18} /> 3. Production Build & Canonical Path Verification
              </div>
            </div>

            <div
              style={{
                marginTop: "30px",
                padding: "20px",
                borderRadius: "12px",
                background: "rgba(139, 92, 246, 0.08)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
              }}
            >
              <h4 style={{ margin: "0 0 6px 0", color: "#fff", fontSize: "14px" }}>Direct Assistance for Paid Plans</h4>
              <p style={{ margin: 0, fontSize: "12px", color: "var(--muted)", lineHeight: "1.5" }}>
                For plan extensions, custom disclosures, or priority assistance, contact editorial support at:
              </p>
              <div style={{ display: "flex", gap: "12px", marginTop: "10px", flexWrap: "wrap" }}>
                <a href="tel:+12148961780" style={{ fontSize: "12px", color: "var(--accent-3)", fontWeight: "bold", textDecoration: "none" }}>
                  📞 +1 (214) 896-1780
                </a>
                <a href="mailto:biztechresourceanalyst@gmail.com" style={{ fontSize: "12px", color: "var(--accent-3)", fontWeight: "bold", textDecoration: "none" }}>
                  ✉️ biztechresourceanalyst@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
