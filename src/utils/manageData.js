import { formatDate, parseDate } from "./formatDate";

export const disabled = ({
  description,
  option1,
  price1,
  odd1,
  option2,
  price2,
  odd2,
}) => {
  if (
    !description ||
    !option1 ||
    !price1 ||
    !odd1 ||
    !option2 ||
    !price2 ||
    !odd2
  )
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
}) => {
  const values = [
    parseDate(formatDate(date), true),
    description,
    option1,
    price1,
    odd1,
    option2,
    price2,
    odd2,
  ];

  return values;
};
