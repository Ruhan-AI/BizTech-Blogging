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
  ShieldCheck,
  Zap,
  Layers,
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
      {/* 3D Hero Section */}
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
              A curated editorial publication and guest-contribution platform where founders, marketers, and developers share experience-led insights and field playbooks.
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
              <div><Users size={18} /><span><strong>Verified experts</strong><small>Across 6 pillars</small></span></div>
              <div><BookOpen size={18} /><span><strong>Useful by design</strong><small>No empty theory</small></span></div>
            </div>
          </div>

          <div className="hero-feature-card" style={{ padding: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <KnowledgeOrb />
          </div>
        </div>
      </section>

      {/* Editorial Proof Stats Bar */}
      <section className="section" style={{ padding: "2rem 0", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px", textAlign: "center" }}>
          <div>
            <strong style={{ fontSize: "28px", color: "var(--accent-3)", display: "block" }}>100%</strong>
            <span style={{ fontSize: "13px", color: "var(--muted)" }}>Human Editorial Review</span>
          </div>
          <div>
            <strong style={{ fontSize: "28px", color: "#fff", display: "block" }}>6 Pillars</strong>
            <span style={{ fontSize: "13px", color: "var(--muted)" }}>Knowledge Clusters</span>
          </div>
          <div>
            <strong style={{ fontSize: "28px", color: "var(--accent-2)", display: "block" }}>24–48h</strong>
            <span style={{ fontSize: "13px", color: "var(--muted)" }}>Review Turnaround</span>
          </div>
          <div>
            <strong style={{ fontSize: "28px", color: "#fff", display: "block" }}>7 Days</strong>
            <span style={{ fontSize: "13px", color: "var(--muted)" }}>Free Validation Period</span>
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

      {/* 6 Knowledge Pillars Grid Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="dark-eyebrow">Knowledge Systems</p>
              <h2>Explore Editorial Pillars</h2>
            </div>
            <p>Deep tactical playbooks categorized across 6 key discipline areas.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "24px" }}>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                style={{
                  padding: "24px",
                  borderRadius: "16px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                }}
              >
                <div>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 10px",
                      borderRadius: "12px",
                      background: "rgba(139, 92, 246, 0.15)",
                      color: "var(--accent-3)",
                      fontSize: "11px",
                      fontWeight: "bold",
                      marginBottom: "12px",
                    }}
                  >
                    {cat.shortName}
                  </span>
                  <h3 style={{ color: "#fff", fontSize: "18px", margin: "0 0 8px 0" }}>{cat.name}</h3>
                  <p style={{ color: "var(--muted)", fontSize: "13px", lineHeight: "1.5", margin: 0 }}>{cat.description}</p>
                </div>
                <div style={{ marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "space-between", color: "var(--accent-3)", fontSize: "13px", fontWeight: "bold" }}>
                  <span>Browse pillar</span>
                  <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
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

      {/* Editorial Standards & Disclosure Trust Card */}
      <section className="section">
        <div className="container">
          <div
            style={{
              padding: "40px",
              borderRadius: "24px",
              background: "linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(0, 216, 189, 0.04) 100%)",
              border: "1px solid rgba(139, 92, 246, 0.25)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "30px",
              alignItems: "center",
            }}
          >
            <div>
              <span className="eyebrow-pill" style={{ marginBottom: "12px" }}>
                <ShieldCheck size={14} /> Transparent Link Policy
              </span>
              <h2 style={{ color: "#fff", fontSize: "26px", margin: "8px 0" }}>Built for Strategic Value, Not Spam</h2>
              <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
                Every guest post and reference link undergoes strict human screening. Free guest posts include 7-day validation with optional 3, 6, or 12-month extensions.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#fff", fontSize: "14px" }}>
                <CheckCircle2 size={18} style={{ color: "var(--accent-3)" }} /> Free 7-Day Contribution Validation
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#fff", fontSize: "14px" }}>
                <CheckCircle2 size={18} style={{ color: "var(--accent-3)" }} /> Explicit `rel=&quot;sponsored&quot;` / `rel=&quot;nofollow&quot;` Qualifications
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#fff", fontSize: "14px" }}>
                <CheckCircle2 size={18} style={{ color: "var(--accent-3)" }} /> Direct Phone & Email Support for Plan Extensions
              </div>

              <div style={{ marginTop: "10px" }}>
                <Link className="button button-primary" href="/submit" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  Submit Guest Post <ArrowRight size={16} />
                </Link>
              </div>
            </div>
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
