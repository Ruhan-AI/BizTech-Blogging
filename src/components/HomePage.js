"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Clock,
  PenLine,
  SearchCheck,
  Sparkles,
  TrendingUp,
  Users,
  Flame,
} from "lucide-react";
import { categories, posts, authors } from "@/data/posts";
import PostCard from "./PostCard";
import NewsletterForm from "./NewsletterForm";
import KnowledgeOrb from "./3d/KnowledgeOrb";

export default function HomePage() {
  const topics = useMemo(
    () => [
      { label: "All insights", value: "all" },
      ...categories.map((category) => ({ label: category.shortName, value: category.name })),
    ],
    [],
  );
  const [activeTopic, setActiveTopic] = useState("all");
  const [activeTab, setActiveTab] = useState("insights");

  const featured = posts.find((post) => post.featured) || posts[0];
  const filteredPosts = posts.filter(
    (post) =>
      post.slug !== featured.slug &&
      (activeTopic === "all" || post.category === activeTopic),
  );
  const visiblePosts = filteredPosts.length ? filteredPosts : posts.slice(1);

  const hotInsights = useMemo(() => [
    { post: posts[0], change: "steady", changeText: "steady" },
    { post: posts[1], change: "up", changeText: "up 2" },
    { post: posts[2], change: "new", changeText: "new" },
    { post: posts[3], change: "down", changeText: "down 1" },
    { post: posts[4], change: "up", changeText: "up 4" },
  ], []);

  const topContributors = useMemo(() => [
    { author: authors.find(a => a.slug === "amina-carter") || authors[0], change: "steady", changeText: "steady" },
    { author: authors.find(a => a.slug === "marcus-reed") || authors[1], change: "up", changeText: "up 1" },
    { author: authors.find(a => a.slug === "daniel-kim") || authors[2], change: "steady", changeText: "steady" },
    { author: authors.find(a => a.slug === "sofia-malik") || authors[3], change: "new", changeText: "new" },
    { author: authors.find(a => a.slug === "lena-ortiz") || authors[4], change: "up", changeText: "up 2" },
  ], []);

  const trendingTopics = useMemo(() => [
    { category: categories.find(c => c.slug === "seo-digital-growth"), change: "steady", changeText: "steady" },
    { category: categories.find(c => c.slug === "hr-people-operations"), change: "up", changeText: "up 1" },
    { category: categories.find(c => c.slug === "website-development-design"), change: "steady", changeText: "steady" },
    { category: categories.find(c => c.slug === "social-media-branding"), change: "steady", changeText: "steady" },
    { category: categories.find(c => c.slug === "startup-business-strategy"), change: "new", changeText: "new" },
  ], []);

  return (
    <>
      <section className="home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow-pill" data-hero-reveal>
              <Sparkles size={15} aria-hidden="true" />
              Ideas with depth • Growth with direction
            </div>
            <h1 data-hero-reveal>
              <span>Ideas with depth.</span>
              <span className="gradient-text">Growth with direction.</span>
            </h1>
            <p className="hero-lead" data-hero-reveal>
              A curated editorial platform where founders, marketers, and developers share experience-led insights and field playbooks.
            </p>
            <div className="hero-actions" data-hero-reveal>
              <Link className="button button-primary button-large" href="/latest">
                Explore latest insights <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link className="button button-glass button-large" href="/write-for-us">
                Share your expertise <PenLine size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="hero-proof" data-hero-reveal>
              <div><CheckCircle2 size={18} /><span><strong>Human-reviewed</strong><small>Every contribution</small></span></div>
              <div><Users size={18} /><span><strong>Verified experts</strong><small>Across six pillars</small></span></div>
              <div><BookOpen size={18} /><span><strong>Useful by design</strong><small>No empty filler</small></span></div>
            </div>
          </div>

          <div className="hero-feature-card" style={{ padding: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <KnowledgeOrb />
          </div>
        </div>
      </section>

      {/* Featured Insight Section */}
      <section className="section section-editorial-split">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="dark-eyebrow">Editor&apos;s Feature</p>
              <h2>Highlighted Field Research</h2>
            </div>
            <p>Hand-picked for immediate strategic relevance and practical execution.</p>
          </div>

          <article className="lead-story-card">
            <div className="lead-story-media" style={{ background: featured.gradient }}>
              <span className="lead-category-badge">{featured.category}</span>
            </div>
            <div className="lead-story-content">
              <div className="story-meta">
                <span>{featured.date}</span>
                <span>•</span>
                <span>{featured.readTime}</span>
              </div>
              <h3>
                <Link href={`/insights/${featured.slug}`}>{featured.title}</Link>
              </h3>
              <p>{featured.excerpt}</p>

              <div className="author-strip">
                <div className="author-avatar">{featured.author.initials}</div>
                <div>
                  <strong>{featured.author.name}</strong>
                  <span>{featured.author.role}</span>
                </div>
              </div>

              <Link className="read-more-button" href={`/insights/${featured.slug}`}>
                Read Article <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* Billboard Hot Leaderboard Section */}
      <section className="section section-charts-widget" id="charts">
        <div className="container">
          <div className="section-header center">
            <div className="eyebrow-pill center">
              <Flame size={15} style={{ color: "var(--accent-2)" }} /> BizTech Charts
            </div>
            <h2>Hot Leaderboards</h2>
            <p>Real-time content, contributor, and category performance rankings.</p>

            <div className="chart-tabs">
              <button
                className={`chart-tab ${activeTab === "insights" ? "is-active" : ""}`}
                onClick={() => setActiveTab("insights")}
                type="button"
              >
                Hot Insights
              </button>
              <button
                className={`chart-tab ${activeTab === "contributors" ? "is-active" : ""}`}
                onClick={() => setActiveTab("contributors")}
                type="button"
              >
                Top Contributors
              </button>
              <button
                className={`chart-tab ${activeTab === "topics" ? "is-active" : ""}`}
                onClick={() => setActiveTab("topics")}
                type="button"
              >
                Trending Topics
              </button>
            </div>
          </div>

          {activeTab === "insights" && (
            <div className="billboard-chart-list">
              {hotInsights.map(({ post, change, changeText }, index) => (
                <article className="chart-row-item" key={post.slug}>
                  <div className="chart-rank">{index + 1}</div>
                  <div className="chart-movement">
                    <span className={`badge-movement badge-${change}`}>{changeText}</span>
                  </div>
                  <div className="chart-info">
                    <span className="chart-tag">{post.category}</span>
                    <h3 className="chart-title">
                      <Link href={`/insights/${post.slug}`}>{post.title}</Link>
                    </h3>
                  </div>
                  <div className="chart-author">
                    <div className="mini-avatar">{post.author.initials}</div>
                    <span>{post.author.name}</span>
                  </div>
                </article>
              ))}
            </div>
          )}

          {activeTab === "contributors" && (
            <div className="billboard-chart-list">
              {topContributors.map(({ author, change, changeText }, index) => (
                <article className="chart-row-item" key={author.slug || index}>
                  <div className="chart-rank">{index + 1}</div>
                  <div className="chart-movement">
                    <span className={`badge-movement badge-${change}`}>{changeText}</span>
                  </div>
                  <div className="chart-info">
                    <h3 className="chart-title">
                      <Link href={`/author/${author.slug}`}>{author.name}</Link>
                    </h3>
                    <p className="chart-subtext">{author.role}</p>
                  </div>
                  <div className="chart-stat">
                    <span>{author.postCount || 1} Published Insights</span>
                  </div>
                </article>
              ))}
            </div>
          )}

          {activeTab === "topics" && (
            <div className="billboard-chart-list">
              {trendingTopics.map(({ category, change, changeText }, index) => (
                <article className="chart-row-item" key={category.slug}>
                  <div className="chart-rank">{index + 1}</div>
                  <div className="chart-movement">
                    <span className={`badge-movement badge-${change}`}>{changeText}</span>
                  </div>
                  <div className="chart-info">
                    <h3 className="chart-title">
                      <Link href={`/category/${category.slug}`}>{category.name}</Link>
                    </h3>
                    <p className="chart-subtext">{category.description}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Latest Insights Bento Grid Section */}
      <section className="section" id="latest">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="dark-eyebrow">Recent Stream</p>
              <h2>Latest Editorial Insights</h2>
            </div>
            <div className="topic-filters">
              {topics.map((t) => (
                <button
                  key={t.value}
                  className={`topic-filter ${activeTopic === t.value ? "is-active" : ""}`}
                  onClick={() => setActiveTopic(t.value)}
                  type="button"
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="post-grid">
            {visiblePosts.map((post) => (
              <PostCard post={post} key={post.slug} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "36px" }}>
            <Link className="button button-glass" href="/latest">
              View all insights feed <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section section-cta">
        <div className="container">
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
