import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import "./styles/ProfitByBet.css";
import { ThemeContext } from "../../context/ThemeContext";
import { getLogo } from "../../utils/getLogo";
import { formatValue } from "../../utils/formatNumber";
import Logo from "../../components/Logo";
import { Link } from "react-router-dom";
import BetChart from "../../components/BetChart";
import SectionTitle from "../../components/SectionTitle";
import Loading from "../../components/Loading";

function ProfitByBet() {
  const { results, loading } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);

  const [betSum, setBetSum] = useState([]);

  useEffect(() => {
    const getResultsByBet = () => {
      const bets = results
        .map((r) => {
          const win = r[11].value;

          const result = r.filter((_r2, i) => {
            if (win === 1) {
              return i === 2 || i === 12;
            } else if (win === 2) {
              return i === 5 || i === 12;
            } else if (win === 3) {
              return i === 8 || i === 12;
            }
            return null;
          });

          return result;
        })
        .filter((r) => r.length > 0)
        .map((r) => {
          const [bet] = r[0].value.split(" |");
          const profit = r[1].value;
          return { bet, profit };
        });

      const totalByBet = bets.reduce((acc, curr) => {
        if (!acc[curr.bet]) {
          acc[curr.bet] = 0;
        }
        acc[curr.bet] += curr.profit;
        return acc;
      }, {});

      const sorted = Object.entries(totalByBet).sort((a, b) => b[1] - a[1]);

      setBetSum(sorted);
    };
    getResultsByBet();
  }, [results]);

  return (
    <div className="profit-by-bet">
      <Logo />

      {loading ? (
        <Loading />
      ) : (
        <>
          <SectionTitle icon="uil:list-ol" title="Lucro por casa de aposta" />

          <div className="profit-by-bet__chart">
            <BetChart dataArray={betSum} />
          </div>

          <section className="profit-by-bet__cards content">
            {betSum.map(([name, total], i) => {
              const { logo, site } = getLogo(name);

              let classStyle = `c-${theme}`;

              if (i === 0) {
                classStyle = `c-${theme}-2 --gold`;
              }

              return (
                <div
                  key={name}
                  className={`profit-by-bet__cards__card ${classStyle}`}
                >
                  <span className={`c-${theme}-1`}>{i + 1}</span>
                  <div className={`profit-by-bet__cards__card__content`}>
                    <div>
                      <Link
                        to={site}
                        target="_blank"
                        className="profit-by-bet__cards__card__content__link"
                      >
                        <img
                          src={logo}
                          alt=""
                          className="profit-by-bet__cards__card__content__link__logo"
                        />
                      </Link>
                      {name}
                    </div>
                    <p>{formatValue(total)}</p>
                  </div>
                </div>
              );
            })}
          </section>
        </>
      )}
    </div>
  );
}

export default ProfitByBet;
