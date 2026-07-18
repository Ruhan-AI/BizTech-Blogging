import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import {
  categories,
  getCategoryBySlug,
  getPostsByCategory,
} from "../../../data/posts";
import styles from "../../../styles/inner-pages.module.css";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) return {};

  return {
    title: `${category.name} | BizTech Blogging`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  const categoryPosts = getPostsByCategory(slug);

  return (
    <main className={styles.page}>
      <section className={styles.archiveHero}>
        <div className={styles.container}>
          <div className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Category</span>
            <span aria-hidden="true">/</span>
            <span>{category.shortName}</span>
          </div>
          <p className={styles.eyebrow}>Editorial pillar</p>
          <h1 className={styles.archiveTitle}>{category.name}</h1>
          <p className={styles.archiveLede}>{category.description}</p>
          <div className={styles.archiveMeta}>
            <span>{categoryPosts.length} published {categoryPosts.length === 1 ? "insight" : "insights"}</span>
            <span>Human-reviewed contributor perspectives</span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.darkEyebrow}>Latest in {category.shortName}</p>
              <h2>Ideas built for real decisions.</h2>
            </div>
            <p>
              Practical frameworks and field-tested lessons from people doing the work.
            </p>
          </div>

          {categoryPosts.length ? (
            <div className={styles.postGrid}>
              {categoryPosts.map((post) => (
                <PostCard post={post} key={post.slug} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h2>Fresh work is on the way.</h2>
              <p>
                We are reviewing contributor submissions for this category. Have a
                practical perspective to share?
              </p>
              <div className={`${styles.heroActions} ${styles.successActions}`}>
                <Link className={styles.primaryButton} href="/submit">
                  Submit an article <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaPanel}>
            <div>
              <p className={styles.eyebrow}>Your experience belongs here</p>
              <h2>Have a sharper way to solve this problem?</h2>
              <p>Share an original, practical article with the BizTech community.</p>
            </div>
            <Link className={styles.primaryButton} href="/write-for-us">
              View contributor guidelines <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function PostCard({ post }) {
  return (
    <article className={styles.postCard}>
      <div className={styles.cardMedia} style={{ background: post.gradient }}>
        <span className={styles.categoryPill}>{post.category}</span>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readTime}</span>
        </div>
        <h2 className={styles.cardTitle}>{post.title}</h2>
        <p className={styles.cardExcerpt}>{post.excerpt}</p>
        <div className={styles.cardFooter}>
          <Link className={styles.cardAuthor} href={`/author/${post.author.slug}`}>
            <span className={styles.smallAvatar}>{post.author.initials}</span>
            <span>{post.author.name}</span>
          </Link>
          <span className={styles.textLink} aria-hidden="true">
            Read <ArrowRight size={14} />
          </span>
        </div>
      </div>
      <Link
        className={styles.cardLink}
        href={`/insights/${post.slug}`}
        aria-label={`Read ${post.title}`}
      />
    </article>
  );
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
