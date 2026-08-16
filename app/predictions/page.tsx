import type { Metadata } from "next";
import "./predictions-intro.css";
import SiteHeader from "../../components/SiteHeader";
import PredictionsIntro from "../../components/PredictionsIntro";
import Predictions from "./Predictions";

export const metadata: Metadata = {
  title: "TI2026 Main Event Predictions | Bracket & Team Odds",
  description:
    "TI2026 Main Event double-elimination bracket, post-group-stage team odds, and Group Stage results.",
  alternates: { canonical: "/predictions" }
};

export default function PredictionsPage() {
  return <><SiteHeader active="predictions" /><div className="predictions-intro-shell"><PredictionsIntro /></div><Predictions /></>;
}
