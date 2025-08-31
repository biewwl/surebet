import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { formatValue } from "../../utils/formatNumber";
import { Icon } from "@iconify/react/dist/iconify.js";
import Logo from "../../components/Logo";
import SectionTitle from "../../components/SectionTitle";
import "./styles/Calculate.css";
import React from "react";

const sanitizeValue = (value) =>
  value.replace(/[^0-9.,]/g, "").replace(/,/g, ".");

function Calculate({ fake }) {
  const { theme } = useContext(ThemeContext);

  const [stakeInput, setStakeInput] = useState("");
  const [totalInput, setTotalInput] = useState("");
  const [oddsData, setOddsData] = useState([
    { value: "", isFreeBet: false },
    { value: "", isFreeBet: false },
  ]);

  // ===== CÁLCULOS =====
  const stake1 = Number(sanitizeValue(stakeInput)) || 0;
  const baseOdd = oddsData[0]?.value;
  const baseReturn =
    stake1 === 0 || baseOdd === ""
      ? 0
      : oddsData[0].isFreeBet
      ? stake1 * (Number(baseOdd) - 1)
      : stake1 * Number(baseOdd);

  const calculatedOdds = oddsData.map((odd, index) => {
    const oddVal = Number(sanitizeValue(odd.value));
    let stake = 0,
      ret = 0;

    if (index === 0) {
      stake = stake1;
      ret =
        stake === 0 || odd.value === ""
          ? 0
          : odd.isFreeBet
          ? stake * (oddVal - 1)
          : stake * oddVal;
    } else {
      stake =
        odd.value === "" || baseReturn === 0
          ? 0
          : odd.isFreeBet
          ? baseReturn / (oddVal - 1)
          : baseReturn / oddVal;
      ret =
        stake === 0 || odd.value === ""
          ? 0
          : odd.isFreeBet
          ? stake * (oddVal - 1)
          : stake * oddVal;
    }

    return {
      ...odd,
      stake,
      return: ret,
      cost: odd.isFreeBet ? 0 : stake,
    };
  });

  const totalCost = calculatedOdds.reduce((sum, o) => sum + o.cost, 0);
  const profit = baseReturn - totalCost;
  const arbitrage =
    totalCost === 0 ? 0 : ((profit / totalCost) * 100).toFixed(2);

  const profitClass = () => {
    if (profit > 0) return " --win";
    if (profit < 0) return " --loss";
    return "";
  };

  // ===== HANDLERS =====
  const handleStakeChange = (e) => setStakeInput(sanitizeValue(e.target.value));

  const handleTotalChange = (e) => {
    const val = sanitizeValue(e.target.value);
    setTotalInput(val);

    const baseF1 =
      baseOdd === ""
        ? 0
        : oddsData[0].isFreeBet
        ? Number(baseOdd) - 1
        : Number(baseOdd);

    const totalFactor = oddsData.reduce((acc, odd, i) => {
      if (i === 0) return acc + (odd.isFreeBet ? 0 : 1);
      const v = Number(sanitizeValue(odd.value));
      if (odd.value === "") return acc;
      const factor = odd.isFreeBet ? baseF1 / (v - 1) : baseF1 / v;
      return acc + factor;
    }, 0);

    if (totalFactor > 0) {
      setStakeInput((Number(val) / totalFactor).toFixed(2));
    }
  };

  const handleOddChange = (i, v) => {
    const clone = [...oddsData];
    clone[i].value = sanitizeValue(v);
    setOddsData(clone);
  };

  const toggleFreeBet = (i) => {
    const clone = [...oddsData];
    clone[i].isFreeBet = !clone[i].isFreeBet;
    setOddsData(clone);
  };

  const addOdd = () =>
    setOddsData((old) => [...old, { value: "", isFreeBet: false }]);

  const removeOdd = (i) =>
    setOddsData((old) => old.filter((_, idx) => idx !== i));

  // ===== RENDER =====
  return (
    <main className={`calculate${profitClass()} c-${theme}-1`}>
      <Logo />
      <section className="calculate__section">
        <SectionTitle icon="fluent:math-symbols-20-filled" title="Calcular" />
        {fake ? (
          <div className={`c-${theme} war`}>
            😅 Fizemos mudanças e agora este é um recurso pago.
          </div>
        ) : (
          <>
            <div className="calculate__inputs">
              {calculatedOdds.map((odd, i) => (
                <div
                  key={i}
                  className={`calculate__inputs__group content${
                    odd.isFreeBet ? " --freebet" : ""
                  }`}
                >
                  {i === 0 ? (
                    <>
                      {["Odd 1", "Stake"].map((label, j) => (
                        <React.Fragment key={label}>
                          <label className="calculate__inputs__group__label">
                            <span className="calculate__inputs__group__label__title">
                              {label}
                            </span>
                            <input
                              type="text"
                              name={label}
                              value={
                                label === "Stake"
                                  ? "R$ " + stakeInput
                                  : odd.value
                              }
                              onChange={
                                label === "Stake"
                                  ? handleStakeChange
                                  : (e) => handleOddChange(0, e.target.value)
                              }
                              className={`calculate__inputs__group__label__input bg-${theme} c-${theme} ${
                                label === "Stake" ? " --stake" : ""
                              }`}
                            />
                          </label>
                          {j === 0 ? (
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
                        </React.Fragment>
                      ))}
                      <div className="calculate__inputs__group__label">
                        <span className="calculate__inputs__group__result__return__title">
                          Retorno
                        </span>
                        <span
                          className={`calculate__inputs__group__label__input c-${theme} --return`}
                        >
                          {formatValue(odd.return)}
                        </span>
                      </div>
                      <div className="calculate__inputs__freebet">
                        <label
                          className={`calculate__inputs__freebet__label bg-${theme}`}
                        >
                          <input
                            type="checkbox"
                            checked={odd.isFreeBet}
                            onChange={() => toggleFreeBet(0)}
                            className="calculate__inputs__freebet__label__input"
                          />
                          <Icon icon="fa6-solid:arrows-rotate" />
                          {odd.isFreeBet ? "Saldo Real" : "Free Bet"}
                        </label>
                      </div>
                    </>
                  ) : (
                    <>
                      <label className="calculate__inputs__group__label">
                        <span className="calculate__inputs__group__label__title">
                          Odd {i + 1}
                        </span>
                        <input
                          type="text"
                          value={odd.value}
                          onChange={(e) => handleOddChange(i, e.target.value)}
                          className={`calculate__inputs__group__label__input bg-${theme} c-${theme}`}
                        />
                      </label>
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
                        <span className="calculate__inputs__group__label__input --stake">
                          {formatValue(odd.stake)}
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
                          {formatValue(odd.return)}
                        </span>
                      </div>
                      <div className="calculate__inputs__freebet">
                        <label
                          className={`calculate__inputs__freebet__label bg-${theme}`}
                        >
                          <input
                            type="checkbox"
                            checked={odd.isFreeBet}
                            onChange={() => toggleFreeBet(i)}
                            className="calculate__inputs__freebet__label__input"
                          />
                          <Icon icon="fa6-solid:arrows-rotate" />
                          {odd.isFreeBet ? "Saldo Real" : "Free Bet"}
                        </label>
                      </div>
                      {i !== 1 && (
                        <button
                          onClick={() => removeOdd(i)}
                          className={`calculate__inputs__group__close-odd3 c-${theme}-2`}
                        >
                          <Icon
                            icon="bx:bx-x"
                            className="calculate__inputs__group__label__input__icon"
                          />
                        </button>
                      )}
                    </>
                  )}
                </div>
              ))}
              <button
                className={`calculate__inputs__add-btn c-${theme}`}
                onClick={addOdd}
              >
                <Icon
                  className={`calculate__inputs__add-btn__icon bg-${theme}-2`}
                  icon="line-md:plus"
                />
              </button>
            </div>
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
                    totalCost === 0 ? `bg-${theme}-2` : `bg-${theme}`
                  } c-${theme}`}
                  value={
                    totalCost === 0 ? "R$ 0,00" : `R$ ${totalCost.toFixed(2)}`
                  }
                  onChange={handleTotalChange}
                  name="total"
                  disabled={totalCost === 0}
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
                  className={`calculate__inputs__group__label__input c-${theme}`}
                >
                  {formatValue(baseReturn)}
                </span>
              </div>
              <div className="calculate__inputs__group__label">
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
                  className={`calculate__inputs__group__label__input c-${theme}`}
                >
                  {arbitrage}%
                </span>
              </div>
              <div className="calculate__inputs__group__label">
                <span
                  className={`calculate__inputs__details__return__title c-${theme}-1`}
                >
                  <Icon
                    icon="material-symbols:money-bag-outline-rounded"
                    className="calculate__inputs__details__place__title__icon"
                  />
                  Lucro
                </span>
                <span className="calculate__inputs__group__label__input --profit">
                  {formatValue(profit)}
                </span>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default Calculate;
