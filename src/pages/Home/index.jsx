// import ProfitChart from "../../components/ProfitChart";
import "./styles/Home.css";
// import ProfitData from "../../components/ProfitData";
import Tips from "../../components/Tips";
import Logo from "../../components/Logo";
import Navigation from "../../components/Navigation";

function Home() {
  return (
    <main className="home">
      <div className="home__profit-chart">
        <Logo />
      </div>
      <Tips />
      {/* <Link to="/graph">
        <Icon
          icon="material-symbols:waterfall-chart"
          className="home__link content"
        />
      </Link> */}
      <Navigation />
    </main>
  );
}

export default Home;
