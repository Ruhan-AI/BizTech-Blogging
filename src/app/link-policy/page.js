import Link from "next/link";
import { Link2, ShieldAlert, CheckCircle2, XCircle } from "lucide-react";
import styles from "@/styles/inner-pages.module.css";

export const metadata = {
  title: "Link Policy & Guidelines | BizTech Blogging",
  description:
    "Transparent rules regarding contextual backlinks, anchor text requirements, rel qualifications, and sponsored content disclosures.",
  alternates: {
    canonical: "/link-policy",
  },
};

export default function LinkPolicyPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Link Policy</span>
          </div>
          <p className={styles.eyebrow}>Search Integrity</p>
          <h1 className={styles.title}>Outbound Reference & Link Policy</h1>
          <p className={styles.lede}>
            BizTech Blogging maintains strict link criteria to protect reader trust and search engine guidelines.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.narrowContainer}>
          <div className={styles.legalStack}>
            <article className={styles.legalBlock}>
              <h2>1. Contextual Relevance</h2>
              <p>
                A suggested backlink must directly support the surrounding paragraph or statement. Articles containing unnatural or shoehorned links will be edited or rejected.
              </p>
            </article>

            <article className={styles.legalBlock}>
              <h2>2. Permitted Link Count</h2>
              <p>
                Guest contributions may include a maximum of <strong>two contextual references</strong> to external landing pages or articles, plus an optional link in the author biography.
              </p>
            </article>

            <article className={styles.legalBlock}>
              <h2>3. Link Qualifications & Commercial Disclosures</h2>
              <p>
                Links associated with compensated arrangements, commercial partnerships, or affiliate programs will carry appropriate qualifications (`rel="sponsored"` or `rel="nofollow"`). We do not sell guaranteed search engine ranking manipulation or do-follow links.
              </p>
            </article>

            <article className={styles.legalBlock}>
              <h2>4. Prohibited Destinations</h2>
              <p>
                We do not accept links to gambling, adult content, unverified financial schemes, malware, deceptive downloads, or domains engaging in link farm behavior.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
