import { Icon } from "@iconify/react/dist/iconify.js";
import "./styles/SectionTitle.css";

function SectionTitle({ icon, title}) {
  return (
    <h2 className="section-title">
      <Icon icon={icon} className="section-title__icon" />
      <span className="section-title__text">{title}</span>
    </h2>
  );
}

export default SectionTitle;
