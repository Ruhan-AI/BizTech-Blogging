"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, PenLine, Search, X } from "lucide-react";
import Logo from "./Logo";

const navItems = [
  { label: "Latest", href: "/#latest" },
  { label: "Topics", href: "/#topics" },
  { label: "Write for us", href: "/write-for-us" },
  { label: "About", href: "/about" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          <Link href="/category/seo-digital-growth">Categories</Link>
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
            Submit an article
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
          <Link href="/category/seo-digital-growth">
            SEO &amp; Digital Growth<ArrowUpRight size={17} aria-hidden="true" />
          </Link>
          <Link href="/category/startup-business-strategy">
            Startup Strategy<ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </nav>
        <Link className="button button-primary mobile-submit" href="/submit">
          Submit your article<PenLine size={17} aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}
