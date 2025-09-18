import { useContext, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { ThemeContext } from "../../context/ThemeContext";
import chunkArray from "../../utils/chunkArray";
import { formatValue } from "../../utils/formatNumber";
import { getLogo } from "../../utils/getLogo";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import "./styles/TipCard.css";
import "../TipCard/styles/TipCard.css";
import sumProfit from "../../utils/sumProfit";
import { postWin } from "../../api/post";
import { DataContext } from "../../context/DataContext";
import Loading from "../Loading";
import { deleteResult } from "../../api/delete";

function TipCard({ result, handleOpenView }) {
  const constants = result.slice(0, 4);
  const dynamics = result.slice(4);

  const [, line] = result[0].cel.match(/([a-zA-Z]+)([0-9]+)/).slice(1, 3);
  console.log(result, line);

  const [date, match, winner, freebet] = constants;

  const [selected, setSelected] = useState([]);
  const { updateData, script, sheet } = useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const pending = !winner.value;
  // const lose = winner.value === "lose";

  const winners = String(winner.value).split("");

  const { theme } = useContext(ThemeContext);

  const isFreebet = (idx) => {
    return String(freebet.value).split("").includes(idx);
  };

  const totalPrice = (includeFree) => {
    // pega só os preços de índice % 3 === 2
    const prices = dynamics.filter((_, idx) => idx % 3 === 2);

    // 2. soma preços ignorando freebets
    const total = prices.reduce((acc, item, groupIdx) => {
      const price = item.value; // já é número
      const shouldSkip = freebet && isFreebet(String(groupIdx + 1));
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

  const classWinner = (index) => {
    if (!winner.value || selected.includes(index)) return "";
    return String(winner.value).includes(String(index))
      ? " --winner"
      : " --loser";
  };

  const profitClass = () => {
    if (pending) return " --pending";
    if (sumProfit(result) > 0) return " --profit";
    if (sumProfit(result) < 0) return " --loss";
    return "--break-even";
  };

  const arbitrage = () => {
    // Deve pegar o valor total ganho e o valor total gasto e descobrir quando em porcentagem o excedente representa do gasto
    if (pending) return false;
    const profit = sumProfit(result);
    const total = totalPrice(true);
    const arb = (profit / total) * 100;
    return arb.toFixed(2);
  };

  const handleSelect = (index) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((i) => i !== index)); // remove se já estiver selecionado
    } else {
      setSelected([...selected, index]); // adiciona se não estiver selecionado
    }
  };

  const handleSendWins = async () => {
    setLoading(true);
    // Aqui você pode adicionar a lógica para enviar os vencedores selecionados
    await postWin(script, selected.sort().join(""), line, sheet);

    setLoading(false);
    updateData();
    navigate("/");
  };

  const handleSendReset = async () => {
    setLoading(true);
    // Aqui você pode adicionar a lógica para enviar os vencedores selecionados
    await postWin(script, "", line, sheet);

    setLoading(false);
    updateData();
    navigate("/");
  };

  const handleSendLoss = async () => {
    setLoading(true);
    // Aqui você pode adicionar a lógica para enviar os vencedores selecionados
    await postWin(script, "loss", line, sheet);

    setLoading(false);
    updateData();
    navigate("/");
  };

  const handleDelete = async () => {
    setLoading(true);
    // Aqui você pode adicionar a lógica para enviar os vencedores selecionados
    await deleteResult(script, line, sheet);

    setLoading(false);
    updateData();
    navigate("/");
  };

  const classSelected = (i) =>
    selected.some((s) => s === i) ? " --selected" : "";

  return (
    <section className={`c-${theme} bg-${theme}-2 tip-card --new`}>
      {loading ? (
        <Loading />
      ) : (
        <>
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
            <div className="tip-card-resume__description">
              {matchDescription}
            </div>
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
                {!pending && formatValue(sumProfit(result) + totalPrice())}
                {pending && "R$ 0,00"}
              </span>
            </li>
            <li className={`tip-card__tip__profit__details__item`}>
              Lucro:{" "}
              <span
                className={`tip-card__tip__profit__details__item__value c-${theme}-1 ${profitClass()}`}
              >
                {!pending && formatValue(sumProfit(result))}
                {pending && "R$ 0,00"}
              </span>
            </li>
          </ul>
          <div className="tip-card__tip__profit__actions">
            <button
              className="tip-card__tip__profit__actions__btn --delete"
              onClick={handleDelete}
            >
              <Icon icon="solar:trash-bin-trash-line-duotone" />
              Deletar
            </button>
            <button
              className={`tip-card__tip__profit__actions__btn --reset bg-${theme}`}
              onClick={handleSendLoss}
            >
              <Icon icon="mynaui:sad-ghost" />
              Definir como Derrota
            </button>
            {winner.value && (
              <button
                className={`tip-card__tip__profit__actions__btn --reset bg-${theme}`}
                onClick={handleSendReset}
              >
                <Icon icon="ri:reset-left-fill" />
                Redefinir Vencedor
              </button>
            )}
            {selected.length > 0 && (
              <button
                className="tip-card__tip__profit__actions__btn --define-win"
                onClick={handleSendWins}
              >
                <Icon icon="charm:tick" />
                Confirmar ganhadores
              </button>
            )}
          </div>
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
                  } bg-${theme} ${classWinner(groupIndex + 1)}${classSelected(
                    groupIndex + 1
                  )}`}
                  onClick={() => handleSelect(groupIndex + 1)}
                >
                  <span className="tip-card__odds__odd__index">
                    {groupIndex + 1}
                  </span>
                  {/* primeira div: descrição em lista */}
                  <div className="tip-card__odds__items">
                    <ul className="tip-card__odds__items__list">
                      {multiItem.map((item, i) => (
                        <li
                          key={i}
                          className="tip-card__odds__items__list__item"
                        >
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
                      <img
                        src={bImg}
                        alt=""
                        className="tip-card__tip__odd__logo"
                      />
                    </Link>
                    <div className="tip-card__odds__items__odd__values">
                      {valueItems.map((d, i) => {
                        const isOdd = i % 2 === 0;
                        const value = !isOdd ? formatValue(d.value) : d.value;
                        const classFreebet =
                          !isOdd && isFreebet(String(groupIndex + 1))
                            ? " --freebet"
                            : "";
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
        </>
      )}
    </section>
  );
}

export default TipCard;
