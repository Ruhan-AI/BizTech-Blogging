import Link from "next/link";
import { BookOpenCheck, ShieldCheck, Check, FileCheck2, Scale } from "lucide-react";
import styles from "@/styles/inner-pages.module.css";

export const metadata = {
  title: "Editorial Policy | BizTech Blogging",
  description:
    "Learn about BizTech Blogging's editorial review standards, originality checks, practitioner review process, and link guidelines.",
  alternates: {
    canonical: "/editorial-policy",
  },
};

export default function EditorialPolicyPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Editorial Policy</span>
          </div>
          <p className={styles.eyebrow}>Editorial Standards</p>
          <h1 className={styles.title}>BizTech Editorial & Quality Policy</h1>
          <p className={styles.lede}>
            We publish practical, experience-led insights evaluated by human editors. Every submission must provide real utility for modern business teams.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.narrowContainer}>
          <div className={styles.legalStack}>
            <article className={styles.legalBlock}>
              <h2>1. Human Review & Editorial Independence</h2>
              <p>
                Every submission undergoes editorial screening for clarity, originality, practical depth, and topical alignment. Payment for optional editorial services (e.g. priority review or custom illustration) does not guarantee publication or bypass editorial scrutiny.
              </p>
            </article>

            <article className={styles.legalBlock}>
              <h2>2. Originality & Source Transparency</h2>
              <p>
                We accept only original work written or thoroughly verified by domain practitioners. Syndicated, spun, or low-effort content will be rejected. Claims, statistics, and citations must reference reputable sources.
              </p>
            </article>

            <article className={styles.legalBlock}>
              <h2>3. Contextual Link Standards</h2>
              <p>
                Outbound references must naturally serve the reader. Exact-match anchor manipulation, link farms, or deceptive URLs are strictly prohibited. See our full <Link href="/link-policy" style={{ color: "var(--accent-3)", textDecoration: "underline" }}>Link Policy</Link> for detailed requirements.
              </p>
            </article>

            <article className={styles.legalBlock}>
              <h2>4. Corrections & Revisions</h2>
              <p>
                We promptly correct factual errors and update stale information. Readers and authors can request updates via our <Link href="/corrections-policy" style={{ color: "var(--accent-3)", textDecoration: "underline" }}>Corrections Policy</Link>.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
