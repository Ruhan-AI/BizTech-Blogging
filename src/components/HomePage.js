"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  PenLine,
  Sparkles,
  Users,
  Flame,
  ShieldCheck,
  TrendingUp,
  Award,
  Zap,
  Globe,
  Layers,
  Search,
  Briefcase,
  Compass,
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

  const categoryIcons = {
    "seo-digital-growth": <TrendingUp size={20} style={{ color: "#00d8bd" }} />,
    "hr-people-operations": <Users size={20} style={{ color: "#8b5cf6" }} />,
    "social-media-branding": <Sparkles size={20} style={{ color: "#ff2ea6" }} />,
    "website-development-design": <Globe size={20} style={{ color: "#34d399" }} />,
    "startup-business-strategy": <Briefcase size={20} style={{ color: "#ffe66b" }} />,
    "vocational-career-development": <Compass size={20} style={{ color: "#38bdf8" }} />,
  };

  const categoryColors = {
    "seo-digital-growth": "#00d8bd",
    "hr-people-operations": "#8b5cf6",
    "social-media-branding": "#ff2ea6",
    "website-development-design": "#34d399",
    "startup-business-strategy": "#ffe66b",
    "vocational-career-development": "#38bdf8",
  };

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

          <div className="hero-feature-card" style={{ padding: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <KnowledgeOrb />
          </div>
        </div>
      </section>

      {/* Editorial Proof Stats Bar */}
      <section className="section" style={{ padding: "2.5rem 0", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "18px" }}>
          <div style={{ padding: "20px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
            <strong style={{ fontSize: "32px", color: "var(--accent-3)", display: "block", fontWeight: "900" }}>100%</strong>
            <span style={{ fontSize: "13px", color: "var(--muted)", fontWeight: "600" }}>Human Editorial Moderation</span>
          </div>
          <div style={{ padding: "20px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
            <strong style={{ fontSize: "32px", color: "#fff", display: "block", fontWeight: "900" }}>6 Pillars</strong>
            <span style={{ fontSize: "13px", color: "var(--muted)", fontWeight: "600" }}>Core Knowledge Systems</span>
          </div>
          <div style={{ padding: "20px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
            <strong style={{ fontSize: "32px", color: "var(--accent-2)", display: "block", fontWeight: "900" }}>24–48h</strong>
            <span style={{ fontSize: "13px", color: "var(--muted)", fontWeight: "600" }}>Express Review Option</span>
          </div>
          <div style={{ padding: "20px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
            <strong style={{ fontSize: "32px", color: "#fff", display: "block", fontWeight: "900" }}>Community</strong>
            <span style={{ fontSize: "13px", color: "var(--muted)", fontWeight: "600" }}>Free Submission Queue</span>
          </div>
        </div>
      </section>

      {/* Featured Insight Section */}
      <section className="section section-editorial-split">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="dark-eyebrow">Editor&apos;s Showcase</p>
              <h2>Highlighted Field Research</h2>
            </div>
            <p>Hand-picked for immediate strategic relevance and practical execution.</p>
          </div>

          <article className="lead-story-card" style={{ borderRadius: "24px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(13, 13, 43, 0.85)" }}>
            <div className="lead-story-media" style={{ background: featured.gradient, minHeight: "280px", position: "relative" }}>
              <span className="lead-category-badge" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                {featured.category}
              </span>
            </div>
            <div className="lead-story-content" style={{ padding: "32px" }}>
              <div className="story-meta" style={{ display: "flex", gap: "12px", fontSize: "12px", color: "var(--accent-3)", fontWeight: "700" }}>
                <span>{featured.date}</span>
                <span>•</span>
                <span>{featured.readTime}</span>
              </div>
              <h3 style={{ margin: "14px 0 12px", fontSize: "28px", lineHeight: "1.25" }}>
                <Link href={`/insights/${featured.slug}`} style={{ color: "#fff", textDecoration: "none" }}>{featured.title}</Link>
              </h3>
              <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: "1.6" }}>{featured.excerpt}</p>

              <div className="author-strip" style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
                <div className="author-avatar" style={{ width: "42px", height: "42px", borderRadius: "50%", background: "var(--accent)", color: "#fff", display: "grid", placeItems: "center", fontWeight: "900" }}>
                  {featured.author.initials}
                </div>
                <div>
                  <strong style={{ display: "block", color: "#fff", fontSize: "15px" }}>{featured.author.name}</strong>
                  <span style={{ fontSize: "12px", color: "var(--muted)" }}>{featured.author.role}</span>
                </div>
              </div>

              <Link className="button button-primary" href={`/insights/${featured.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                Read Full Insight <ArrowRight size={16} />
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "22px", marginTop: "24px" }}>
            {categories.map((cat) => {
              const color = categoryColors[cat.slug] || "#8b5cf6";
              const icon = categoryIcons[cat.slug] || <Layers size={20} />;

              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  style={{
                    padding: "28px",
                    borderRadius: "20px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: `1px solid rgba(255, 255, 255, 0.08)`,
                    borderTop: `3px solid ${color}`,
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  }}
                  className="pillar-card-hover"
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "5px 12px",
                          borderRadius: "12px",
                          background: `${color}18`,
                          color: color,
                          fontSize: "12px",
                          fontWeight: "800",
                        }}
                      >
                        {cat.shortName}
                      </span>
                      <div style={{ padding: "8px", borderRadius: "10px", background: "rgba(255,255,255,0.03)" }}>
                        {icon}
                      </div>
                    </div>
                    <h3 style={{ color: "#fff", fontSize: "20px", margin: "0 0 10px 0", fontWeight: "800" }}>{cat.name}</h3>
                    <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>{cat.description}</p>
                  </div>
                  <div style={{ marginTop: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", color: color, fontSize: "13px", fontWeight: "800" }}>
                    <span>Explore Pillar</span>
                    <ArrowRight size={16} />
                  </div>
                </Link>
              );
            })}
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

            <div className="chart-tabs" style={{ marginTop: "20px" }}>
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

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link className="button button-glass button-large" href="/latest">
              View all insights stream <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial Standards & Disclosure Trust Card */}
      <section className="section">
        <div className="container">
          <div
            style={{
              padding: "44px",
              borderRadius: "28px",
              background: "linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(0, 216, 189, 0.06) 100%)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "36px",
              alignItems: "center",
              boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
            }}
          >
            <div>
              <span className="eyebrow-pill" style={{ marginBottom: "14px" }}>
                <ShieldCheck size={14} /> Transparent Link Policy
              </span>
              <h2 style={{ color: "#fff", fontSize: "28px", margin: "10px 0", fontWeight: "900" }}>Built for Strategic Value, Not Spam</h2>
              <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: "1.65", margin: 0 }}>
                Every guest post and reference link undergoes human screening. Community submissions are reviewed in our standard queue, with optional Express or Featured editorial options.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#fff", fontSize: "15px", fontWeight: "600" }}>
                <CheckCircle2 size={20} style={{ color: "var(--accent-3)" }} /> Community Editorial Queue & Human Moderation
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#fff", fontSize: "15px", fontWeight: "600" }}>
                <CheckCircle2 size={20} style={{ color: "var(--accent-3)" }} /> Explicit `rel=&quot;sponsored&quot;` / `rel=&quot;nofollow&quot;` Qualifications
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#fff", fontSize: "15px", fontWeight: "600" }}>
                <CheckCircle2 size={20} style={{ color: "var(--accent-3)" }} /> Direct Desk Support for Editorial Tiers
              </div>

              <div style={{ marginTop: "12px" }}>
                <Link className="button button-primary button-large" href="/submit" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  Submit Guest Post <ArrowRight size={17} />
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
