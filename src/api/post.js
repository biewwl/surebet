// import config from "./config.json";

// const { url } = config;

export const postResult = async (script, data, sheet) => {
  try {
    const response = await fetch(script, {
      method: "POST",
      body: JSON.stringify({
        method: "POST",
        range: "A10:L10",
        sheetName: sheet,
        values: [
          [
            ...data,
            "",
            // "=IFS(N{line}=1; (I{line}*J{line}) - SUM(I{line};L{line}); N{line}=2; (L{line}*M{line}) - SUM(I{line};L{line}); ISBLANK(N{line}); 0-I{line}-L{line}; N{line}=12; ((I{line}*J{line}) - I{line} + ((L{line}*M{line}) - L{line})))",
          ],
        ],
        end: true,
      }),
    });

    const responseJSON = await response.json();

    return responseJSON;
  } catch (error) {
    return error.message;
  }
};

export const postWin = async (script, win, line, sheet) => {
  try {
    const response = await fetch(script, {
      method: "POST",
      body: JSON.stringify({
        method: "POST",
        range: `L${line}:L${line}`,
        values: [[win]],
        sheetName: sheet,
      }),
    });

    const responseJSON = await response.json();

    return responseJSON;
  } catch (error) {
    return error.message;
  }
};

export const postNormals = async (script, value, sheet) => {
  try {
    const response = await fetch(script, {
      method: "POST",
      body: JSON.stringify({
        method: "POST",
        range: `B2:B2`,
        values: [[value]],
        sheetName: sheet,
      }),
    });

    const responseJSON = await response.json();

    return responseJSON;
  } catch (error) {
    return error.message;
  }
};

export const postOutflows = async (script, value, sheet) => {
  try {
    const response = await fetch(script, {
      method: "POST",
      body: JSON.stringify({
        method: "POST",
        range: `B5:B5`,
        values: [[value]],
        sheetName: sheet,
      }),
    });

    const responseJSON = await response.json();

    return responseJSON;
  } catch (error) {
    return error.message;
  }
};
