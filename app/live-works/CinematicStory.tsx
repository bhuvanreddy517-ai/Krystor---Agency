"use client";

import { useEffect, useRef } from "react";
import { gsap, EASE, prefersReducedMotion } from "@/lib/gsap";
import styles from "./CinematicStory.module.css";

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Concept & Strategy",
    desc: "Deconstructing complex domain problems into intuitive product architectures.",
  },
  {
    num: "02",
    title: "Interface Architecture",
    desc: "Crafting governed design systems, micro-interactions, and spatial layouts.",
  },
  {
    num: "03",
    title: "Precision Engineering",
    desc: "Translating wireframes into robust, high-performance codebases.",
  },
  {
    num: "04",
    title: "Production Launch",
    desc: "Shipping live digital products tested and optimized for real human users.",
  },
];

export default function CinematicStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      /* Scroll-driven progress beam fill */
      if (progressFillRef.current) {
        gsap.to(progressFillRef.current, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 0.5,
          },
        });
      }

      /* Story beat entrance animations */
      const beats = el.querySelectorAll(`.${styles.beat}`);
      beats.forEach((beat) => {
        gsap.fromTo(
          beat,
          { y: 70, autoAlpha: 0, scale: 0.96 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 1.2,
            ease: EASE.outExpo,
            scrollTrigger: {
              trigger: beat,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      /* Step Cards Staggered Reveal */
      const steps = el.querySelectorAll<HTMLElement>(`.${styles.stepCard}`);
      gsap.fromTo(
        steps,
        { y: 60, autoAlpha: 0, scale: 0.9 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 1.1,
          stagger: 0.16,
          ease: EASE.outExpo,
          scrollTrigger: {
            trigger: `.${styles.processGrid}`,
            start: "top 78%",
          },
        }
      );

      /* Idle floating animation on process cards */
      steps.forEach((card, i) => {
        gsap.to(card, {
          y: `+=${8 + (i % 2) * 6}`,
          duration: 3 + (i % 3) * 0.8,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.story} ref={containerRef}>
      {/* Scroll-driven vertical progress beam */}
      <div className={styles.progressBeam} aria-hidden="true">
        <div className={styles.progressBeamFill} ref={progressFillRef} />
      </div>

      {/* Beat 1: Ideas become real */}
      <div className={styles.beat}>
        <span className={styles.badge}>
          <span className={styles.pulse} /> PRODUCT PHILOSOPHY
        </span>
        <h2 className={styles.headline}>
          Ideas become <em className={styles.serif}>real.</em>
        </h2>
        <p className={styles.subtext}>
          Concept drawings and prototypes are just the beginning. True product design happens when ideas transform into living, breathing digital experiences that execute seamlessly in production.
        </p>
      </div>

      {/* Beat 2: Designed for the real world */}
      <div className={styles.beat}>
        <div className={styles.lineIndicator} aria-hidden="true" />
        <h2 className={styles.headline}>
          Designed for the <em className={styles.serif}>real world.</em>
        </h2>
        <p className={styles.subtext}>
          Built to withstand real user traffic, complex regulatory compliance, and high-stakes business workflows. Tested for accessibility, speed, and real human behavior.
        </p>
      </div>

      {/* Beat 3: Visual Journey (Concept -> Craft -> Launch) */}
      <div className={styles.beat}>
        <p className={styles.eyebrowProcess}>CRAFT & EXECUTION</p>
        <h3 className={styles.processHeadline}>
          From concept <span className={styles.accentArrow}>→</span> craft <span className={styles.accentArrow}>→</span> launch.
        </h3>

        <div className={styles.processGrid}>
          {PROCESS_STEPS.map((step) => (
            <div className={styles.stepCard} key={step.num}>
              <div className={styles.stepHeader}>
                <span className={styles.stepNum}>{step.num}</span>
                <div className={styles.stepDot} />
              </div>
              <h4 className={styles.stepTitle}>{step.title}</h4>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Beat 4: Transition into project cards */}
      <div className={`${styles.beat} ${styles.transitionBeat}`}>
        <div className={styles.glowPill}>EXPERIENCE THE WORK</div>
        <h2 className={styles.headline}>
          Now, experience the <em className={styles.serif}>work.</em>
        </h2>
        <div className={styles.scrollDownIndicator}>
          <span className={styles.downArrow}>↓</span>
        </div>
      </div>
    </section>
  );
}
