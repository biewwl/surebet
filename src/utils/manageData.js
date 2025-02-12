import { formatDate, parseDate } from "./formatDate";

export const disabled = ({
  description,
  option1,
  price1,
  odd1,
  option1BettingHouse,
  option2,
  price2,
  odd2,
}) => {
  if (!description || !option1 || !price1 || !odd1 || !option1BettingHouse)
    return true;
};

export const formatData = ({
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
}) => {

  const OPTION2 = option2 === " | 0" ? "" : option2;
  const PRICE2 = price2 === 0 ? "" : price2;
  const ODD2 = odd2 === 1 ? "" : odd2;


  const OPTION3 = option3 === " | 0" ? "" : option3;
  const PRICE3 = price3 === 0 ? "" : price3;
  const ODD3 = odd3 === 1 ? "" : odd3;


  const values = [
    parseDate(formatDate(date), true),
    description,
    option1,
    price1,
    odd1,
    OPTION2,
    PRICE2,
    ODD2,
    OPTION3,
    PRICE3,
    ODD3,
  ];

  return values;
};

export const formatResults = (results) =>
  results.map((r1) => {
    const newR = [...r1].map((r2, i) => {
      if (i === 6 || i === 9) {
        return { ...r2, value: Number(r2.value) };
      }
      return r2;
    });

    const { value } = newR[newR.length - 1];
    const price1 = Number(r1[3].value);
    const odd1 = Number(r1[4].value);
    const price2 = Number(r1[6].value);
    const odd2 = Number(r1[7].value);
    const price3 = Number(r1[9].value);
    const odd3 = Number(r1[10].value);

    let profit = 0 - (price1 + price2 + price3);

    // console.log(price1, price2, price3);

    if (value === 1) profit = price1 * odd1 - (price1 + price2 + price3);
    if (value === 2) profit = price2 * odd2 - (price1 + price2 + price3);
    if (value === 3) profit = price3 * odd3 - (price1 + price2 + price3);
    if (value === 12)
      profit = price1 * odd1 + price2 * odd2 - (price1 + price2);

    return [...newR, { value: profit }];
  });
