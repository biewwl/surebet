import { useContext } from "react";
import TipCard from "../TipCard";
import { DataContext } from "../../context/DataContext";
import "./styles/Tips.css";

function Tips() {
  const { results } = useContext(DataContext);

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
      option3,
      price3,
      odd3,
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
      option3,
      price3,
      odd3,
      win,
      profit,
    };
  });

  return (
    <section className="tips">
      {formattedData.reverse().map((d, i) => (
        <TipCard data={d} key={i} i={i} />
      ))}
    </section>
  );
}

export default Tips;
