import Link from "next/link";
import { categories } from "../../data/posts";
import styles from "../../styles/inner-pages.module.css";
import SubmissionForm from "./SubmissionForm";

export const metadata = {
  title: "Submit an Article | BizTech Blogging",
  description:
    "Submit an original guest article to the BizTech Blogging editorial team. No account required.",
  alternates: {
    canonical: "/submit",
  },
};

export default function SubmitPage() {
  const formCategories = categories.map(({ name, slug }) => ({ name, slug }));

  return (
    <main className={styles.page}>
      <section className={styles.archiveHero}>
        <div className={styles.container}>
          <div className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/write-for-us">Write for us</Link>
            <span aria-hidden="true">/</span>
            <span>Submit</span>
          </div>
          <p className={styles.eyebrow}>No-login submission</p>
          <h1 className={styles.archiveTitle}>Send us your best practical idea.</h1>
          <p className={styles.archiveLede}>
            Share your draft, context, and author details below. In this local
            prototype, the form provides an on-device confirmation only.
          </p>
        </div>
      </section>
      <SubmissionForm categories={formCategories} />
    </main>
  );
}
