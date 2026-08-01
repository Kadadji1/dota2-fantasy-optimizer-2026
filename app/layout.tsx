import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dota 2 Fantasy Optimizer 2026",
  description: "Bilingual Dota 2 Fantasy roster optimizer for The International 2026"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
