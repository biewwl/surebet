// import ProfitChart from "../../components/ProfitChart";
import "./styles/Home.css";
// import ProfitData from "../../components/ProfitData";
import Tips from "../../components/Tips";
import Logo from "../../components/Logo";
import SectionTitle from "../../components/SectionTitle";
import Balance from "../../components/Balance";

function Home() {
  return (
    <main className="home">
      <Logo />
      <div className="home__section">
        <SectionTitle icon="line-md:confirm-circle-twotone" title="Saldo" />
        <Balance />
      </div>
      <div className="home__section">
        <SectionTitle icon="line-md:compass-twotone-loop" title="Histórico" />
        <Tips />
      </div>
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
