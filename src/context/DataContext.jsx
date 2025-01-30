import React, { createContext, useEffect, useState } from "react";
import { getResults } from "../api/get";
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

  useEffect(() => {
    const fetchResults = async () => {
      if (script) {
        setLoading(true);
        const r = await getResults(script);

        const mappedResults = r.map((r1) => {
          const newR = r1.map((r2) => r2.value);
          return newR;
        });

        setResults(mappedResults);
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
    lS.remove(LS_KEY);
  };

  return (
    <DataContext.Provider
      value={{ results, loading, update, setUpdate, script, login, logout }}
    >
      {children}
    </DataContext.Provider>
  );
};
