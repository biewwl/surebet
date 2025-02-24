import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import "./styles/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  const { script, logout } = useContext(DataContext);

  return (
    <footer className="footer">
      <p>© Copyright 2025 biewwl, All rights reserved.</p>
      {script ? (
        <button className="footer__logout" onClick={logout}>
          Sair.
        </button>
      ) : (
        <Link to="/guide">Quero criar uma conta.</Link>
      )}
    </footer>
  );
}

export default Footer;
