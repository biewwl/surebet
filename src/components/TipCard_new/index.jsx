import { useContext } from "react";
import { formatDate } from "../../utils/formatDate";
import { ThemeContext } from "../../context/ThemeContext";
import chunkArray from "../../utils/chunkArray";
import { formatValue } from "../../utils/formatNumber";
import { getLogo } from "../../utils/getLogo";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import "./styles/TipCard.css";
import "../TipCard/styles/TipCard.css";

function TipCard({ result, handleOpenView }) {
  const constants = result.slice(0, 4);
  const dynamics = result.slice(4);

  const [date, match, winner, freebet] = constants;

  const pending = !winner.value;
  // const lose = winner.value === "lose";

  const winners = String(winner.value).split("");

  const { theme } = useContext(ThemeContext);

  const isFreebet = (idx) => {
    return String(freebet.value).split("").includes(idx);
  };

  const totalPrice = () => {
    // pega só os preços de índice % 3 === 2
    const prices = dynamics.filter((_, idx) => idx % 3 === 2);

    // 2. soma preços ignorando freebets
    const total = prices.reduce((acc, item, groupIdx) => {
      const price = item.value; // já é número
      const shouldSkip = freebet && isFreebet(String(price));
      return acc + (shouldSkip ? 0 : price);
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

  const odds = chunkArray(dynamics, 3);

  const sumProfit = () => {
    // if (pending) return 0;
    const filterWinners = odds.filter((_, idx) =>
      winners.includes(String(idx + 1))
    );

    const result = filterWinners.reduce((acc, item) => {
      const odd = item[1]?.value; // já é número
      const price = item[2]?.value; // já é número
      const shouldSkip = freebet && isFreebet(String(price));
      return acc + (shouldSkip ? 0 : odd * price);
    }, 0);

    return result - totalPrice();
  };

  const classWinner = (index) => {
    if (!winner.value) return "";
    return String(winner.value).includes(String(index))
      ? " --winner"
      : " --loser";
  };

  const profitClass = () => {
    if (pending) return " --pending";
    if (sumProfit() > 0) return " --profit";
    if (sumProfit() < 0) return " --loss";
    return "--break-even";
  };

  const arbitrage = () => {
    // Deve pegar o valor total ganho e o valor total gasto e descobrir quando em porcentagem o excedente representa do gasto
    if (pending) return false;
    const profit = sumProfit();
    const total = totalPrice();
    const arb = (profit / total) * 100;
    return arb.toFixed(2);
  };

  return (
    <section className={`c-${theme} bg-${theme}-2 tip-card --new`}>
      <div className="tip-card__header">
        <div className="tip-card__date">
          <div></div>
          <span className="tip-card__header__date">
            {formatDate(date.value)}
          </span>
          <button
            onClick={handleOpenView}
            className="tip-card__header__close-btn"
          >
            <Icon icon="lets-icons:close-round" width="24" height="24" />
          </button>
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
            className={`tip-card__tip__profit__details__item__value c-${theme}-1`}
          >
            {!pending && formatValue(sumProfit() + totalPrice())}
            {pending && "R$ 0,00"}
          </span>
        </li>
        <li className={`tip-card__tip__profit__details__item`}>
          Lucro:{" "}
          <span
            className={`tip-card__tip__profit__details__item__value c-${theme}-1 ${profitClass()}`}
          >
            {!pending && formatValue(sumProfit())}
            {pending && "R$ 0,00"}
          </span>
        </li>
      </ul>
      <section className="tip-card__odds">
        {chunkArray(dynamics, 3).map((group, groupIndex) => {
          const [descItem, ...valueItems] = group;

          // extrai e divide o texto da descrição
          const onlyText = descItem.value.split(" | ")[1];
          const multiItem = onlyText.split(";");

          // console.log(group);
          const bHouse = descItem.value.split(" | ")[0];

          const bLogo = getLogo(bHouse);
          const bImg = bLogo.logo;
          const bSite = bLogo.site;

          const isWinner = winners.includes(String(groupIndex + 1));

          return (
            <div
              key={groupIndex}
              className={`tip-card__odds__odd ---${
                groupIndex + 1
              } bg-${theme} ${classWinner(groupIndex + 1)}`}
            >
              <span className="tip-card__odds__odd__index">
                {groupIndex + 1}
              </span>
              {/* primeira div: descrição em lista */}
              <div className="tip-card__odds__items">
                <ul className="tip-card__odds__items__list">
                  {multiItem.map((item, i) => (
                    <li key={i} className="tip-card__odds__items__list__item">
                      {item.split(": ").map((desc, val) => {
                        if (val === 0) {
                          return (
                            <div
                              key={val}
                              className="tip-card__odds__items__list__item__description"
                            >
                              {desc}:{" "}
                            </div>
                          );
                        } else {
                          return (
                            <span
                              key={val}
                              className={`tip-card__odds__items__list__item__value c-${theme}-1`}
                            >
                              {desc}
                              {isWinner && (
                                <Icon
                                  icon="charm:tick"
                                  className="tip-card__odds__items__list__item__value__icon"
                                />
                              )}
                            </span>
                          );
                        }
                      })}
                    </li>
                  ))}
                </ul>
              </div>

              {/* segunda div: ambos os valores juntos */}
              <div className={`tip-card__odds__items__odd bg-${theme}-2`}>
                <Link
                  to={bSite}
                  target="_blank"
                  className="tip-card__tip__odd__link"
                >
                  <img src={bImg} alt="" className="tip-card__tip__odd__logo" />
                </Link>
                <div className="tip-card__odds__items__odd__values">
                  {valueItems.map((d, i) => {
                    const isOdd = i % 2 === 0;

                    const value = !isOdd ? formatValue(d.value) : d.value;

                    const classFreebet =
                      !isOdd && isFreebet(String(groupIndex + 1)) ? " --freebet" : "";
                    return (
                      <span
                        key={i}
                        className={`tip-card__odds__items__odd__values__${i} ${classFreebet}`}
                      >
                        {!isOdd && isFreebet(String(groupIndex + 1)) && (
                          <span className="tip-card__odds__items__odd__values__freebet">
                            <Icon
                              className="tip-card__tip__odd__infos__price__icon"
                              icon="tabler:gift-filled"
                            />
                          </span>
                        )}
                        {value}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </section>
  );
}

export default TipCard;
