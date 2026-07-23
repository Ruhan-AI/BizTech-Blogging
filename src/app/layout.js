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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BizTech Blogging - Practical Growth Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BizTech Blogging",
    description: "Ideas built for real-world growth.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BizTech Blogging",
    url: "https://blog.biztechra.site",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://blog.biztechra.site/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BizTech Resource Analyst",
    url: "https://www.biztechra.site/",
    logo: "https://blog.biztechra.site/icon.svg",
    sameAs: [
      "https://www.linkedin.com/company/biztech-resource-analyst",
      "https://twitter.com/biztechra"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "biztechresourceanalyst@gmail.com",
      telephone: "+1-214-896-1780",
      contactType: "customer service",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="page-progress" aria-hidden="true" />
        <div className="site-background" aria-hidden="true">
          <span className="background-band background-band-top" />
          <span className="background-band background-band-middle" />
          <span className="background-band background-band-bottom" />
          <span className="background-overlay" />
        </div>
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
        <MotionController />
      </body>
    </html>
  );
}

