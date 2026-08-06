import Link from "next/link";
import Optimizer from "../components/Optimizer";
import Rosters from "../components/Rosters";

export default function Home() {
  return (
    <>
      <div className="homepage-tabs-wrap">
        <nav className="page-tabs homepage-tabs" aria-label="Primary navigation">
          <Link href="/" className="active">Fantasy Calculator</Link>
          <Link href="/predictions">Predictions</Link>
          <a href="/#rules">Guide</a>
        </nav>
      </div>
      <Optimizer />
      <Rosters />
    </>
  );
}
