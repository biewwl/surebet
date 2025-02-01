import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import "./styles/Footer.css";

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
