export const putResult = async (script, data, line, sheet) => {
  try {
    const response = await fetch(script, {
      method: "POST",
      body: JSON.stringify({
        method: "POST",
        range: `A${line}:K${line}`,
        values: [
          [
            ...data,
            // "=IFS(N{line}=1; (I{line}*J{line}) - SUM(I{line};L{line}); N{line}=2; (L{line}*M{line}) - SUM(I{line};L{line}); ISBLANK(N{line}); 0-I{line}-L{line}; N{line}=12; ((I{line}*J{line}) - I{line} + ((L{line}*M{line}) - L{line})))",
          ],
        ],
        sheetName: sheet,
      }),
    });

    const responseJSON = await response.json();

    return responseJSON;
  } catch (error) {
    return error.message;
  }
};
