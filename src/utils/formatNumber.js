export const formatNumber = (string) => {

  const [, n] = string.split("R$ ");

  let numb = n;
  if (!n) numb = string;

  const points = numb.replace(",", ".");
  const number = Number(points);

  return number;
};

export const formatValue = (number) => {
  const fixed = Number(number).toFixed(2);

  const t = String(fixed);

  const text = t.replace(".", ",");
  return `R$ ${text}`
}

