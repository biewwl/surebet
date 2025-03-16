import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./styles/Logo.css";

function Logo() {
  const { theme } = useContext(ThemeContext);

  return (
    <Link to="/" className={`logo c-${theme}${theme === "light" ? "-1" : ""}`}>
      biewwl
      <span className="logo__dot">.</span>
      {/* <p className={`logo__slogan c-${theme}${theme === "light" ? "-1" : ""}`}>
        <span className="logo__slogan__sure">sure</span>bet
        {" + "}
        <span className="logo__slogan__sure">super</span>odds
      </p> */}
    </Link>
  );
}

export default Logo;
