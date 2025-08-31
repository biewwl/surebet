// function calculateLayRisk(odd, desiredProfit, commission) {
//   // Calculate the required stake considering the commission
//   const riskValue = desiredProfit * (1 + commission) * (odd - 1);
//   return riskValue;
// }

function calculateLayProfitFromStake(odd, stake, commission) {
  // Calcula o valor total gasto levando em conta a comissão
  const totalStake = stake * (1 + commission); // O valor gasto aumenta com a comissão
  const profit = (totalStake / (odd - 1));
  return profit;
}

export function convertLayToNormalOdd(layOdd, stake, commission) {
  // Calcula o lucro com base na odd lay
  const layProfit = calculateLayProfitFromStake(layOdd, stake, commission);

  // Deriva a odd normal com base no lucro e stake
  const normalOdd = (layProfit + stake) / stake;

  const formattedNormalOdd = Number(normalOdd.toFixed(4)).toString()
  return { normalOdd: formattedNormalOdd, profit: layProfit.toFixed(2) };
}

// Testando com os valores fornecidos
const layOdd = 1.28;
const stake = 200;
const commission = 0; // Exemplo de comissão: 5%

const normalOdd = convertLayToNormalOdd(layOdd, stake, commission);
console.log(normalOdd); // Resultado ajustado

