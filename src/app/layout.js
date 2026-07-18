import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MotionController from "@/components/MotionController";

export const metadata = {
  metadataBase: new URL("https://blog.biztechra.site"),
  title: "BizTech Blogging | Ideas Built for Real-World Growth",
  description:
    "Practical insight from founders, marketers, people leaders, and builders shaping the next stage of business growth.",
  keywords: [
    "business growth",
    "digital marketing",
    "SEO",
    "HR outsourcing",
    "startup strategy",
    "website development",
  ],
  openGraph: {
    type: "website",
    siteName: "BizTech Blogging",
    title: "BizTech Blogging | Ideas Built for Real-World Growth",
    description:
      "Independent thinking, practical playbooks, and field-tested ideas for modern business teams.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BizTech Blogging",
    description: "Ideas built for real-world growth.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="page-progress" aria-hidden="true" />
        <div className="site-background" aria-hidden="true">
          <span className="background-orb background-orb-one" />
          <span className="background-orb background-orb-two" />
          <span className="background-grid" />
        </div>
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
        <MotionController />
      </body>
    </html>
  );
}
