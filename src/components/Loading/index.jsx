import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./styles/Loading.css";
import { Icon } from "@iconify/react/dist/iconify.js";

function Loading({ counter }) {
  const [time, setTime] = useState(0);
  const [showMessage, setShowMessage] = useState(false); // Novo estado para controlar a mensagem

  useEffect(() => {
    const startTime = performance.now();
    const interval = setInterval(() => {
      const now = performance.now();
      const elapsedTime = now - startTime;
      setTime(elapsedTime);
      if (elapsedTime > 15000) {
        setShowMessage(true); // Exibe a mensagem se ultrapassar 15 segundos
        clearInterval(interval); // Para o contador
      }
    }, 10); // Atualiza a cada 10ms para maior precisão

    return () => clearInterval(interval); // Limpa o intervalo quando o componente desmonta
  }, []);

  const formattedTime = `${Math.floor(time / 1000)}.${(time % 1000)
    .toFixed(0)
    .padStart(3, "0")}s`;

  const { theme } = useContext(ThemeContext);

  return (
    <div className="loading">
      <Icon
        className="loading__icon"
        icon="mdi:thunder"
        width="512"
        height="512"
      />

      {counter && (
        <>
          {showMessage ? ( // Mostra a mensagem ou o contador baseado no estado
            <div className={`loading__count --message c-${theme}`}>
              O processo está levando mais tempo que o esperado. Por favor,
              aguarde ou recarregue a página.
            </div>
          ) : (
            <div className={`loading__count c-${theme}`}>{formattedTime}</div>
          )}
        </>
      )}
    </div>
  );
}

export default Loading;
