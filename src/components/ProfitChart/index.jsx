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
import { DataContext } from "../../context/DataContext";
import { formatDate, parseDate } from "../../utils/formatDate.js";
import { groupAndSumByDate } from "../../utils/groupAndSumByDate.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProfitChart = ({ aspectRatio }) => {
  const { results } = useContext(DataContext);

  const [values, setValues] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const getData = () => {
      const mappedResults = results.map((r) => {
        const [date] = r;
        const value = r[9];

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
      return "#c1c1c1";
    } else if (v > 0) {
      return "#2097e670";
    } else {
      return "#c12a2a70";
    }
  });

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Valor em R$",
        data: values.map((value, index, array) => {
          if (index === 0 || index === array.length - 1) {
            return [0, value];
          } else {
            const prevSum = array
              .slice(0, index)
              .reduce((acc, curr) => acc + curr, 0);
            return [prevSum, prevSum + value];
          }
        }),
        backgroundColor: [...bg],
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
    },
    scales: {
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

  return <Bar data={data} options={options} />;
};

export default ProfitChart;
