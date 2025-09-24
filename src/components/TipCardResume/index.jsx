import { Link } from "react-router-dom";
import { formatValue } from "../../utils/formatNumber";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import chunkArray from "../../utils/chunkArray";
import { getLogo } from "../../utils/getLogo";
import { formatDate } from "../../utils/formatDate";
import "./styles/TipCardResume.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import TipCard from "../TipCard_new";
import { sports } from "../../utils/sportIcons";
import sumProfit from "../../utils/sumProfit";

function TipCardResume({ result }) {
  const constants = result.slice(0, 4); // elementos 0 a 3
  const cashed = result[4]; // elemento 4
  const dynamics = result.slice(5); // elementos 5 em diante

  const [openView, setOpenView] = useState(false);

  const handleOpenView = () => {
    setOpenView(!openView);
  };

  const [date, match, winner, freebet] = constants;

  const pending = !winner.value;
  // const lose = winner.value === "lose";

  const winners = String(winner.value).split("");

  const winnersBetHousesNames = pending
    ? []
    : winners.map((w) => dynamics[(Number(w) - 1) * 3]?.value.split(" | ")[0]); // array com os nomes das casas dos vencedores

  const { theme } = useContext(ThemeContext);

  const isFreebet = (idx) => String(freebet.value).includes(idx);

  const totalPrice = (includeFree) => {
    // pega só os preços de índice % 3 === 2
    const prices = dynamics.filter((_, idx) => idx % 3 === 2);

    // 2. soma preços ignorando freebets
    const total = prices.reduce((acc, item, i) => {
      const price = item.value; // já é número
      const shouldSkip = freebet && isFreebet(String(i + 1));

      return acc + (shouldSkip && !includeFree ? 0 : price);
    }, 0);

    // 3. formata e retorna
    return total;
  };

  const sport = match.value.match(/^::[A-Z]{3}::/)
    ? match.value.match(/^::[A-Z]{3}::/)[0]
    : false;

  const matchDescription = sport
    ? match.value.replace(/^::[A-Z]{3}::/, "").trimStart()
    : match.value.trimStart();

  const tips = chunkArray(dynamics, 3);

  const betHouses = Array.from(
    new Set(
      tips
        .map((group) => group[0]?.value.split(" | ")[0]) // pega o primeiro item, faz split e pega índice 0
        .filter(Boolean) // remove undefined ou strings vazias
    )
  );

  const profit = sumProfit(result);
  const draw = profit === 0;

  const profitClass = () => {
    if (pending) return " --pending";
    if(winners.length > 1) return " --bingo";
    if (profit > 0) return " --profit";
    if (profit < 0) return " --loss";
    return "--draw";
  };

  const odds = chunkArray(dynamics, 3);
  const totalTips = odds.length;

  const arbitrage = () => {
    // Deve pegar o valor total ganho e o valor total gasto e descobrir quando em porcentagem o excedente representa do gasto
    if (pending) return false;
    const profit = sumProfit(result);
    const total = totalPrice(true);

    const arb = (profit / total) * 100;

    return arb.toFixed(2);
  };

  return (
    <>
      <section
        className={`c-${theme} bg-${theme}-2 tip-card --new --resume`}
        // onClick={handleOpenView}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleOpenView();
          }
        }}
      >
        <div className="tip-card__header">
          <div className="tip-card__date">
            <div></div>
            <span className="tip-card__header__date">
              {formatDate(date.value)}
            </span>
            <div></div>
          </div>
        </div>
        {matchDescription && (
          <div className="tip-card-resume__description">{matchDescription}</div>
        )}
        <ul className="tip-card__tip__profit__details">
          <li className="tip-card__tip__profit__details__item">
            Valor Total Apostado:{" "}
            <span
              className={`tip-card__tip__profit__details__item__value c-${theme}-1`}
            >
              {formatValue(totalPrice())}
            </span>
          </li>
          {arbitrage() && (
            <li className="tip-card__tip__profit__details__item">
              Arbitragem:{" "}
              <span
                className={`tip-card__tip__profit__details__item__value --arbitrage  ${profitClass()}`}
              >
                {/* {lose && "-"} */}
                {arbitrage()}%
              </span>
            </li>
          )}
          <li className="tip-card__tip__profit__details__item">
            Retorno:{" "}
            <span
              className={`tip-card__tip__profit__details__item__value c-${theme}-1 ${profitClass()}`}
            >
              {!pending && formatValue(profit + totalPrice())}
              {pending && "R$ 0,00"}
            </span>
          </li>
          <li className="tip-card__tip__profit__details__item">
            Apostas Feitas:{" "}
            <span
              className={`tip-card__tip__profit__details__item__value c-${theme}-1`}
            >
              {totalTips}
            </span>
          </li>
        </ul>

        <section className="tip-card-resume__odds">
          <span>Casas de aposta usadas:</span>
          <div className="tip-card-resume__odds__list">
            {betHouses.map((house, groupIndex) => {
              // separa o primeiro (descrição) e os demais (valores)
              const bLogo = getLogo(house);
              const bImg = bLogo.logo;
              const bSite = bLogo.site;

              const winnerOrNull =
                !winnersBetHousesNames.some((w) => w === house) && !pending;

              const winnerClass = winnerOrNull ? " --no-color" : "";

              return (
                <Link
                  to={bSite}
                  target="_blank"
                  className={`tip-card__tip__odd__link${winnerClass}`}
                  key={groupIndex}
                >
                  <img
                    src={bImg}
                    alt=""
                    className="tip-card-resume__tip__odd__logo"
                  />
                </Link>
              );
            })}
          </div>
        </section>
        <section className={`tip-card-resume__profit ${profitClass()}`}>
          {pending ? (
            <div className={`c-${theme}-2 bg-${theme}-3 tip-card__pending`}>
              <Icon icon="eos-icons:loading" />
            </div>
          ) : (
            <div className={`c-${theme}-2 bg-${theme}-3 tip-card__win`}>
              {draw ? "Anulado!" : formatValue(profit)}
            </div>
          )}
        </section>
        {sports[sport] && (
          <Icon
            icon={sports[sport].icon}
            className="tip-card__sport"
            color={sports[sport].color}
          />
        )}
      </section>
      {openView && (
        <div
          className="tip-card-resume__full-view"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleOpenView();
            }
          }}
        >
          <TipCard result={result} handleOpenView={handleOpenView} />
        </div>
      )}
    </>
  );
}

export default TipCardResume;
