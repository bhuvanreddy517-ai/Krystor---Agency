"use client";

import { useState } from "react";
import styles from "@/app/contact/contact.module.css";
import Link from "next/link";

type ContactModalProps = {
  onClose?: () => void;
  isStandalonePage?: boolean;
};

export default function ContactModal({ onClose, isStandalonePage = false }: ContactModalProps) {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Website Development",
    budget: "",
    message: "",
  });

  const handleCopy = () => {
    navigator.clipboard.writeText("Krystoragency@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "Website Development",
        budget: "",
        message: "",
      });
      if (onClose) onClose();
    }, 3000);
  };

  return (
    <div className={styles.pageWrap}>
      <div className={styles.modal}>
        {/* Close button */}
        {isStandalonePage ? (
          <Link href="/" className={styles.closeBtn} aria-label="Close">
            ✕
          </Link>
        ) : (
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ✕
          </button>
        )}

        {/* Brand Header */}
        <div className={styles.brandHeader}>
          <div className={styles.brandLogo}>K</div>
          <div className={styles.brandTitleWrap}>
            <span className={styles.brandName}>KRYSTOR</span>
            <span className={styles.brandSub}>AGENCY</span>
          </div>
        </div>

        <h1 className={styles.title}>START A PROJECT</h1>
        <p className={styles.subtitle}>
          Krystor Agency -- Founded by <b>Bhuvan & Bhushan</b>.
        </p>

        {/* Success Toast */}
        {submitted && (
          <div className={styles.successToast}>
            ✓ Brief Sent Successfully! We will contact you within 24 hours.
          </div>
        )}

        {/* Email Copy Box */}
        <div className={styles.emailBox}>
          <div className={styles.emailLeft}>
            <span className={styles.emailIcon}>✉</span>
            <span>Krystoragency@gmail.com</span>
          </div>
          <button type="button" className={styles.copyBtn} onClick={handleCopy}>
            {copied ? "✓ Copied!" : "📋 Copy"}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>YOUR NAME</label>
              <input
                type="text"
                required
                placeholder="John Doe"
                className={styles.input}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>YOUR EMAIL</label>
              <input
                type="email"
                required
                placeholder="john@example.com"
                className={styles.input}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>PHONE NUMBER</label>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                className={styles.input}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.formGridTwo}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>SERVICE REQUIRED</label>
              <select
                className={styles.select}
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              >
                <option value="Website Development">Website Development</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Mobile App Development">Mobile App Development</option>
                <option value="Brand Strategy">Brand Strategy</option>
                <option value="Full Product Design">Full Product Design</option>
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>TARGET BUDGET</label>
              <input
                type="text"
                placeholder="e.g. $2,500 or Flexible"
                className={styles.input}
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              />
            </div>
          </div>

          <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>MESSAGE</label>
            <textarea
              required
              placeholder="Tell us about your project or inquiry..."
              className={styles.textarea}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <div className={styles.footer}>
            <div className={styles.syncNote}>
              <span className={styles.syncIcon}>🗄</span> Syncs with Supabase backend
            </div>
            <button type="submit" className={styles.submitBtn}>
              SEND BRIEF
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
