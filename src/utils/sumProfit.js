import chunkArray from "./chunkArray";

const   sumProfit = (r) => {
  const constants = r.slice(0, 4);
  const dynamics = r.slice(4);

  const isFreebet = (idx) => String(freebet.value).includes(idx);

  const [, , winner, freebet] = constants;

  const odds = chunkArray(dynamics, 3);

  const totalPrice = () => {
    // pega só os preços de índice % 3 === 2
    const prices = dynamics.filter((_, idx) => idx % 3 === 2);

    // 2. soma preços ignorando freebets
    const total = prices.reduce((acc, item, i) => {
      const price = item.value; // já é número
      const shouldSkip = freebet && isFreebet(String(i + 1));

      return acc + (shouldSkip ? 0 : price);
    }, 0);

    // 3. formata e retorna
    return total;
  };

  // if (pending) return 0;
  const winners = String(winner.value).split("");
  const filterWinners = odds.filter((_, idx) =>
    winners.includes(String(idx + 1))
  );

  const result = filterWinners.reduce((acc, item) => {
    const odd = item[1]?.value; // já é número
    const price = item[2]?.value; // já é número
    const shouldSkip = freebet && isFreebet(String(price));
    return acc + (shouldSkip ? 0 : odd * price);
  }, 0);

  return result - totalPrice();
};

export default sumProfit;