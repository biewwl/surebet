import moment from "moment";

export const countDays = (results) => {
  if (results.length <= 0) return [0, ""];

  // Converter strings de data ISO 8601 para objetos Moment
  const firstDay = moment(results[0][0].value);
  const lastDay = moment(results[results.length - 1][0].value);

  // Calcular a diferença em dias, incluindo o primeiro e último dia
  const days = lastDay.diff(firstDay, "days") + 1;

  // Calcular a diferença em meses e anos
  const months = lastDay.diff(firstDay, "months");
  const years = lastDay.diff(firstDay, "years");

  // Calcular o resto dos meses e dias
  const remainingMonths = months % 12;
  const remainingDays = days - (years * 365 + remainingMonths * 30);

  // Construir a string de retorno baseada na diferença calculada
  let detailedString = "";
  if (days < 30) {
    detailedString = "";
  } else if (days >= 30 && days < 365) {
    detailedString = `(${months} ${
      months > 1 ? "meses" : "mês"
    } e ${remainingDays} dia${remainingDays > 1 ? "s" : ""})`;
  } else {
    detailedString = `(${years} ano${years > 1 ? "s" : ""} ${remainingMonths} ${
      remainingMonths > 1 ? "meses" : "mês"
    } e ${remainingDays} dia${remainingDays > 1 ? "s" : ""})`;
  }

  // console.log(`O número de dias entre as datas é: ${days}`);
  // console.log(`Detalhes: ${detailedString}`);

  return [days, detailedString];
};
