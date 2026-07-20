import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const data = await request.json();
    const {
      fullName,
      email,
      roleCompany,
      website,
      postTitle,
      category,
      metaDescription,
      focusKeywords,
      backlinkUrl,
      anchorText,
      gdriveImage,
      planSelected,
      draft,
      bio,
    } = data;

    // 1. Generate clean URL-friendly slug
    const baseSlug = postTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    
    // Add unique timestamp component to avoid dynamic import path duplicates in webpack
    const uniqueId = Date.now().toString().slice(-4);
    const slug = `${baseSlug}-${uniqueId}`;

    // 2. Calculate expiry timeline based on subscription plans
    const creationDate = new Date();
    const durationDays =
      planSelected === "3months"
        ? 90
        : planSelected === "6months"
        ? 180
        : planSelected === "12months"
        ? 365
        : 7;

    const expiry = new Date();
    expiry.setDate(creationDate.getDate() + durationDays);

    const expiryDateStr = expiry.toISOString().split("T")[0];
    const dateStr = creationDate.toISOString().split("T")[0];

    // Determine initials
    const initials = fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);

    // Map Category slugs to readable names
    const categoryNames = {
      "seo-digital-growth": "SEO & Digital Growth",
      "hr-people-operations": "HR Outsourcing & People Operations",
      "social-media-branding": "Social Media & Branding",
      "website-development-design": "Website Development & Design",
      "startup-business-strategy": "Startup Advisory & Business Strategy",
      "vocational-career-development": "Vocational Training & Career Development",
    };
    const categoryName = categoryNames[category] || "SEO & Digital Growth";

    // 3. Formulate the post metadata
    const newPost = {
      slug: slug,
      title: postTitle,
      excerpt: metaDescription || (draft.substring(0, 150) + "..."),
      category: categoryName,
      categorySlug: category || "seo-digital-growth",
      date: dateStr,
      readTime: "6 min read",
      author: {
        name: fullName,
        slug: fullName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        role: roleCompany,
        initials: initials || "GP",
        bio: bio,
      },
      gradient: "linear-gradient(135deg, #090909 0%, #28223a 58%, #a98aff 145%)",
      featured: false,
      tags: focusKeywords ? focusKeywords.split(",").map((k) => k.trim()) : [category || "GuestPost"],
      // Guest post billing and validation options
      planSelected: planSelected || "free",
      expiryDate: expiryDateStr,
      gdriveImage: gdriveImage || "",
      backlinkUrl: backlinkUrl || "",
      anchorText: anchorText || "",
      metaDescription: metaDescription || "",
      focusKeywords: focusKeywords || "",
      isGuestPost: true,
    };

    // 4. Save metadata to guest_posts.json
    const jsonPath = path.join(process.cwd(), "src", "data", "guest_posts.json");
    let guestPosts = [];
    if (fs.existsSync(jsonPath)) {
      const rawData = fs.readFileSync(jsonPath, "utf-8");
      try {
        guestPosts = JSON.parse(rawData);
      } catch (err) {
        guestPosts = [];
      }
    }
    guestPosts.push(newPost);
    fs.writeFileSync(jsonPath, JSON.stringify(guestPosts, null, 2), "utf-8");

    // 5. Physically create the folder and page.js inside src/app/insights/
    const dirPath = path.join(process.cwd(), "src", "app", "insights", slug);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const pagePath = path.join(dirPath, "page.js");
    const pageCode = `import Link from "next/link";
import { ArrowLeft, Clock, ShieldCheck, Calendar, Globe, ArrowUpRight } from "lucide-react";
import styles from "../../../styles/inner-pages.module.css";

export default function Page() {
  const post = ${JSON.stringify(newPost, null, 2)};
  const paragraphs = ${JSON.stringify(draft.split("\n\n").filter(Boolean))};

  return (
    <main className={styles.page}>
      <header className={styles.articleHeader}>
        <div className={\`\${styles.container} \${styles.articleIntro}\`}>
          <div className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href={\`/category/\${post.categorySlug}\`}>{post.category}</Link>
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

      <div className={\`\${styles.container} \${styles.articleLayout}\`}>
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
`;

    fs.writeFileSync(pagePath, pageCode, "utf-8");

    return NextResponse.json({ success: true, slug: slug });
  } catch (err) {
    console.error("Submission error:", err);
    return NextResponse.json(
      { error: "Failed to handle submission: " + err.message },
      { status: 500 }
    );
  }
}
