"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, EASE } from "@/lib/gsap";
import styles from "./Hero.module.css";
import { useLang } from "@/lib/i18n";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const { t } = useLang();

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: EASE.outExpo, immediateRender: false },
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });

      tl.from(`.${styles.row}`, { y: 60, autoAlpha: 0, duration: 1.1, stagger: 0.14 }, 0.1)
        .from(`.${styles.sub}`, { y: 30, autoAlpha: 0, duration: 0.9 }, "-=0.6");
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} id="home" ref={root}>
      <div className={styles.container}>
        <h1 className={styles.h1}>
          <span className={styles.row}>
            {t("hero.h1a")} <em className={styles.serif}>{t("hero.h1aEm")}</em>
          </span>
          <span className={styles.row}>
            {t("hero.h1b")}{" "}
            <em className={`${styles.serif} ${styles.red}`}>{t("hero.h1bEm")}</em>
          </span>
        </h1>
        <p className={styles.sub}>{t("hero.sub")}</p>
      </div>
    </section>
  );
}
