import type { Metadata } from "next";
import Predictions from "../../components/Predictions";

export const metadata: Metadata = {
  title: "TI2026 Group Stage Predictions",
  description:
    "Interactive TI2026 Group Stage predictions with team slot probabilities and a recommended bracket.",
  alternates: { canonical: "/predictions" }
};

export default function PredictionsPage() {
  return <Predictions />;
}
