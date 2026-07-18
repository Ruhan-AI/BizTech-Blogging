import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { categories } from "../../data/posts";
import styles from "../../styles/inner-pages.module.css";

export const metadata = {
  title: "About | BizTech Blogging",
  description:
    "BizTech Blogging brings credible outside voices into the BizTech Resource Analyst community.",
  alternates: {
    canonical: "/about",
  },
};

const principles = [
  {
    title: "Integrity first",
    copy: "Readers deserve original work, transparent authorship, and claims that can be checked.",
  },
  {
    title: "AI-assisted, human-reviewed",
    copy: "Useful tools can accelerate work; accountable people still decide what is worth publishing.",
  },
  {
    title: "Practical over performative",
    copy: "We favor specific experience, useful frameworks, and honest tradeoffs over empty certainty.",
  },
  {
    title: "Built for shared growth",
    copy: "Contributors gain a credible platform while readers gain a wider range of tested perspectives.",
  },
];

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div>
            <div className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>About</span>
            </div>
            <p className={styles.eyebrow}>A broader BizTech conversation</p>
            <h1 className={styles.title}>Real operators. Useful perspectives.</h1>
            <p className={styles.lede}>
              BizTech Blogging is an editorial platform for founders, marketers,
              people leaders, developers, and educators who have something
              practical to teach the startup and SME community.
            </p>
          </div>
          <aside className={styles.heroPanel} aria-label="Platform facts">
            <p className={styles.heroPanelLabel}>Our foundation</p>
            <dl className={styles.statList}>
              <div className={styles.stat}>
                <dt>06</dt>
                <dd>Focused editorial pillars spanning business and careers</dd>
              </div>
              <div className={styles.stat}>
                <dt>100%</dt>
                <dd>Human-reviewed before anything is published</dd>
              </div>
              <div className={styles.stat}>
                <dt>2020</dt>
                <dd>Year the parent BizTech brand began serving growing teams</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.container} ${styles.split}`}>
          <div className={styles.splitCopy}>
            <p className={styles.darkEyebrow}>Why we exist</p>
            <h2>Open the door without lowering the bar.</h2>
            <p>
              BizTech Resource Analyst&apos;s in-house blog shares the agency&apos;s own
              research and recommendations. BizTech Blogging serves a different,
              complementary purpose: it gives credible outside practitioners a
              place to share what they have learned.
            </p>
            <p>
              That wider contributor base helps readers see more than one route
              through a problem while a consistent editorial process protects
              clarity, originality, and trust.
            </p>
            <ul className={styles.checkList}>
              <li>
                <Check className={styles.checkIcon} size={18} aria-hidden="true" />
                <span>Original, experience-led writing from named contributors</span>
              </li>
              <li>
                <Check className={styles.checkIcon} size={18} aria-hidden="true" />
                <span>Clear category focus aligned with the BizTech expertise</span>
              </li>
              <li>
                <Check className={styles.checkIcon} size={18} aria-hidden="true" />
                <span>Editorial review for usefulness, accuracy, and link quality</span>
              </li>
            </ul>
          </div>
          <aside className={styles.sideCard}>
            <h3>Part of BizTech Resource Analyst</h3>
            <p>
              BizTech is a Houston-based business consulting and digital growth
              agency helping startups, SMEs, and growing teams operate, rank,
              communicate, and scale with more clarity.
            </p>
            <a
              className={styles.primaryButton}
              href="https://www.biztechra.site/"
              target="_blank"
              rel="noreferrer"
            >
              Visit the parent brand <ArrowRight size={17} aria-hidden="true" />
            </a>
          </aside>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.darkEyebrow}>The editorial promise</p>
              <h2>Standards readers and contributors can understand.</h2>
            </div>
            <p>
              Our policies are intentionally visible. A healthy contributor
              platform earns trust through consistent decisions, not vague gates.
            </p>
          </div>
          <div className={styles.aboutPrinciples}>
            {principles.map((principle, index) => (
              <article className={styles.principle} key={principle.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{principle.title}</h3>
                <p>{principle.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.darkEyebrow}>Our coverage</p>
              <h2>One connected view of sustainable growth.</h2>
            </div>
            <p>
              Each editorial pillar maps to a capability growing organizations
              need—from finding demand to building the team that can serve it.
            </p>
          </div>
          <div className={styles.topicGrid}>
            {categories.map((category, index) => (
              <Link
                className={styles.topicCard}
                href={`/category/${category.slug}`}
                key={category.slug}
              >
                <span className={styles.topicIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaPanel}>
            <div>
              <p className={styles.eyebrow}>Add your perspective</p>
              <h2>Help a growing team make one better decision.</h2>
              <p>
                If you have practical experience and a clear point of view, we
                would like to hear it.
              </p>
            </div>
            <Link className={styles.primaryButton} href="/write-for-us">
              Read contributor guidelines <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
