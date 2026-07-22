import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { authors, getAuthorBySlug, getPostsByAuthor } from "../../../data/posts";
import styles from "../../../styles/inner-pages.module.css";

export function generateStaticParams() {
  return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) return {};

  return {
    title: `${author.name} | BizTech Blogging`,
    description: author.bio,
    alternates: {
      canonical: `/author/${slug}`,
    },
  };
}

export default async function AuthorPage({ params }) {
  const { slug } = await params;
  let author = getAuthorBySlug(slug);

  const authorPosts = getPostsByAuthor(slug);

  if (!author && authorPosts.length > 0) {
    const firstPostAuthor = authorPosts[0].author;
    author = {
      name: firstPostAuthor.name || "Guest Contributor",
      slug: slug,
      role: firstPostAuthor.role || "SEO Specialist & Contributor",
      initials: firstPostAuthor.initials || "GP",
      bio: firstPostAuthor.bio || "Verified contributor publishing business and technical insights.",
      location: firstPostAuthor.location || "Remote",
    };
  }

  if (!author) notFound();

  return (
    <main className={styles.page}>
      <section className={styles.archiveHero}>
        <div className={styles.container}>
          <div className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Contributors</span>
            <span aria-hidden="true">/</span>
            <span>{author.name}</span>
          </div>
          <div className={styles.authorHero}>
            <div className={styles.authorAvatar} aria-hidden="true">
              {author.initials}
            </div>
            <div>
              <p className={styles.eyebrow}>Contributor profile</p>
              <h1 className={styles.archiveTitle}>{author.name}</h1>
              <p className={styles.archiveLede}>{author.bio}</p>
              <div className={styles.authorDetails}>
                <span>{author.role}</span>
                <span><MapPin size={13} aria-hidden="true" /> {author.location}</span>
                <span>{authorPosts.length} published {authorPosts.length === 1 ? "article" : "articles"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.darkEyebrow}>Contributor archive</p>
              <h2>Insights from {author.name.split(" ")[0]}.</h2>
            </div>
            <p>
              Experience-led perspectives reviewed by the BizTech Blogging editorial team.
            </p>
          </div>
          <div className={styles.postGrid}>
            {authorPosts.map((post) => (
              <PostCard post={post} key={post.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaPanel}>
            <div>
              <p className={styles.eyebrow}>Become a contributor</p>
              <h2>Your field experience can help the next reader.</h2>
              <p>Read the standards, send a draft, and hear back from a human editor.</p>
            </div>
            <Link className={styles.primaryButton} href="/write-for-us">
              Learn how to contribute <ArrowRight size={17} aria-hidden="true" />
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
          <span className={styles.cardAuthor}>
            <span className={styles.smallAvatar}>{post.author.initials}</span>
            <span>{post.author.name}</span>
          </span>
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
