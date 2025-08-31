import React, { useContext } from "react";
import { Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ThemeContext } from "../../context/ThemeContext";

ChartJS.register(ArcElement, Tooltip, Legend);

// Função para gerar gradientes de cores dinamicamente
const generateGradientColors = (baseColor, totalColors) => {
  const colors = [];
  let [r, g, b] = baseColor.match(/\w\w/g).map((hex) => parseInt(hex, 16)); // Converter hex para RGB

  for (let i = 0; i < totalColors; i++) {
    const factor = i / totalColors; // Gradiente baseado no índice
    const newR = Math.min(255, Math.round(r * (1 - factor) + 255 * factor)); // Mesclar com branco
    const newG = Math.min(255, Math.round(g * (1 - factor) + 255 * factor));
    const newB = Math.min(255, Math.round(b * (1 - factor) + 255 * factor));
    colors.push(`rgba(${newR}, ${newG}, ${newB}, 0.6)`); // Adicionar opacidade de 0.6
  }

  return colors;
};

const PieChart = ({ dataArray }) => {
  const { theme } = useContext(ThemeContext);

  // Processar o array de arrays para extrair labels e valores como inteiros
  // const labels = dataArray.map((item) => item[0]); // Extrair as legendas
  const dataValues = dataArray.map((item) => item[1].toFixed(2)); // Arredondar os valores para inteiros

  // Labels formatadas com "R$"
  const formattedLabels = dataArray.map(
    (item) => item[0]
  );

  // Configuração do gráfico
  const data = {
    labels: formattedLabels, // Inserir as legendas formatadas com R$
    datasets: [
      {
        data: dataValues, // Valores inteiros
        backgroundColor: generateGradientColors("#495aff", dataArray.length), // Cores dinamicamente geradas
        borderColor: theme === "light" ? "#eee" : "#000", // Bordas com opacidade 1
        borderWidth: 0,
        // borderRadius: 15,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 20, // Ajusta o tamanho da caixa da legenda
          padding: 10, // Espaçamento entre a legenda e o gráfico
        },
      },
      tooltip: {
        callbacks: {
          // Customizar o tooltip para exibir "R$" e valores inteiros
          label: (tooltipItem) => `R$ ${dataValues[tooltipItem.dataIndex]}`,
        },
      },
    },
    
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
