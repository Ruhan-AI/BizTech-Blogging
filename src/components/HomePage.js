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

  // Billboard-style charts data structured using real posts/categories/authors
  const hotInsights = useMemo(() => [
    { post: posts[0], change: "steady", changeText: "steady" },
    { post: posts[1], change: "up", changeText: "up 2" },
    { post: posts[2], change: "new", changeText: "new" },
    { post: posts[3], change: "down", changeText: "down 1" },
    { post: posts[4], change: "up", changeText: "up 4" },
  ], []);

  const topContributors = useMemo(() => [
    { author: authors.find(a => a.slug === "amina-carter"), change: "steady", changeText: "steady" },
    { author: authors.find(a => a.slug === "marcus-reed"), change: "up", changeText: "up 1" },
    { author: authors.find(a => a.slug === "daniel-kim"), change: "steady", changeText: "steady" },
    { author: authors.find(a => a.slug === "sofia-malik"), change: "new", changeText: "new" },
    { author: authors.find(a => a.slug === "lena-ortiz"), change: "up", changeText: "up 2" },
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
              Ideas from people doing the work
            </div>
            <h1 data-hero-reveal>
              <span>Bold ideas.</span>
              <span>Real-world</span>
              <span className="gradient-text">growth.</span>
            </h1>
            <p className="hero-lead" data-hero-reveal>
              Independent thinking, practical playbooks, and field-tested lessons
              for founders and teams building what comes next.
            </p>
            <div className="hero-actions" data-hero-reveal>
              <a className="button button-primary button-large" href="#latest">
                Explore the latest<ArrowRight size={18} aria-hidden="true" />
              </a>
              <Link className="button button-glass button-large" href="/write-for-us">
                Share your expertise<PenLine size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="hero-proof" data-hero-reveal>
              <div><CheckCircle2 size={18} /><span><strong>Human-reviewed</strong><small>Every contribution</small></span></div>
              <div><Users size={18} /><span><strong>Expert voices</strong><small>Across six pillars</small></span></div>
              <div><BookOpen size={18} /><span><strong>Useful by design</strong><small>No empty theory</small></span></div>
            </div>
          </div>

          <article
            className="hero-feature-card"
            style={{ "--feature-gradient": featured.gradient }}
            data-hero-reveal
            data-float
          >
            <div className="feature-card-top">
              <span className="editor-pick"><i />Editor’s pick</span>
              <span className="feature-time"><Clock size={14} />{featured.readTime}</span>
            </div>
            <div className="feature-visual" aria-hidden="true">
              <span className="feature-grid" />
              <span className="feature-ring feature-ring-one" />
              <span className="feature-ring feature-ring-two" />
              <span className="feature-monogram">BT</span>
            </div>
            <div className="feature-content">
              <Link href={`/category/${featured.categorySlug}`} className="feature-category">
                {featured.category}
              </Link>
              <h2><Link href={`/insights/${featured.slug}`}>{featured.title}</Link></h2>
              <p>{featured.excerpt}</p>
              <div className="feature-author-row">
                <Link className="author-chip" href={`/author/${featured.author.slug}`}>
                  <span>{featured.author.initials}</span>
                  <div><strong>{featured.author.name}</strong><small>{featured.author.role}</small></div>
                </Link>
                <Link className="round-link" href={`/insights/${featured.slug}`} aria-label={`Read ${featured.title}`}>
                  <ArrowUpRight size={20} />
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      <div className="topic-marquee" aria-label="Coverage topics">
        <div className="topic-track" data-topic-track>
          {[...categories, ...categories].map((topic, index) => (
            <span key={`${topic.slug}-${index}`}><i />{topic.shortName}</span>
          ))}
        </div>
      </div>

      <section className="charts-section" id="charts" data-reveal>
        <div className="container">
          <div className="charts-container">
            <div className="charts-header">
              <div className="charts-title-group">
                <h2>BizTech Hot Leaderboard</h2>
                <p>Rankings of top insights, active contributors, and trending business topics.</p>
              </div>
              <div className="charts-tabs" role="tablist" aria-label="Leaderboard tabs">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "insights"}
                  className={`charts-tab${activeTab === "insights" ? " is-active" : ""}`}
                  onClick={() => setActiveTab("insights")}
                >
                  Hot Insights
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "contributors"}
                  className={`charts-tab${activeTab === "contributors" ? " is-active" : ""}`}
                  onClick={() => setActiveTab("contributors")}
                >
                  Top Contributors
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "topics"}
                  className={`charts-tab${activeTab === "topics" ? " is-active" : ""}`}
                  onClick={() => setActiveTab("topics")}
                >
                  Trending Topics
                </button>
              </div>
            </div>

            <div className="charts-list" aria-live="polite">
              {activeTab === "insights" &&
                hotInsights.map((item, idx) => (
                  <div key={item.post.slug} className="chart-row">
                    <div className="chart-rank-num">{idx + 1}</div>
                    <div>
                      <span className={`chart-change-badge change-${item.change}`}>
                        {item.changeText}
                      </span>
                    </div>
                    <div className="chart-item-main">
                      <Link href={`/insights/${item.post.slug}`} className="chart-item-title">
                        {item.post.title}
                      </Link>
                      <span className="chart-item-subtitle">{item.post.category}</span>
                    </div>
                    <div className="chart-item-meta">
                      <span>Author</span>
                      <Link href={`/author/${item.post.author.slug}`}>
                        <strong>{item.post.author.name}</strong>
                      </Link>
                    </div>
                    <div className="chart-item-action">
                      <Link href={`/insights/${item.post.slug}`} className="chart-action-btn" aria-label="View insight">
                        <ArrowUpRight size={18} />
                      </Link>
                    </div>
                  </div>
                ))}

              {activeTab === "contributors" &&
                topContributors.map((item, idx) => (
                  <div key={item.author.slug} className="chart-row">
                    <div className="chart-rank-num">{idx + 1}</div>
                    <div>
                      <span className={`chart-change-badge change-${item.change}`}>
                        {item.changeText}
                      </span>
                    </div>
                    <div className="chart-item-main">
                      <Link href={`/author/${item.author.slug}`} className="chart-item-title">
                        {item.author.name}
                      </Link>
                      <span className="chart-item-subtitle">{item.author.role}</span>
                    </div>
                    <div className="chart-item-meta">
                      <span>Articles Published</span>
                      <strong>{item.author.postCount}</strong>
                    </div>
                    <div className="chart-item-action">
                      <Link href={`/author/${item.author.slug}`} className="chart-action-btn" aria-label="View contributor profile">
                        <ArrowUpRight size={18} />
                      </Link>
                    </div>
                  </div>
                ))}

              {activeTab === "topics" &&
                trendingTopics.map((item, idx) => (
                  <div key={item.category.slug} className="chart-row">
                    <div className="chart-rank-num">{idx + 1}</div>
                    <div>
                      <span className={`chart-change-badge change-${item.change}`}>
                        {item.changeText}
                      </span>
                    </div>
                    <div className="chart-item-main">
                      <Link href={`/category/${item.category.slug}`} className="chart-item-title">
                        {item.category.name}
                      </Link>
                      <span className="chart-item-subtitle">{item.category.description}</span>
                    </div>
                    <div className="chart-item-meta">
                      <span>Article Count</span>
                      <strong>{item.category.count}</strong>
                    </div>
                    <div className="chart-item-action">
                      <Link href={`/category/${item.category.slug}`} className="chart-action-btn" aria-label="View category insights">
                        <ArrowUpRight size={18} />
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      <section className="editorial-intro section-space" id="topics">
        <div className="container intro-grid">
          <div data-reveal>
            <span className="section-kicker">The BizTech perspective</span>
            <h2>Where practical operators <span className="gradient-text">think out loud.</span></h2>
          </div>
          <div className="intro-copy" data-reveal>
            <p>
              Growth rarely follows a template. That is why we publish specific,
              honest perspectives from people navigating the real decisions—what
              worked, what did not, and what they would do next.
            </p>
            <Link href="/about" className="text-link">Why we built this <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="latest-section section-space" id="latest">
        <div className="container">
          <div className="section-heading" data-reveal>
            <div><span className="section-kicker">Fresh thinking</span><h2>Latest insights</h2></div>
            <p>Filter the briefing around the work on your desk right now.</p>
          </div>

          <div className="topic-filters" role="group" aria-label="Filter insights by topic" data-reveal>
            {topics.map((topic) => (
              <button
                key={topic.value}
                type="button"
                className={activeTopic === topic.value ? "is-active" : ""}
                aria-pressed={activeTopic === topic.value}
                onClick={() => setActiveTopic(topic.value)}
              >
                {topic.label}
              </button>
            ))}
          </div>

          <div className="editorial-split-grid" aria-live="polite">
            <div className="picks-container">
              <div className="picks-grid">
                {visiblePosts.slice(0, 4).map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </div>

            <div className="trending-feed" data-reveal>
              <div className="trending-feed-header">
                <Flame size={20} className="brand-tech" aria-hidden="true" />
                <h2>Trending Insights</h2>
              </div>
              <div className="trending-feed-list">
                {posts.slice(1, 6).map((post, idx) => (
                  <div key={post.slug} className="trending-feed-item">
                    <span className="trending-feed-num">{idx + 1}</span>
                    <div className="trending-feed-content">
                      <span className="trending-feed-category">{post.category}</span>
                      <Link href={`/insights/${post.slug}`} className="trending-feed-link">
                        {post.title}
                      </Link>
                      <span className="trending-feed-author">By {post.author.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="section-end" data-reveal>
            <Link href="/search" className="button button-glass button-large">
              Browse all insights <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="standards-section section-space">
        <div className="container standards-grid">
          <div className="standards-copy" data-reveal>
            <span className="section-kicker">Our editorial standard</span>
            <h2>Signal over noise. <span className="gradient-text">Every time.</span></h2>
            <p>
              The internet has enough generic advice. We look for clear points of
              view, useful evidence, and ideas a reader can put to work.
            </p>
            <Link className="button button-primary" href="/write-for-us">
              Read the contributor guide <ArrowRight size={17} />
            </Link>
          </div>
          <div className="standards-cards" data-reveal>
            {[
              [SearchCheck, "Original by default", "New thinking, first-hand lessons, and no recycled filler."],
              [Users, "Human-reviewed", "Every article is shaped by an editor before it goes live."],
              [TrendingUp, "Built to be useful", "Clear takeaways for founders, operators, and growing teams."],
            ].map(([Icon, title, body]) => (
              <article key={title}>
                <span><Icon size={22} aria-hidden="true" /></span>
                <div><h3>{title}</h3><p>{body}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contributor-banner section-space">
        <div className="container">
          <div className="contributor-card" data-reveal>
            <div className="contributor-lines" aria-hidden="true" />
            <div>
              <span className="section-kicker light">You have the experience</span>
              <h2>Turn what you know into something <span>others can use.</span></h2>
            </div>
            <div className="contributor-action">
              <p>No account. No maze. A clear ten-minute submission flow.</p>
              <Link href="/submit" className="button button-light button-large">
                Submit your article <ArrowUpRight size={19} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="newsletter-section section-space">
        <div className="container newsletter-card" data-reveal>
          <div className="newsletter-icon" data-float><Sparkles size={25} /></div>
          <div>
            <span className="section-kicker">The useful briefing</span>
            <h2>One strong idea for your next move.</h2>
            <p>Occasional notes on growth, people, brand, product, and the work between them.</p>
          </div>
          <NewsletterForm />
          <small>No spam. No recycled playbooks. Unsubscribe whenever you like.</small>
        </div>
      </section>
    </>
  );
}
