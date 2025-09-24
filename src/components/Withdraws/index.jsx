import { useContext, useEffect, useState } from "react";
import { getWithdraws } from "../../api/get";
import { DataContext } from "../../context/DataContext";
import { getLogo } from "../../utils/getLogo";
import { Link } from "react-router-dom";
import { formatValue } from "../../utils/formatNumber";
import { ThemeContext } from "../../context/ThemeContext";
import "./styles/Withdraws.css";

function Withdraws() {
  const { updateData, script, sheet } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);

  const [withdraws, setWithdraws] = useState([]);

  useEffect(() => {
    const fetchWithdraws = async () => {
      const w = await getWithdraws(script, sheet) ?? [];

      let result = [];

      for (let i = 0; i < w.length; i += 2) {
        result.push({
          betHouse: w[i].value,
          balance: w[i + 1].value,
        });
      }

      setWithdraws(result);
    };
    fetchWithdraws();
  }, []);

  return (
    <section className="withdraws">
      {withdraws.map((w, idx) => {
        const [betHouseName, betHouseAlias] = w.betHouse.split(" | ");

        const betHouse = getLogo(betHouseName);
        const betHouseLink = betHouse ? betHouse.site : null;
        const betHouseImg = betHouse ? betHouse.logo : null;

        return (
          <section key={idx} className={`withdraws__item bg-${theme}-2`}>
            <Link to={betHouseLink} target="_blank" className={`withdraws__item__link`}>
              <img src={betHouseImg} alt="" className="withdraws__item__link__img" />
            </Link>
            <div className="withdraws__item__info">
              <div className="withdraws__item__info__name">
                <span className={`c-${theme}`}>{betHouseName}</span>
                {betHouseAlias && (
                  <span className={`c-${theme}-1 --alias`}>
                    {" "}
                    ({betHouseAlias})
                  </span>
                )}
              </div>
              <span className="withdraws__item__info__balance">
                {formatValue(w.balance)}
              </span>
            </div>
          </section>
        );
      })}
    </section>
  );
}

export default Withdraws;
