import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getPostBySlug, posts } from "../../../data/posts";
import styles from "../../../styles/inner-pages.module.css";

const SITE_URL = "https://blog.biztechra.site";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  const canonical = `${SITE_URL}/insights/${post.slug}`;

  return {
    title: `${post.title} | BizTech Blogging`,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author.name],
      section: post.category,
      tags: post.tags,
    },
  };
}

export default async function InsightPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const articleUrl = `${SITE_URL}/insights/${post.slug}`;
  const shareUrl = encodeURIComponent(articleUrl);
  const relatedPosts = [
    ...posts.filter(
      (candidate) => candidate.slug !== post.slug && candidate.categorySlug === post.categorySlug,
    ),
    ...posts.filter(
      (candidate) => candidate.slug !== post.slug && candidate.categorySlug !== post.categorySlug,
    ),
  ].slice(0, 3);

  const contentSections = Array.isArray(post.content)
    ? post.content
    : typeof post.draftContent === "string" || typeof post.content === "string"
    ? (post.draftContent || post.content)
        .split("\n\n")
        .filter(Boolean)
        .map((para, i) => ({
          heading: i === 0 ? "Overview & Strategy" : `Key Insights Part ${i + 1}`,
          paragraphs: [para],
        }))
    : [
        {
          heading: "Overview & Strategy",
          paragraphs: [post.excerpt || post.title],
        },
      ];

  const postTags = Array.isArray(post.tags) ? post.tags : [post.category || "GuestPost"];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: articleUrl,
    author: {
      "@type": "Person",
      name: post.author.name,
      url: `${SITE_URL}/author/${post.author.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: "BizTech Resource Analyst",
      url: "https://www.biztechra.site/",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
      },
    },
    articleSection: post.category,
    keywords: postTags.join(", "),
    wordCount: 1250,
  };


  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
      />

      <header className={styles.articleHeader}>
        <div className={`${styles.container} ${styles.articleIntro}`}>
          <div className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/category/${post.categorySlug}`}>{post.category}</Link>
            <span aria-hidden="true">/</span>
            <span>Insight</span>
          </div>
          <p className={styles.eyebrow}>{post.category}</p>
          <h1 className={styles.articleTitle}>{post.title}</h1>
          <div className={styles.articleMeta}>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{post.readTime}</span>
            <span>Human-reviewed</span>
          </div>
          <div className={styles.authorRow}>
            <div className={styles.avatar} aria-hidden="true">{post.author.initials}</div>
            <div>
              <Link href={`/author/${post.author.slug}`}>{post.author.name}</Link>
              <p>{post.author.role}</p>
            </div>
          </div>
          <div className={styles.articleCover} style={{ background: post.gradient }}>
            <span className={styles.coverLabel}>
              BizTech Blogging / Contributor insight / {post.category}
            </span>
          </div>
        </div>
      </header>

      <div className={`${styles.container} ${styles.articleLayout}`}>
        <article className={styles.articleBody}>
          <p>{post.excerpt}</p>

          {contentSections.map((section) => {
            const sectionId = slugify(section.heading);
            return (
              <section className={styles.articleSection} id={sectionId} key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets?.length ? (
                  <ul className={styles.articleList}>
                    {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                ) : null}
              </section>
            );
          })}

          <div className={styles.tagList} aria-label="Article topics">
            {postTags.map((tag) => <span className={styles.tag} key={tag}>{tag}</span>)}
          </div>

          <div className={styles.authorBox}>
            <div className={styles.avatar} aria-hidden="true">{post.author.initials}</div>
            <div>
              <h2>
                Written by <Link href={`/author/${post.author.slug}`}>{post.author.name}</Link>
              </h2>
              <p>{post.author.bio}</p>
            </div>
          </div>
        </article>

        <aside className={styles.toc} aria-label="Article navigation">
          <h2>In this insight</h2>
          <ol className={styles.tocList}>
            {contentSections.map((section) => (
              <li key={section.heading}>
                <a href={`#${slugify(section.heading)}`}>{section.heading}</a>
              </li>
            ))}
          </ol>
          <div className={styles.tagList} aria-label="Share article">
            <a
              className={styles.tag}
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              Share on LinkedIn
            </a>
            <a
              className={styles.tag}
              href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noreferrer"
            >
              Share on X
            </a>
          </div>
        </aside>
      </div>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.darkEyebrow}>Keep reading</p>
              <h2>More practical perspectives.</h2>
            </div>
            <Link className={styles.textLink} href={`/category/${post.categorySlug}`}>
              Browse {post.category} <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.postGrid}>
            {relatedPosts.map((relatedPost) => (
              <PostCard post={relatedPost} key={relatedPost.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.ctaPanel}>
            <div>
              <p className={styles.eyebrow}>From reader to contributor</p>
              <h2>What have you learned by doing the work?</h2>
              <p>
                Share an original, useful perspective with founders and growing
                teams. No contributor account is required.
              </p>
            </div>
            <Link className={styles.primaryButton} href="/write-for-us">
              Write for BizTech <ArrowRight size={17} aria-hidden="true" />
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
        <h3 className={styles.cardTitle}>{post.title}</h3>
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

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
