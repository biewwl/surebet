import React, { createContext, useEffect, useState } from "react";
import { getBalance, getNames, getResults } from "../api/get";
import lS from "manager-local-storage";
// import { formatResults } from "../utils/manageData";

// Crie o contexto
export const DataContext = createContext();

// Crie um provedor de contexto
export const DataProvider = ({ children }) => {
  const LS_KEY = "*biewwl-app-script*";
  const LS_KEY_SAVE = "*biewwl-app-scripts*";

  const initialScript = lS.get(LS_KEY) ?? "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [script, setScript] = useState(initialScript);
  const [balance, setBalance] = useState([]);
  const [sheets, setSheets] = useState([]);
  const [sheet, setSheet] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      if (script && sheet) {
        setLoading(true);

        const r = await getResults(script, sheet);
        const b = await getBalance(script, sheet);        

        const mappedResults = r.sort((a, b) => {
          let dateA = new Date(a[0].value);
          let dateB = new Date(b[0].value);
          return dateA - dateB;
        });

        setResults(mappedResults.reverse());
        setBalance(b);
        setLoading(false);
      }
    };
    fetchResults();
  }, [update, script, sheet]);

  useEffect(() => {
    const fetchSheets = async () => {
      if (script) {
        const sheetsList = await getNames(script);

        const currentSheet = sheetsList[sheetsList.length - 1];
        setSheets(sheetsList);
        setSheet(currentSheet);
      }
    };
    fetchSheets();
  }, [script]);

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

  let pending1Sum = 0;

  results
    .filter((r) => r[2].value === "")
    .forEach((r) => {
      const o = r[6].value;
      const v = r[7].value;

      const isFree = String(r[3].value).split("").includes("1");

      let result = 0;

      if (isFree) {
        result = v * o - v; //
      } else {
        result = v * o;
      }

      return (pending1Sum += result);
    });

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
        sheet,
        setSheet,
        sheets,
        pending1Sum,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
