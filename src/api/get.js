// import config from "./config.json";

// const { url } = config;

const test_api = "https://script.google.com/macros/s/AKfycbw_pphx2pY38Q70xttlqQUeTaOBk09GufqjDw70qK35i9jWPtNCm-6NzTv_NlBEUM4R/exec";

export const getResults = async (script, sheet) => {
  try {
    const range = "G2:AAA500";

    console.log("Fetching results");

    const response = await fetch(`${test_api}?range=${range}&sheetName=${sheet}`);

    const responseJSON = await response.json();

    const mappedResults = responseJSON.map((row) => {

      const constants = row.slice(0, 4);
      const dynamics = row.slice(4);

      return [...constants, ...dynamics.filter((cell, index) => (cell.value))];
    }
    );
    console.log(mappedResults);
    console.log(responseJSON);


    return mappedResults;
  } catch (error) {
    console.log(script, error);
    return { error: "Falha ao buscar resultados" };
  }
};

export const getNames = async (script) => {
  try {
    const response = await fetch(`${script}?names=true`);

    const responseJSON = await response.json();

    return responseJSON;
  } catch (error) {
    // console.log(script, error);
    return { error: "Falha ao buscar resultados" };
  }
};

export const getBalance = async (script, sheet) => {
  try {
    const range = "B1:B3";
    const rangeMeta = "C1";

    const response = await fetch(`${test_api}?range=${range}&sheetName=${sheet}`);
    const responseMeta = await fetch(`${test_api}?range=${rangeMeta}&sheetName=${sheet}`);

    const responseJSON = await response.json();
    const responseMetaJSON = await responseMeta.json();

    return [...responseJSON, ...responseMetaJSON];
  } catch (error) {
    console.log(error);
  }
};
