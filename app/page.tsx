import Link from "next/link";
import Script from "next/script";
import Optimizer from "../components/Optimizer";
import Rosters from "../components/Rosters";

export default function Home() {
  return (
    <>
      <div className="homepage-tabs-wrap">
        <nav className="page-tabs homepage-tabs primary-page-tabs" aria-label="Primary navigation">
          <Link href="/" className="active">Fantasy Calculator</Link>
          <Link href="/predictions">Predictions</Link>
          <Link href="/guide">Guide</Link>
        </nav>
      </div>
      <Optimizer />
      <Rosters />
      <Script src="/team-map-fix.js" strategy="afterInteractive" />
      <Script src="/social-links.js" strategy="afterInteractive" />
      <Script src="/extra-languages.js" strategy="afterInteractive" />
      <Script src="/language-switch-fix.js" strategy="afterInteractive" />
      <Script src="/source-copy-fix.js" strategy="afterInteractive" />
      <Script src="/footer-language-fix.js" strategy="afterInteractive" />
      <Script src="/title-ui-enhance.js" strategy="afterInteractive" />
    </>
  );
}
