import { formatDate, parseDate } from "./formatDate";

export const disabled = ({
  description,
  option1,
  option2,
  option3,
  price1,
  price2,
  price3,
  odd1,
  odd2,
  odd3,
  option1BettingHouse,
  option2BettingHouse,
  option3BettingHouse,
}) => {
  let isDisabled = false;

  if (option3 || option3BettingHouse.length > 0 || price3 || odd3) {
    if (
      !option3 ||
      !price3 ||
      price3 <= 0 ||
      !odd3 ||
      odd3 <= 0 ||
      option3BettingHouse.length === 0 ||
      !option2 ||
      !price2 ||
      !odd2 ||
      option2BettingHouse.length === 0
    )
      isDisabled = true;
  }

  if (option2) {
    if (
      !price2 ||
      price2 <= 0 ||
      !odd2 ||
      odd2 <= 0 ||
      option2BettingHouse.length === 0
    )
      isDisabled = true;
  }

  if (
    !description ||
    !option1 ||
    !price1 ||
    !odd1 ||
    option1BettingHouse.length === 0 ||
    (option3 && !option2)
  ) {
    isDisabled = true;
  }

  return isDisabled;
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
  win = "",
  freebet
}) => {
  const OPTION2 = option2 === " | Empate" ? "" : option2;
  const PRICE2 = price2 === 0 ? "" : price2;
  const ODD2 = odd2 === 0 ? "" : odd2;

  const OPTION3 = option3 === " | Time B" ? "" : option3;
  const PRICE3 = price3 === 0 ? "" : price3;
  const ODD3 = odd3 === 0 ? "" : odd3;

  const values = [
    date,
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
    win,
    freebet
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

    // extrai os valores conforme o código original
    const { value } = newR[newR.length - 2];      // odd vencedora, conforme site
    const { value: freebet } = newR[newR.length - 1];  // coluna FREEBET (valor da coluna N)
    const price1 = Number(r1[3].value);
    const odd1 = Number(r1[4].value);
    const price2 = Number(r1[6].value);
    const odd2 = Number(r1[7].value);
    const price3 = Number(r1[9].value);
    const odd3 = Number(r1[10].value);

    // converte freebet para string para facilitar a verificação
    const fb = freebet.toString();

    let profit;

    if (value === 1) {
      // Odd 1 vence: subtrai sempre o valor integral de price1,
      // enquanto que para Odd 2 e Odd 3, se estiver freebet, não desconta seu valor.
      profit = price1 * odd1 - (price1 + (fb.includes("2") ? 0 : price2) + (fb.includes("3") ? 0 : price3));
    } else if (value === 2) {
      // Odd 2 vence: subtrai sempre o valor integral de price2,
      // enquanto que para Odd 1 e Odd 3, se estiver freebet, não desconta seu valor.
      profit = price2 * odd2 - ((fb.includes("1") ? 0 : price1) + price2 + (fb.includes("3") ? 0 : price3));
    } else if (value === 3) {
      // Odd 3 vence: subtrai sempre o valor integral de price3,
      // enquanto que para Odd 1 e Odd 2, se estiver freebet, não desconta seu valor.
      profit = price3 * odd3 - ((fb.includes("1") ? 0 : price1) + (fb.includes("2") ? 0 : price2) + price3);
    } else if (value === 12) {
      // Combinação 12: considera Odd 1 e Odd 2 vencedoras (ambas são descontadas na totalidade)
      profit = (price1 * odd1 - price1) + (price2 * odd2 - price2);
    } else if (value === 13) {
      // Combinação 13: considera Odd 1 e Odd 3 vencedoras
      profit = (price1 * odd1 - price1) + (price3 * odd3 - price3);
    } else {
      // Se não houver odd vencedora definida, subtrai os custos considerando as freebet
      profit = - ((fb.includes("1") ? 0 : price1) + (fb.includes("2") ? 0 : price2) + (fb.includes("3") ? 0 : price3));
    }

    return [...newR, { value: profit }];


  });

export const formatDataWithCol = (data) => {
  const {
    option1: { value: option1, cel = "a0" },
    option2: { value: option2 },
    option3: { value: option3 },
    odd1: { value: odd1 },
    odd2: { value: odd2 },
    odd3: { value: odd3 },
    description: { value: description },
    price1: { value: price1 },
    price2: { value: price2 },
    price3: { value: price3 },
    win: { value: win },
    profit: { value: profit },
    freebet: { value: freebet },
    date: { value: date },
  } = data;

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
    freebet,
    cel
  };
};
