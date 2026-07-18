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
} from "lucide-react";
import { categories, posts } from "@/data/posts";
import PostCard from "./PostCard";
import NewsletterForm from "./NewsletterForm";

export default function HomePage() {
  const topicNames = useMemo(
    () => ["All insights", ...categories.map((category) => category.name)],
    [],
  );
  const [activeTopic, setActiveTopic] = useState("All insights");
  const featured = posts.find((post) => post.featured) || posts[0];
  const filteredPosts = posts.filter(
    (post) =>
      post.slug !== featured.slug &&
      (activeTopic === "All insights" || post.category === activeTopic),
  );
  const visiblePosts = filteredPosts.length ? filteredPosts : posts.slice(1);

  return (
    <>
      <section className="home-hero">
        <div className="hero-haze" aria-hidden="true" />
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
            {topicNames.map((topic) => (
              <button
                key={topic}
                type="button"
                className={activeTopic === topic ? "is-active" : ""}
                aria-pressed={activeTopic === topic}
                onClick={() => setActiveTopic(topic)}
              >
                {topic}
              </button>
            ))}
          </div>

          <div className="post-grid" aria-live="polite">
            {visiblePosts.slice(0, 6).map((post) => <PostCard key={post.slug} post={post} />)}
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
          <div className="standards-cards">
            {[
              [SearchCheck, "Original by default", "New thinking, first-hand lessons, and no recycled filler."],
              [Users, "Human-reviewed", "Every article is shaped by an editor before it goes live."],
              [TrendingUp, "Built to be useful", "Clear takeaways for founders, operators, and growing teams."],
            ].map(([Icon, title, body], index) => (
              <article key={title} data-reveal data-float={index === 1 ? "" : undefined}>
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
