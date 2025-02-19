import { useContext, useState } from "react";
import "./styles/Calculate.css";
import { ThemeContext } from "../../context/ThemeContext";
import { formatValue } from "../../utils/formatNumber";
import { Icon } from "@iconify/react/dist/iconify.js";
import Logo from "../../components/Logo";
import SectionTitle from "../../components/SectionTitle";

function Calculate() {
  const [data, setData] = useState({
    "Odd 1": "",
    "Valor a ser colocado": "",
    "Odd 2": "",
    // "Valor 2": 0,
    "Odd 3": "",
    // "Valor 3": 0,
  });
  const [showOdd3, setShowOdd3] = useState(false);

  const {
    "Odd 1": odd1,
    "Valor a ser colocado": value1,
    "Odd 2": odd2,
    "Odd 3": odd3,
  } = data;

  const { theme } = useContext(ThemeContext);

  const handleChange = ({ target }) => {
    const { name } = target;
    let value = target.value; // Substitui vírgulas por pontos

    value = value.replace("R$ ", "");
    value = value.replace(",", ".");

    if (!isNaN(value) || value === ".") {
      setData({ ...data, [name]: value });
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

  //   console.log(total);
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

  const totalTip = Number(value1) + value2 + value3;
  const returnTip = value1 * odd1;

  const profitClass = () => {
    if (returnTip - totalTip > 0) {
      return " --win";
    } else if (returnTip - totalTip < 0) {
      return " --loss";
    } else {
      return "";
    }
  };

  return (
    <main className={`calculate ${profitClass()} c-${theme}`}>
      <Logo />
      <section className="calculate__section">
        <SectionTitle icon="fluent:math-symbols-20-filled" title="Calcular" />
        <div className="calculate__inputs">
          <div className={`calculate__inputs__group content`}>
            {group1.map((input, i) => (
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
                  className={`calculate__inputs__group__label__input bg-${theme} c-${theme}${
                    i === 1 ? ` --place` : ""
                  }`}
                />
              </label>
            ))}
            <div className="calculate__inputs__group__result">
              {/* <div className="calculate__inputs__group__result__place">
                <span className="calculate__inputs__group__result__place__title">
                  Valor a ser colocado
                </span>
                <span>R$ 52,00</span>
              </div> */}
              <div className="calculate__inputs__group__result__return">
                <span className="calculate__inputs__group__result__return__title">
                  Retorno
                </span>
                <span className={`c-${theme}-1`}>
                  {formatValue(value1 * odd1)}
                </span>
              </div>
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
            <div className="calculate__inputs__group__result">
              <div className="calculate__inputs__group__result__place">
                <span className="calculate__inputs__group__result__place__title">
                  Valor a ser colocado
                </span>
                <span
                  className={`calculate__inputs__group__result__place__value`}
                >
                  {formatValue(value2)}
                </span>
              </div>
              <div className="calculate__inputs__group__result__return">
                <span className="calculate__inputs__group__result__return__title">
                  Retorno
                </span>
                <span className={`c-${theme}-1`}>
                  {formatValue(value2 * odd2)}
                </span>
              </div>
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
              <div className="calculate__inputs__group__result">
                <div className="calculate__inputs__group__result__place">
                  <span className="calculate__inputs__group__result__place__title">
                    Valor a ser colocado
                  </span>
                  <span
                    className={`calculate__inputs__group__result__place__value`}
                  >
                    {formatValue(value3)}
                  </span>
                </div>
                <div className="calculate__inputs__group__result__return">
                  <span className="calculate__inputs__group__result__return__title">
                    Retorno
                  </span>
                  <span className={`c-${theme}-1`}>
                    {formatValue(value3 * odd3)}
                  </span>
                </div>
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
            <div className="calculate__inputs__details__place">
              <span
                className={`calculate__inputs__details__place__title c-${theme}`}
              >
                <Icon
                  icon="dashicons:money-alt"
                  className="calculate__inputs__details__place__title__icon"
                />
                Valor Total Apostado
              </span>
              <span
                className={`calculate__inputs__details__place__value c-${theme}-1`}
              >
                {formatValue(totalTip)}
              </span>
            </div>
            <div className="calculate__inputs__details__return">
              <span
                className={`calculate__inputs__details__return__title c-${theme}`}
              >
                <Icon
                  icon="bx:rotate-left"
                  className="calculate__inputs__details__place__title__icon"
                />
                Retorno
              </span>
              <span
                className={`calculate__inputs__details__return__value  c-${theme}-1`}
              >
                {formatValue(returnTip)}
              </span>
            </div>
            <div className={`calculate__inputs__details__profit bg-${theme}`}>
              {/* <span
                className={`calculate__inputs__details__profit__title c-${theme}`}
              >
                <Icon
                  icon="material-symbols:play-arrow-rounded"
                  rotate={3}
                  className="calculate__inputs__details__place__title__icon"
                />
                Lucro
              </span> */}
              <span
                className={`calculate__inputs__details__profit__value c-${theme}-2`}
              >
                {formatValue(returnTip - totalTip)}
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Calculate;
