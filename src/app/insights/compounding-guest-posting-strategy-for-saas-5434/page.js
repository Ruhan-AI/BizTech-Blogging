import Link from "next/link";
import { ArrowLeft, Clock, ShieldCheck, Calendar, Globe, ArrowUpRight } from "lucide-react";
import styles from "../../../styles/inner-pages.module.css";

export default function Page() {
  const post = {
  "slug": "compounding-guest-posting-strategy-for-saas-5434",
  "title": "Compounding Guest Posting Strategy for SaaS",
  "excerpt": "A complete guide on compounding guest posting strategies for SaaS companies to scale search traffic.",
  "category": "SEO & Digital Growth",
  "categorySlug": "seo-digital-growth",
  "date": "2026-07-20",
  "readTime": "6 min read",
  "author": {
    "name": "Ruhan SEO Specialist",
    "slug": "ruhan-seo-specialist",
    "role": "SEO Lead",
    "initials": "RS",
    "bio": "SEO veteran"
  },
  "gradient": "linear-gradient(135deg, #090909 0%, #28223a 58%, #a98aff 145%)",
  "featured": false,
  "tags": [
    "SEO",
    "backlinks",
    "ranking"
  ],
  "planSelected": "3months",
  "expiryDate": "2026-10-18",
  "gdriveImage": "https://drive.google.com/file/d/example",
  "backlinkUrl": "https://mysite.com/deals",
  "anchorText": "best SEO deals",
  "metaDescription": "A complete guide on compounding guest posting strategies for SaaS companies to scale search traffic.",
  "focusKeywords": "SEO, backlinks, ranking",
  "isGuestPost": true
};
  const paragraphs = ["This is the full body of the guest post. We will demonstrate local file writing capabilities. Building high-quality backlinks through guest posting remains one of the most effective strategies for long-term SEO success. By publishing content on authoritative sites, you can acquire contextually relevant backlinks that compound value over time."];

  return (
    <main className={styles.page}>
      <header className={styles.articleHeader}>
        <div className={`${styles.container} ${styles.articleIntro}`}>
          <div className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/category/${post.categorySlug}`}>{post.category}</Link>
            <span aria-hidden="true">/</span>
            <span>Guest Post</span>
          </div>
          <p className={styles.eyebrow}>Guest Post / {post.category}</p>
          <h1 className={styles.articleTitle}>{post.title}</h1>
          
          <div className={styles.articleMeta} style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--accent-3)' }}>
              <ShieldCheck size={16} /> <strong>Active Guest Post</strong>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--muted)' }}>
              <Calendar size={16} /> Expires: {post.expiryDate}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--muted)' }}>
              <Clock size={16} /> {post.readTime}
            </span>
          </div>

          <div className={styles.authorRow} style={{ marginTop: '24px' }}>
            <div className={styles.avatar} aria-hidden="true">{post.author.initials}</div>
            <div>
              <strong>{post.author.name}</strong>
              <p>{post.author.role}</p>
            </div>
          </div>
          <div className={styles.articleCover} style={{ background: post.gradient, marginTop: '30px' }}>
            <span className={styles.coverLabel}>
              BizTech Guest Posting / Active Validation: {post.planSelected === "free" ? "7 Days Free" : "Premium"}
            </span>
          </div>
        </div>
      </header>

      <div className={`${styles.container} ${styles.articleLayout}`}>
        <article className={styles.articleBody}>
          
          {post.gdriveImage && (
            <div style={{ marginBottom: '28px', padding: '20px', border: '1px dashed var(--line)', borderRadius: '16px', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ fontSize: '28px' }}>📂</div>
              <div>
                <strong style={{ display: 'block', fontSize: '14px', color: '#fff' }}>Linked Google Drive Featured Image Resource:</strong>
                <a href={post.gdriveImage} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-3)', fontSize: '13px', textDecoration: 'underline', wordBreak: 'break-all' }}>
                  {post.gdriveImage}
                </a>
              </div>
            </div>
          )}

          {post.backlinkUrl && (
            <div style={{ marginBottom: '28px', padding: '20px', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '16px', background: 'rgba(139, 92, 246, 0.03)' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent)' }}>SEO Specialist Metadata</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{ margin: 0, fontSize: '14px' }}>
                  <strong>Target Backlink:</strong> <a href={post.backlinkUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-3)', textDecoration: 'underline', fontWeight: 'bold' }}>{post.anchorText || "Visit Site"}</a>
                </p>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--muted)' }}>
                  <strong>Focus Keywords:</strong> {post.focusKeywords}
                </p>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--muted)' }}>
                  <strong>Meta Description:</strong> {post.metaDescription}
                </p>
              </div>
            </div>
          )}

          <p style={{ fontSize: '18px', lineHeight: '1.6', color: 'rgba(255,255,255,0.9)', marginBottom: '24px' }}>
            {post.excerpt}
          </p>

          {paragraphs.map((para, i) => (
            <p key={i} style={{ marginBottom: '20px', fontSize: '16px', lineHeight: '1.65' }}>{para}</p>
          ))}

          <div className={styles.authorBox} style={{ marginTop: '48px' }}>
            <div className={styles.avatar} aria-hidden="true">{post.author.initials}</div>
            <div>
              <h2>Written by {post.author.name}</h2>
              <p>{post.author.bio}</p>
            </div>
          </div>
        </article>

        <aside className={styles.toc} aria-label="SEO Actions">
          <h2 style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Backlink Target</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {post.backlinkUrl ? (
              <a href={post.backlinkUrl} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: 'var(--gradient)', borderRadius: '999px', color: '#fff', fontSize: '14px', fontWeight: '700', justifyContent: 'center' }}>
                <Globe size={16} /> Visit Target Site
              </a>
            ) : (
              <span style={{ color: 'var(--muted)', fontSize: '13px' }}>No backlink specified.</span>
            )}
            
            <div style={{ marginTop: '24px', borderTop: '1px solid var(--line)', paddingTop: '20px' }}>
              <span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: '8px' }}>Validation Details</span>
              <p style={{ margin: '0 0 4px 0', fontSize: '13px' }}>Plan: <strong>{post.planSelected === "free" ? "7 Days Free" : "Premium Plan"}</strong></p>
              <p style={{ margin: 0, fontSize: '13px' }}>Expires: <strong>{post.expiryDate}</strong></p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
