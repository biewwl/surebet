import { useContext } from "react";
import "./styles/Footer.css";
import { DataContext } from "../../context/DataContext";

function Footer() {
  const { script, logout } = useContext(DataContext);

  return (
    <footer className="footer">
      <p>© Copyright 2025 biewwl, All rights reserved.</p>
      {script && (
        <button className="footer__logout" onClick={logout}>
          Sair.
        </button>
      )}
    </footer>
  );
}

export default Footer;
