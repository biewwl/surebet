import React, { createContext, useEffect, useState } from "react";
import { getBalance, getResults } from "../api/get";
import lS from "manager-local-storage";
// Crie o contexto
export const DataContext = createContext();

// Crie um provedor de contexto
export const DataProvider = ({ children }) => {
  const LS_KEY = "*biewwl-app-script*";

  const initialScript = lS.get(LS_KEY) ?? "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [script, setScript] = useState(initialScript);
  const [balance, setBalance] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (script) {
        setLoading(true);
        const r = await getResults(script);
        const b = await getBalance(script);

        const mappedResults = r.map((r1) => {
          const newR = [...r1];

          const { value } = newR[newR.length - 1];
          const price1 = Number(r1[3].value);
          const odd1 = Number(r1[4].value);
          const price2 = Number(r1[6].value);
          const odd2 = Number(r1[7].value);
          const price3 = Number(r1[9].value);
          const odd3 = Number(r1[10].value);

          let profit = 0 - (price1 + price2 + price3);

          // console.log(price1, price2, price3);

          if (value === 1) profit = price1 * odd1 - (price1 + price2 + price3);
          if (value === 2) profit = price2 * odd2 - (price1 + price2 + price3);
          if (value === 3) profit = price3 * odd3 - (price1 + price2 + price3);
          if (value === 12)
            profit = price1 * odd1 + price2 * odd2 - (price1 + price2);

          return [...newR, { value: profit }];
        });

        setResults(mappedResults);
        setBalance(b);
        setLoading(false);
      }
    };
    fetchResults();
  }, [update, script]);

  const login = (s) => {
    setScript(s);
    lS.set(LS_KEY, s);
  };

  const logout = () => {
    setScript("");
    setResults([]);
    lS.remove(LS_KEY);
  };

  const updateData = () => setUpdate(!update);

  return (
    <DataContext.Provider
      value={{
        results,
        loading,
        updateData,
        script,
        login,
        logout,
        balance,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
