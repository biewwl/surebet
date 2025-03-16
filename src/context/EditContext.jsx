import React, { createContext, useState } from "react";
export const EditContext = createContext();

// Crie um provedor de contexto
export const EditProvider = ({ children }) => {
  const [edit, setEdit] = useState({
    date: "",
    description: "",
    option1: "",
    price1: "",
    odd1: "",
    option2: "",
    price2: "",
    odd2: "",
    option3: "",
    price3: "",
    odd3: "",
  });
  const [lineEdit, setLineEdit] = useState(false);

  const createEdit = (data, line) => {
    setEdit(data);
    setLineEdit(line);
  };

  const resetEdit = () => {
    setEdit({
      date: "",
      description: "",
      option1: "",
      price1: "",
      odd1: "",
      option2: "",
      price2: "",
      odd2: "",
      option3: "",
      price3: "",
      odd3: "",
    });
    setLineEdit(false);
  }



  return (
    <EditContext.Provider value={{ createEdit, lineEdit, edit, resetEdit }}>{children}</EditContext.Provider>
  );
};
