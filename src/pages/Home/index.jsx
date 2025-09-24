// import ProfitChart from "../../components/ProfitChart";
import "./styles/Home.css";
// import ProfitData from "../../components/ProfitData";
import Tips from "../../components/Tips";
import Logo from "../../components/Logo";
import SectionTitle from "../../components/SectionTitle";
// import Balance from "../../components/Balance";
import Balance from "../../components/Balance_new";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import Loading from "../../components/Loading";
// import Calculate from "../Calculate";
import SheetController from "../../components/SheetController";
// import domtoimage from "dom-to-image-more";
import { ModeContext } from "../../context/ModeContext";
import Withdraws from "../../components/Withdraws";

function Home() {
  const { loading } = useContext(DataContext);
  const { mode } = useContext(ModeContext);

  return (
    <main className="home">
      <Logo />
      {!loading && <SheetController />}
      {!loading && mode !== "zen" && (
        <div className="home__section">
          <SectionTitle icon="line-md:confirm-circle-twotone" title="Saldo" />
          <Balance />
        </div>
      )}
      {/* {!loading && mode !== "zen" && (
        <div className="home__section">
          <SectionTitle icon="line-md:confirm-circle-twotone" title="Saldos em Casas de Apostas" />
          <Withdraws />
        </div>
      )} */}
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
      {loading && <Loading counter />}
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
