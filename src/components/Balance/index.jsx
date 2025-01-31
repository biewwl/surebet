import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { formatValue } from "../../utils/formatNumber";
import { Icon } from "@iconify/react/dist/iconify.js";
import "./styles/Balance.css";

function Balance() {
  const { balance } = useContext(DataContext);

  const [initial, normals, current, profit, outflows] = balance;

  return (
    <section className="balance">
      {balance.length > 0 && (
        <>
          <div className="balance__card content">
            <span className="balance__card__title">
              <Icon
                icon="ph:piggy-bank-duotone"
                className="balance__card__title__icon"
              />
              Saldo Atual
            </span>
            {formatValue(current[0].value)}
          </div>
          <div className="balance__card content">
            <span className="balance__card__title">
              <Icon
                icon="icon-park-twotone:up-one"
                className="balance__card__title__icon"
              />
              Lucro
            </span>
            {formatValue(profit[0].value)}
          </div>
          <div className="balance__card content">
            <span className="balance__card__title">
              <Icon
                icon="ph:flag-duotone"
                className="balance__card__title__icon"
              />
              Saldo Inicial
            </span>
            {formatValue(initial[0].value)}
          </div>
          <div className="balance__card content">
            <span className="balance__card__title">
              <Icon
                icon="ph:currency-dollar-simple-duotone"
                className="balance__card__title__icon"
              />
              Outros Ganhos
            </span>
            {formatValue(normals[0].value)}
          </div>
          <div className="balance__card content">
            <span className="balance__card__title">
              <Icon
                icon="solar:cash-out-line-duotone"
                className="balance__card__title__icon"
              />
              Saídas
            </span>
            - {formatValue(outflows[0].value)}
          </div>
        </>
      )}
    </section>
  );
}

export default Balance;
