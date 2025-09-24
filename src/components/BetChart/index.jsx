import React, { useContext } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ThemeContext } from "../../context/ThemeContext";

ChartJS.register(ArcElement, Tooltip, Legend);

// Função para gerar gradientes invertidos para negativos
const generateGradientColors = (dataValues, positiveColor, negativeColor) => {
  const colors = [];

  dataValues.forEach((value, i) => {
    const isNegative = parseFloat(value) < 0;
    const baseColor = isNegative ? negativeColor : positiveColor;
    let [r, g, b] = baseColor.match(/\w\w/g).map((hex) => parseInt(hex, 16));

    // Inverter o fator para negativos
    const factor = isNegative
      ? 1 - i / dataValues.length
      : i / dataValues.length;

    const newR = Math.min(255, Math.round(r * (1 - factor) + 255 * factor));
    const newG = Math.min(255, Math.round(g * (1 - factor) + 255 * factor));
    const newB = Math.min(255, Math.round(b * (1 - factor) + 255 * factor));
    colors.push(`rgba(${newR}, ${newG}, ${newB}, 0.7)`);
  });

  return colors;
};

const PieChart = ({ dataArray }) => {
  const { theme } = useContext(ThemeContext);

  const dataValues = dataArray.map((item) => item[1].toFixed(2));
  const formattedLabels = dataArray.map((item) => item[0]);

  const data = {
    labels: formattedLabels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: generateGradientColors(dataValues, "#495aff", "#990000"),
        borderColor: theme === "light" ? "#eee" : "#000",
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 20,
          padding: 10,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `R$ ${dataValues[tooltipItem.dataIndex]}`,
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
