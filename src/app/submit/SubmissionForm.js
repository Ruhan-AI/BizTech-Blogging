"use client";

import Link from "next/link";
import { ArrowRight, Check, CircleCheck, Clock3, RotateCcw, ShieldCheck, Phone, Mail, FileText, Lock } from "lucide-react";
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
  planSelected: "community",
  draft: "",
  bio: "",
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
    errors.gdriveImage = "Enter a valid Google Drive image link or asset URL.";
  }

  if (!values.draft.trim()) {
    errors.draft = "Paste your article draft content here.";
  } else if (values.draft.trim().length < 200) {
    errors.draft = "Draft must be at least 200 characters.";
  }
  
  if (!values.bio.trim()) {
    errors.bio = "Add a short author biography.";
  }

  if (!values.terms) errors.terms = "Confirm that this proposal complies with our editorial guidelines.";

  return errors;
}

export default function SubmissionForm({ categories }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionToken, setSubmissionToken] = useState("");

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
        setSubmissionToken(result.token);
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        alert("Submission failed: " + result.error);
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
    setSubmissionToken("");
  }

  if (submitted) {
    return (
      <section className={styles.formSection} aria-live="polite">
        <div className={styles.narrowContainer}>
          <div className={styles.successCard} style={{ border: '1px solid rgba(0, 216, 189, 0.3)', background: 'rgba(5,5,15,0.7)' }}>
            <div className={styles.successIcon} style={{ background: 'var(--accent-3)' }}>
              <CircleCheck size={28} aria-hidden="true" />
            </div>
            <p className={styles.darkEyebrow} style={{ color: 'var(--accent-3)' }}>Submission Received & Queued</p>
            <h1>Proposal Successfully Submitted for Review!</h1>
            <p style={{ marginBlock: '15px 25px', lineHeight: '1.6' }}>
              Your guest article proposal has been safely logged into our database moderation queue. Your secure tracking token is:
              <code style={{ display: 'block', background: 'rgba(255,255,255,0.06)', padding: '10px 14px', borderRadius: '8px', marginBlock: '10px', color: 'var(--accent-3)', fontSize: '14px', wordBreak: 'break-all' }}>
                {submissionToken}
              </code>
              Our editorial team will review your proposal against our publication standards and notify you via <strong>{values.email}</strong>.
            </p>

            <div style={{
              margin: '20px 0',
              padding: '20px',
              borderRadius: '12px',
              background: 'rgba(139, 92, 246, 0.12)',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              textAlign: 'left'
            }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#fff', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} style={{ color: 'var(--accent-3)' }} /> Editorial Contact & Assistance
              </h4>
              <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: 'rgba(255,255,255,0.9)' }}>
                Have questions regarding your submission status or editorial review timelines? Contact our desk directly:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '12px' }}>
                <a href="tel:+12148961780" style={{ padding: '8px 14px', borderRadius: '8px', background: 'var(--accent-3)', color: '#05050d', fontWeight: 'bold', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={14} /> Call / WhatsApp: +1 (214) 896-1780
                </a>
                <a href="mailto:biztechresourceanalyst@gmail.com" style={{ padding: '8px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 'bold', fontSize: '13px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Mail size={14} /> Email: biztechresourceanalyst@gmail.com
                </a>
              </div>
            </div>

            <div className={`${styles.heroActions} ${styles.successActions}`}>
              <button className={styles.primaryButton} type="button" onClick={startAnother}>
                <RotateCcw size={16} aria-hidden="true" /> Submit Another Proposal
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
              <h2>Guest Contribution Proposal</h2>
              <p>Submit your article for human editorial review. All submissions are moderated for quality and accuracy.</p>
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
                placeholder="SEO Lead, Growth Labs"
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

            {/* Content Parameters */}
            <div className={styles.formRow}>
              <Field
                id="backlinkUrl"
                label="Primary Citation / Reference URL (Optional)"
                type="url"
                value={values.backlinkUrl}
                error={errors.backlinkUrl}
                onChange={updateField}
                placeholder="https://mysite.com/research-report"
              />
              <Field
                id="anchorText"
                label="Citation Anchor Text (Optional)"
                value={values.anchorText}
                error={errors.anchorText}
                onChange={updateField}
                placeholder="2026 SaaS Growth Benchmark"
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
                label="Image / Asset Link (Optional)"
                type="url"
                value={values.gdriveImage}
                error={errors.gdriveImage}
                onChange={updateField}
                placeholder="https://drive.google.com/file/d/..."
              />
            </div>

            <Field
              id="postTitle"
              label="Proposed article title *"
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
                placeholder="Brief summary of article that displays in search snippets (50-160 chars)."
              />
              {errors.metaDescription && <p className={styles.error}>{errors.metaDescription}</p>}
            </div>

            {/* Article Content */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="draft">Article draft content *</label>
              <textarea
                className={`${styles.textarea} ${styles.draftTextarea} ${errors.draft ? styles.invalid : ""}`}
                id="draft"
                name="draft"
                value={values.draft}
                onChange={updateField}
                placeholder="Paste the full article content here. Use double line breaks for paragraph separation."
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
                placeholder="A brief background highlighting your domain expertise."
              />
              {errors.bio && <p className={styles.error}>{errors.bio}</p>}
            </div>

            {/* Editorial Review Tiers */}
            <div className={styles.field} style={{ marginTop: '30px' }}>
              <label className={styles.label}>Select Editorial Review Tier *</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginTop: '10px' }}>
                <div 
                  onClick={() => handlePlanSelect("community")}
                  style={{ 
                    border: values.planSelected === "community" ? "2px solid var(--accent-3)" : "1px solid var(--line)",
                    background: values.planSelected === "community" ? "rgba(0, 216, 189, 0.05)" : "rgba(255,255,255,0.01)",
                    borderRadius: '12px', padding: '16px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s ease'
                  }}
                >
                  <strong style={{ display: 'block', fontSize: '15px' }}>Community Queue</strong>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', marginTop: '4px' }}>Standard Review</span>
                  <span style={{ fontSize: '16px', fontWeight: '900', color: '#fff', display: 'block', marginTop: '8px' }}>Free</span>
                </div>
                
                <div 
                  onClick={() => handlePlanSelect("express")}
                  style={{ 
                    border: values.planSelected === "express" ? "2px solid var(--accent)" : "1px solid var(--line)",
                    background: values.planSelected === "express" ? "rgba(139, 92, 246, 0.05)" : "rgba(255,255,255,0.01)",
                    borderRadius: '12px', padding: '16px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s ease'
                  }}
                >
                  <strong style={{ display: 'block', fontSize: '15px' }}>Express Review</strong>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', marginTop: '4px' }}>48h Fast-Track</span>
                  <span style={{ fontSize: '16px', fontWeight: '900', color: '#fff', display: 'block', marginTop: '8px' }}>$49</span>
                </div>

                <div 
                  onClick={() => handlePlanSelect("featured")}
                  style={{ 
                    border: values.planSelected === "featured" ? "2px solid var(--accent-2)" : "1px solid var(--line)",
                    background: values.planSelected === "featured" ? "rgba(255, 46, 166, 0.05)" : "rgba(255,255,255,0.01)",
                    borderRadius: '12px', padding: '16px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s ease'
                  }}
                >
                  <strong style={{ display: 'block', fontSize: '15px' }}>Featured Editorial</strong>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', marginTop: '4px' }}>Priority + Placement</span>
                  <span style={{ fontSize: '16px', fontWeight: '900', color: '#fff', display: 'block', marginTop: '8px' }}>$89</span>
                </div>
              </div>
            </div>

            {/* Direct Contact Payment Info Box */}
            <div 
              style={{ 
                marginTop: '24px', padding: '20px 24px', borderRadius: '16px', 
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(0, 216, 189, 0.08) 100%)', 
                border: '1px solid rgba(139, 92, 246, 0.3)'
              }}
            >
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 10px 0', fontSize: '15px', color: '#fff' }}>
                <Phone size={16} style={{ color: 'var(--accent-3)' }} /> Express Editorial Inquiries
              </h3>
              <p style={{ margin: '0 0 14px 0', fontSize: '13px', lineHeight: '1.6', color: 'rgba(255,255,255,0.9)' }}>
                For expedited editorial review, custom corporate partnerships, or questions regarding our publication standards:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <a 
                  href="tel:+12148961780" 
                  style={{ 
                    display: 'inline-flex', alignItems: 'center', gap: '8px', 
                    padding: '10px 16px', borderRadius: '10px', 
                    background: 'var(--accent-3)', color: '#05050d', 
                    fontWeight: 'bold', fontSize: '13px', textDecoration: 'none' 
                  }}
                >
                  <Phone size={15} /> Call / WhatsApp: +1 (214) 896-1780
                </a>
                <a 
                  href="mailto:biztechresourceanalyst@gmail.com" 
                  style={{ 
                    display: 'inline-flex', alignItems: 'center', gap: '8px', 
                    padding: '10px 16px', borderRadius: '10px', 
                    background: 'rgba(255,255,255,0.08)', color: '#fff', 
                    fontWeight: 'bold', fontSize: '13px', textDecoration: 'none', 
                    border: '1px solid rgba(255,255,255,0.2)' 
                  }}
                >
                  <Mail size={15} /> Email: biztechresourceanalyst@gmail.com
                </a>
              </div>
            </div>

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
                  I confirm this proposal is original, accurate, and complies with BizTech editorial and link guidelines. *
                </label>
                {errors.terms && <p className={styles.error}>{errors.terms}</p>}
              </div>
            </div>

            <div className={styles.formActions}>
              <button className={styles.submitButton} type="submit" disabled={submitting}>
                {submitting ? "Submitting Proposal..." : "Submit Proposal for Review"}
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>

        <aside className={styles.formAside} aria-label="Editorial Guidelines">
          <div className={styles.infoCard} style={{ border: '1px solid rgba(0, 216, 189, 0.3)' }}>
            <Phone className={styles.infoCardIcon} size={24} style={{ color: 'var(--accent-3)' }} aria-hidden="true" />
            <h3>Direct Editorial Desk</h3>
            <p style={{ fontSize: '13px', margin: '0 0 10px 0', lineHeight: '1.5' }}>
              For custom content partnership inquiries or express review assistance:
            </p>
            <a href="tel:+12148961780" style={{ display: 'block', color: 'var(--accent-3)', fontWeight: 'bold', fontSize: '13px', textDecoration: 'underline', marginBottom: '6px' }}>
              📞 +1 (214) 896-1780
            </a>
            <a href="mailto:biztechresourceanalyst@gmail.com" style={{ display: 'block', color: 'var(--accent-3)', fontWeight: 'bold', fontSize: '12px', textDecoration: 'underline', wordBreak: 'break-all' }}>
              ✉️ biztechresourceanalyst@gmail.com
            </a>
          </div>
          <div className={styles.infoCard}>
            <ShieldCheck className={styles.infoCardIcon} size={25} style={{ color: 'var(--accent-3)' }} aria-hidden="true" />
            <h3>Human Moderation</h3>
            <p>
              Every submitted proposal is evaluated by human editors for depth, originality, and technical relevance.
            </p>
          </div>
          <div className={styles.infoCard}>
            <Clock3 className={styles.infoCardIcon} size={25} style={{ color: 'var(--accent-2)' }} aria-hidden="true" />
            <h3>Review Timelines</h3>
            <ul className={styles.plainList}>
              <li>Community queue: 3–5 business days.</li>
              <li>Express & Featured tiers: 48-hour priority review.</li>
              <li>All links undergo contextual quality checks.</li>
            </ul>
          </div>
          <div className={styles.infoCard}>
            <Check className={styles.infoCardIcon} size={25} style={{ color: 'var(--accent)' }} aria-hidden="true" />
            <h3>Link & Policy Transparency</h3>
            <p>
              External references must add context to readers. We strictly enforce editorial integrity and search engine compliance.
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
