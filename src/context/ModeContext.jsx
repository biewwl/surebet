import React, { createContext, useState } from "react";
import lS from "manager-local-storage";
// Crie o contexto
export const ModeContext = createContext();

// Crie um provedor de contexto
export const ModeProvider = ({ children }) => {
  const LS_KEY = "*biewwl-mode*";

  const initialMode = lS.get(LS_KEY) ?? "normal";

  const [mode, setMode] = useState(initialMode);

  const setZen = () => {
    setMode("zen");
    lS.set(LS_KEY, "zen");
  };

  const setNormal = () => {
    setMode("normal");
    lS.set(LS_KEY, "normal");
  };

  return (
    <ModeContext.Provider value={{ mode, setZen, setNormal }}>
      {children}
    </ModeContext.Provider>
  );
};
