import Link from "next/link";
import styles from "../../styles/inner-pages.module.css";

export const metadata = {
  title: "Privacy Policy | BizTech Blogging",
  description:
    "How BizTech Blogging handles visitor and contributor information.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <section className={styles.archiveHero}>
        <div className={styles.narrowContainer}>
          <div className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Privacy policy</span>
          </div>
          <p className={styles.eyebrow}>Respecting your information</p>
          <h1 className={styles.archiveTitle}>Privacy policy</h1>
          <p className={styles.archiveLede}>
            This policy describes the information BizTech Blogging may collect,
            why it is used, and the choices available to visitors and contributors.
          </p>
          <div className={styles.archiveMeta}>
            <span>Effective July 18, 2026</span>
            <span>BizTech Resource Analyst</span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.narrowContainer}>
          <p className={styles.legalIntro}>
            This MVP is currently presented as a local product demonstration. The
            demo submission form confirms locally and does not transmit or store
            the information you enter. This policy also describes the intended
            treatment of data when submission services are connected for production.
          </p>
          <div className={styles.legalStack}>
            <article className={styles.legalBlock}>
              <h2>1. Information you provide</h2>
              <p>
                A production submission may collect your name, email address, role
                or company, website or portfolio, article title and draft, author
                biography, proposed links, optional social handle, and optional
                headshot. We may also receive information you send in support or
                editorial correspondence.
              </p>
            </article>
            <article className={styles.legalBlock}>
              <h2>2. Information collected automatically</h2>
              <p>
                Like most websites, a production service may receive basic device,
                browser, IP address, referring page, and usage information through
                hosting logs and privacy-conscious analytics. Cookies or similar
                technologies will be described through an appropriate notice when used.
              </p>
            </article>
            <article className={styles.legalBlock}>
              <h2>3. How information is used</h2>
              <ul>
                <li>Receive, review, edit, and make decisions about submissions.</li>
                <li>Contact contributors about status, revisions, and publication.</li>
                <li>Create author profiles and publish approved contributor details.</li>
                <li>Protect the service from spam, abuse, fraud, and security threats.</li>
                <li>Understand site performance and improve the reader experience.</li>
                <li>Meet legal obligations and enforce contributor terms.</li>
              </ul>
            </article>
            <article className={styles.legalBlock}>
              <h2>4. Sharing and service providers</h2>
              <p>
                We do not sell personal information. Information may be processed
                by vendors that help us operate hosting, email, analytics, form,
                storage, and security services under appropriate agreements. We may
                also disclose information when required by law or to protect rights,
                safety, and the integrity of the service.
              </p>
            </article>
            <article className={styles.legalBlock}>
              <h2>5. Publication is public</h2>
              <p>
                If your article is accepted, the name, biography, optional headshot,
                and links approved for your author profile will be visible publicly
                and may be indexed by search engines. Your email address is not
                published unless you specifically request and approve it.
              </p>
            </article>
            <article className={styles.legalBlock}>
              <h2>6. Retention and security</h2>
              <p>
                Production information will be retained only as long as reasonably
                needed for editorial operations, records, security, and legal
                obligations. We use proportionate safeguards, but no internet
                transmission or storage system can be guaranteed completely secure.
              </p>
            </article>
            <article className={styles.legalBlock}>
              <h2>7. Your choices</h2>
              <p>
                You may ask to access, correct, or delete personal information we
                hold, subject to applicable law and legitimate recordkeeping needs.
                You may also ask us to update public profile information or stop
                non-essential communications.
              </p>
            </article>
            <article className={styles.legalBlock}>
              <h2>8. Children&apos;s privacy</h2>
              <p>
                BizTech Blogging is intended for a professional and business audience
                and is not directed to children under 13. We do not knowingly collect
                personal information from children under 13.
              </p>
            </article>
            <article className={styles.legalBlock}>
              <h2>9. Contact and updates</h2>
              <p>
                Questions or privacy requests may be sent to
                {" "}<a href="mailto:biztechresourceanalyst@gmail.com">biztechresourceanalyst@gmail.com</a> or via phone at <a href="tel:+12148961780">+1 (214) 896-1780</a>.
                We may update this policy as the service changes; the effective date
                at the top identifies the latest version.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
