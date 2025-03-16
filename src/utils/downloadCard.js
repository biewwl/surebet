import domtoimage from "dom-to-image-more";

export const downloadCard = (i, title) => {
  const tipCard = document.querySelector(`.tip-card.--${i}`);

  if (tipCard) {
    domtoimage
      .toPng(tipCard, { quality: 1, scale: 2 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${title}.png`;
        link.click();
        // newElement.style.borderRadius = "0.5em";
      })
      .catch((err) => {
        console.error("Erro ao salvar a imagem:", err);
      });
  }
};
