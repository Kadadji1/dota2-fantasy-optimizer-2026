import type { Metadata } from "next";
import "./predictions-intro.css";
import SiteHeader from "../../components/SiteHeader";
import PredictionsIntro from "../../components/PredictionsIntro";
import Predictions from "./Predictions";

export const metadata: Metadata = {
  title: "TI2026 Group Stage Schedule & Results",
  description:
    "TI2026 Group Stage schedule, confirmed match results and Main Event timeline.",
  alternates: { canonical: "/predictions" }
};

export default function PredictionsPage() {
  return <><SiteHeader active="predictions" /><div className="predictions-intro-shell"><PredictionsIntro /></div><Predictions /></>;
}
