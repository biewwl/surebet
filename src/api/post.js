// import config from "./config.json";

// const { url } = config;

export const postResult = async (script, data) => {
  try {
    const response = await fetch(script, {
      method: "POST",
      body: JSON.stringify({
        method: "POST",
        range: "F3:O3",
        values: [
          [
            ...data,
            "",
            "=IFS(N{line}=1; (I{line}*J{line}) - SUM(I{line};L{line}); N{line}=2; (L{line}*M{line}) - SUM(I{line};L{line}); ISBLANK(N{line}); 0-I{line}-L{line}; N{line}=12; ((I{line}*J{line}) - I{line} + ((L{line}*M{line}) - L{line})))",
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
