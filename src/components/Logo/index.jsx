import { Link } from "react-router-dom";
import "./styles/Logo.css";

function Logo() {
  return (
    <Link to="/" className="logo">
      biewwl
      <p className="logo__slogan">
        <span className="logo__slogan__sure">sure</span>bet
      </p>
    </Link>
  );
}

export default Logo;
