import Script from "next/script";
import "./home-hero.css";
import HomeHero from "../components/HomeHero";
import FantasySubnav from "../components/FantasySubnav";
import Optimizer from "../components/Optimizer";
import Rosters from "../components/Rosters";
import SiteHeader from "../components/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader active="fantasy" />
      <FantasySubnav />
      <HomeHero />
      <div className="calculator-page-body">
        <Optimizer />
        <Rosters />
      </div>
      <Script src="/team-map-fix.js" strategy="afterInteractive" />
      <Script src="/extra-languages.js" strategy="afterInteractive" />
      <Script src="/language-switch-fix.js" strategy="afterInteractive" />
      <Script src="/source-copy-fix.js" strategy="afterInteractive" />
      <Script src="/footer-language-fix.js" strategy="afterInteractive" />
      <Script src="/title-ui-enhance.js" strategy="afterInteractive" />
    </>
  );
}
