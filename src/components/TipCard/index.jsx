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
import { sports } from "../../utils/sportIcons";
import { is } from "date-fns/locale";

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
  const [copied, setCopied] = useState(false);

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
    freebet,
    date,
    cel = "a0",
  } = view ? data : formatDataWithCol(data);

  // console.log(lose, result, profit);
  const freebetString = String(freebet);

  const isFreebet = (b) => freebetString.includes(b);

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
  const bingo = win === 12 || (!bet2 && win === 1 && profit > 150);

  const result1 = odd1 * price1;
  const result2 = odd2 * price2;
  const result3 = odd3 * price3;

  let result = 0;

  if (bingo) {
    result = result1 + result2;
  }

  switch (win) {
    case 1:
      result = result1;
      if (isFreebet("1")) {
        result -= price1;
      }
      break;
    case 2:
      result = result2;
      if (isFreebet("2")) {
        result -= price2;
      }
      break;
    case 3:
      result = result3;
      if (isFreebet("3")) {
        result -= price3;
      }
      break;
    default:
      break;
  }

  const draw =
    Number(result).toFixed(2) === (price1 + price2).toFixed(2) && !bingo;

  const winner = (w) => (win === w || pending || bingo ? "" : " --lose");

  // console.log(profit);

  const lose = !pending && profit.toFixed(2) < 0;

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
    if (openWin && odd2) return newDescription;
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

  const sport = description.match(/^::[A-Z]{3}::/)
    ? description.match(/^::[A-Z]{3}::/)[0]
    : false;

  const newDescription = sport
    ? description.replace(/^::[A-Z]{3}::/, "").trimStart()
    : description.trimStart();

  const todayDate = formatDate(date).split("Hoje às ")[1];

  const DATE = todayDate ? todayDate : formatDate(date);

  const url = new URL(
    window.location.origin + window.location.pathname + "#/create"
  );

  const cleanData = {
    date: data.date.value,
    description: data.description.value,
    option1: data.option1.value,
    option2: data.option2.value,
    option3: data.option3.value,
    odd1: data.odd1.value,
    odd2: data.odd2.value,
    odd3: data.odd3.value,
    price1: data.price1.value,
    price2: data.price2.value,
    price3: data.price3.value,
    win: data.win.value,
    freebet: data.freebet.value,
  };

  url.searchParams.set("data", JSON.stringify(cleanData));

  const urlText = url.toString();

  const shareCard = () => {
    // Generate an url with the card data para a rota /create

    navigator.clipboard
      .writeText(urlText)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 3000);
      })
      .catch((err) => {
        // console.error("Erro ao copiar o link: ", err);
        alert("Erro ao copiar o link. Tente novamente.");
      });
  };

  const classCopied = copied ? " --copied" : "";


  const totalPrice = () => {
    let t = price1 + price2 + price3;

    if (!freebet) {
      return formatValue(t);
    } else {
      if (isFreebet("1")) {
        t -= price1;
      }
      if (isFreebet("2")) {
        t -= price2;
      }
      if (isFreebet("3")) {
        t -= price3;
      }
      return formatValue(t);
    }
  };

  return (
    <div
      className={`tip-card --${i} content${pendingC}${drawC}${bingoC}${loseC} c-${theme}`}
      // style={{width}}
    >
      <span className={`tip-card__date`}>
        <div></div>
        <span className={`tip-card__date__text c-${theme}-1`}>{DATE}</span>
        {pathname !== "/create" && (
          <button
            className={`tip-card__date__options c-${theme}`}
            onClick={handleOpenOptions}
          >
            <Icon icon="mi:options-horizontal" />
          </button>
        )}
      </span>
      <span className="tip-card__description">{newDescription}</span>
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
              <span
                className={`tip-card__tip__odd__infos__price ${
                  isFreebet("1") ? " --is-free" : ""
                }`}
              >
                {formatValue(price1)}
                {isFreebet("1") && (
                  <Icon
                    className="tip-card__tip__odd__infos__price__icon"
                    icon="tabler:gift-filled"
                  />
                )}
              </span>
            </div>
          </div>
          {/* <div className={`tip-card__tip__odd__line bg-${theme}-invert`}></div> */}
          <span className="card__tip__odd__count">1</span>
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
                <span
                  className={`tip-card__tip__odd__infos__price ${
                    isFreebet("2") ? " --is-free" : ""
                  }`}
                >
                  {formatValue(price2)}
                  {isFreebet("2") && (
                    <Icon
                      className="tip-card__tip__odd__infos__price__icon"
                      icon="tabler:gift-filled"
                    />
                  )}
                </span>
              </div>
            </div>
            {/* <div
              className={`tip-card__tip__odd__line bg-${theme}-invert`}
            ></div> */}
            <span className="card__tip__odd__count">2</span>
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
                <span
                  className={`tip-card__tip__odd__infos__price ${
                    isFreebet("3") ? " --is-free" : ""
                  }`}
                >
                  {formatValue(price3)}
                  {isFreebet("3") && (
                    <Icon
                      className="tip-card__tip__odd__infos__price__icon"
                      icon="tabler:gift-filled"
                    />
                  )}
                </span>
              </div>
            </div>
            {/* <div
              className={`tip-card__tip__odd__line bg-${theme}-invert`}
            ></div> */}
            <span className="card__tip__odd__count">3</span>
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
              {totalPrice()}
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
              {!openDelete && !openWin && (
                <div className="card__options__option__share">
                  <button
                    className={`tip-card__options__option${classCopied} bg-${theme} c-${theme} --link`}
                    onClick={shareCard}
                  >
                    {copied ? (
                      <>
                        Link copiado!{" "}
                        <Icon icon="si:check-fill" width="18" height="18" />
                      </>
                    ) : (
                      <>
                        Compartilhar{" "}
                        <Icon icon="ri:link" width="18" height="18" />
                      </>
                    )}
                  </button>
                  <Link
                    to={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      `👻 Confira essa aposta:\n\n${urlText}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`tip-card__options__option${classCopied} bg-${theme} c-${theme} --social`}
                  >
                    <Icon icon="ic:baseline-whatsapp" width="18" height="18" />
                  </Link>
                </div>
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
                  <button
                    className={`tip-card__options__option --win bg-${theme} c-${theme}`}
                    onClick={handleEdit}
                  >
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
      {sports[sport] && (
        <Icon
          icon={sports[sport].icon}
          className="tip-card__sport"
          color={sports[sport].color}
        />
      )}
    </div>
  );
}

export default TipCard;
