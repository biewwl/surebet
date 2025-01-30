import ProfitChart from "../../components/ProfitChart";
import "./styles/Graph.css";
import "./styles/Graph-mobile.css";
import Logo from "../../components/Logo";
import Navigation from "../../components/Navigation";

function Graph() {
  return (
    <main className="graph">
      <Logo />
      <section className="graph__canvas content">
        <ProfitChart aspectRatio={3 / 1} />
      </section>

      <section className="graph__canvas content --mobile">
        <ProfitChart aspectRatio={1 / 1} />
      </section>
      <Navigation />
    </main>
  );
}

export default Graph;
