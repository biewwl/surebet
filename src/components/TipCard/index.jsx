import { Icon } from "@iconify/react/dist/iconify.js";
import { formatValue } from "../../utils/formatNumber";
import { getLogo } from "../../utils/getLogo";
import { formatDate } from "../../utils/formatDate";
import { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { deleteResult } from "../../api/delete";
import Loading from "../Loading";
import { postWin } from "../../api/post";
import "./styles/TipCard.css";
import { useLocation } from "react-router-dom";

function TipCard({ data, view }) {
  const dataView = {};

  const { pathname } = useLocation();

  const { updateData, script } = useContext(DataContext);

  const [options, setOptions] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openWin, setOpenWin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [optWin, setOptWin] = useState("");

  Object.entries(data).forEach(([name, value]) => {
    dataView[name] = { value };
  });

  const {
    option1: { value: option1, cel },
    option2: { value: option2 },
    odd1: { value: odd1 },
    odd2: { value: odd2 },
    description: { value: description },
    price1: { value: price1 },
    price2: { value: price2 },
    win: { value: win },
    profit: { value: profit },
    date: { value: date },
  } = view ? dataView : data;

  const image1 = getLogo(option1);
  const image2 = getLogo(option2);

  const [, opt1] = option1.split("| ");
  const [, opt2] = option2.split("| ");

  const pending = !win;
  const bingo = win === 12;

  const result1 = odd1 * price1;
  const result2 = odd2 * price2;
  const result = bingo ? result1 + result2 : win === 1 ? result1 : result2;

  const draw =
    Number(result).toFixed(2) === (price1 + price2).toFixed(2) && !bingo;

  const winner = (w) => (win === w || pending || bingo ? "" : " --lose");

  const pendingC = pending ? " --pending" : "";
  const drawC = draw && !pending ? " --draw" : "";
  const bingoC = bingo && !pending ? " --bingo" : "";

  const handleOpenOptions = () => {
    setOptions(!options);
  };

  const handleOpenDelete = () => {
    setOpenDelete(!openDelete);
  };

  const handleConfirmDelete = async () => {
    const [, line] = cel.match(/([a-zA-Z]+)([0-9]+)/).slice(1, 3);
    setLoading(true);
    await deleteResult(script, line);
    setLoading(false);
    updateData();
  };

  const handleOpenWin = async () => {
    setOpenWin(!openWin);
  };

  const titleMenu = () => {
    if (openDelete) return "Confirmar exclusão";
    if (openWin) return "Qual odd vencedora?";
    return "O que deseja fazer?";
  };

  const handleBack = () => {
    setOpenDelete(false);
    setOpenWin(false);
    setOptWin("");
  };

  const selectedWin = (w) => {
    if (optWin === w && w === 12) return " --selected --bingo";
    if (optWin === w) return " --selected";
    return "";
  };

  const handleEdit = async () => {
    const [, line] = cel.match(/([a-zA-Z]+)([0-9]+)/).slice(1, 3);
    setLoading(true);
    await postWin(script, optWin, line);
    setLoading(false);
    updateData();
  };

  return (
    <div
      className={`tip-card content${pendingC}${drawC}${bingoC}`}
      // style={{width}}
    >
      <span className="tip-card__date">
        <Icon icon="lets-icons:date-today-duotone" />
        <span className="tip-card__date__text">{formatDate(date)}</span>
        {pathname !== "/create" && (
          <button
            className="tip-card__date__options"
            onClick={handleOpenOptions}
          >
            <Icon icon="mi:options-horizontal" />
          </button>
        )}
      </span>
      <span className="tip-card__description">{description}</span>
      <section className="tip-card__tip">
        <div className={`tip-card__tip__odd${winner(1)}`}>
          <img src={image1} alt="" className="tip-card__tip__odd__logo" />
          <div className="tip-card__tip__odd__info">
            <span>{opt1}</span>
            <div className="separator"></div>
            <span>{odd1}</span>
          </div>
          {formatValue(price1)}
        </div>
        {(opt2 && opt2 !== "0") && (
          <div className={`tip-card__tip__odd${winner(2)}`}>
            <img src={image2} alt="" className="tip-card__tip__odd__logo" />
            <div className="tip-card__tip__odd__info">
              <span>{opt2}</span>
              <div className="separator"></div>
              <span>{odd2}</span>
            </div>
            {formatValue(price2)}
          </div>
        )}
      </section>
      <div className="tip-card__tip__profit">
        <ul className="tip-card__tip__profit__details">
          <li className="tip-card__tip__profit__details__item">
            Valor Total Apostado:{" "}
            <span className="tip-card__tip__profit__details__item__value">
              {formatValue(price1 + price2)}
            </span>
          </li>
          <li className="tip-card__tip__profit__details__item">
            Retorno:{" "}
            <span className="tip-card__tip__profit__details__item__value">
              {!pending && formatValue(result)}
              {pending && "R$ 0,00"}
            </span>
          </li>
        </ul>
      </div>
      <span className="tip-card__tip__result">
        {!pending && draw && (
          <>
            <Icon icon="oui:token-null" /> Anulado!
          </>
        )}
        {!pending && !draw && (
          <>
            <Icon icon="heroicons-outline:plus-sm" /> {formatValue(profit)}
          </>
        )}
        {pending && <Icon icon="eos-icons:loading" />}
      </span>
      {(options || loading) && (
        <div className="tip-card__options">
          {loading ? (
            <Loading />
          ) : (
            <>
              <p className="tip-card__options__title">{titleMenu()}</p>
              {/* {!openDelete && (
              <button className="tip-card__options__option --edit">Editar</button>
            )} */}
              {!openDelete && openWin && (
                <div className="tip-card__options__option-2">
                  <button
                    className={`tip-card__options__option-2__item${selectedWin(
                      1
                    )}`}
                    onClick={() => setOptWin(1)}
                  >
                    1
                  </button>
                  <button
                    className={`tip-card__options__option-2__item${selectedWin(
                      12
                    )}`}
                    onClick={() => setOptWin(12)}
                  >
                    x
                  </button>
                  <button
                    className={`tip-card__options__option-2__item${selectedWin(
                      2
                    )}`}
                    onClick={() => setOptWin(2)}
                  >
                    2
                  </button>
                </div>
              )}
              {!openDelete && !win && (
                <button
                  className="tip-card__options__option --win"
                  onClick={openWin ? handleEdit : handleOpenWin}
                  disabled={openWin ? !optWin : false}
                >
                  {openWin ? "Confirmar" : "Definir Ganhador"}
                </button>
              )}
              {!openWin && (
                <button
                  className="tip-card__options__option --delete"
                  onClick={openDelete ? handleConfirmDelete : handleOpenDelete}
                >
                  {openDelete ? "Confirmar exclusão" : "Excluir"}
                </button>
              )}
              <button
                className="tip-card__options__option --cancel"
                onClick={openDelete || openWin ? handleBack : handleOpenOptions}
              >
                {openDelete || openWin ? (
                  <Icon icon="iconamoon:arrow-up-2-duotone" rotate={3} />
                ) : (
                  <Icon icon="line-md:close" />
                )}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default TipCard;
