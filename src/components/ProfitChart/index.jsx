import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { DataContext } from "../../context/DataContext";
import { formatDate, parseDate } from "../../utils/formatDate.js";
import { groupAndSumByDate } from "../../utils/groupAndSumByDate.js";
import "./styles/ProfitChart.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ThemeContext } from "../../context/ThemeContext.jsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const ProfitChart = ({ aspectRatio, n }) => {
  const { results } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);

  const [values, setValues] = useState([]);
  const [dates, setDates] = useState([]);
  const [zoom, setZoom] = useState(7);
  const [pan, setPan] = useState(false);

  useEffect(() => {
    const getData = () => {
      const newResults = results.map((r1) => {
        const newR = r1.map((r2) => r2.value);
        return [...newR];
      });

      const mappedResults = newResults.map((r) => {
        const [date] = r;
        const value = r[12];

        const extDate = formatDate(date);

        return {
          date: parseDate(extDate),
          value,
        };
      });

      const groupData = groupAndSumByDate(mappedResults);

      const d = [];
      const v = [];

      groupData.forEach((g) => {
        const { value, date } = g;
        d.push(date);
        v.push(value);
      });

      if (v.length > 0) {
        const totalValue = v.reduce((p, c) => p + c);

        const newValues = [...v, totalValue];
        const newDates = [...d, "Subtotal"];

        setDates(newDates);
        return setValues(newValues);
      }
    };
    getData();
  }, [results]);

  // useEffect(() => {

  // }, [values, dates]);

  const bg = [...values].map((v, i, a) => {
    if (i === a.length - 1) {
      return "#c1c1c170";
    } else if (v > 0) {
      return "#495aff70";
    } else {
      return "#c12a2a70";
    }
  });

  const bd = [...values].map((v, i, a) => {
    if (i === a.length - 1) {
      return "#c1c1c1";
    } else if (v > 0) {
      return "#495aff";
    } else {
      return "#c12a2a";
    }
  });

  const data = values.map((value, index, array) => {
    if (index === 0 || index === array.length - 1) {
      return [0, value];
    } else {
      const prevSum = array
        .slice(0, index)
        .reduce((acc, curr) => acc + curr, 0);
      return [prevSum, prevSum + value];
    }
  });

  const DATA = {
    labels: dates,
    datasets: [
      {
        label: "Valor em R$",
        data,
        barThickness: "flex",
        // minBarLength: 20,
        backgroundColor: [...bg],
        borderColor: [...bd],
        borderWidth: 1,
        borderRadius: 5,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            if (context.raw && Array.isArray(context.raw)) {
              const [start, end] = context.raw;
              return `R$ ${(end - start).toFixed(2)}`;
            }
            return label;
          },
        },
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: false,
            speed: 0.001, // Reduzindo ainda mais a velocidade do zoom
          },
          pinch: {
            enabled: false,
            speed: 0.001, // Reduzindo ainda mais a velocidade do zoom por pinça
          },
          mode: "x",
          rangeMin: {
            x: 0,
          },
          rangeMax: {
            x: dates.length - 1,
          },
        },
        pan: {
          enabled: pan,
          mode: "x",
          speed: 0.05, // Reduzindo a velocidade do arrasto
        },
        limits: {
          x: { min: 0, max: dates.length - 1 },
        },
      },
    },
    scales: {
      x: {
        min: dates.length - (dates.length - zoom),
        max: dates.length - 1,
        grid: {
          display: false, // Adicione esta linha para remover as linhas de grade no eixo x
        },
        ticks: {
          display: false, // Remover as legendas no eixo x
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `R$ ${value}`;
          },
        },
      },
    },
    aspectRatio,
  };

  const addOneColumn = () => {
    if (zoom === values.length - 1) {
      return;
    }
    setZoom(zoom + 1);
  };

  const removeOneColumn = () => {
    if (zoom === 0) {
      return;
    }
    setZoom(zoom - 1);
  };

  const handleZoom = ({ target }) => {
    setZoom(parseInt(target.value, 10));
  };

  return (
    <div className="profit-chart">
      <Bar data={DATA} options={options} />
      <input
        type="range"
        value={zoom}
        min={0}
        max={values.length - 1}
        onChange={handleZoom}
        className="profit-chart__zoom"
      />
      <div className="profit-chart__controls">
        <button
          onClick={removeOneColumn}
          className={`profit-chart__controls__item bg-${theme} c-${theme}`}
        >
          <Icon icon="si:zoom-out-duotone" />
        </button>
        <button
          onClick={addOneColumn}
          className={`profit-chart__controls__item bg-${theme} c-${theme}`}
        >
          <Icon icon="si:zoom-in-duotone" />
        </button>
        <button
          onClick={() => setPan(!pan)}
          className={`profit-chart__controls__item bg-${theme} c-${theme}${
            pan ? " --selected" : ""
          }`}
        >
          <Icon icon="hugeicons:hold-02" />
        </button>
      </div>
    </div>
  );
};

export default ProfitChart;
