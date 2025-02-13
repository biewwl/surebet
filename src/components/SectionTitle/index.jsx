import { Icon } from "@iconify/react/dist/iconify.js";
import "./styles/SectionTitle.css";

function SectionTitle({ icon, title, onCLick }) {
  return (
    <h2 className="section-title" onCLick={onCLick}>
      <Icon icon={icon} className="section-title__icon" />
      <span className="section-title__text">{title}</span>
    </h2>
  );
}

export default SectionTitle;
