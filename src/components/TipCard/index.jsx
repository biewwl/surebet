import { Icon } from "@iconify/react/dist/iconify.js";
import { formatValue } from "../../utils/formatNumber";
import { getLogo } from "../../utils/getLogo";
import { formatDate } from "../../utils/formatDate";
import { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { deleteResult } from "../../api/delete";
import Loading from "../Loading";
import { postWin } from "../../api/post";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import "./styles/TipCard.css";
import { downloadCard } from "../../utils/downloadCard";
import { EditContext } from "../../context/EditContext";
import { formatDataWithCol } from "../../utils/manageData";

function TipCard({ data, view, i }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { updateData, script, sheet } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);
  const { createEdit } = useContext(EditContext);

  const [options, setOptions] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openWin, setOpenWin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [optWin, setOptWin] = useState("");

  const {
    option1,
    option2,
    option3,
    odd1,
    odd2,
    odd3,
    description,
    price1,
    price2,
    price3,
    win,
    profit,
    date,
    cel = "a0"
  } = view ? data : formatDataWithCol(data);

  const opt1Splitted = option1.split(" | ");
  const opt2Splitted = option2.split(" | ");
  const opt3Splitted = option3.split(" | ");

  const opt1 = opt1Splitted[opt1Splitted.length - 1];
  const opt2 = opt2Splitted[opt2Splitted.length - 1];
  const opt3 = opt3Splitted[opt3Splitted.length - 1];

  const bet1 = opt1Splitted[0];
  const bet2 = opt2Splitted[0];
  const bet3 = opt3Splitted[0];

  const logo1 = getLogo(bet1);
  const logo2 = getLogo(bet2);
  const logo3 = getLogo(bet3);

  const bets1 = opt1Splitted.slice(0, opt1Splitted.length - 1);
  const bets2 = opt2Splitted.slice(0, opt2Splitted.length - 1);
  const bets3 = opt3Splitted.slice(0, opt3Splitted.length - 1);

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
  const result3 = odd3 * price3;

  let result = 0;

  switch (win) {
    case bingo:
      result = result1 + result2;
      break;
    case 1:
      result = result1;
      break;
    case 2:
      result = result2;
      break;
    case 3:
      result = result3;
      break;
    default:
      break;
  }

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

  const [, line] = cel.match(/([a-zA-Z]+)([0-9]+)/).slice(1, 3);

  const handleConfirmDelete = async () => {
    setLoading(true);
    await deleteResult(script, line, sheet);

    setLoading(false);
    updateData();
  };

  const handleEdit = () => {
    createEdit(data, line);
    navigate("/create");
  };


  const handleOpenWin = async () => {
    setOpenWin(!openWin);
  };

  const titleMenu = () => {
    if (openDelete) return "Confirmar exclusão";
    if (openWin && odd2) return description;
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

  const handleDefine = async () => {
    setLoading(true);
    await postWin(script, optWin, line, sheet);
    setLoading(false);
    updateData();
  };

  const profitText = lose ? String(profit).split("-")[1] : profit;

  const arbitrage = win
    ? ((profitText / (price1 + price2 + price3)) * 100)
        .toFixed(2)
        .replace(".", ",")
    : null;

  const download = () => {
    setOptions(false);
    downloadCard(i, description);
  };

  return (
    <div
      className={`tip-card --${i} content${pendingC}${drawC}${bingoC}${loseC} c-${theme}`}
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
          {bets1.length > 1 ? (
            <div className="tip-card__tip__odd__multiple">
              <div
                className={`tip-card__tip__odd__multiple__count bg-${theme}`}
              >
                {bets1.length}
              </div>
              {bets1.map((b) => {
                const bLogo = getLogo(b);
                const bImg = bLogo.logo;
                const bSite = bLogo.site;

                return (
                  <Link
                    to={bSite}
                    target="_blank"
                    className="tip-card__tip__odd__link"
                    key={`${b}-1`}
                  >
                    <img
                      src={bImg}
                      alt=""
                      className="tip-card__tip__odd__logo"
                    />
                  </Link>
                );
              })}
            </div>
          ) : (
            <Link
              to={site1}
              target="_blank"
              className="tip-card__tip__odd__link"
            >
              <img src={image1} alt="" className="tip-card__tip__odd__logo" />
            </Link>
          )}
          <div className="card__tip__odd__infos">
            <span>{opt1}</span>
            <div className={`card__tip__odd__infos__info c-${theme}-1`}>
              <span>{odd1.toFixed(2)}</span>
              <div className="separator"></div>
              {formatValue(price1)}
            </div>
          </div>
          {/* <div className={`tip-card__tip__odd__line bg-${theme}-invert`}></div> */}
        </div>
        {bet2 && (
          <div className={`tip-card__tip__odd${winner(2)}`}>
            {bets2.length > 1 ? (
              <div className="tip-card__tip__odd__multiple">
                <div
                  className={`tip-card__tip__odd__multiple__count bg-${theme}`}
                >
                  {bets2.length}
                </div>
                {bets2.map((b) => {
                  const bLogo = getLogo(b);
                  const bImg = bLogo.logo;
                  const bSite = bLogo.site;

                  return (
                    <Link
                      to={bSite}
                      target="_blank"
                      className="tip-card__tip__odd__link"
                      key={`${b}-2`}
                    >
                      <img
                        src={bImg}
                        alt=""
                        className="tip-card__tip__odd__logo"
                      />
                    </Link>
                  );
                })}
              </div>
            ) : (
              <Link
                to={site2}
                target="_blank"
                className="tip-card__tip__odd__link"
              >
                <img src={image2} alt="" className="tip-card__tip__odd__logo" />
              </Link>
            )}
            <div className="card__tip__odd__infos">
              <span>{opt2}</span>
              <div className={`card__tip__odd__infos__info c-${theme}-1`}>
                <span>{odd2.toFixed(2)}</span>
                <div className="separator"></div>
                {formatValue(price2)}
              </div>
            </div>
            {/* <div
              className={`tip-card__tip__odd__line bg-${theme}-invert`}
            ></div> */}
          </div>
        )}
        {bet3 && (
          <div className={`tip-card__tip__odd${winner(3)}`}>
            {bets3.length > 1 ? (
              <div className="tip-card__tip__odd__multiple">
                <div
                  className={`tip-card__tip__odd__multiple__count bg-${theme}`}
                >
                  {bets3.length}
                </div>
                {bets3.map((b) => {
                  const bLogo = getLogo(b);
                  const bImg = bLogo.logo;
                  const bSite = bLogo.site;

                  return (
                    <Link
                      to={bSite}
                      target="_blank"
                      className="tip-card__tip__odd__link"
                      key={`${b}-2`}
                    >
                      <img
                        src={bImg}
                        alt=""
                        className="tip-card__tip__odd__logo"
                      />
                    </Link>
                  );
                })}
              </div>
            ) : (
              <Link
                to={site3}
                target="_blank"
                className="tip-card__tip__odd__link"
              >
                <img src={image3} alt="" className="tip-card__tip__odd__logo" />
              </Link>
            )}
            <div className="card__tip__odd__infos">
              <span>{opt3}</span>
              <div className={`card__tip__odd__infos__info c-${theme}-1`}>
                <span>{odd3.toFixed(2)}</span>
                <div className="separator"></div>
                {formatValue(price3)}
              </div>
            </div>
            {/* <div
              className={`tip-card__tip__odd__line bg-${theme}-invert`}
            ></div> */}
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
          {arbitrage && (
            <li className="tip-card__tip__profit__details__item">
              Arbitragem:{" "}
              <span
                className={`tip-card__tip__profit__details__item__value --arbitrage`}
              >
                {lose && "-"}
                {arbitrage}%
              </span>
            </li>
          )}
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
                    {bet2 ? opt1 : "Ganha"}
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
                    {bet2 ? opt2 : "Perda"}
                  </button>
                  {bet3 && (
                    <button
                      className={`tip-card__options__option-2__item bg-${theme} ${selectedWin(
                        3
                      )}`}
                      onClick={() => setOptWin(3)}
                    >
                      {opt3}
                    </button>
                  )}
                </div>
              )}
              {!openDelete && (
                <button
                  className={`tip-card__options__option --win bg-${theme} c-${theme}`}
                  onClick={openWin ? handleDefine : handleOpenWin}
                  disabled={openWin ? !optWin : false}
                >
                  {openWin ? (
                    <>
                      Confirmar
                      <Icon icon="akar-icons:check" height="18" width="18" />
                    </>
                  ) : !win ? (
                    <>
                      Definir Ganhador
                      <Icon
                        icon="line-md:confirm-circle-twotone"
                        width="18"
                        height="18"
                      />
                    </>
                  ) : (
                    <>
                      Editar Ganhador
                      <Icon icon="cuida:edit-outline" width="18" height="18" />
                    </>
                  )}
                </button>
              )}
              {!openDelete && !openWin && (
                <button
                  className={`tip-card__options__option --win bg-${theme} c-${theme}`}
                  onClick={download}
                >
                  Download
                  <Icon
                    icon="line-md:downloading-loop"
                    width="18"
                    height="18"
                  />
                </button>
              )}
              {!openWin && openDelete && (
                <button
                  className="tip-card__options__option --delete"
                  onClick={openDelete ? handleConfirmDelete : handleOpenDelete}
                >
                  Confirmar exclusão
                  <Icon icon="akar-icons:check" />
                </button>
              )}
              <div className="card__options__option__delete-edit">
                {!openWin && !openDelete && (
                  <button className={`tip-card__options__option --win bg-${theme} c-${theme}`} onClick={handleEdit}>
                    Editar
                    <Icon
                      icon="majesticons:edit-pen-4-line"
                      width="17"
                      height="17"
                    />
                  </button>
                )}
                {!openWin && !openDelete && (
                  <button
                    className="tip-card__options__option --delete"
                    onClick={
                      openDelete ? handleConfirmDelete : handleOpenDelete
                    }
                  >
                    Excluir
                    <Icon icon="ph:trash-duotone" width="18" height="18" />
                  </button>
                )}
              </div>
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
