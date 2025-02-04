import React, { createContext, useState } from "react";
import lS from "manager-local-storage";
// Crie o contexto
export const ThemeContext = createContext();

// Crie um provedor de contexto
export const ThemeProvider = ({ children }) => {
  const LS_KEY = "*biewwl-theme*";

  const preferDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const autoTheme = preferDark ? "dark" : "light";

  const initialTheme = lS.get(LS_KEY) ?? autoTheme;

  const [theme, setTheme] = useState(initialTheme);

  const setDark = () => {
    setTheme("dark");
    lS.set(LS_KEY, "dark");
  };

  const setLight = () => {
    setTheme("light");
    lS.set(LS_KEY, "light");
  };

  const setAuto = () => {
    setTheme(autoTheme);
    lS.remove(LS_KEY);
  };

  return (
    <ThemeContext.Provider value={{ theme, setDark, setLight, setAuto }}>
      {children}
    </ThemeContext.Provider>
  );
};
