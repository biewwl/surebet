import { Link } from "react-router-dom";
import "./styles/Logo.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function Logo() {
  const { theme } = useContext(ThemeContext);

  return (
    <Link to="/" className={`logo c-${theme}-1`}>
      biewwl
      <p className={`logo__slogan c-${theme}-1`}>
        <span className="logo__slogan__sure">sure</span>bet
        {" + "}
        <span className="logo__slogan__sure">super</span>odds
      </p>
    </Link>
  );
}

export default Logo;
