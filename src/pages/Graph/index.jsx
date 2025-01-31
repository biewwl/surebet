import ProfitChart from "../../components/ProfitChart";
import "./styles/Graph.css";
import "./styles/Graph-mobile.css";
import Logo from "../../components/Logo";
import SectionTitle from "../../components/SectionTitle";

function Graph() {
  return (
    <main className="graph">
      <Logo />
      <div className="graph__section">
        <SectionTitle icon="line-md:chevron-up-circle-twotone" title="Lucro" />
        <section className="graph__canvas content">
          <ProfitChart aspectRatio={3 / 1} />
        </section>
        <section className="graph__canvas content --mobile">
          <ProfitChart aspectRatio={1 / 1} />
        </section>
      </div>
    </main>
  );
}

export default Graph;
