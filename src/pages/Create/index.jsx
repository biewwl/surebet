import { useContext, useState } from "react";
import "./styles/Create.css";
import Logo from "../../components/Logo";
import TipCard from "../../components/TipCard";
import { Icon } from "@iconify/react/dist/iconify.js";
// import { formatDate } from "../../utils/formatDate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { registerLocale } from "react-datepicker";
import { pt } from "date-fns/locale/pt";
import { allLogos } from "../../utils/getLogo";
import { disabled, formatData } from "../../utils/manageData";
import { postResult } from "../../api/post";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import SectionTitle from "../../components/SectionTitle";
import Loading from "../../components/Loading";
import { ThemeContext } from "../../context/ThemeContext";
registerLocale("pt", pt);

function Create() {
  const [formData, setFormData] = useState({
    date: new Date(),
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

  const {
    updateData,
    script,
    loading: loadingD,
    sheet,
  } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [option1BettingHouse, setOption1BettingHouse] = useState([]);
  const [option2BettingHouse, setOption2BettingHouse] = useState([]);
  const [option3BettingHouse, setOption3BettingHouse] = useState([]);

  const keys = Object.keys(formData);

  const handleChange = ({ target }) => {
    const nameEqual = (v) => target.name === v;

    if (
      nameEqual("price1") ||
      nameEqual("price2") ||
      nameEqual("odd1") ||
      nameEqual("odd2") ||
      nameEqual("price3") ||
      nameEqual("odd3")
    ) {
      let value = target.value.replace(",", "."); // Substitui vírgulas por pontos
      if (!isNaN(value) || value === ".") {
        setFormData({ ...formData, [target.name]: value });
      }
    } else {
      setFormData({ ...formData, [target.name]: target.value });
    }
  };

  const opt1Complete = (v) => `${option1BettingHouse.join(" | ")} | ${v}`;
  const opt2Complete = (v) => `${option2BettingHouse.join(" | ")} | ${v}`;
  const opt3Complete = (v) => `${option3BettingHouse.join(" | ")} | ${v}`;

  const transformToNumber = (data) => {
    return {
      ...data,
      description: data.description ? data.description : "Jogador A - gols",
      option1: data.option1 ? opt1Complete(data.option1) : opt1Complete("0"),
      option2: data.option2 ? opt2Complete(data.option2) : opt2Complete("0"),
      option3: data.option3 ? opt3Complete(data.option3) : opt3Complete("0"),
      price1: data.price1 ? parseFloat(data.price1) : 0,
      price2: data.price2 ? parseFloat(data.price2) : 0,
      price3: data.price3 ? parseFloat(data.price3) : 0,
      odd1: data.odd1 ? parseFloat(data.odd1) : 1,
      odd2: data.odd2 ? parseFloat(data.odd2) : 1,
      odd3: data.odd3 ? parseFloat(data.odd3) : 1,
    };
  };

  const labels = [
    { text: "Data", icon: "lets-icons:date-today-duotone" },
    { text: "Descrição", icon: "solar:document-text-line-duotone" },
    { text: "Opção 1", icon: "ic:round-fork-left" },
    { text: "Valor Aposta 1", icon: "solar:dollar-line-duotone" },
    { text: "Odd 1", icon: "mynaui:math-solid" },
    { text: "Opção 2", icon: "ic:round-fork-left" },
    { text: "Valor Aposta 2", icon: "solar:dollar-line-duotone" },
    { text: "Odd 2", icon: "mynaui:math-solid" },
    { text: "Opção 3", icon: "ic:round-fork-left" },
    { text: "Valor Aposta 3", icon: "solar:dollar-line-duotone" },
    { text: "Odd 3", icon: "mynaui:math-solid" },
  ];

  const handleSelectBetting = (name, i) => {
    if (i === 2) {
      if (option1BettingHouse.some((b) => b === name)) {
        setOption1BettingHouse(option1BettingHouse.filter((b) => b !== name));
      } else {
        setOption1BettingHouse([...option1BettingHouse, name]);
      }
    } else if (i === 5) {
      if (option2BettingHouse.some((b) => b === name)) {
        setOption2BettingHouse(option2BettingHouse.filter((b) => b !== name));
      } else {
        setOption2BettingHouse([...option2BettingHouse, name]);
      }
    } else if (i === 8) {
      if (option3BettingHouse.some((b) => b === name)) {
        setOption3BettingHouse(option3BettingHouse.filter((b) => b !== name));
      } else {
        setOption3BettingHouse([...option3BettingHouse, name]);
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data = formatData(transformToNumber(formData));
    await postResult(script, data, sheet);
    updateData();
    setLoading(false);
    navigate("/");
  };

  return (
    <main className="create">
      <Logo />
      {loadingD || loading ? (
        <Loading />
      ) : (
        <div className={`create__section c-${theme}`}>
          <SectionTitle icon="line-md:plus-circle-twotone" title="Criar" />

          <div className="create__view">
            <TipCard
              data={{ ...transformToNumber(formData), win: "", profit: "" }}
              view
            />
            <div className="create__view__inputs content">
              {keys.map((k, i) => (
                <>
                  <label
                    htmlFor={k}
                    key={i}
                    className="create__view__inputs__label"
                  >
                    <span className="create__view__inputs__label__text">
                      <Icon
                        icon={labels[i].icon}
                        className="create__view__inputs__label__text__icon"
                      />
                      {labels[i].text}
                    </span>
                    {i !== 0 ? (
                      <input
                        type={i === 0 ? "datetime-local" : "text"}
                        name={k}
                        id={k}
                        value={formData[k]}
                        onChange={handleChange}
                        className={`create__view__inputs__label__input bg-${theme} c-${theme}`}
                      />
                    ) : (
                      <DatePicker
                        selected={formData.date}
                        onChange={(date) => setFormData({ ...formData, date })}
                        className={`create__view__inputs__label__input  bg-${theme} c-${theme}`}
                        locale="pt"
                        dateFormat="dd/MM/YYYY"
                      />
                    )}
                  </label>
                  {(i === 2 || i === 5 || i === 8) && (
                    <div className="create__view__inputs__betting-options">
                      {Object.entries(allLogos).map((l, index) => {
                        const [name, logo] = l;
                        const selected =
                          (i === 2 &&
                            option1BettingHouse.some((b) => b === name)) ||
                          (i === 5 &&
                            option2BettingHouse.some((b) => b === name)) ||
                          (i === 8 &&
                            option3BettingHouse.some((b) => b === name));
                        const selectedC = selected ? "" : " --not-selected";
                        return (
                          <div
                            className={`create__view__inputs__betting-options__option${selectedC}`}
                            key={`${name}${i}`}
                            onClick={() => handleSelectBetting(name, i)}
                          >
                            <img
                              src={logo}
                              alt={`name ${index}`}
                              className="create__view__inputs__betting-options__option__logo"
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              ))}
              <button
                className={`create__view__inputs__save c-${theme}-2`}
                disabled={disabled({ ...formData, option1BettingHouse })}
                onClick={handleSubmit}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Create;
