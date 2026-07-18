import Link from "next/link";
import { ArrowRight, Search, SearchX } from "lucide-react";
import { searchPosts } from "../../data/posts";
import styles from "../../styles/inner-pages.module.css";

export const metadata = {
  title: "Search | BizTech Blogging",
  description: "Search contributor insights across the BizTech Blogging library.",
  alternates: {
    canonical: "/search",
  },
};

export default async function SearchPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const query = typeof resolvedSearchParams?.q === "string" ? resolvedSearchParams.q.trim() : "";
  const results = query ? searchPosts(query) : [];

  return (
    <main className={styles.page}>
      <section className={styles.archiveHero}>
        <div className={styles.container}>
          <div className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Search</span>
          </div>
          <p className={styles.eyebrow}>Explore the library</p>
          <h1 className={styles.archiveTitle}>Find a useful perspective.</h1>
          <p className={styles.archiveLede}>
            Search article titles, topics, authors, and the full seeded editorial library.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.searchPanel}>
            <form className={styles.searchForm} action="/search" method="get" role="search">
              <div className={styles.searchInputWrap}>
                <Search className={styles.searchIcon} size={19} aria-hidden="true" />
                <label className="sr-only" htmlFor="site-search">Search insights</label>
                <input
                  className={styles.searchInput}
                  id="site-search"
                  name="q"
                  type="search"
                  defaultValue={query}
                  placeholder="Try “SEO”, “remote teams”, or an author name"
                />
              </div>
              <button className={styles.searchButton} type="submit">Search</button>
            </form>
            {query && (
              <p className={styles.resultsCopy} aria-live="polite">
                {results.length} {results.length === 1 ? "result" : "results"} for “{query}”
              </p>
            )}
          </div>

          <div style={{ marginTop: "2rem" }}>
            {!query ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}><Search size={20} aria-hidden="true" /></div>
                <h2>What are you working through?</h2>
                <p>
                  Search for a topic, discipline, contributor, or phrase to explore
                  relevant articles.
                </p>
              </div>
            ) : results.length ? (
              <div className={styles.postGrid}>
                {results.map((post) => <PostCard post={post} key={post.slug} />)}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}><SearchX size={20} aria-hidden="true" /></div>
                <h2>No direct matches yet.</h2>
                <p>
                  Try a broader phrase or browse the latest insights. Our contributor
                  library will continue to grow.
                </p>
                <div className={`${styles.heroActions} ${styles.successActions}`}>
                  <Link className={styles.primaryButton} href="/">
                    Browse all insights <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            )}
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
