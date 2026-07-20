import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

export default function PostCard({ post }) {
  return (
    <article
      className="post-card"
      style={{ "--post-gradient": post.gradient }}
      data-reveal
    >
      {post.isGuestPost && (
        <span 
          className="guest-validation-badge" 
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            zIndex: 10,
            background: post.planSelected === "free" ? "rgba(0, 216, 189, 0.95)" : "rgba(255, 46, 166, 0.95)",
            color: "#05050d",
            fontSize: "9px",
            fontWeight: "900",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            padding: "4px 8px",
            borderRadius: "6px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
          }}
        >
          {post.planSelected === "free" ? "Free 7-Day" : "Premium Guest"}
        </span>
      )}
      <Link
        href={`/insights/${post.slug}`}
        className="post-art"
        aria-label={`Read ${post.title}`}
      >
        <span className="post-art-grid" aria-hidden="true" />
        <span className="post-art-orb" aria-hidden="true" />
        <span className="post-art-code" aria-hidden="true">
          {String(post.category || "Insight").slice(0, 2).toUpperCase()}
        </span>
      </Link>
      <div className="post-card-body">
        <div className="post-card-meta">
          <Link href={`/category/${post.categorySlug}`}>{post.category}</Link>
          <span><Clock size={13} aria-hidden="true" />{post.readTime}</span>
        </div>
        <h3><Link href={`/insights/${post.slug}`}>{post.title}</Link></h3>
        <p>{post.excerpt}</p>
        <div className="post-card-footer">
          <Link className="author-chip" href={`/author/${post.author.slug}`}>
            <span>{post.author.initials}</span>
            <div><strong>{post.author.name}</strong><small>{post.author.role}</small></div>
          </Link>
          <Link className="post-arrow" href={`/insights/${post.slug}`} aria-label={`Read ${post.title}`}>
            <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
