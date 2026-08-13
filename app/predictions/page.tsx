import type { Metadata } from "next";
import "./predictions-intro.css";
import SiteHeader from "../../components/SiteHeader";
import PredictionsIntro from "../../components/PredictionsIntro";
import Predictions from "./Predictions";

export const metadata: Metadata = {
  title: "TI2026 Tournament Hub | Schedule, Results & Main Event",
  description:
    "TI2026 match schedule, confirmed Group Stage results and the upcoming Main Event bracket.",
  alternates: { canonical: "/predictions" }
};

export default function PredictionsPage() {
  return <><SiteHeader active="predictions" /><div className="predictions-intro-shell"><PredictionsIntro /></div><Predictions /></>;
}
