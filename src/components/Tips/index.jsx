import { useContext } from "react";
import TipCard from "../TipCard";
import { Icon } from "@iconify/react/dist/iconify.js";
import { DataContext } from "../../context/DataContext";
import "./styles/Tips.css";

function Tips() {
  const { results, loading } = useContext(DataContext);

  const formattedData = results.map((d) => {
    const [
      date,
      description,
      option1,
      price1,
      odd1,
      option2,
      price2,
      odd2,
      win,
      profit,
    ] = d;

    return {
      date,
      description,
      option1,
      price1,
      odd1,
      option2,
      price2,
      odd2,
      win,
      profit,
    };
  });

  return (
    <section className="tips">
      {loading ? (
        <div className="loading">
          <Icon icon="svg-spinners:pulse-multiple" />
        </div>
      ) : (
        formattedData.reverse().map((d, i) => <TipCard data={d} key={i} />)
      )}
    </section>
  );
}

export default Tips;
