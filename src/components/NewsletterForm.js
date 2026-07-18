"use client";

import { useState } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";

export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="newsletter-success" role="status">
        <span><Check size={18} aria-hidden="true" /></span>
        <div>
          <strong>You’re on the list.</strong>
          <p>Your next practical read will land here.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <Mail size={18} aria-hidden="true" />
      <label className="sr-only" htmlFor="newsletter-email">Work email</label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        placeholder="Work email address"
        required
      />
      <button type="submit" aria-label="Join the newsletter">
        <span>Join the briefing</span>
        <ArrowRight size={18} aria-hidden="true" />
      </button>
    </form>
  );
}
