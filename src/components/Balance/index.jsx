import { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { formatValue } from "../../utils/formatNumber";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ThemeContext } from "../../context/ThemeContext";
import SectionTitle from "../SectionTitle";
import { postNormals, postOutflows } from "../../api/post";
import "./styles/Balance.css";
import Loading from "../Loading";

function Balance() {
  const { balance, updateData, script, sheet } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);

  const [openManage, setOpenManage] = useState(false);
  const [openOutflowsManage, setOpenOutflowsManage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputNormals, setInputNormals] = useState("");
  const [inputOutflows, setInputOutflows] = useState("");

  const [initial, normals, current, profit, outflows, operations] = balance;

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

  const handleAddOutflows = async (e) => {
    e.preventDefault();
    setLoading(true);
    const valueSum = outflows[0].value + Number(inputOutflows);
    await postOutflows(script, valueSum, sheet);
    updateData();
    // setLoading(false);
  };

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
              {formatValue(profit[0].value)}
            </div>
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
            <div className="balance__card content">
              <span className={`balance__card__title c-${theme}-1`}>
                <Icon
                  icon="ph:piggy-bank-duotone"
                  className="balance__card__title__icon"
                />
                Saldo Atual
              </span>
              {formatValue(current[0].value)}
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
