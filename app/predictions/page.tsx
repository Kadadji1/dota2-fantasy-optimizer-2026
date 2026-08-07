import type { Metadata } from "next";
import "./predictions-intro.css";
import SiteHeader from "../../components/SiteHeader";
import PredictionsIntro from "../../components/PredictionsIntro";
import Predictions from "./Predictions";

export const metadata: Metadata = {
  title: "TI2026 Group Stage Predictions",
  description:
    "Interactive TI2026 Group Stage predictions with team slot probabilities and a recommended bracket.",
  alternates: { canonical: "/predictions" }
};

export default function PredictionsPage() {
  return <><SiteHeader active="predictions" /><div className="predictions-intro-shell"><PredictionsIntro /></div><Predictions /></>;
}