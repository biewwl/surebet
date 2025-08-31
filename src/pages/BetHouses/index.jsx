import { Link } from "react-router-dom";
import Logo from "../../components/Logo";
import SectionTitle from "../../components/SectionTitle";
import { ThemeContext } from "../../context/ThemeContext";
import { allLogos, getLogo } from "../../utils/getLogo";
import "./styles/BetHouses.css";
import { useContext } from "react";

function BetHouses() {
  const { theme } = useContext(ThemeContext);

  return (
    <main className="bet-houses">
      <Logo />
      <div className="bet-houses__section">
        <SectionTitle
          icon="fluent-mdl2:website"
          title="Casas de Aposta"
        />
        <div className="bet-houses__section__items">
          {Object.entries(allLogos).sort((a, b) => a[0].localeCompare(b[0])).map((l, index) => {
            const [name, logo] = l;
            return (
              <Link
                to={getLogo(name).site}
                target="_blank"
                rel="noreferrer"
                className={`bet-houses__section__items__item bg-${theme}-2 c-${theme}`}
                key={`${name}${index}`}
              >
                <img
                  src={logo}
                  alt={`name ${index}`}
                  className="bet-houses__section__items__item__img"
                />
                {name}
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default BetHouses;
