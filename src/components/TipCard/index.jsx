import { Icon } from "@iconify/react/dist/iconify.js";
import { formatValue } from "../../utils/formatNumber";
import { getLogo } from "../../utils/getLogo";
import "./styles/TipCard.css";
import { formatDate } from "../../utils/formatDate";

function TipCard({ data }) {
  const {
    option1,
    option2,
    odd1,
    odd2,
    description,
    price1,
    price2,
    win,
    profit,
    date,
  } = data;

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

  return (
    <div
      className={`tip-card content${pendingC}${drawC}${bingoC}`}
      // style={{width}}
    >
      <span className="tip-card__date">
        <Icon icon="lets-icons:date-today-duotone" />
        <span className="tip-card__date__text">{formatDate(date)}</span>
      </span>
      <div>{description}</div>
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
        {odd2 && (
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
    </div>
  );
}

export default TipCard;
