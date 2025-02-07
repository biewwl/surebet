import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { formatValue } from "../../utils/formatNumber";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ThemeContext } from "../../context/ThemeContext";
import "./styles/Balance.css";

function Balance() {
  const { balance } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);

  const [initial, normals, current, profit, outflows, operations] = balance;

  return (
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
          <div className="balance__card content">
            <span className={`balance__card__title c-${theme}-1`}>
              <Icon
                icon="ph:currency-dollar-simple-duotone"
                className="balance__card__title__icon"
              />
              Outros Ganhos
            </span>
            {formatValue(normals[0].value)}
          </div>
          <div className="balance__card content">
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
  );
}

export default Balance;
