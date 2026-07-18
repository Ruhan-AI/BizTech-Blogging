import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-orb" aria-hidden="true">404</div>
      <span className="section-kicker">This page wandered off</span>
      <h1>Let’s get you back to a useful idea.</h1>
      <p>The page you requested does not exist or may have moved.</p>
      <div>
        <Link className="button button-primary button-large" href="/">
          <ArrowLeft size={18} />Back to home
        </Link>
        <Link className="button button-glass button-large" href="/search">
          <Search size={18} />Search insights
        </Link>
      </div>
    </main>
  );
}
