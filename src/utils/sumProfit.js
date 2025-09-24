import chunkArray from "./chunkArray";

const sumProfit = (r) => {
  const constants = r.slice(0, 5);
  const dynamics = r.slice(5);

  const isFreebet = (idx) => String(freebet.value).includes(idx);

  const [, , winner, freebet] = constants;

  const odds = chunkArray(dynamics, 3);

  const totalPrice = () => { // total gasto
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
  let result = 0; // inicializa a variável que vai receber a soma

  odds.forEach((item, idx) => {                 // percorre cada elemento do array odds, com índice
    const position = String(idx + 1);           // converte índice para string representando a posição

    if (!winners.includes(position)) return;    // sai da iteração se a posição não estiver em winners

    const odd = item[1]?.value;                 // extrai o valor de odd (já é número)
    const price = item[2]?.value;               // extrai o valor de price (já é número)

    const subtractFreebet = freebet &&               // determina se deve pular esta aposta  
      isFreebet(position);      // verificando condição de freebet

    result += subtractFreebet                        // acumula odd * price ou 0, conforme shouldSkip  
      ? odd * price - price                                       // se deve pular, soma zero  
      : odd * price;                            // caso contrário, soma o produto
  });                                           // fim do forEach


  return result - totalPrice();
};

export default sumProfit;