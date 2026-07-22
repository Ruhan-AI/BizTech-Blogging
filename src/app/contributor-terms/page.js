import Link from "next/link";
import styles from "../../styles/inner-pages.module.css";

export const metadata = {
  title: "Contributor Terms | BizTech Blogging",
  description:
    "The terms that apply when you submit an article to BizTech Blogging.",
  alternates: {
    canonical: "/contributor-terms",
  },
};

export default function ContributorTermsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.archiveHero}>
        <div className={styles.narrowContainer}>
          <div className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Contributor terms</span>
          </div>
          <p className={styles.eyebrow}>Clear from the beginning</p>
          <h1 className={styles.archiveTitle}>Contributor terms</h1>
          <p className={styles.archiveLede}>
            These terms explain ownership, editorial rights, attribution,
            compensation, and link standards for work submitted to BizTech Blogging.
          </p>
          <div className={styles.archiveMeta}>
            <span>Effective July 18, 2026</span>
            <span>Plain-language MVP policy</span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.narrowContainer}>
          <p className={styles.legalIntro}>
            By submitting content, you confirm that you understand and agree to
            the terms below. If you do not agree, please do not submit the work.
            Questions can be sent to <a href="mailto:biztechresourceanalyst@gmail.com">biztechresourceanalyst@gmail.com</a> or <a href="tel:+12148961780">+1 (214) 896-1780</a>.
          </p>
          <div className={styles.legalStack}>
            <article className={styles.legalBlock}>
              <h2>1. Your ownership</h2>
              <p>
                You retain copyright in your original submission. You confirm
                that you created the work, have authority to submit it, and that
                it does not infringe another person&apos;s rights, confidentiality,
                privacy, trademark, or copyright.
              </p>
            </article>
            <article className={styles.legalBlock}>
              <h2>2. License to publish</h2>
              <p>
                If we accept the article, you grant BizTech Resource Analyst and
                BizTech Blogging a non-exclusive, worldwide, royalty-free license
                to edit, format, publish, display, distribute, promote, archive,
                and create excerpts from it across our websites, email, and social
                channels. Because the license is non-exclusive, you remain the owner.
              </p>
            </article>
            <article className={styles.legalBlock}>
              <h2>3. Editorial discretion</h2>
              <p>
                Submission does not guarantee publication. We may decline a draft,
                request changes, edit for clarity and house style, revise headlines
                and metadata, add internal links, correct errors, or remove an
                article when necessary. Material changes will normally be discussed
                with the contributor before publication.
              </p>
            </article>
            <article className={styles.legalBlock}>
              <h2>4. Originality and disclosure</h2>
              <p>
                Submissions must be original and not previously published in
                substantially the same form. Quotations, data, images, and ideas
                from others must be accurately credited and legally usable. Any
                material conflict of interest, commercial relationship, or AI
                assistance should be disclosed to the editor.
              </p>
            </article>
            <article className={styles.legalBlock}>
              <h2>5. Attribution and author profile</h2>
              <p>
                Accepted articles normally include your name, supplied biography,
                and an author profile. You give us permission to publish those
                details and any optional headshot or social link you submit. You
                are responsible for keeping the information accurate.
              </p>
            </article>
            <article className={styles.legalBlock}>
              <h2>6. Backlink policy</h2>
              <p>
                You may propose up to two relevant, contextual links. We may edit,
                remove, or apply appropriate link attributes at our discretion.
                We do not guarantee followed links, keyword-rich anchor text, or
                placement for promotional, affiliate, paid, or link-scheme purposes.
              </p>
            </article>
            <article className={styles.legalBlock}>
              <h2>7. Compensation</h2>
              <p>
                Guest contributions are unpaid unless a separate written agreement
                explicitly states otherwise. Publication, byline exposure, profile
                placement, and links are not wages, employment, or a promise of
                future work.
              </p>
            </article>
            <article className={styles.legalBlock}>
              <h2>8. Accuracy and conduct</h2>
              <p>
                You are responsible for the accuracy of your claims and for alerting
                us if an important error is discovered. Content must not be unlawful,
                deceptive, defamatory, discriminatory, abusive, or designed to
                manipulate search systems.
              </p>
            </article>
            <article className={styles.legalBlock}>
              <h2>9. Changes to these terms</h2>
              <p>
                We may update these terms as the contributor program evolves. The
                effective date above identifies the current version. Terms in force
                when you submit will govern that submission unless we agree otherwise.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
