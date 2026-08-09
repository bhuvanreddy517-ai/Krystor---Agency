"use client";

import styles from "./FloatingWhatsApp.module.css";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/918217527309"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.floatingBtn}
      aria-label="Chat on WhatsApp"
    >
      <span className={styles.pulseDot} />
      <span className={styles.icon}>💬</span>
      <span>WhatsApp (+91 8217527309)</span>
    </a>
  );
}
