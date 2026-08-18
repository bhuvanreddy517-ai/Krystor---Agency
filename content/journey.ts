/* THE JOURNEY — the chapters the light tunnel travels through.
 *
 * ⚠ SOURCING: every fact here traces to Gireesh's CV (mirrored in
 * content/experience.ts) — companies, dates, places, roles and outcomes.
 * The 2021 chapter carries only what he stated himself: the year and
 * Telangana. Nothing biographical is invented around it.
 *
 * Shape per chapter:
 *   year   — shown large, the anchor
 *   title  — what the chapter is about, in his voice
 *   place  — where it happened (context line)
 *   story  — what was actually happening, 2–3 sentences
 *   bridge — how it handed over to the next chapter (the transition line)
 *
 * `fr` mirrors every translatable field (see lib/i18n.tsx -> L()). Company,
 * product and place names stay as they are. French runs ~15% longer than
 * English, so the copy is written to length, not translated literally. */

export type Chapter = {
  id: string;
  year: string;
  title: string;
  place?: string;
  story: string;
  bridge?: string;
  fr?: { title?: string; place?: string; story?: string; bridge?: string };
};

export const CHAPTERS: Chapter[] = [
  {
    id: "2021",
    year: "2021",
    title: "THE BEGINNING",
    story:
      "A vision takes shape. Jernay begins with a passion for creativity, technology, and building meaningful digital experiences.",
  },
  {
    id: "2022",
    year: "2022",
    title: "THE FOUNDATION",
    story:
      "The vision starts becoming reality. New skills, new ideas, and a growing foundation in web development, design, and digital solutions.",
  },
  {
    id: "2023",
    year: "2023",
    title: "CREATIVE EXPANSION",
    story:
      "Jernay moves beyond development, embracing video editing, UI/UX design, visual storytelling, and content strategy.",
  },
  {
    id: "2024",
    year: "2024",
    title: "THE EVOLUTION",
    story:
      "Bigger projects. Stronger experiences. Jernay grows into a more complete creative and digital partner for ambitious ideas.",
  },
  {
    id: "2025",
    year: "2025",
    title: "STRATEGIC GROWTH",
    story:
      "Development meets strategy. SMM, SEO, analytics, content, and visual storytelling come together to create digital experiences built for growth.",
  },
  {
    id: "2026",
    year: "2026",
    title: "THE NEXT CHAPTER",
    story:
      "Five years of learning, building, and evolving lead to a new chapter — Jernay as a full-service digital creative agency, built for bigger ideas and greater impact.",
  },
];
