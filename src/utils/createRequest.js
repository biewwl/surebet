function createRequest(obj) {
  const result = [];

  // 1-2: date e match
  result.push(obj.date, obj.match);

  // 3-4: dois espaços vazios
  result.push('', '');

  // 5-7: para cada item de odds
  obj.odds.forEach(({ houses, multiples, odd, price }) => {
    // casas separadas por " | "
    const housesStr = houses.join(' | ');
    
    // description + ":" + bet separados por ";"
    const multiplesStr = multiples
      .map(({ description, bet }) => `${description}: ${bet}`)
      .join(';');
    
    // concatena casas + "|" + múltiplos, depois odd e price
    result.push(
      `${housesStr} | ${multiplesStr}`,
      Number(odd),
      Number(price)
    );
  });

  return result;
}

/*
[
  "2025-08-24T20:00:12.207Z",
  "Barcelona",
  "",
  "",
  "KTO | Juventude x Botafogo - Resultado Final: Juventude;Vasco x Corinthians - Total de gols do Vasco: Menos de 3.5;São Paulo x Atlético Mineiro - Total de gols do São Paulo: Menos de 3.5",
  "4.31",
  "25"
]
*/

export default createRequest;
