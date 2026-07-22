import Link from "next/link";
import styles from "@/styles/inner-pages.module.css";

export const metadata = {
  title: "Corrections & Updates Policy | BizTech Blogging",
  description:
    "How BizTech Blogging handles factual corrections, editorial updates, and author attribution requests.",
  alternates: {
    canonical: "/corrections-policy",
  },
};

export default function CorrectionsPolicyPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Corrections Policy</span>
          </div>
          <p className={styles.eyebrow}>Accuracy Commitment</p>
          <h1 className={styles.title}>Corrections & Editorial Updates</h1>
          <p className={styles.lede}>
            We are committed to factual accuracy and transparency. Here is how we process correction requests and article updates.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.narrowContainer}>
          <div className={styles.legalStack}>
            <article className={styles.legalBlock}>
              <h2>1. Factual Corrections</h2>
              <p>
                When a significant factual error is identified, we correct the article text as quickly as possible and append an inline correction notice explaining the change.
              </p>
            </article>

            <article className={styles.legalBlock}>
              <h2>2. Requesting a Correction</h2>
              <p>
                To request a correction or report a broken reference, email us at <a href="mailto:biztechresourceanalyst@gmail.com" style={{ color: "var(--accent-3)", textDecoration: "underline" }}>biztechresourceanalyst@gmail.com</a> with the article URL, specific sentence, and supporting evidence.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
