// import config from "./config.json";

// const { url } = config;

export const deleteResult = async (script, line, sheet) => {
  try {

    const response = await fetch(script, {
      method: "POST",
      body: JSON.stringify({
        sheetName: sheet,
        method: "DELETE",
        line,
      }),
    });

    return response;
  } catch (error) {
    return error.message;
  }
};
