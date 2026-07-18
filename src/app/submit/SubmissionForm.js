"use client";

import Link from "next/link";
import { ArrowRight, Check, CircleCheck, Clock3, RotateCcw, ShieldCheck } from "lucide-react";
import { useState } from "react";
import styles from "../../styles/inner-pages.module.css";

const initialValues = {
  fullName: "",
  email: "",
  roleCompany: "",
  website: "",
  postTitle: "",
  category: "",
  draft: "",
  bio: "",
  backlinkOne: "",
  backlinkTwo: "",
  social: "",
  companyFax: "",
  terms: false,
};

function isValidUrl(value) {
  try {
    const parsedUrl = new URL(value);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
}

function validate(values) {
  const errors = {};

  if (!values.fullName.trim()) errors.fullName = "Enter your full name.";
  if (!values.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.roleCompany.trim()) errors.roleCompany = "Enter your role or company.";
  if (!values.website.trim()) {
    errors.website = "Enter your website or portfolio URL.";
  } else if (!isValidUrl(values.website)) {
    errors.website = "Use a complete URL beginning with http:// or https://.";
  }
  if (!values.postTitle.trim()) errors.postTitle = "Enter a proposed article title.";
  if (!values.category) errors.category = "Choose the closest category.";
  if (!values.draft.trim()) {
    errors.draft = "Paste your article draft or a shareable document link.";
  } else if (values.draft.trim().length < 100) {
    errors.draft = "Add at least 100 characters so our editors can review the idea.";
  }
  if (!values.bio.trim()) {
    errors.bio = "Add a short author biography.";
  } else if (values.bio.length > 200) {
    errors.bio = "Keep your biography to 200 characters or fewer.";
  }
  if (values.backlinkOne && !isValidUrl(values.backlinkOne)) {
    errors.backlinkOne = "Use a complete URL beginning with http:// or https://.";
  }
  if (values.backlinkTwo && !isValidUrl(values.backlinkTwo)) {
    errors.backlinkTwo = "Use a complete URL beginning with http:// or https://.";
  }
  if (!values.terms) errors.terms = "Confirm the originality statement and contributor terms.";

  return errors;
}

export default function SubmissionForm({ categories }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setValues((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((current) => {
        const nextErrors = { ...current };
        delete nextErrors[name];
        return nextErrors;
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (values.companyFax) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      requestAnimationFrame(() => document.getElementById(firstError)?.focus());
      return;
    }

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startAnother() {
    setValues(initialValues);
    setErrors({});
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <section className={styles.formSection} aria-live="polite">
        <div className={styles.narrowContainer}>
          <div className={styles.successCard}>
            <div className={styles.successIcon}>
              <CircleCheck size={28} aria-hidden="true" />
            </div>
            <p className={styles.darkEyebrow}>Demo confirmation</p>
            <h1>Thanks, {values.fullName.split(" ")[0]}. Your draft is ready for review.</h1>
            <p>
              This local preview does not transmit or store form data. In the
              production workflow, you would receive an email confirmation at
              {" "}<strong>{values.email}</strong> and an editorial update within
              approximately five business days.
            </p>
            <div className={`${styles.heroActions} ${styles.successActions}`}>
              <button className={styles.primaryButton} type="button" onClick={startAnother}>
                <RotateCcw size={16} aria-hidden="true" /> Submit another draft
              </button>
              <Link className={styles.secondaryButton} href="/">
                Browse insights <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.formSection}>
      <div className={`${styles.container} ${styles.formShell}`}>
        <div className={styles.formCard}>
          <div className={styles.formHeading}>
            <div>
              <h2>Contributor submission</h2>
              <p>No account is required. Most contributors finish in under ten minutes.</p>
            </div>
            <span className={styles.requiredNote}>* Required</span>
          </div>

          <form className={styles.form} noValidate onSubmit={handleSubmit}>
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="companyFax">Company fax</label>
              <input
                id="companyFax"
                name="companyFax"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.companyFax}
                onChange={updateField}
              />
            </div>

            <div className={styles.formRow}>
              <Field
                id="fullName"
                label="Full name *"
                value={values.fullName}
                error={errors.fullName}
                onChange={updateField}
                autoComplete="name"
              />
              <Field
                id="email"
                label="Email address *"
                type="email"
                value={values.email}
                error={errors.email}
                onChange={updateField}
                autoComplete="email"
              />
            </div>

            <div className={styles.formRow}>
              <Field
                id="roleCompany"
                label="Role / company *"
                value={values.roleCompany}
                error={errors.roleCompany}
                onChange={updateField}
                autoComplete="organization-title"
                placeholder="Founder, Northstar Labs"
              />
              <Field
                id="website"
                label="Website / portfolio *"
                type="url"
                value={values.website}
                error={errors.website}
                onChange={updateField}
                autoComplete="url"
                placeholder="https://example.com"
              />
            </div>

            <Field
              id="postTitle"
              label="Proposed article title *"
              value={values.postTitle}
              error={errors.postTitle}
              onChange={updateField}
              placeholder="A clear, specific working title"
            />

            <div className={styles.field}>
              <label className={styles.label} htmlFor="category">Category *</label>
              <select
                className={`${styles.select} ${errors.category ? styles.invalid : ""}`}
                id="category"
                name="category"
                value={values.category}
                onChange={updateField}
                aria-invalid={Boolean(errors.category)}
                aria-describedby={errors.category ? "category-error" : undefined}
              >
                <option value="">Choose a category</option>
                {categories.map((category) => (
                  <option value={category.slug} key={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className={styles.error} id="category-error">{errors.category}</p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="draft">Draft content or document link *</label>
              <textarea
                className={`${styles.textarea} ${styles.draftTextarea} ${errors.draft ? styles.invalid : ""}`}
                id="draft"
                name="draft"
                value={values.draft}
                onChange={updateField}
                aria-invalid={Boolean(errors.draft)}
                aria-describedby={errors.draft ? "draft-error" : "draft-hint"}
                placeholder="Paste the full draft here, or include a public Google Doc link and a short summary."
              />
              {errors.draft ? (
                <p className={styles.error} id="draft-error">{errors.draft}</p>
              ) : (
                <p className={styles.hint} id="draft-hint">
                  Suggested length: 800–1,500 words. Make sure shared documents are viewable.
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="bio">
                Short author bio *
                <span className={styles.bioCount}>{values.bio.length}/200</span>
              </label>
              <textarea
                className={`${styles.textarea} ${errors.bio ? styles.invalid : ""}`}
                id="bio"
                name="bio"
                maxLength={220}
                value={values.bio}
                onChange={updateField}
                aria-invalid={Boolean(errors.bio)}
                aria-describedby={errors.bio ? "bio-error" : "bio-hint"}
                placeholder="What do you do, and what experience informs this article?"
              />
              {errors.bio ? (
                <p className={styles.error} id="bio-error">{errors.bio}</p>
              ) : (
                <p className={styles.hint} id="bio-hint">Maximum 200 characters.</p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="headshot">Headshot (optional)</label>
              <input
                className={styles.input}
                id="headshot"
                name="headshot"
                type="file"
                accept="image/png,image/jpeg,image/webp"
              />
              <p className={styles.hint}>JPG, PNG, or WebP. Square images work best.</p>
            </div>

            <div className={styles.formRow}>
              <Field
                id="backlinkOne"
                label="Proposed backlink 1 (optional)"
                type="url"
                value={values.backlinkOne}
                error={errors.backlinkOne}
                onChange={updateField}
                placeholder="https://example.com/resource"
              />
              <Field
                id="backlinkTwo"
                label="Proposed backlink 2 (optional)"
                type="url"
                value={values.backlinkTwo}
                error={errors.backlinkTwo}
                onChange={updateField}
                placeholder="https://example.com/resource"
              />
            </div>

            <Field
              id="social"
              label="LinkedIn or social handle (optional)"
              value={values.social}
              onChange={updateField}
              placeholder="linkedin.com/in/your-name"
            />

            <div className={styles.checkboxField}>
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={values.terms}
                onChange={updateField}
                aria-invalid={Boolean(errors.terms)}
                aria-describedby={errors.terms ? "terms-error" : undefined}
              />
              <div>
                <label htmlFor="terms">
                  I confirm this is original work I am authorized to submit, and I
                  agree to the <Link href="/contributor-terms">contributor terms</Link>
                  {" "}and <Link href="/privacy-policy">privacy policy</Link>. *
                </label>
                {errors.terms && (
                  <p className={styles.error} id="terms-error">{errors.terms}</p>
                )}
              </div>
            </div>

            <div className={styles.formActions}>
              <button className={styles.submitButton} type="submit">
                Send for editorial review <ArrowRight size={17} aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>

        <aside className={styles.formAside} aria-label="Submission notes">
          <div className={styles.infoCard}>
            <ShieldCheck className={styles.infoCardIcon} size={25} aria-hidden="true" />
            <h3>Local demo only</h3>
            <p>
              This preview validates the form in your browser. Nothing you type is
              transmitted, emailed, or stored.
            </p>
          </div>
          <div className={styles.infoCard}>
            <Clock3 className={styles.infoCardIcon} size={25} aria-hidden="true" />
            <h3>Before you send</h3>
            <ul className={styles.plainList}>
              <li>Original and not published elsewhere</li>
              <li>800–1,500 useful, well-structured words</li>
              <li>No more than two contextual backlinks</li>
              <li>Facts and third-party material properly credited</li>
            </ul>
          </div>
          <div className={styles.infoCard}>
            <Check className={styles.infoCardIcon} size={25} aria-hidden="true" />
            <h3>Need the full brief?</h3>
            <p>
              Review the topic, formatting, originality, AI, and link standards on
              our <Link href="/write-for-us">Write for Us page</Link>.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Field({ id, label, type = "text", value, error, onChange, ...props }) {
  const errorId = `${id}-error`;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>{label}</label>
      <input
        className={`${styles.input} ${error ? styles.invalid : ""}`}
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && <p className={styles.error} id={errorId}>{error}</p>}
    </div>
  );
}
