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
import { Icon } from "@iconify/react/dist/iconify.js";
import chunkArray from "../../utils/chunkArray";

function ProfitByBet() {
  const { results, loading } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);

  const [betSum, setBetSum] = useState([]);

  useEffect(() => {
    const getResultsByBet = () => {
      // objetos de acumulação
      const balanceByHouses = {};
      const freebetCountByHouses = {};

      results.forEach((r) => {
        const [, , winner, freebet] = r.slice(0, 4);
        const dynamics = r.slice(4);

        const winnerIdxs = winner.value ? String(winner.value).split("") : [];
        const freebetIdxs = freebet.value
          ? String(freebet.value).split("")
          : [];

        // agrupa em trios: [casa, odd, stake]
        const tipsByHouse = chunkArray(dynamics, 3);

        tipsByHouse.forEach((tip, i) => {
          const house = tip[0]?.value.split(" | ")[0] || "Desconhecida";
          const odd = Number(tip[1]?.value) || 0;
          const stake = Number(tip[2]?.value) || 0;
          const idx = String(i + 1);

          const isWin = winnerIdxs.includes(idx);
          const isFreebet = freebetIdxs.includes(idx);

          // incrementa contador de freebet se usada
          if (isFreebet) {
            freebetCountByHouses[house] =
              (freebetCountByHouses[house] || 0) + 1;
          }

          // calcula lucro/perda
          let profit;
          if (isWin) {
            profit = (odd * stake) - stake; // retorno descontando stake
          } else {
            profit = isFreebet ? 0 : -stake;
          }

          balanceByHouses[house] = (balanceByHouses[house] || 0) + profit;
        });
      });

      // monta o array de resultados por casa
      const betsResults = Object.keys(balanceByHouses).map((bet) => ({
        bet,
        value: balanceByHouses[bet],
        freebetCount: freebetCountByHouses[bet] || 0,
      }));

      // ordena por saldo decrescente e formata para [casa, saldo, contagemFreebet]
      const sorted = betsResults
        .sort((a, b) => b.value - a.value)
        .map(({ bet, value, freebetCount }) => [bet, value, freebetCount]);

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
            {betSum.map(([name, total, freebetCount], i) => {
              const { logo, site } = getLogo(name);

              let classStyle = `c-${theme}`;

              if (i === 0) {
                classStyle = `c-${theme}-2 --gold`;
              }

              const isNegative = total < 0;

              const classNegative = isNegative ? " --negative" : "";

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
                    <div className="profit-by-bet__cards__card__content__profit__value">
                      {freebetCount > 0 && (
                        <span
                          className={`profit-by-bet__cards__card__content__profit__value__count c-${theme}-2`}
                        >
                          <Icon
                            className="profit-by-bet__cards__card__content__profit__value__count__icon"
                            icon="tabler:gift-filled"
                          />{" "}
                          {freebetCount}
                        </span>
                      )}
                      <p
                        className={`profit-by-bet__cards__card__content__profit__value__total${classNegative}`}
                      >
                        {formatValue(total)}
                      </p>
                    </div>
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
