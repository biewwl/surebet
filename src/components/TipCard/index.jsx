import { Icon } from "@iconify/react/dist/iconify.js";
import { formatValue } from "../../utils/formatNumber";
import { getLogo } from "../../utils/getLogo";
import { formatDate } from "../../utils/formatDate";
import { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { deleteResult } from "../../api/delete";
import Loading from "../Loading";
import { postWin } from "../../api/post";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import "./styles/TipCard.css";

function TipCard({ data, view }) {
  const dataView = {};

  const { pathname } = useLocation();

  const { updateData, script, sheet } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);

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
    option3: { value: option3 },
    odd1: { value: odd1 },
    odd2: { value: odd2 },
    odd3: { value: odd3 },
    description: { value: description },
    price1: { value: price1 },
    price2: { value: price2 },
    price3: { value: price3 },
    win: { value: win },
    profit: { value: profit },
    date: { value: date },
  } = view ? dataView : data;

  const [bet1, opt1] = option1.split(" | ");
  const [bet2, opt2] = option2.split(" | ");
  const [bet3, opt3] = option3.split(" | ");

  const logo1 = getLogo(bet1);
  const logo2 = getLogo(bet2);
  const logo3 = getLogo(bet3);

  const image1 = logo1 ? logo1.logo : "";
  const image2 = logo2 ? logo2.logo : "";
  const image3 = logo3 ? logo3.logo : "";

  const site1 = logo1 ? logo1.site : "";
  const site2 = logo2 ? logo2.site : "";
  const site3 = logo3 ? logo3.site : "";

  const pending = !win;
  const bingo = win === 12;

  const result1 = odd1 * price1;
  const result2 = odd2 * price2;
  const result = bingo ? result1 + result2 : win === 1 ? result1 : result2;

  const draw =
    Number(result).toFixed(2) === (price1 + price2).toFixed(2) && !bingo;

  const winner = (w) => (win === w || pending || bingo ? "" : " --lose");

  const lose = !pending && profit < 0;

  const pendingC = pending ? " --pending" : "";
  const drawC = draw && !pending ? " --draw" : "";
  const bingoC = bingo && !pending ? " --bingo" : "";
  const loseC = lose ? " --lose" : "";

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
    if (openWin && odd2) return "Qual odd vencedora?";
    if (openWin) return "Qual o resultado?";
    return "O que deseja fazer?";
  };

  const handleBack = () => {
    setOpenDelete(false);
    setOpenWin(false);
    setOptWin("");
  };

  const selectedWin = (w) => {
    if (optWin === w && w === 12) return ` --selected --bingo c-${theme}-2`;
    if (optWin === w) return ` --selected c-${theme}-2`;
    return `c-${theme}`;
  };

  const handleEdit = async () => {
    const [, line] = cel.match(/([a-zA-Z]+)([0-9]+)/).slice(1, 3);
    setLoading(true);
    await postWin(script, optWin, line, sheet);
    setLoading(false);
    updateData();
  };

  const profitText = lose ? String(profit).split("-")[1] : profit;

  return (
    <div
      className={`tip-card content${pendingC}${drawC}${bingoC}${loseC} c-${theme}`}
      // style={{width}}
    >
      <span className="tip-card__date">
        <Icon icon="lets-icons:date-today-duotone" />
        <span className="tip-card__date__text">{formatDate(date)}</span>
        {pathname !== "/create" && (
          <button
            className={`tip-card__date__options c-${theme}`}
            onClick={handleOpenOptions}
          >
            <Icon icon="mi:options-horizontal" />
          </button>
        )}
      </span>
      <span className="tip-card__description">{description}</span>
      <section
        className="tip-card__tip"
        style={{ gridTemplateAreas: "'area1''area2''area3'" }}
      >
        <div className={`tip-card__tip__odd${winner(1)}`}>
          <Link to={site1} target="_blank" className="tip-card__tip__odd__link">
            <img src={image1} alt="" className="tip-card__tip__odd__logo" />
          </Link>
          <div className="tip-card__tip__odd__info">
            <span>{opt1}</span>
            <div className="separator"></div>
            <span>{odd1.toFixed(2)}</span>
          </div>
          {formatValue(price1)}
          <div className={`tip-card__tip__odd__line bg-${theme}-invert`}></div>
        </div>
        {bet2 && (
          <div className={`tip-card__tip__odd${winner(2)}`}>
            <Link to={site2} target="_blank" className="tip-card__tip__odd__link">
              <img src={image2} alt="" className="tip-card__tip__odd__logo" />
            </Link>
            <div className="tip-card__tip__odd__info">
              <span>{opt2}</span>
              <div className="separator"></div>
              <span>{odd2.toFixed(2)}</span>
            </div>
            {formatValue(price2)}
            <div
              className={`tip-card__tip__odd__line bg-${theme}-invert`}
            ></div>
          </div>
        )}
        {bet3 && (
          <div className={`tip-card__tip__odd${winner(3)}`}>
            <Link to={site3} target="_blank" className="tip-card__tip__odd__link">
              <img src={image3} alt="" className="tip-card__tip__odd__logo" />
            </Link>
            <div className="tip-card__tip__odd__info">
              <span>{opt3}</span>
              <div className="separator"></div>
              <span>{odd3.toFixed(2)}</span>
            </div>
            {formatValue(price3)}
            <div
              className={`tip-card__tip__odd__line bg-${theme}-invert`}
            ></div>
          </div>
        )}
      </section>
      <div className="tip-card__tip__profit">
        <ul className="tip-card__tip__profit__details">
          <li className="tip-card__tip__profit__details__item">
            Valor Total Apostado:{" "}
            <span
              className={`tip-card__tip__profit__details__item__value c-${theme}-1`}
            >
              {formatValue(price1 + price2 + price3)}
            </span>
          </li>
          <li className="tip-card__tip__profit__details__item">
            Retorno:{" "}
            <span
              className={`tip-card__tip__profit__details__item__value c-${theme}-1`}
            >
              {!pending && formatValue(result)}
              {pending && "R$ 0,00"}
            </span>
          </li>
        </ul>
      </div>
      <span className={`tip-card__tip__result c-${theme}-2`}>
        {!pending && draw && (
          <>
            <Icon icon="oui:token-null" /> Anulado!
          </>
        )}
        {!pending && !draw && (
          <>
            {!lose && <Icon icon="heroicons-outline:plus-sm" />}
            {lose && <Icon icon="heroicons-outline:minus-sm" />}
            {formatValue(profitText)}
          </>
        )}
        {pending && <Icon icon="eos-icons:loading" />}
      </span>
      {(options || loading) && (
        <div className={`tip-card__options bg-${theme}-2`}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <p className="tip-card__options__title">{titleMenu()}</p>
              {/* {!openDelete && (
              <button className="tip-card__options__option --edit">Editar</button>
            )} */}
              {!openDelete && openWin && (
                <div
                  className={`tip-card__options__option-2${
                    bet2 ? "" : " --super"
                  }`}
                  style={{
                    gridTemplateColumns: bet2 ? "repeat(3, 1fr)" : "1fr 1fr",
                  }}
                >
                  <button
                    className={`tip-card__options__option-2__item bg-${theme} ${selectedWin(
                      1
                    )}`}
                    onClick={() => setOptWin(1)}
                  >
                    {bet2 ? "1" : "Ganha"}
                  </button>
                  {bet2 && !bet3 && (
                    <button
                      className={`tip-card__options__option-2__item bg-${theme} ${selectedWin(
                        12
                      )}`}
                      onClick={() => setOptWin(12)}
                    >
                      x
                    </button>
                  )}
                  <button
                    className={`tip-card__options__option-2__item bg-${theme} ${selectedWin(
                      2
                    )}`}
                    onClick={() => setOptWin(2)}
                  >
                    {bet2 ? "2" : "Perda"}
                  </button>
                  {bet3 && (
                    <button
                      className={`tip-card__options__option-2__item bg-${theme} ${selectedWin(
                        3
                      )}`}
                      onClick={() => setOptWin(3)}
                    >
                      3
                    </button>
                  )}
                </div>
              )}
              {!openDelete && !win && (
                <button
                  className={`tip-card__options__option --win bg-${theme} c-${theme}`}
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
                className={`tip-card__options__option bg-${theme} c-${theme} --cancel`}
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
