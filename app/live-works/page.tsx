"use client";

import Nav from "@/components/layout/Nav";
import { PROJECTS, type Project } from "@/content/projects";
import CinematicStory from "./CinematicStory";
import styles from "./live-works.module.css";
import Link from "next/link";

export default function LiveWorksPage() {
  /* Keep ONLY projects that have an active Live App / site */
  const liveApps = PROJECTS.filter((p: Project) => !!p.site);

  return (
    <>
      <Nav />
      <main className={styles.page}>
        <div className={styles.ambientGlow} aria-hidden="true" />

        <div className={styles.container}>
          <header className={styles.header}>
            <p className={styles.eyebrow}>
              <span>09</span> Production Applications
            </p>
            <h1 className={styles.title}>
              Live <em className={styles.serif}>Apps</em>
            </h1>
            <p className={styles.subtitle}>
              Verified live applications and production software operating in the real world.
            </p>
          </header>

          {/* Cinematic Storytelling Section */}
          <CinematicStory />

          {/* Live Apps Grid */}
          <div className={styles.grid}>
            {liveApps.map((p: Project) => {
              const bg = p.cover?.bg || "#f4f4f5";
              const isPhoto = p.cover?.variant === "photo" && p.cover?.src;

              return (
                <article className={styles.card} key={p.slug}>
                  <div className={styles.coverWrapper} style={{ background: bg }}>
                    {/* Live Status Badge */}
                    <div className={styles.statusBadge}>
                      <span className={styles.pulseDot} />
                      Live Production
                    </div>

                    {isPhoto ? (
                      <img
                        src={p.cover!.src}
                        alt={p.coverLabel}
                        className={styles.coverImg}
                        style={{ objectPosition: p.cover?.focus || "center" }}
                      />
                    ) : p.cover?.src ? (
                      <img
                        src={p.cover.src}
                        alt={p.coverLabel}
                        className={styles.coverBrand}
                      />
                    ) : (
                      <span style={{ fontSize: "36px", fontWeight: "900", color: "#141414" }}>
                        {p.cover?.mark || p.title.substring(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.tags}>
                      {p.tags.map((tag) => (
                        <span className={styles.tag} key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h2 className={styles.cardTitle}>{p.title}</h2>
                    <p className={styles.cardDesc}>{p.oneLiner}</p>
                    <p className={styles.contribution}>⚡ {p.contribution}</p>

                    <div className={styles.actions}>
                      <a
                        href={p.site!.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.btnPrimary}
                      >
                        🚀 Launch {p.site!.label || "Live App"} ↗
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className={styles.backBar}>
            <Link href="/#work" className={styles.backBtn}>
              ← Back to Main Portfolio
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
