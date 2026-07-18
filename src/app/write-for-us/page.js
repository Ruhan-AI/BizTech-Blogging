import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Clock3,
  FileCheck2,
  Link2,
  MessageSquareText,
} from "lucide-react";
import { categories } from "../../data/posts";
import styles from "../../styles/inner-pages.module.css";

export const metadata = {
  title: "Write for Us | BizTech Blogging",
  description:
    "Share practical business, growth, people, brand, web, startup, or career insight with the BizTech Blogging community.",
};

const guidelines = [
  {
    icon: BookOpenCheck,
    title: "Original insight",
    copy: "Submit unpublished work shaped by your experience. We do not accept syndicated, spun, or lightly rewritten articles.",
  },
  {
    icon: MessageSquareText,
    title: "Practical, clear voice",
    copy: "Write for founders and operators. Explain the why, show the how, and leave the reader with decisions they can use.",
  },
  {
    icon: FileCheck2,
    title: "800–1,500 words",
    copy: "Aim for enough depth to be useful without adding filler. Use headings, short paragraphs, and concrete examples.",
  },
  {
    icon: Link2,
    title: "Relevant links only",
    copy: "You may suggest up to two contextual backlinks. Promotional, paid, or unrelated links will be removed.",
  },
  {
    icon: BadgeCheck,
    title: "Human reviewed",
    copy: "AI-assisted drafting is acceptable when carefully verified and edited. Every submission receives human editorial review.",
  },
  {
    icon: Clock3,
    title: "Five-day target",
    copy: "We aim to send an initial editorial decision within five business days. Complex reviews may take a little longer.",
  },
];

const steps = [
  {
    title: "Read the guidelines",
    copy: "Confirm your idea fits one of our six editorial pillars and meets our originality policy.",
  },
  {
    title: "Send your draft",
    copy: "Complete the no-login submission form with your article, short bio, and supporting links.",
  },
  {
    title: "Editorial review",
    copy: "Our team reviews usefulness, accuracy, originality, fit, and link quality before deciding.",
  },
  {
    title: "Refine and publish",
    copy: "If accepted, we may suggest edits. Once approved, your byline and author profile go live.",
  },
];

export default function WriteForUsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div>
            <div className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Write for us</span>
            </div>
            <p className={styles.eyebrow}>Share what works</p>
            <h1 className={styles.title}>Useful ideas deserve a wider audience.</h1>
            <p className={styles.lede}>
              We publish practical, experience-led perspectives from founders,
              marketers, people leaders, developers, and career professionals.
              No account. No pitch maze. Just a clear path from draft to review.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/submit">
                Submit your article <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <a className={styles.secondaryButton} href="#guidelines">
                Review guidelines
              </a>
            </div>
          </div>

          <aside className={styles.heroPanel} aria-label="Contributor overview">
            <p className={styles.heroPanelLabel}>What to expect</p>
            <dl className={styles.statList}>
              <div className={styles.stat}>
                <dt>10m</dt>
                <dd>Target time to complete the submission form</dd>
              </div>
              <div className={styles.stat}>
                <dt>5d</dt>
                <dd>Target for an initial editorial response</dd>
              </div>
              <div className={styles.stat}>
                <dt>1–2</dt>
                <dd>Contextual backlinks allowed per accepted article</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className={styles.section} id="guidelines">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.darkEyebrow}>Editorial standards</p>
              <h2>Start with substance. We will help with polish.</h2>
            </div>
            <p>
              Strong submissions teach something specific, respect the reader&apos;s
              time, and make claims the author is prepared to stand behind.
            </p>
          </div>
          <div className={styles.guidelineGrid}>
            {guidelines.map(({ icon: Icon, title, copy }) => (
              <article className={styles.guidelineCard} key={title}>
                <div className={styles.iconBox}>
                  <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.darkEyebrow}>What we publish</p>
              <h2>Six pillars. Many credible perspectives.</h2>
            </div>
            <p>
              Choose the closest category when you submit. Editors may refine
              placement so the article reaches the most relevant readers.
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

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.darkEyebrow}>From draft to live</p>
              <h2>A straightforward editorial process.</h2>
            </div>
            <p>
              You will always know the next step. Acceptance is based on quality
              and fit, never on payment or reciprocal links.
            </p>
          </div>
          <div className={styles.stepGrid}>
            {steps.map((step) => (
              <article className={styles.stepCard} key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaPanel}>
            <div>
              <p className={styles.eyebrow}>Ready when you are</p>
              <h2>Bring us the article only you can write.</h2>
              <p>
                The form takes about ten minutes and requires no account. Please
                review our contributor terms before sending your work.
              </p>
            </div>
            <Link className={styles.primaryButton} href="/submit">
              Start your submission <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
