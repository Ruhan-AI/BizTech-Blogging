"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu, PenLine, Search, X, Flame } from "lucide-react";
import Logo from "./Logo";
import { categories, posts } from "@/data/posts";

const navItems = [
  { label: "Latest", href: "/latest" },
  { label: "Charts", href: "/charts" },
  { label: "Topics", href: "/topics" },
  { label: "Write for us", href: "/write-for-us" },
  { label: "About", href: "/about" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Generate ticker items from posts
  const tickerItems = [
    { label: "Charts", text: "Explore the new BizTech Hot Leaderboards!", href: "/#charts" },
    { label: "Hot #1", text: posts[0]?.title, href: `/insights/${posts[0]?.slug}` },
    { label: "Trending", text: posts[1]?.title, href: `/insights/${posts[1]?.slug}` },
    { label: "SEO & Growth", text: posts[6]?.title, href: `/insights/${posts[6]?.slug}` },
    { label: "Careers", text: posts[5]?.title, href: `/insights/${posts[5]?.slug}` },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="header-shell">
        <Logo onClick={() => setMenuOpen(false)} />


        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href}>{item.label}</Link>
          ))}
          <div className="nav-dropdown">
            <button className="nav-dropdown-trigger" type="button">
              Categories
              <ChevronDown size={13} aria-hidden="true" />
            </button>
            <div className="nav-dropdown-menu">
              {categories.map((category) => (
                <Link key={category.slug} href={`/category/${category.slug}`}>
                  {category.shortName}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="header-actions">
          <button
            className="header-secondary-action search-toggle"
            type="button"
            aria-label={searchOpen ? "Close search" : "Open search"}
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((value) => !value)}
          >
            {searchOpen ? <X size={16} /> : <Search size={16} />}
            <span>{searchOpen ? "Close" : "Search"}</span>
          </button>
          <Link className="button button-primary header-cta" href="/submit">
            Submit Guest Post
            <PenLine size={16} aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="icon-button menu-toggle"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className="trending-ticker-container">
        <div className="trending-ticker-label">
          <Flame size={12} aria-hidden="true" />
          <span>Trending</span>
        </div>
        <div className="trending-ticker-content">
          <div className="trending-ticker-track">
            {tickerItems.map((item, idx) => (
              <Link key={`first-${idx}`} href={item.href} className="trending-ticker-item">
                <span className="ticker-badge">{item.label}:</span>
                <span>{item.text}</span>
              </Link>
            ))}
            {tickerItems.map((item, idx) => (
              <Link key={`second-${idx}`} href={item.href} className="trending-ticker-item">
                <span className="ticker-badge">{item.label}:</span>
                <span>{item.text}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="search-drawer">
          <form className="search-form" action="/search" role="search">
            <Search size={18} aria-hidden="true" />
            <label className="sr-only" htmlFor="site-search">Search insights</label>
            <input
              id="site-search"
              name="q"
              type="search"
              placeholder="Search strategy, SEO, people, web…"
              autoFocus
            />
            <button className="button button-primary button-small" type="submit">Search</button>
          </form>
        </div>
      )}

      <div className={`mobile-panel${menuOpen ? " is-open" : ""}`}>
        <nav aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href}>
              {item.label}<ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          ))}
          <div className="mobile-categories-section">
            <p className="mobile-section-title">Categories</p>
            {categories.map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`} className="mobile-category-link">
                {category.name}<ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </nav>
        <Link className="button button-primary mobile-submit" href="/submit">
          Submit Guest Post<PenLine size={17} aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}
