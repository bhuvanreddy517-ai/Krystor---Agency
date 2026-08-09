/* Single source of truth for site-wide constants.
   Set NEXT_PUBLIC_SITE_URL in Vercel once the domain exists —
   everything (sitemap, robots, OG, JSON-LD) follows automatically. */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const PERSON = {
  name: "Krystor Agency",
  jobTitle: "Product Design & UX Agency",
  email: "contact@krystor.agency",
  location: "Antibes, France",
  /* exact profile URLs as supplied — also consumed by JSON-LD */
  sameAs: [
    "https://www.linkedin.com/in/gireesh-kumar-reddy-kolli-",
    "https://github.com/gireeshkumarreddy",
    "https://www.instagram.com/itsgireeshreddy",
  ],
};
