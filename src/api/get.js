// import config from "./config.json";

// const { url } = config;

export const getResults = async (script) => {
  try {
    const range = "F3:Q500";

    const response = await fetch(`${script}?range=${range}`);

    const responseJSON = await response.json();

    return responseJSON;
  } catch (error) {
    console.log(script, error);
    return { error: "Falha ao buscar resultados" };
  }
};

export const getBalance = async (script) => {
  try {
    const range = "B1:B6";

    const response = await fetch(`${script}?range=${range}`);

    const responseJSON = await response.json();

    return responseJSON;
  } catch (error) {
    console.log(error);
    ;
  }
};
