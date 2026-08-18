"use client";

/*
 * THE JOURNEY — depth-travel storytelling (Gallery Tunnel as the benchmark).
 *
 * What we took from the reference's engine:
 *   · forward motion through Z — here real CSS `translateZ` planes inside a
 *     `perspective` container instead of a Three.js camera
 *   · smooth camera interpolation — ScrollTrigger's scrub smoothing plays the
 *     role of CAMERA_CHASE: the scene eases toward the scroll target
 *   · fog / depth fade — opacity + a touch of blur as a function of distance;
 *     on a white canvas, fading to white IS the fog
 *   · appear from the distance, pass the camera — chapters travel from far Z,
 *     hold a focus plateau to be read, then fly past and dissolve
 *   · recycling — a fixed set of nodes is repositioned every update; nothing
 *     is created or destroyed while scrolling
 *   · rAF-driven, GPU-only writes (transform + opacity), ResizeObserver-free
 *     (ScrollTrigger handles invalidation on resize)
 *
 * What we deliberately did NOT take: WebGL and the image walls. Seven text
 * planes don't need a render pipeline — DOM keeps the typography crisp,
 * selectable and screen-readable, and the design-system tokens apply directly.
 */

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, EASE } from "@/lib/gsap";
import styles from "./Journey.module.css";

type Chapter = {
  label: string;
  title: React.ReactNode;
  body: string;
};

const CHAPTERS: Chapter[] = [
  {
    label: "2021",
    title: "THE BEGINNING",
    body: "A vision takes shape. Jernay begins with a passion for creativity, technology, and building meaningful digital experiences.",
  },
  {
    label: "2022",
    title: "THE FOUNDATION",
    body: "The vision starts becoming reality. New skills, new ideas, and a growing foundation in web development, design, and digital solutions.",
  },
  {
    label: "2023",
    title: "CREATIVE EXPANSION",
    body: "Jernay moves beyond development, embracing video editing, UI/UX design, visual storytelling, and content strategy.",
  },
  {
    label: "2024",
    title: "THE EVOLUTION",
    body: "Bigger projects. Stronger experiences. Jernay grows into a more complete creative and digital partner for ambitious ideas.",
  },
  {
    label: "2025",
    title: "STRATEGIC GROWTH",
    body: "Development meets strategy. SMM, SEO, analytics, content, and visual storytelling come together to create digital experiences built for growth.",
  },
  {
    label: "2026",
    title: "THE NEXT CHAPTER",
    body: "Five years of learning, building, and evolving lead to a new chapter — Jernay as a full-service digital creative agency, built for bigger ideas and greater impact.",
  },
];

/* depth geometry */
const Z_STEP = 620; /* px of depth between chapters */
const Z_PAST = 480; /* how far past the camera a chapter flies */
const FOCUS_HOLD = 0.34; /* |d| below this = fully in focus (reading time) */
const AHEAD_VISIBLE = 1.65; /* chapters further ahead than this are gone */

