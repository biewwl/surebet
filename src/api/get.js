// import config from "./config.json";

// const { url } = config;

export const getResults = async (script, sheet) => {
  try {
    const range = "A10:L500";

    const response = await fetch(`${script}?range=${range}&sheetName=${sheet}`);

    const responseJSON = await response.json();

    return responseJSON;
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
    const range = "B1:B6";

    const response = await fetch(`${script}?range=${range}&sheetName=${sheet}`);

    const responseJSON = await response.json();

    return responseJSON;
  } catch (error) {
    console.log(error);
  }
};
