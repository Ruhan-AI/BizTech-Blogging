import Link from "next/link";
import styles from "@/styles/inner-pages.module.css";

export const metadata = {
  title: "Sponsorship & Commercial Disclosure | BizTech Blogging",
  description:
    "How BizTech Blogging discloses commercial relationships, sponsored content, and editorial review services.",
  alternates: {
    canonical: "/sponsorship-disclosure",
  },
};

export default function SponsorshipDisclosurePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Sponsorship Disclosure</span>
          </div>
          <p className={styles.eyebrow}>Commercial Integrity</p>
          <h1 className={styles.title}>Sponsorship & Financial Disclosures</h1>
          <p className={styles.lede}>
            Transparency is central to our publication. Learn how commercial relationships and paid editorial services are identified.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.narrowContainer}>
          <div className={styles.legalStack}>
            <article className={styles.legalBlock}>
              <h2>1. Editorial Service Fees</h2>
              <p>
                BizTech Blogging offers optional paid editorial packages (such as priority review turnaround, professional copyediting, custom illustrations, or featured placement). Purchasing an editorial service covers editing labor and production, not guaranteed publication or ranking outcomes.
              </p>
            </article>

            <article className={styles.legalBlock}>
              <h2>2. Sponsored Content Badging</h2>
              <p>
                Any article produced under a direct brand sponsorship will clearly display a <strong>"Sponsored Content"</strong> or <strong>"Partner Insight"</strong> disclosure badge at the top of the post.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
