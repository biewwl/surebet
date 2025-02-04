import { Link } from "react-router-dom";
import "./styles/Logo.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function Logo() {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <Link to="/" className={`logo c-${theme}-1`}>
      biewwl
      <p className={`logo__slogan c-${theme}-1`}>
        <span className="logo__slogan__sure">sure</span>bet
      </p>
    </Link>
  );
}

export default Logo;
