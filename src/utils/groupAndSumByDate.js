export const groupAndSumByDate = (items) => {
  const result = {};

  items.forEach((item) => {
    const date = item.date;

    if (!result[date]) {
      result[date] = 0;
    }

    result[date] += item.value;
  });

  return Object.keys(result).map((date) => ({
    date,
    value: result[date],
  }));
};
