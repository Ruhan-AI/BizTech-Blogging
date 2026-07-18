import Link from "next/link";

export default function Logo({ footer = false, onClick }) {
  return (
    <Link
      href="/"
      className={`brand-logo${footer ? " brand-logo-footer" : ""}`}
      aria-label="BizTech Blogging home"
      onClick={onClick}
    >
      <span className="brand-wordmark">
        <span>Biz</span>
        <span className="brand-tech">T</span>
        <span>ech</span>
      </span>
      <span className="brand-subline">
        <span>Blogging</span>
        <i aria-hidden="true" />
      </span>
    </Link>
  );
}
