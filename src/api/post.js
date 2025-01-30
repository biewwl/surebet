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
            "=IFS(O{line}=1; (J{line}*K{line}) - SUM(J{line};M{line}); O{line}=2; (M{line}*N{line}) - SUM(J{line};M{line}); ISBLANK(O{line}); 0-J{line}-M{line}; O{line}=12; ((J{line}*K{line}) - J{line} + ((M{line}*N{line}) - M{line})))",
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

// postResult([
//   "28/01",
//   "Barcelona x Real - Messi gol",
//   "Betano | 3+",
//   140,
//   2.3,
//   "Betfair | 2-",
//   170,
//   2,
// ]);
