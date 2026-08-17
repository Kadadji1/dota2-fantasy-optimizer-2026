import type { Metadata } from "next";
import SiteHeader from "../../components/SiteHeader";
import GuideContent from "../../components/GuideContent";

export const metadata: Metadata = {
  title: "TI2026 Fantasy Guide",
  description: "Complete TI2026 Fantasy guide covering banners, emblems, traits, titles, rerolls and predictions.",
  alternates: { canonical: "/guide" }
};

export default function GuidePage() {
  return (
    <>
      <SiteHeader active="guide" />
      <GuideContent />
    </>
  );
}
