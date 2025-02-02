// import config from "./config.json";

// const { url } = config;

export const deleteResult = async (script, line) => {
  try {
    const response = await fetch(script, {
      method: "POST",
      body: JSON.stringify({
        method: "DELETE",
        range: `F${line}:N${line}`,
      }),
    });

    const responseJSON = await response.json();

    return responseJSON;
  } catch (error) {
    return error.message;
  }
};
