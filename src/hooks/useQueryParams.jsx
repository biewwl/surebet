import { useEffect, useState } from "react";

const useQueryParams = () => {
  const [dataObject, setDataObject] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dataParam = params.get("data");

    if (dataParam) {
      try {
        const decodedData = decodeURIComponent(dataParam);
        const parsedData = JSON.parse(decodedData);
        setDataObject(parsedData);
      } catch (error) {
        console.error("Erro ao analisar o parâmetro:", error);
      }
    }
  }, []);

  return dataObject;
};

export default useQueryParams;
