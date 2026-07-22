import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Hash, ShieldCheck } from "lucide-react";
import PostCard from "@/components/PostCard";
import { getTopicBySlug, getAllTopics, getAllPosts } from "@/lib/data";
import styles from "@/styles/inner-pages.module.css";

export async function generateStaticParams() {
  const topics = await getAllTopics();
  return topics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const topic = await getTopicBySlug(slug);
  if (!topic) return {};

  return {
    title: `${topic.name} | BizTech Topic Cluster`,
    description: topic.description,
    alternates: {
      canonical: `/topics/${slug}`,
    },
  };
}

export default async function TopicClusterPage({ params }) {
  const { slug } = await params;
  const topic = await getTopicBySlug(slug);

  if (!topic) notFound();

  const allPosts = await getAllPosts();
  const topicPosts = allPosts.filter(
    (p) =>
      p.categorySlug === topic.categorySlug ||
      p.tags?.some((t) => t.toLowerCase().includes(topic.slug.replace("-", " "))),
  );

  return (
    <main className={styles.page}>
      <section className={styles.archiveHero}>
        <div className={styles.container}>
          <div className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/topics">Topics</Link>
            <span aria-hidden="true">/</span>
            <span>{topic.name}</span>
          </div>

          <div style={{ marginTop: "16px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                fontWeight: "bold",
                color: "var(--accent-3)",
                marginBottom: "8px",
              }}
            >
              <Hash size={15} /> Topic Cluster
            </span>
            <h1 className={styles.archiveTitle}>{topic.name}</h1>
            <p className={styles.archiveLede}>{topic.description}</p>
            <div className={styles.authorDetails} style={{ marginTop: "14px" }}>
              <span>{topicPosts.length} Articles in Cluster</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.darkEyebrow}>Cluster Feed</p>
              <h2>Articles on {topic.name}</h2>
            </div>
          </div>

          {topicPosts.length === 0 ? (
            <div className={styles.emptyState} style={{ padding: "40px", textAlign: "center" }}>
              <p style={{ color: "var(--muted)" }}>No articles registered in this cluster yet.</p>
              <Link href="/topics" className={styles.secondaryButton} style={{ marginTop: "14px" }}>
                Browse All Topics
              </Link>
            </div>
          ) : (
            <div className={styles.postGrid} style={{ marginTop: "24px" }}>
              {topicPosts.map((post) => (
                <PostCard post={post} key={post.slug} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
