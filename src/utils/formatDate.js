export function formatDate(dateString) {
  // Crie um objeto Date a partir da string ISO 8601
  const date = new Date(dateString);

  // Obtenha a data de hoje
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Zere as horas, minutos, segundos e milissegundos

  // Obtenha a data de ontem
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Obtenha a data de amanhã
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // Obtenha as horas e minutos
  const hours = date.getHours().toString().padStart(2, "0"); // Formata as horas com dois dígitos
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Formata os minutos com dois dígitos
  const timeString = `às ${hours}:${minutes}`;

  // Compare a data fornecida com hoje, ontem e amanhã
  if (date.toDateString() === today.toDateString()) {
    return `Hoje ${timeString}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return `Ontem ${timeString}`;
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return `Amanhã ${timeString}`;
  }

  // Opções para formatação da data
  const options = { day: "numeric", month: "long", year: "numeric" };

  // Formate a data para uma string por extenso
  const formattedDate = date.toLocaleDateString("pt-BR", options);

  return `${formattedDate} ${timeString}`;
}

export function parseDate(dateString, all = false) {
  const months = {
    janeiro: 0,
    fevereiro: 1,
    março: 2,
    abril: 3,
    maio: 4,
    junho: 5,
    julho: 6,
    agosto: 7,
    setembro: 8,
    outubro: 9,
    novembro: 10,
    dezembro: 11,
  };

  // Função auxiliar para formatar a data em dd/mm
  function formatDate(date) {
    const dayStr = String(date.getDate()).padStart(2, "0");
    const monthStr = String(date.getMonth() + 1).padStart(2, "0"); // Mês é zero-based
    return `${dayStr}/${monthStr}`;
  }

  // Verificar se a string contém horário ("às hh:mm")
  let timePart = "";
  if (dateString.includes(" às ")) {
    const parts = dateString.split(" às ");
    dateString = parts[0];
    timePart = parts[1]; // Pega a parte do horário
  }

  // Verificar se a string é "Hoje", "Ontem" ou "Amanhã"
  if (
    dateString.toLowerCase() === "hoje" ||
    dateString.toLowerCase() === "ontem" ||
    dateString.toLowerCase() === "amanhã"
  ) {
    if (all) {
      const today = new Date();
      let date;
      if (dateString.toLowerCase() === "hoje") {
        date = today;
      } else if (dateString.toLowerCase() === "ontem") {
        date = new Date(today);
        date.setDate(today.getDate() - 1);
      } else if (dateString.toLowerCase() === "amanhã") {
        date = new Date(today);
        date.setDate(today.getDate() + 1);
      }
      return timePart ? `${formatDate(date)} ${timePart}` : formatDate(date);
    }
    return dateString;
  }

  const dateParts = dateString.split(" de ");
  const day = parseInt(dateParts[0], 10);
  const month = months[dateParts[1].toLowerCase()];
  const year = parseInt(dateParts[2], 10);

  const date = new Date(year, month, day);

  return timePart ? `${formatDate(date)} ${timePart}` : formatDate(date);
}
