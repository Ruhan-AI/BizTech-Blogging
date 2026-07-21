import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import Logo from "./Logo";

const pageLinks = [
  ["Latest insights", "/#latest"],
  ["Write for us", "/write-for-us"],
  ["Submit Guest Post", "/submit"],
  ["About", "/about"],
  ["Search", "/search"],
];

const topicLinks = [
  ["SEO & Growth", "/category/seo-digital-growth"],
  ["People Operations", "/category/hr-people-operations"],
  ["Branding", "/category/social-media-branding"],
  ["Web & Design", "/category/website-development-design"],
  ["Startup Strategy", "/category/startup-business-strategy"],
  ["Career Development", "/category/vocational-career-development"],
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-glow" aria-hidden="true" />
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo footer />
          <p>
            Practical thinking from people doing the work. Every article is
            human-reviewed and built to help modern teams move with clarity.
          </p>
          <a
            className="parent-brand-link"
            href="https://www.biztechra.site/"
            target="_blank"
            rel="noreferrer"
          >
            Visit BizTech Resource Analyst
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>

        <div className="footer-column">
          <h2>Explore</h2>
          <ul>
            {pageLinks.map(([label, href]) => (
              <li key={label}><Link href={href}>{label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer-column footer-topics">
          <h2>Categories</h2>
          <ul>
            {topicLinks.map(([label, href]) => (
              <li key={label}><Link href={href}>{label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer-column footer-contact">
          <h2>Get in touch</h2>
          <a href="mailto:info@biztechra.site" className="contact-card">
            <span><Mail size={17} aria-hidden="true" /></span>
            <div><small>Email</small><strong>info@biztechra.site</strong></div>
          </a>
          <a
            href="https://maps.google.com/?q=4903+Westpark+Dr+Ste+304B,+Houston,+TX,+77063"
            target="_blank"
            rel="noreferrer"
            className="contact-card"
          >
            <span><MapPin size={17} aria-hidden="true" /></span>
            <div><small>Based in</small><strong>Houston, Texas</strong></div>
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2020–2026 BizTech. Ideas deserve useful places to grow.</p>
        <div>
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/contributor-terms">Contributor terms</Link>
        </div>
      </div>
    </footer>
  );
}
