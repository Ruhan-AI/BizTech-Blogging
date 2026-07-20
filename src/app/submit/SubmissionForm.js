"use client";

import Link from "next/link";
import { ArrowRight, Check, CircleCheck, Clock3, RotateCcw, ShieldCheck, Flame, CreditCard, Lock, Eye } from "lucide-react";
import { useState } from "react";
import styles from "../../styles/inner-pages.module.css";

const initialValues = {
  fullName: "",
  email: "",
  roleCompany: "",
  website: "",
  postTitle: "",
  category: "",
  metaDescription: "",
  focusKeywords: "",
  backlinkUrl: "",
  anchorText: "",
  gdriveImage: "",
  planSelected: "free",
  draft: "",
  bio: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
  companyFax: "", // honeypot
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
  if (!values.roleCompany.trim()) errors.roleCompany = "Enter your role or company (e.g. SEO Lead at Growth Co).";
  if (!values.website.trim()) {
    errors.website = "Enter your primary website URL.";
  } else if (!isValidUrl(values.website)) {
    errors.website = "Use a complete URL beginning with http:// or https://.";
  }
  if (!values.postTitle.trim()) errors.postTitle = "Enter a proposed article title.";
  if (!values.category) errors.category = "Choose the closest category.";
  
  if (!values.metaDescription.trim()) {
    errors.metaDescription = "Enter a search engine meta description.";
  } else if (values.metaDescription.length < 50 || values.metaDescription.length > 160) {
    errors.metaDescription = "Meta description should be between 50 and 160 characters for optimal search snippets.";
  }

  if (!values.focusKeywords.trim()) errors.focusKeywords = "Focus keywords are required for SEO review.";

  if (values.backlinkUrl && !isValidUrl(values.backlinkUrl)) {
    errors.backlinkUrl = "Target backlink must be a complete URL (http:// or https://).";
  }
  if (values.backlinkUrl && !values.anchorText.trim()) {
    errors.anchorText = "Anchor text is required if you specify a target backlink.";
  }

  if (values.gdriveImage && !isValidUrl(values.gdriveImage)) {
    errors.gdriveImage = "Enter a valid Google Drive storage link or preview URL.";
  }

  if (!values.draft.trim()) {
    errors.draft = "Paste your article draft content here.";
  } else if (values.draft.trim().length < 200) {
    errors.draft = "Draft must be at least 200 characters.";
  }
  
  if (!values.bio.trim()) {
    errors.bio = "Add a short author biography.";
  }

  // Validate simulated credit card if paid plan is chosen
  if (values.planSelected !== "free") {
    if (!values.cardNumber.replace(/\s/g, "").match(/^\d{16}$/)) {
      errors.cardNumber = "Enter a valid 16-digit card number.";
    }
    if (!values.cardExpiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      errors.cardExpiry = "Enter expiry in MM/YY format.";
    }
    if (!values.cardCvc.match(/^\d{3}$/)) {
      errors.cardCvc = "Enter a 3-digit CVC security code.";
    }
  }

  if (!values.terms) errors.terms = "Confirm that this guest post complies with our SEO link guidelines.";

  return errors;
}

