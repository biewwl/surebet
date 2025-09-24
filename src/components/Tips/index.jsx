import { useContext } from "react";
// import TipCard from "../TipCard_new";
import { DataContext } from "../../context/DataContext";
import "./styles/Tips.css";
import TipCardResume from "../TipCardResume";

function Tips() {
  const { results } = useContext(DataContext);

  console.log("Results:", results);

  // const formattedData = results.map((d) => {
  //   const [
  //     date,
  //     description,
  //     option1,
  //     price1,
  //     odd1,
  //     option2,
  //     price2,
  //     odd2,
  //     option3,
  //     price3,
  //     odd3,
  //     win,
  //     freebet,
  //     profit,
  //   ] = d;

  //   // console.log(10, d);
    

  //   return {
  //     date,
  //     description,
  //     option1,
  //     price1,
  //     odd1,
  //     option2,
  //     price2,
  //     odd2,
  //     option3,
  //     price3,
  //     odd3,
  //     win,
  //     freebet,
  //     profit,
  //   };
  // });

  return (
    <section className="tips">
      {/* {formattedData.reverse().map((d, i) => (
        <TipCard data={d} key={i} i={i} />
      ))} */}

    {results.map((result, index) => (
      <TipCardResume result={result} key={index} />
    ))}
    </section>
  );
}

export default Tips;
