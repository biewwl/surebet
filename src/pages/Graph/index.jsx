import ProfitChart from "../../components/ProfitChart";
import Logo from "../../components/Logo";
import SectionTitle from "../../components/SectionTitle";
import Loading from "../../components/Loading";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import "./styles/Graph.css";
import "./styles/Graph-mobile.css";

function Graph() {
  const { loading } = useContext(DataContext);

  return (
    <main className="graph">
      <Logo />
      {loading ? (
        <Loading />
      ) : (
        <div className="graph__section">
          <SectionTitle
            icon="line-md:chevron-up-circle-twotone"
            title="Lucro"
          />
          <section className="graph__canvas content">
            <ProfitChart aspectRatio={3 / 1} n={10}/>
          </section>
          <section className="graph__canvas content --mobile">
            <ProfitChart aspectRatio={1 / 1} n={8} />
          </section>
        </div>
      )}
    </main>
  );
}

export default Graph;
