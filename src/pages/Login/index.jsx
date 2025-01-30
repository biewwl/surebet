import { useContext, useState } from "react";
import Logo from "../../components/Logo";
import { DataContext } from "../../context/DataContext";
import { getResults } from "../../api/get";
import { Icon } from "@iconify/react/dist/iconify.js";
import "./styles/Login.css";

function Login() {
  const [script, setScript] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(DataContext);

  const handleChange = ({ target }) => {
    setError(false);
    setScript(target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await getResults(script);
    setLoading(false);
    if (error) {
      setError(true);
    } else {
      login(script);
    }
  };

  return (
    <main className="login">
      <Logo />
      <form className="login__form content" onSubmit={handleSubmit}>
        <label htmlFor="script" className="login__form__label">
          <span className="login__form__label__text">AppScript</span>
          <input
            type="text"
            name="script"
            id="script"
            value={script}
            onChange={handleChange}
            className="login__form__label__input"
          />
        </label>
        {error && (
          <span className="login__form__error">Esta não é a url correta</span>
        )}
        {loading ? (
          <Icon
            icon="eos-icons:loading"
            className="login__form__loading"
          />
        ) : (
          <button
            type="submit"
            disabled={!script}
            className="login__form__button"
          >
            Entrar
          </button>
        )}
      </form>
    </main>
  );
}

export default Login;
