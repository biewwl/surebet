import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import "./styles/SheetController.css";
import { ThemeContext } from "../../context/ThemeContext";
import { Icon } from "@iconify/react/dist/iconify.js";

function SheetController() {

  const { sheet, setSheet, sheets } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);

  console.log(sheets);
  

  const selectedClass = (s) => (sheet === s ? " --selected" : "");

  return (
    <section className="sheet-controller">
      {sheets.map((s, index) => (
        <button
          key={index}
          onClick={() => setSheet(s)}
          className={`sheet-controller__option${selectedClass(
            s
          )} content c-${theme}`}
        >
          <Icon icon="lets-icons:date-today-duotone"/>
          {s}
        </button>
      ))}
    </section>
  );
}

export default SheetController;
