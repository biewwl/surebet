import { Icon } from "@iconify/react/dist/iconify.js";
import "./styles/ProfitData.css";

function ProfitData({ sumTotal }) {
  return (
    <section className="profit-data">
      <span className="profit-data__title">Lucro total</span>
      <h1 className="profit-data__total-value">
        {sumTotal > 0 && (
          <span className="--positive">
            <Icon
              icon="teenyicons:up-solid"
              className="profit-data__total-value__icon"
            />
            R$ {sumTotal}
          </span>
        )}
        {sumTotal < 0 && (
          <span className="--negative">
            <Icon
              icon="teenyicons:down-solid"
              className="profit-data__total-value__icon"
            />
            R$ {sumTotal}
          </span>
        )}
        {sumTotal == 0 && (
          <span className="--draw">
            <Icon
              icon="teenyicons:square-solid"
              className="profit-data__total-value__icon"
            />
            R$ {sumTotal}
          </span>
        )}
      </h1>
    </section>
  );
}

export default ProfitData;
