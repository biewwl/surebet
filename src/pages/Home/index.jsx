// import ProfitChart from "../../components/ProfitChart";
import "./styles/Home.css";
// import ProfitData from "../../components/ProfitData";
import Tips from "../../components/Tips";
import Logo from "../../components/Logo";
import SectionTitle from "../../components/SectionTitle";
import Balance from "../../components/Balance";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import Loading from "../../components/Loading";
import Calculate from "../Calculate";
import SheetController from "../../components/SheetController";

function Home() {
  const { loading } = useContext(DataContext);

  return (
    <main className="home">
      <Logo />
      <SheetController />
      {!loading && (
        <div className="home__section">
          <SectionTitle icon="line-md:confirm-circle-twotone" title="Saldo" />
          <Balance />
        </div>
      )}
      {/* <div className="home__section">
        <SectionTitle icon="fluent:math-symbols-20-filled" title="Calculate" />
        <Calculate />
      </div> */}
      {!loading && (
        <div className="home__section">
          <SectionTitle icon="line-md:compass-twotone-loop" title="Histórico" />
          <Tips />
        </div>
      )}
      {loading && <Loading />}
      {/* <Link to="/graph">
        <Icon
          icon="material-symbols:waterfall-chart"
          className="home__link content"
        />
      </Link> */}
    </main>
  );
}

export default Home;
