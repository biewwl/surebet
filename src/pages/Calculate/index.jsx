import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { formatValue } from "../../utils/formatNumber";
import { Icon } from "@iconify/react/dist/iconify.js";
import Logo from "../../components/Logo";
import SectionTitle from "../../components/SectionTitle";
import "./styles/Calculate.css";

function Calculate() {
  const [data, setData] = useState({
    "Odd 1": "",
    Stake: "",
    "Odd 2": "",
    // "Valor 2": 0,
    "Odd 3": "",
    // "Valor 3": 0,
    total: "",
  });
  const [showOdd3, setShowOdd3] = useState(false);

  const {
    "Odd 1": odd1,
    Stake: value1,
    "Odd 2": odd2,
    "Odd 3": odd3,
    total,
  } = data;

  const { theme } = useContext(ThemeContext);

  const handleChange = ({ target }) => {
    const { name } = target;
    let value = target.value; // Substitui vírgulas por pontos

    value = value.replace("R$ ", "");
    value = value.replace(",", ".");

    const newData = { ...data };
    newData[name] = value;

    const {
      "Odd 1": o1,
      Stake: v1,
      "Odd 2": o2,
      "Odd 3": o3,
      // t,
    } = newData;

    const v2 = safeCalculation(v1, o1, o2);
    const v3 = safeCalculation(v1, o1, o3);

    const newT = Number(v1) + v2 + v3;

    if (!isNaN(value) || value === ".") {
      if (name === "total") {
        setData({
          ...data,
          [name]: value,
          Stake: (value / (1 + o1 / o2 + (o3 === "" ? 0 : o1 / o3))).toFixed(2),
        });
      } else {
        setData({
          ...data,
          [name]: value,
          total: newT === 0 ? "" : newT.toFixed(2),
        });
      }
    }
  };

  const dataInputs = Object.keys(data);

  const group1 = dataInputs.slice(0, 2);
  const group2 = dataInputs.slice(2, 3);
  const group3 = dataInputs.slice(3, 4);

  // const calculate = () => {
  //   const { "Odd 1": odd1, "Valor 1": valor1, "Odd 2": odd2, "Valor 2": valor2, "Odd 3": odd3, "Valor 3": valor3 } = data;

  //   const result1 = (odd1 * valor1) - valor1;
  //   const result2 = (odd2 * valor2) - valor2;
  //   const result3 = (odd3 * valor3) - valor3;

  //   const total = result1 + result2 + result3;

  // console.log(total);
  // }

  const handleOdd3 = () => {
    setShowOdd3(!showOdd3);
    setData({ ...data, "Odd 3": "" });
  };

  const safeCalculation = (value1, odd1, odd2) => {
    const result = Number(value1) * (Number(odd1) / Number(odd2));
    return isFinite(result) && !isNaN(result) ? result : 0;
  };

  const value2 = safeCalculation(value1, odd1, odd2);
  const value3 = safeCalculation(value1, odd1, odd3);

  const returnTip = value1 * odd1;

  const stakeReturn = returnTip - total;
  const arbitrage = isNaN(((stakeReturn / total) * 100).toFixed(2))
    ? 0
    : ((stakeReturn / total) * 100).toFixed(2);

  const profitClass = () => {
    if (returnTip - total > 0) {
      return " --win";
    } else if (returnTip - total < 0) {
      return " --loss";
    } else {
      return "";
    }
  };

  const hasOdds = odd1 && odd2;

  return (
    <main className={`calculate ${profitClass()} c-${theme}-1`}>
      <Logo />
      <section className="calculate__section">
        <SectionTitle icon="fluent:math-symbols-20-filled" title="Calcular" />
        <div className="calculate__inputs">
          <div className={`calculate__inputs__group content`}>
            {group1.map((input, i) => (
              <>
                <label
                  htmlFor={input}
                  key={input}
                  className={`calculate__inputs__group__label`}
                >
                  <span className="calculate__inputs__group__label__title">
                    {input}
                  </span>
                  <input
                    id={input}
                    type="text"
                    name={input}
                    value={(i === 1 ? "R$ " : "") + data[input]}
                    onChange={handleChange}
                    className={`calculate__inputs__group__label__input bg-${theme} c-${theme}
                    ${i === 1 ? " --stake" : ""}
                    `}
                  />
                </label>
                {i === 0 ? (
                  <Icon
                    icon="uim:multiply"
                    width="18"
                    height="18"
                    className="calculate__inputs__group__signs"
                  />
                ) : (
                  <Icon
                    icon="material-symbols-light:equal-rounded"
                    width="18"
                    height="18"
                    className="calculate__inputs__group__signs"
                  />
                )}
              </>
            ))}
            <div className="calculate__inputs__group__label">
              <span className="calculate__inputs__group__result__return__title">
                Retorno
              </span>
              <span
                className={`calculate__inputs__group__label__input c-${theme} --return`}
              >
                {formatValue(value1 * odd1)}
              </span>
            </div>
          </div>
          <div className={`calculate__inputs__group content`}>
            {group2.map((input) => (
              <label
                htmlFor={input}
                key={input}
                className={`calculate__inputs__group__label`}
              >
                <span className="calculate__inputs__group__label__title">
                  {input}
                </span>
                <input
                  id={input}
                  type="text"
                  name={input}
                  value={data[input]}
                  onChange={handleChange}
                  className={`calculate__inputs__group__label__input bg-${theme} c-${theme}`}
                />
              </label>
            ))}
            <Icon
              icon="uim:multiply"
              width="18"
              height="18"
              className="calculate__inputs__group__signs"
            />
            <div className="calculate__inputs__group__label">
              <span className="calculate__inputs__group__result__place__title">
                Stake
              </span>
              <span
                className={`calculate__inputs__group__label__input --stake`}
              >
                {formatValue(value2)}
              </span>
            </div>
            <Icon
              icon="material-symbols-light:equal-rounded"
              width="18"
              height="18"
              className="calculate__inputs__group__signs"
            />
            <div className="calculate__inputs__group__label">
              <span className="calculate__inputs__group__result__return__title">
                Retorno
              </span>
              <span
                className={`calculate__inputs__group__label__input c-${theme}`}
              >
                {formatValue(value2 * odd2)}
              </span>
            </div>
          </div>
          {showOdd3 && (
            <div className={`calculate__inputs__group content`}>
              {group3.map((input) => (
                <label
                  htmlFor={input}
                  key={input}
                  className={`calculate__inputs__group__label`}
                >
                  <span className="calculate__inputs__group__label__title">
                    {input}
                  </span>
                  <input
                    id={input}
                    type="text"
                    name={input}
                    value={data[input]}
                    onChange={handleChange}
                    className={`calculate__inputs__group__label__input bg-${theme} c-${theme}`}
                  />
                </label>
              ))}
              <Icon
                icon="uim:multiply"
                width="18"
                height="18"
                className="calculate__inputs__group__signs"
              />
              <div className="calculate__inputs__group__label">
                <span className="calculate__inputs__group__result__place__title">
                  Stake
                </span>
                <span
                  className={`calculate__inputs__group__label__input --stake`}
                >
                  {formatValue(value3)}
                </span>
              </div>
              <Icon
                icon="material-symbols-light:equal-rounded"
                width="18"
                height="18"
                className="calculate__inputs__group__signs"
              />
              <div className="calculate__inputs__group__label">
                <span className="calculate__inputs__group__result__return__title">
                  Retorno
                </span>
                <span
                  className={`calculate__inputs__group__label__input c-${theme}`}
                >
                  {formatValue(value3 * odd3)}
                </span>
              </div>
              <button
                onClick={handleOdd3}
                className={`calculate__inputs__group__close-odd3 c-${theme}-2`}
              >
                <Icon
                  icon="bx:bx-x"
                  className="calculate__inputs__group__label__input__icon"
                />
              </button>
            </div>
          )}
          {!showOdd3 && (
            <button
              className={`calculate__inputs__add-btn c-${theme}`}
              onClick={handleOdd3}
            >
              <Icon
                className={`calculate__inputs__add-btn__icon bg-${theme}-2`}
                icon="line-md:plus"
              />
            </button>
          )}
          <div className="calculate__inputs__details content">
            <div className="calculate__inputs__group__label">
              <span
                className={`calculate__inputs__details__place__title c-${theme}-1`}
              >
                <Icon
                  icon="dashicons:money-alt"
                  className="calculate__inputs__details__place__title__icon"
                />
                Stake Total
              </span>
              <input
                className={`calculate__inputs__group__label__input ${
                  !hasOdds ? `bg-${theme}-2` : `bg-${theme}`
                } c-${theme}`}
                value={!hasOdds ? "R$ 0,00" : `R$ ${total}`}
                onChange={handleChange}
                name="total"
                disabled={!hasOdds}
              />
            </div>
            <div className="calculate__inputs__group__label">
              <span
                className={`calculate__inputs__details__return__title c-${theme}-1`}
              >
                <Icon
                  icon="bx:rotate-left"
                  className="calculate__inputs__details__place__title__icon"
                />
                Retorno
              </span>
              <span
                className={`calculate__inputs__group__label__input  c-${theme}`}
              >
                {formatValue(returnTip)}
              </span>
            </div>

            <div className={`calculate__inputs__group__label`}>
              <span
                className={`calculate__inputs__details__return__title c-${theme}-1`}
              >
                <Icon
                  icon="majesticons:percent-line"
                  className="calculate__inputs__details__place__title__icon"
                />
                Arbitragem
              </span>
              <span
                className={`calculate__inputs__group__label__input  c-${theme}`}
              >
                {arbitrage}%
              </span>
            </div>
            <div className={`calculate__inputs__group__label`}>
              <span
                className={`calculate__inputs__details__return__title c-${theme}-1`}
              >
                <Icon
                  icon="material-symbols:money-bag-outline-rounded"
                  className="calculate__inputs__details__place__title__icon"
                />
                Lucro
              </span>
              <span
                className={`calculate__inputs__group__label__input --profit`}
              >
                {formatValue(stakeReturn)}
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Calculate;

// function calcularValorParaRisco(riscoDesejado, odd) {
//   // Cálculo do valor a ser apostado com base no risco desejado
//   const valorApostado = riscoDesejado / (odd - 1);
//   return valorApostado.toFixed(2); // Retorna com 2 casas decimais
// }

// // Exemplo de uso:
// const riscoDesejado = 240.63; // Risco que você deseja controlar
// const odd = 3.05; // Odd contra
// const valorApostado = calcularValorParaRisco(riscoDesejado, odd);
// console.log("Valor a ser apostado: R$", valorApostado);
