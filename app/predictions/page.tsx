import type { Metadata } from "next";
import "./predictions-intro.css";
import SiteHeader from "../../components/SiteHeader";
import PredictionsIntro from "../../components/PredictionsIntro";
import Predictions from "./Predictions";

export const metadata: Metadata = {
  title: "TI2026 Main Event Fantasy",
  description:
    "TI2026 Main Event Fantasy rules, five-emblem banners and roster-lock information.",
  alternates: { canonical: "/predictions" }
};

export default function PredictionsPage() {
  return <><SiteHeader active="predictions" /><div className="predictions-intro-shell"><PredictionsIntro /></div><Predictions /></>;
}
