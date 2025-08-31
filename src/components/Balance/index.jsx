import { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { formatValue } from "../../utils/formatNumber";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ThemeContext } from "../../context/ThemeContext";
import SectionTitle from "../SectionTitle";
import { postNormals, postOutflows } from "../../api/post";
import Loading from "../Loading";
import { countDays } from "../../utils/countDays";
import "./styles/Balance.css";
// import { useNavigate } from "react-router-dom";

function Balance() {
  const { balance, updateData, script, sheet, results, pending1Sum } =
    useContext(DataContext);
  const { theme } = useContext(ThemeContext);

  const [openManage, setOpenManage] = useState(false);
  const [openOutflowsManage, setOpenOutflowsManage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputNormals, setInputNormals] = useState("");
  const [inputOutflows, setInputOutflows] = useState("");

  const pending = results.filter((r) => {
    const w = r[r.length - 3];
    return !w.value;
  }).length;

  countDays(results);

  const [initial, normals, current, profit, outflows, operations, meta] =
    balance;

  // const realProfit = profit[0].value + normals[0].value;

  const handleOpenManage = (opt) => {
    setInputNormals("");
    setInputOutflows("");
    if (opt === "normals") {
      setOpenManage(!openManage);
    } else if (opt === "outflows") {
      setOpenOutflowsManage(!openOutflowsManage);
    }
  };

  const handleChange = ({ target }, opt) => {
    let value = target.value.replace(",", "."); // Substitui vírgulas por pontos
    if (!isNaN(value) || value === "." || value === "-") {
      if (opt === "normals") {
        setInputNormals(value);
      } else if (opt === "outflows") {
        setInputOutflows(value);
      }
    }
  };

  const handleAddNormal = async (e) => {
    e.preventDefault();
    setLoading(true);
    const valueSum = normals[0].value + Number(inputNormals);
    await postNormals(script, valueSum, sheet);
    updateData();
    // setLoading(false);
  };

  const [days, time] = countDays(results);

  const handleAddOutflows = async (e) => {
    e.preventDefault();
    setLoading(true);
    const valueSum = outflows[0].value + Number(inputOutflows);
    await postOutflows(script, valueSum, sheet);
    updateData();
    // setLoading(false);
  };

  const metaClass = () => {
    if (current[0].value >= meta[0].value) {
      return " --done";
    } else if (current[0].value < meta[0].value) {
      return " --pending";
    }
  };

  const metaValue = () => {
    if (meta[0].value - current[0].value < 0) {
      return formatValue((meta[0].value - current[0].value) * -1);
    }
    return formatValue(meta[0].value - current[0].value);
  };

  const calculatePercentage = (n, m) => {
    if (m === 0) return 0; // Evita divisão por zero
    return Math.min((n / m) * 100, 100); // Garante que o resultado não exceda 100%
  };

  const freebetCount = results.filter((r) => r[12].value).length;

  // const navigate = useNavigate();

  // const navigateToCalculate = () => {
  //   navigate("/monetizze-calculate");
  // };

  return (
    <>
      <section className={`balance c-${theme}`}>
        {balance.length > 0 && (
          <>
            <div className="balance__card content">
              <span className={`balance__card__title c-${theme}-1`}>
                <Icon
                  icon="icon-park-twotone:up-one"
                  className="balance__card__title__icon"
                />
                Lucro
              </span>
              {formatValue(profit[0].value + normals[0].value)}
            </div>
            <div className="balance__card content --meta">
              <span className={`balance__card__title c-${theme}-1`}>
                <Icon
                  icon="ph:piggy-bank-duotone"
                  className="balance__card__title__icon"
                />
                Saldo Atual
              </span>
              <p className="balance__card__detail">
                <span>{formatValue(current[0].value)}</span>
                <span className="balance__card__detail__text">
                  * {formatValue(current[0].value + pending1Sum)}
                </span>
              </p>
              {/* {formatValue(current[0].value)} */}
            </div>
            {meta && (
              <div
                className="balance__card content --meta"
                // onDoubleClick={navigateToCalculate}
              >
                <div
                  className={`balance__card__progress ${metaClass()}`}
                  style={{
                    width: `${calculatePercentage(
                      current[0].value,
                      meta[0].value
                    )}%`,
                  }}
                ></div>
                <span className={`balance__card__title c-${theme}-1`}>
                  <Icon
                    icon="mdi:target"
                    className="balance__card__title__icon"
                  />
                  Meta
                </span>
                <p className="balance__card__detail">
                  <span className={metaClass()}>{metaValue()}</span>
                  <span className="balance__card__detail__text">
                    de {formatValue(meta[0].value)}
                  </span>
                </p>
              </div>
            )}
            <div className="balance__card content">
              <span className={`balance__card__title c-${theme}-1`}>
                <Icon
                  icon="ph:flag-duotone"
                  className="balance__card__title__icon"
                />
                Saldo Inicial
              </span>
              {formatValue(initial[0].value)}
            </div>
            <div
              className="balance__card --other content"
              onClick={() => handleOpenManage("normals")}
            >
              <span className={`balance__card__title c-${theme}-1`}>
                <Icon
                  icon="mdi:casino-chip"
                  className="balance__card__title__icon"
                />
                Outros Ganhos
              </span>
              {formatValue(normals[0].value)}
            </div>
            <div
              className="balance__card --outflows content"
              onClick={() => handleOpenManage("outflows")}
            >
              <span className={`balance__card__title c-${theme}-1`}>
                <Icon
                  icon="solar:cash-out-line-duotone"
                  className="balance__card__title__icon"
                />
                Saídas
              </span>
              {outflows[0].value > 0 && "- "}
              {formatValue(outflows[0].value)}
            </div>
            <div className="balance__card content">
              <span className={`balance__card__title c-${theme}-1`}>
                <Icon
                  icon="material-symbols:counter-0-outline"
                  className="balance__card__title__icon"
                />
                Operações
              </span>
              {operations[0].value}
            </div>
            <div className="balance__card content">
              <span className={`balance__card__title c-${theme}-1`}>
                <Icon
                  icon="stash:calendar-duotone"
                  className="balance__card__title__icon"
                />
                Dias
              </span>
              <p className="balance__card__detail">
                {days}
                <span className="balance__card__detail__text">{time}</span>
              </p>
            </div>
            <div className="balance__card content">
              <span className={`balance__card__title c-${theme}-1`}>
                <Icon
                  icon="carbon:chart-median"
                  className="balance__card__title__icon"
                />
                Média
              </span>
              <p className="balance__card__detail">
                {formatValue((profit[0].value / days).toFixed(2))}
                <span className="balance__card__detail__text">(dia)</span>
              </p>
            </div>
            <div className="balance__card content">
              <span className={`balance__card__title c-${theme}-1`}>
                <Icon
                  icon="eos-icons:loading"
                  className="balance__card__title__icon"
                />
                Pendentes
              </span>
              {pending}
            </div>
            <div className="balance__card content">
              <span className={`balance__card__title c-${theme}-1`}>
                <Icon
                  icon="tabler:gift-filled"
                  className="balance__card__title__icon"
                />
                Apostas Grátis
              </span>
              {freebetCount}
            </div>
          </>
        )}
      </section>
      {openManage && (
        <form className="manage-balance" onSubmit={handleAddNormal}>
          {loading ? (
            <Loading />
          ) : (
            <div className="manage-balance__content content" type="button">
              <button
                className="manage-balance__content__close content"
                onClick={() => handleOpenManage("normals")}
              >
                <Icon icon="line-md:close" />
              </button>
              <SectionTitle
                icon="mdi:casino-chip"
                title="Gerenciar Outros Ganhos"
              />
              <div className={`manage-balance__content__form c-${theme}`}>
                <label
                  htmlFor="other"
                  className="manage-balance__content__form__label"
                >
                  <span className="manage-balance__content__form__label__text">
                    O valor atual é {formatValue(normals[0].value)}.
                  </span>
                  <Icon icon="ic:round-plus" width="20" height="20" />
                  <input
                    type="text"
                    name="other"
                    id="other"
                    className={`manage-balance__content__form__label__input bg-${theme} c-${theme}`}
                    placeholder="R$"
                    value={inputNormals}
                    onChange={(e) => handleChange(e, "normals")}
                  />
                </label>
                <button
                  className="manage-balance__content__form__button"
                  type="submit"
                >
                  Adicionar Ganho
                </button>
              </div>
            </div>
          )}
        </form>
      )}
      {openOutflowsManage && (
        <form className="manage-balance" onSubmit={handleAddOutflows}>
          {loading ? (
            <Loading />
          ) : (
            <div className="manage-balance__content content">
              <button
                className="manage-balance__content__close content"
                type="button"
                onClick={() => handleOpenManage("outflows")}
              >
                <Icon icon="line-md:close" />
              </button>
              <SectionTitle
                icon="solar:cash-out-line-duotone"
                title="Gerenciar Saídas"
              />
              <div className={`manage-balance__content__form c-${theme}`}>
                <label
                  htmlFor="other"
                  className="manage-balance__content__form__label"
                >
                  <span className="manage-balance__content__form__label__text">
                    O valor atual é {formatValue(outflows[0].value)}.
                  </span>
                  <Icon icon="ic:round-plus" width="20" height="20" />
                  <input
                    type="text"
                    name="other"
                    id="other"
                    className={`manage-balance__content__form__label__input bg-${theme} c-${theme}`}
                    placeholder="R$"
                    value={inputOutflows}
                    onChange={(e) => handleChange(e, "outflows")}
                  />
                </label>
                <button
                  className="manage-balance__content__form__button"
                  type="submit"
                >
                  Adicionar Saída
                </button>
              </div>
            </div>
          )}
        </form>
      )}
    </>
  );
}

export default Balance;
