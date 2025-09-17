// import config from "./config.json";

// const { url } = config;

// const test_api = "https://script.google.com/macros/s/AKfycbw_pphx2pY38Q70xttlqQUeTaOBk09GufqjDw70qK35i9jWPtNCm-6NzTv_NlBEUM4R/exec";


// Converte um índice 1-based em rótulo de coluna do Google Sheets (A, B, …, Z, AA, AB…)
function numberToColumn(n) {
  let col = ''
  while (n > 0) {
    const rem = (n - 1) % 26
    col = String.fromCharCode(65 + rem) + col
    n = Math.floor((n - 1) / 26)
  }
  return col
}

export const postResult = async (script, data, sheet) => {
  // 1) Índice da coluna 'G' (A=1, B=2, …, G=7)
  const startIndex = 7

  // 2) Índice da coluna final baseado no tamanho de data
  //    se data.length = 1 => endIndex = 7 (G)
  //    se data.length = 2 => endIndex = 8 (H)
  //    e assim por diante, passando de Z para AA, AB…
  const endIndex = startIndex + data.length - 1
  const endLetter = numberToColumn(endIndex)

  // 3) Monta a range no formato "G2:<colFinal>10"
  const range = `G2:${endLetter}10`

  try {
    const response = await fetch(script, {
      method: "POST",
      body: JSON.stringify({
        method: "POST",
        range,
        sheetName: sheet,
        values: [data],
        end: true,
      }),
    })

    return await response.json()
  } catch (error) {
    return error.message
  }
}


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
        range: `B3:B3`,
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