export default function Journey() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 821px) and (prefers-reduced-motion: no-preference)", () => {
      const planes = gsap.utils.toArray<HTMLElement>(`.${styles.plane}`);
      const dots = gsap.utils.toArray<HTMLElement>(`.${styles.railItem}`);
      const fill = el.querySelector<HTMLElement>(`.${styles.railFill}`);
      const floor = el.querySelector<HTMLElement>(`.${styles.floor}`);
      const glowWarm = el.querySelector<HTMLElement>(`.${styles.glowWarm}`);
      const n = planes.length;

      el.classList.add(styles.stage3d);

      const place = (p: number) => {
        for (let i = 0; i < n; i++) {
          const d = i - p; /* + ahead (far), 0 focused, − passed */
          const plane = planes[i];

          if (d > AHEAD_VISIBLE || d < -1) {
            plane.style.visibility = "hidden";
            continue;
          }
          plane.style.visibility = "visible";

          let z: number;
          let o: number;
          let blur = 0;

          if (d >= 0) {
            /* approaching: hold a focus plateau, then recede into the fog */
            const a = Math.max(0, d - FOCUS_HOLD) / (AHEAD_VISIBLE - FOCUS_HOLD);
            z = -Math.max(0, d - FOCUS_HOLD) * Z_STEP;
            o = 1 - Math.pow(a, 1.25);
            blur = a * 7;
          } else {
            /* passing the camera: grows, lifts and dissolves */
            const b = Math.min(1, -d / 0.75);
            z = Math.min(1, -d / 0.75) * Z_PAST;
            o = 1 - b;
            blur = b * 5;
          }

          plane.style.transform = `translate(-50%, -50%) translate3d(0, ${
            d < 0 ? -d * -34 : 0
          }px, ${z.toFixed(1)}px)`;
          plane.style.opacity = o.toFixed(3);
          plane.style.filter = blur > 0.4 ? `blur(${blur.toFixed(1)}px)` : "";
          plane.style.zIndex = String(200 - Math.round(Math.abs(d) * 40));
        }

        /* progress rail + environment */
        const active = Math.round(gsap.utils.clamp(0, n - 1, p));
        dots.forEach((dot, i) => dot.classList.toggle(styles.railOn, i === active));
        if (fill) fill.style.transform = `scaleY(${(p / (n - 1)).toFixed(4)})`;
        /* the floor grid creeps toward the camera and loops — endless travel */
        if (floor)
          floor.style.backgroundPosition = `center ${((p * 140) % 56).toFixed(1)}px`;
        if (glowWarm)
          glowWarm.style.opacity = (0.5 + 0.5 * Math.sin((p / (n - 1)) * Math.PI)).toFixed(3);
      };

      place(0);

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${n * window.innerHeight * 0.82}`,
        pin: true,
        scrub: 0.8 /* the "camera chase" — eases toward the scroll target */,
        invalidateOnRefresh: true,
        onUpdate: (self) => place(self.progress * (n - 1)),
      });

      gsap.from(`.${styles.head} > *`, {
        y: 36,
        autoAlpha: 0,
        duration: 0.9,
        ease: EASE.outExpo,
        stagger: 0.09,
        immediateRender: false,
        scrollTrigger: { trigger: el, start: "top 72%" },
      });

      return () => {
        st.kill();
        el.classList.remove(styles.stage3d);
      };
    });

    /* narrow screens & reduced motion: calm vertical chapters, same content */
    mm.add("(max-width: 820px), (prefers-reduced-motion: reduce)", () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
      gsap.utils.toArray<HTMLElement>(`.${styles.plane}`).forEach((plane) => {
        gsap.from(plane, {
          y: 44,
          autoAlpha: 0,
          duration: 1,
          ease: EASE.outExpo,
          immediateRender: false,
          scrollTrigger: { trigger: plane, start: "top 84%" },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className={styles.journey} id="journey" ref={root}>
      {/* environment — alive, never loud */}
      <div className={styles.env} aria-hidden="true">
        <div className={styles.floor} />
        <div className={`${styles.glow} ${styles.glowWarm}`} />
        <div className={`${styles.glow} ${styles.glowCool}`} />
        <span className={styles.pA} />
        <span className={styles.pB} />
        <span className={styles.pC} />
      </div>

      <div className={styles.head}>
        <p className={styles.eyebrow}>
          <span>02</span> The Journey
        </p>
        <p className={styles.hint}>Scroll to travel through the story</p>
      </div>

      {/* progress rail */}
      <div className={styles.rail} aria-hidden="true">
        <div className={styles.railLine}>
          <div className={styles.railFill} />
        </div>
        {CHAPTERS.map((c, i) => (
          <div className={styles.railItem} key={c.label}>
            <i>0{i + 1}</i>
            <span>{c.label}</span>
          </div>
        ))}
      </div>

      {/* the corridor of chapters */}
      <div className={styles.corridor}>
        {CHAPTERS.map((c, i) => (
          <article className={styles.plane} key={c.label}>
            <p className={styles.chLabel}>
              <span>0{i + 1}</span> {c.label}
            </p>
            <h3 className={styles.chTitle}>{c.title}</h3>
            <p className={styles.chBody}>{c.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
