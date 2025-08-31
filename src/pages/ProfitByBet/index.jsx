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

function ProfitByBet() {
  const { results, loading } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);

  const [betSum, setBetSum] = useState([]);

  useEffect(() => {
    const getResultsByBet = () => {
      const betsResults = [];
      results.forEach((r) => {
        const win = r[11].value; // Mantém a lógica para obter a odd vencedora
        const freebet = r[12].value; // Agora capturamos o indicador de freebet

        console.log(freebet === win, );
        

        const opt1 = r[2].value; // Odd 1
        const betHousesOpt1 = opt1.split(" | "); // Casas de aposta da odd 1
        betHousesOpt1.pop();
        const opt1amount = betHousesOpt1.length;
        const opt1SpentByHouse = r[3].value / opt1amount; // Valor gasto na odd 1
        const odd1Value = r[4].value;
        betHousesOpt1.forEach((h) => {
          let resultValue;

          if (win === 1) {
            resultValue = opt1SpentByHouse * odd1Value - opt1SpentByHouse;
          } else {
            resultValue = -opt1SpentByHouse;
          }

          const currentBet = betsResults.find((b) => b.bet === h);

          if (currentBet) {
            currentBet.value += resultValue; // Atualiza o valor se a aposta já existir
            if (freebet === 1 && win === 1) {
              currentBet.freebetCount += 1; // Marca como freebet se for o caso
            }
          } else {
            // Adiciona uma nova aposta se não existir

            betsResults.push({
              bet: h,
              value: resultValue,
              freebetCount: freebet === 1 ? 1 : 0, // Adiciona o indicador de freebet
            });
          }
        }); // Formata o valor gasto por casa de aposta

        const opt2 = r[5].value; // Odd 2
        const betHousesOpt2 = opt2.split(" | "); // Casas de aposta da odd 2
        betHousesOpt2.pop();
        const opt2amount = betHousesOpt2.length;
        const opt2SpentByHouse = r[6].value / opt2amount; // Valor gasto na odd 2
        const odd2Value = r[7].value;
        betHousesOpt2.forEach((h) => {
          let resultValue;
          if (win === 2) {
            resultValue = opt2SpentByHouse * odd2Value - opt2SpentByHouse;
          } else {
            resultValue = -opt2SpentByHouse;
          }

          const currentBet = betsResults.find((b) => b.bet === h);
          if (currentBet) {
            currentBet.value += resultValue; // Atualiza o valor se a aposta já existir
            if (freebet === 2 && win === 2) {
              currentBet.freebetCount += 1; // Marca como freebet se for o caso
            }
          } else {
            betsResults.push({
              bet: h,
              value: resultValue,
              freebetCount: freebet === 2 ? 1 : 0, // Adiciona o indicador de freebet
            });
          }
        }); // Formata o valor gasto por casa de aposta
        // console.log(betHousesOpt1, r[3].value, opt1SpentByHouse);

        const opt3 = r[8].value; // Odd 3
        const betHousesOpt3 = opt3.split(" | "); // Casas de aposta da odd 3
        betHousesOpt3.pop();
        const opt3amount = betHousesOpt3.length;
        const opt3SpentByHouse = r[9].value / opt3amount; // Valor gasto na odd 3
        const odd3Value = r[10].value;
        betHousesOpt3.forEach((h) => {
          let resultValue;
          if (win === 3) {
            resultValue = opt3SpentByHouse * odd3Value - opt3SpentByHouse;
          } else {
            resultValue = -opt3SpentByHouse;
          }

          const currentBet = betsResults.find((b) => b.bet === h);

          if (currentBet) {
            currentBet.value += resultValue; // Atualiza o valor se a aposta já existir
            if (freebet === 3 && win === 3) {
              currentBet.freebetCount += 1; // Marca como freebet se for o caso
            }
          } else {
            // Adiciona uma nova aposta se não existir
            betsResults.push({
              bet: h,
              value: resultValue,
              freebetCount: freebet === 3 ? 1 : 0, // Adiciona o indicador de freebet
            });
          }
        }); // Formata o valor gasto por casa de aposta
      });

      const sorted = betsResults
        .map(({ bet, value, freebetCount }) => [bet, value, freebetCount])
        .sort((a, b) => b[1] - a[1]);

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
