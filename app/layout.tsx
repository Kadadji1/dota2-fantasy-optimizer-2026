import type { Metadata } from "next";
import AnalyticsEvents from "./AnalyticsEvents";
import "./globals.css";
import "./team-logos.css";
import "./ranking-fix.css";
import "./rosters.css";
import "./header-fix.css";
import "./social-links.css";
import "./extra-languages.css";
import "./mobile-team-role-fix.css";
import "./titles.css";
import "./predictions.css";
import "./navigation-v2.css";
import "./guide.css";
import "./site-header.css";

const siteUrl = "https://www.ti2026calculator.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Dota 2 TI2026 Fantasy Calculator & Optimizer",
  description:
    "Free Dota 2 TI2026 Fantasy Calculator & Optimizer for comparing Core, Mid and Support banners using historical Tier 1 tournament statistics.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "TI2026 Fantasy Calculator & Optimizer",
    title: "Dota 2 TI2026 Fantasy Calculator & Optimizer",
    description: "Compare Fantasy banners, player combinations and projected TI2026 roster scores."
  },
  twitter: {
    card: "summary_large_image",
    title: "Dota 2 TI2026 Fantasy Calculator & Optimizer",
    description: "Compare Fantasy banners, player combinations and projected TI2026 roster scores."
  }
};

const links = {
  github: "https://github.com/Kadadji1/dota2-fantasy-optimizer-2026",
  steam: "https://steamcommunity.com/id/Kadadji1/",
  coffee: "https://buymeacoffee.com/kadadji"
};

function GithubIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.9-2.78.62-3.37-1.21-3.37-1.21-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.66.35-1.12.64-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.1c.85 0 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.8-4.58 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z"/></svg>;
}

function SteamIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-9.8 8.06l5.27 2.18a2.84 2.84 0 0 1 1.64-.52l2.31-3.35v-.05a3.78 3.78 0 1 1 3.78 3.78h-.08l-3.3 2.36c0 .14.02.29.02.44A2.84 2.84 0 0 1 6.3 15.8L2.6 14.27A10 10 0 1 0 12 2Zm3.2 4.27a2.05 2.05 0 1 0 0 4.1 2.05 2.05 0 0 0 0-4.1ZM9 13.1c-.22 0-.43.04-.62.11l1.58.65a1.39 1.39 0 1 1-1.06 2.57l-1.54-.64A1.65 1.65 0 1 0 9 13.1Z"/></svg>;
}

function CoffeeIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 4h13a2 2 0 0 1 2 2v1h1a3 3 0 0 1 0 6h-1.25A7 7 0 0 1 12 18H9a7 7 0 0 1-7-7V6a2 2 0 0 1 2-2Zm15 5v2h1a1 1 0 0 0 0-2h-1ZM5 7v4a4 4 0 0 0 4 4h3a4 4 0 0 0 4-4V7H5Zm-2 13h16v2H3v-2Z"/></svg>;
}

function SocialLinks() {
  return <div className="social-links-footer">
    <a className="social-link" href={links.github} target="_blank" rel="noreferrer"><GithubIcon /><span>GitHub</span></a>
    <a className="social-link" href={links.steam} target="_blank" rel="noreferrer"><SteamIcon /><span>Steam</span></a>
    <a className="social-link" href={links.coffee} target="_blank" rel="noreferrer"><CoffeeIcon /><span>Buy me a coffee</span></a>
  </div>;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer className="site-social-footer">
          <div className="footer-signature">
            <strong>Made by Kadadji</strong>
            <span>Community-built Dota 2 fantasy tool. Not affiliated with Valve Corporation.</span>
          </div>
          <SocialLinks />
        </footer>
        <AnalyticsEvents />
      </body>
    </html>
  );
}
