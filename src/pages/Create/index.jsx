import { useContext, useEffect, useState } from "react";
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
import {
  disabled,
  formatData,
  formatDataWithCol,
} from "../../utils/manageData";
import { postResult } from "../../api/post";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import SectionTitle from "../../components/SectionTitle";
import Loading from "../../components/Loading";
import { ThemeContext } from "../../context/ThemeContext";
import { EditContext } from "../../context/EditContext";
import { putResult } from "../../api/put";
import { sports } from "../../utils/sportIcons";
registerLocale("pt", pt);

function Create() {
  const { theme } = useContext(ThemeContext);
  const { lineEdit, edit, resetEdit } = useContext(EditContext);

  const params = new URLSearchParams(window.location.search);
  const dataParam = params.get("data");

  let initialData = {
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
    freebet: "",
  };

  if (dataParam) {
    try {
      const decodedData = decodeURIComponent(dataParam);
      const parsedData = JSON.parse(decodedData);
      initialData = {
        ...initialData,
        ...parsedData,
      };
    } catch (error) {
      console.error("Error parsing data parameter:", error);
    }
    const newUrl =
      window.location.origin + window.location.pathname + window.location.hash;
    window.history.replaceState(null, "", newUrl);
  }

  const [formData, setFormData] = useState(
    lineEdit ? formatDataWithCol(edit) : initialData
  );
  const [freebet, setFreebet] = useState(String(formData.freebet));

  const { updateData, script, sheet } = useContext(DataContext);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [option1BettingHouse, setOption1BettingHouse] = useState([]);
  const [option2BettingHouse, setOption2BettingHouse] = useState([]);
  const [option3BettingHouse, setOption3BettingHouse] = useState([]);

  const [selectedSport, setSelectedSport] = useState("");

  const keys = Object.keys(formData).slice(0, 11);

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
      description: data.description
        ? `${selectedSport} ${data.description}`
        : `${selectedSport} Time A x Time B - Resultado final`,
      option1: data.option1
        ? opt1Complete(data.option1)
        : opt1Complete("Time A"),
      option2: data.option2
        ? opt2Complete(data.option2)
        : opt2Complete("Empate"),
      option3: data.option3
        ? opt3Complete(data.option3)
        : opt3Complete("Time B"),
      price1: data.price1 ? parseFloat(data.price1) : 0,
      price2: data.price2 ? parseFloat(data.price2) : 0,
      price3: data.price3 ? parseFloat(data.price3) : 0,
      odd1: data.odd1 ? parseFloat(data.odd1) : 0,
      odd2: data.odd2 ? parseFloat(data.odd2) : 0,
      odd3: data.odd3 ? parseFloat(data.odd3) : 0,
      freebet,
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

    // return console.log(data);

    if (lineEdit) {
      await putResult(script, data, lineEdit, sheet);
    } else {
      await postResult(script, data, sheet);
    }

    updateData();
    setLoading(false);
    navigate("/");
  };

  useEffect(() => {
    const setEdition = () => {
      if (lineEdit || dataParam) {
        const editBettingHouse = formData.option1.split(" | ");
        const editBettingHouse2 = formData.option2.split(" | ");
        const editBettingHouse3 = formData.option3.split(" | ");

        setOption1BettingHouse(editBettingHouse.slice(0, -1));
        setOption2BettingHouse(editBettingHouse2.slice(0, -1));
        setOption3BettingHouse(editBettingHouse3.slice(0, -1));

        const sport = formData.description.match(/^::[A-Z]{3}::/)
          ? formData.description.match(/^::[A-Z]{3}::/)[0]
          : false;

        const newDescription = sport
          ? formData.description.replace(/^::[A-Z]{3}::/, "").trimStart()
          : formData.description.trimStart();

        setSelectedSport(sport);

        setFormData({
          ...formData,
          description: newDescription,
          option1: editBettingHouse[editBettingHouse.length - 1],
          option2: editBettingHouse2[editBettingHouse2.length - 1],
          option3: editBettingHouse3[editBettingHouse3.length - 1],
        });
      }
    };
    setEdition();
  }, [lineEdit]);

  useEffect(() => {
    return () => {
      resetEdit();
    };
  }, []);

  const sportsData = Object.entries(sports);

  const isSelectedSport = (s) => {
    if (s === selectedSport) return " --selected";
    return "";
  };

  const handleSelectSport = (s) => {
    setSelectedSport(s);
  };

  const freebetLabel = {
    3: 1,
    6: 2,
    9: 3,
  };

  const updateFreebet = (num) => {
    if (num < 1 || num > 3) return; // Apenas valores de 1 a 3 são permitidos

    let freebetArray = freebet.split("").sort(); // Garante que a string está ordenada
    const index = freebetArray.indexOf(num.toString());

    if (index !== -1) {
      // Remove o número caso já exista
      freebetArray.splice(index, 1);
    } else {
      // Adiciona o número mantendo a ordem
      freebetArray.push(num.toString());
      freebetArray.sort(); // Garante a ordem numérica
    }

    const newFreebet = freebetArray.join("");

    // Verifica se a combinação é válida antes de atualizar o estado
    const validCombinations = ["", "1", "2", "3", "12", "13", "23", "123"];
    if (validCombinations.includes(newFreebet)) {
      setFreebet(newFreebet);
    }
  };

  const isFreebet = (i) => freebet.includes(String(freebetLabel[i]));
  const classFreebet = (i) => {
    if (isFreebet(i)) return " --is-free";
    return "";
  };

  return (
    <main className="create">
      <Logo />
      {loading ? (
        <Loading />
      ) : (
        <div className={`create__section c-${theme}`}>
          <SectionTitle icon="line-md:plus-circle-twotone" title="Criar" />

          <div className="create__view">
            <TipCard
              data={{
                ...transformToNumber(formData),
                win: "",
                profit: "",
              }}
              view
            />
            <div className="create__view__sport">
              {sportsData.map((k) => {
                return (
                  <button
                    className={`create__view__sport__option bg-${theme}-2 c-${theme}${isSelectedSport(
                      k[0]
                    )}`}
                    onClick={() => handleSelectSport(k[0])}
                  >
                    <Icon icon={k[1].icon} />
                    {k[1].name}
                  </button>
                );
              })}
              <button
                className={`create__view__sport__option bg-${theme}-2 c-${theme}${isSelectedSport(
                  ""
                )}`}
                onClick={() => handleSelectSport("")}
              >
                Sem Decoração
              </button>
            </div>
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
                        selected={new Date(formData.date)}
                        onChange={(date) => setFormData({ ...formData, date })}
                        className={`create__view__inputs__label__input  bg-${theme} c-${theme}`}
                        locale="pt"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15} // Intervalo de 15 minutos para seleção de horário
                        timeCaption="Horário"
                        dateFormat="dd/MM/yyyy HH:mm"
                      />
                    )}
                  </label>
                  {(i === 3 || i === 6 || i === 9) && (
                    <div className="create__view__inputs__freebet">
                      <label
                        htmlFor={`free-${freebetLabel[i]}`}
                        className={`create__view__inputs__freebet__label bg-${theme}${classFreebet(
                          i
                        )}`}
                      >
                        <input
                          type="checkbox"
                          name={`free-${freebetLabel[i]}`}
                          id={`free-${freebetLabel[i]}`}
                          checked={isFreebet(i)}
                          onChange={() => updateFreebet(freebetLabel[i])}
                          className="create__view__inputs__freebet__label__input"
                        />
                        {
                          <Icon
                            icon="tabler:gift-filled"
                            className="create__view__inputs__freebet__label__icon"
                          />
                        }
                        Aposta Grátis
                      </label>
                    </div>
                  )}
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
                disabled={disabled({
                  ...formData,
                  option1BettingHouse,
                  option2BettingHouse,
                  option3BettingHouse,
                })}
                onClick={handleSubmit}
              >
                {lineEdit ? (
                  <>
                    Editar Evento
                    <Icon
                      icon="line-md:confirm-circle"
                      className="create__view__inputs__save__icon"
                    />
                  </>
                ) : (
                  <>
                    Criar Evento
                    <Icon
                      icon="line-md:plus-circle"
                      className="create__view__inputs__save__icon"
                    />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Create;
