import HomePage from "@/components/HomePage";

export default function Page() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BizTech Blogging",
    url: "https://blog.biztechra.site",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://blog.biztechra.site/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BizTech Resource Analyst",
    url: "https://www.biztechra.site/",
    logo: "https://blog.biztechra.site/icon.svg",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-214-896-1780",
      contactType: "customer service",
      email: "biztechresourceanalyst@gmail.com",
    },
  };

  return (
    <main>
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
      <HomePage />
    </main>
  );
}
