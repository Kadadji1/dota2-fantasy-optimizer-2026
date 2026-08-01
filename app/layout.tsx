import type { Metadata } from "next";
import "./globals.css";
import "./team-logos.css";
import "./ranking-fix.css";
import "./rosters.css";
import "./header-fix.css";
import "./social-links.css";

export const metadata: Metadata = {
  title: "Dota 2 Fantasy Optimizer 2026",
  description: "Bilingual Dota 2 Fantasy roster optimizer for The International 2026"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <script src="/team-map-fix.js" defer />
        <script src="/social-links.js" defer />
      </body>
    </html>
  );
}
