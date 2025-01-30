// import config from "./config.json";

// const { url } = config;

export const getResults = async (script) => {
  try {
    const range = "F3:O500";

    const response = await fetch(`${script}?range=${range}`);

    const responseJSON = await response.json();

    return responseJSON;
  } catch (error) {
    return { error: "Falha ao buscar resultados" };
  }
};
