import React, { createContext, useEffect, useState } from "react";
import { getBalance, getResults } from "../api/get";
import lS from "manager-local-storage";
import { formatResults } from "../utils/manageData";

// Crie o contexto
export const DataContext = createContext();

// Crie um provedor de contexto
export const DataProvider = ({ children }) => {
  const LS_KEY = "*biewwl-app-script*";
  const LS_KEY_SAVE = "*biewwl-app-scripts*";

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

        const mappedResults = formatResults(r);

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

    const currentSaves = lS.get(LS_KEY_SAVE) ?? [];

    if (currentSaves.every((c) => c.script !== s)) {
      lS.set(LS_KEY_SAVE, [...currentSaves, { date: new Date(), script: s }]);
    }
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
