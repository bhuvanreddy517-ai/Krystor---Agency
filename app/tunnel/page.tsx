import type { Metadata } from "next";
import Link from "next/link";
import TunnelType from "@/components/lab/TunnelType";

export const metadata: Metadata = {
  title: "Tunnel Type — Lab · Krystor Agency",
  robots: { index: false },
};

export default function TunnelLab() {
  return (
    <main style={{ width: "100vw", height: "100vh", background: "#0a0a0c" }}>
      <Link
        href="/"
        style={{
          position: "fixed",
          top: "1.5rem",
          left: "1.5rem",
          zIndex: 100,
          color: "#fff",
          fontSize: "0.75rem",
          letterSpacing: "0.12em",
          textDecoration: "none",
          background: "rgba(255,255,255,0.08)",
          padding: "0.5rem 0.9rem",
          borderRadius: "999px",
          backdropFilter: "blur(12px)",
        }}
      >
        ← PORTFOLIO
      </Link>
      <TunnelType text="KRYSTOR AGENCY" />
    </main>
  );
}