export default function SubmissionForm({ categories }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [createdSlug, setCreatedSlug] = useState("");

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

  function handlePlanSelect(plan) {
    setValues((current) => ({
      ...current,
      planSelected: plan,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (values.companyFax) return; // Honeypot trigger

    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      requestAnimationFrame(() => document.getElementById(firstError)?.focus());
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (result.success) {
        setCreatedSlug(result.slug);
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        alert("Server failed to write files: " + result.error);
      }
    } catch (err) {
      alert("Submission request failed: " + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function startAnother() {
    setValues(initialValues);
    setErrors({});
    setSubmitted(false);
    setCreatedSlug("");
  }

  if (submitted) {
    return (
      <section className={styles.formSection} aria-live="polite">
        <div className={styles.narrowContainer}>
          <div className={styles.successCard} style={{ border: '1px solid rgba(0, 216, 189, 0.3)', background: 'rgba(5,5,15,0.7)' }}>
            <div className={styles.successIcon} style={{ background: 'var(--accent-3)' }}>
              <CircleCheck size={28} aria-hidden="true" />
            </div>
            <p className={styles.darkEyebrow} style={{ color: 'var(--accent-3)' }}>Submission & File Write Complete</p>
            <h1>SEO Guest Post Successfully Created!</h1>
            <p style={{ marginBlock: '15px 25px', lineHeight: '1.6' }}>
              Your guest post has been successfully written to the local filesystem. A physical folder was generated at 
              <code style={{ display: 'block', background: 'rgba(255,255,255,0.06)', padding: '8px 12px', borderRadius: '8px', marginBlock: '8px', color: 'var(--accent-3)' }}>
                src/app/insights/{createdSlug}/page.js
              </code>
              The post is active for <strong>{values.planSelected === "free" ? "7 Days (Free Plan)" : values.planSelected === "3months" ? "3 Months (Premium)" : values.planSelected === "6months" ? "6 Months (Professional)" : "12 Months (Authority)"}</strong>.
            </p>
            <div className={`${styles.heroActions} ${styles.successActions}`}>
              <Link className={styles.primaryButton} href={`/insights/${createdSlug}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Eye size={16} /> View Written Post Page
              </Link>
              <button className={styles.secondaryButton} type="button" onClick={startAnother}>
                <RotateCcw size={16} aria-hidden="true" /> Post Another Guest Post
              </button>
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
              <h2>SEO Specialist Guest Posting</h2>
              <p>Promote your target site via guest posts. Instantly compiles as a physical Next.js page.</p>
            </div>
            <span className={styles.requiredNote}>* Required</span>
          </div>

          <form className={styles.form} noValidate onSubmit={handleSubmit}>
            {/* Honeypot */}
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

            {/* Author details */}
            <div className={styles.formRow}>
              <Field
                id="fullName"
                label="Full name *"
                value={values.fullName}
                error={errors.fullName}
                onChange={updateField}
                autoComplete="name"
                placeholder="Amina Carter"
              />
              <Field
                id="email"
                label="Email address *"
                type="email"
                value={values.email}
                error={errors.email}
                onChange={updateField}
                autoComplete="email"
                placeholder="amina@growthlabs.co"
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
                placeholder="SEO Specialist, Growth Labs"
              />
              <Field
                id="website"
                label="Your Website *"
                type="url"
                value={values.website}
                error={errors.website}
                onChange={updateField}
                autoComplete="url"
                placeholder="https://growthlabs.co"
              />
            </div>

            {/* SEO Specific Parameters */}
            <div className={styles.formRow}>
              <Field
                id="backlinkUrl"
                label="Target Backlink URL (Link-building) *"
                type="url"
                value={values.backlinkUrl}
                error={errors.backlinkUrl}
                onChange={updateField}
                placeholder="https://mysite.com/landing-page"
              />
              <Field
                id="anchorText"
                label="Anchor Text (Link keyword) *"
                value={values.anchorText}
                error={errors.anchorText}
                onChange={updateField}
                placeholder="advanced organic SEO tools"
              />
            </div>

            <div className={styles.formRow}>
              <Field
                id="focusKeywords"
                label="Focus Keywords (Comma separated) *"
                value={values.focusKeywords}
                error={errors.focusKeywords}
                onChange={updateField}
                placeholder="SEO systems, backlinks, domain authority"
              />
              <Field
                id="gdriveImage"
                label="Google Drive Image Storage URL"
                type="url"
                value={values.gdriveImage}
                error={errors.gdriveImage}
                onChange={updateField}
                placeholder="https://drive.google.com/file/d/..."
              />
            </div>

            <Field
              id="postTitle"
              label="Article title *"
              value={values.postTitle}
              error={errors.postTitle}
              onChange={updateField}
              placeholder="How We Compounded Our Organic Search Traffic in 90 Days"
            />

            <div className={styles.field}>
              <label className={styles.label} htmlFor="category">Topic category *</label>
              <select
                className={`${styles.select} ${errors.category ? styles.invalid : ""}`}
                id="category"
                name="category"
                value={values.category}
                onChange={updateField}
                aria-invalid={Boolean(errors.category)}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option value={category.slug} key={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && <p className={styles.error}>{errors.category}</p>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="metaDescription">Meta description *</label>
              <input
                className={`${styles.input} ${errors.metaDescription ? styles.invalid : ""}`}
                id="metaDescription"
                name="metaDescription"
                type="text"
                value={values.metaDescription}
                onChange={updateField}
                maxLength={180}
                placeholder="Brief summary of article that displays in Google search results (50-160 chars)."
              />
              {errors.metaDescription && <p className={styles.error}>{errors.metaDescription}</p>}
            </div>

            {/* Article Content */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="draft">Written draft content *</label>
              <textarea
                className={`${styles.textarea} ${styles.draftTextarea} ${errors.draft ? styles.invalid : ""}`}
                id="draft"
                name="draft"
                value={values.draft}
                onChange={updateField}
                placeholder="Paste the full article content here. Use double line breaks to separate paragraphs."
              />
              {errors.draft && <p className={styles.error}>{errors.draft}</p>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="bio">Author short bio *</label>
              <textarea
                className={`${styles.textarea} ${errors.bio ? styles.invalid : ""}`}
                id="bio"
                name="bio"
                maxLength={200}
                value={values.bio}
                onChange={updateField}
                placeholder="A brief background about your expert domain."
              />
              {errors.bio && <p className={styles.error}>{errors.bio}</p>}
            </div>

            {/* validation plans / pricing */}
            <div className={styles.field} style={{ marginTop: '30px' }}>
              <label className={styles.label}>Select validation period plan *</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginTop: '10px' }}>
                <div 
                  onClick={() => handlePlanSelect("free")}
                  style={{ 
                    border: values.planSelected === "free" ? "2px solid var(--accent-3)" : "1px solid var(--line)",
                    background: values.planSelected === "free" ? "rgba(0, 216, 189, 0.05)" : "rgba(255,255,255,0.01)",
                    borderRadius: '12px', padding: '16px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s ease'
                  }}
                >
                  <strong style={{ display: 'block', fontSize: '15px' }}>7 Days Free</strong>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', marginTop: '4px' }}>Free Post</span>
                  <span style={{ fontSize: '16px', fontWeight: '900', color: '#fff', display: 'block', marginTop: '8px' }}>$0</span>
                </div>
                
                <div 
                  onClick={() => handlePlanSelect("3months")}
                  style={{ 
                    border: values.planSelected === "3months" ? "2px solid var(--accent)" : "1px solid var(--line)",
                    background: values.planSelected === "3months" ? "rgba(139, 92, 246, 0.05)" : "rgba(255,255,255,0.01)",
                    borderRadius: '12px', padding: '16px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s ease'
                  }}
                >
                  <strong style={{ display: 'block', fontSize: '15px' }}>3 Months</strong>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', marginTop: '4px' }}>Premium</span>
                  <span style={{ fontSize: '16px', fontWeight: '900', color: '#fff', display: 'block', marginTop: '8px' }}>$49</span>
                </div>

                <div 
                  onClick={() => handlePlanSelect("6months")}
                  style={{ 
                    border: values.planSelected === "6months" ? "2px solid var(--accent-2)" : "1px solid var(--line)",
                    background: values.planSelected === "6months" ? "rgba(255, 46, 166, 0.05)" : "rgba(255,255,255,0.01)",
                    borderRadius: '12px', padding: '16px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s ease'
                  }}
                >
                  <strong style={{ display: 'block', fontSize: '15px' }}>6 Months</strong>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', marginTop: '4px' }}>Professional</span>
                  <span style={{ fontSize: '16px', fontWeight: '900', color: '#fff', display: 'block', marginTop: '8px' }}>$89</span>
                </div>

                <div 
                  onClick={() => handlePlanSelect("12months")}
                  style={{ 
                    border: values.planSelected === "12months" ? "2px solid #ffe66b" : "1px solid var(--line)",
                    background: values.planSelected === "12months" ? "rgba(255, 230, 107, 0.05)" : "rgba(255,255,255,0.01)",
                    borderRadius: '12px', padding: '16px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s ease'
                  }}
                >
                  <strong style={{ display: 'block', fontSize: '15px' }}>12 Months</strong>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', marginTop: '4px' }}>Authority</span>
                  <span style={{ fontSize: '16px', fontWeight: '900', color: '#fff', display: 'block', marginTop: '8px' }}>$149</span>
                </div>
              </div>
            </div>

            {/* Credit card fields if paid */}
            {values.planSelected !== "free" && (
              <div 
                style={{ 
                  marginTop: '24px', padding: '24px', borderRadius: '16px', 
                  background: 'rgba(255,255,255,0.02)', border: '1px solid var(--line)',
                  animation: 'drawer-in 0.25s ease both'
                }}
              >
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 16px 0', fontSize: '15px', color: '#fff' }}>
                  <Lock size={16} style={{ color: 'var(--accent-3)' }} /> Secure Sandbox Checkout
                </h3>
                <div className={styles.formRow}>
                  <Field
                    id="cardNumber"
                    label="Credit card number *"
                    value={values.cardNumber}
                    error={errors.cardNumber}
                    onChange={updateField}
                    placeholder="4111 2222 3333 4444"
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <Field
                      id="cardExpiry"
                      label="Expiry *"
                      value={values.cardExpiry}
                      error={errors.cardExpiry}
                      onChange={updateField}
                      placeholder="MM/YY"
                    />
                    <Field
                      id="cardCvc"
                      label="CVC *"
                      type="password"
                      value={values.cardCvc}
                      error={errors.cardCvc}
                      onChange={updateField}
                      placeholder="123"
                    />
                  </div>
                </div>
                <p style={{ margin: '12px 0 0 0', fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CreditCard size={13} /> Secure demo transaction. No charges will be processed.
                </p>
              </div>
            )}

            <div className={styles.checkboxField} style={{ marginTop: '24px' }}>
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={values.terms}
                onChange={updateField}
                aria-invalid={Boolean(errors.terms)}
              />
              <div>
                <label htmlFor="terms">
                  I confirm this content is original and agree to the guest posting guidelines and validation schedules. *
                </label>
                {errors.terms && <p className={styles.error}>{errors.terms}</p>}
              </div>
            </div>

            <div className={styles.formActions}>
              <button className={styles.submitButton} type="submit" disabled={submitting}>
                {submitting ? "Writing Dynamic Next.js Files..." : values.planSelected === "free" ? "Publish Guest Post (Free) " : `Complete Payment & Publish ($${values.planSelected === "3months" ? "49" : values.planSelected === "6months" ? "89" : "149"})`}
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>

        <aside className={styles.formAside} aria-label="SEO Guidelines">
          <div className={styles.infoCard}>
            <ShieldCheck className={styles.infoCardIcon} size={25} style={{ color: 'var(--accent-3)' }} aria-hidden="true" />
            <h3>Dynamic File Output</h3>
            <p>
              Submissions write physical code folders to the Next.js workspace in real-time. Hot-reload compiles the page instantly.
            </p>
          </div>
          <div className={styles.infoCard}>
            <Clock3 className={styles.infoCardIcon} size={25} style={{ color: 'var(--accent-2)' }} aria-hidden="true" />
            <h3>Validation Policy</h3>
            <ul className={styles.plainList}>
              <li>Free posts compile for 7 days validation.</li>
              <li>Premium subscriptions guarantee indexing and live path for 3, 6, or 12 months.</li>
              <li>Links use custom SEO anchor metadata tags.</li>
            </ul>
          </div>
          <div className={styles.infoCard}>
            <Check className={styles.infoCardIcon} size={25} style={{ color: 'var(--accent)' }} aria-hidden="true" />
            <h3>SEO Compliance</h3>
            <p>
              Maximum of two target backlinks per guest post. All external anchors must point to reputable domains.
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
