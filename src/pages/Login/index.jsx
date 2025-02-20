import { useContext, useState } from "react";
import Logo from "../../components/Logo";
import { DataContext } from "../../context/DataContext";
// import { getResults } from "../../api/get";
import { Icon } from "@iconify/react/dist/iconify.js";
import "./styles/Login.css";
import { ThemeContext } from "../../context/ThemeContext";
import lS from "manager-local-storage";
import { formatDate, parseDate } from "../../utils/formatDate";
import { get, getNames } from "../../api/get";

function Login() {
  const [script, setScript] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savedScripts, setSavedScripts] = useState(
    lS.get("*biewwl-app-scripts*") ?? []
  );

  const { login } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);

  const handleChange = ({ target }) => {
    setError(false);
    setScript(target.value);
  };

  const handleSubmit = async (e, saved) => {
    e.preventDefault();
    setLoading(true);

    const s = saved ?? script;

    try {
      await getNames(script);
      login(s);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  const handleDeleteSaved = (s) => {
    const current = lS.get("*biewwl-app-scripts*");
    const newSaved = current.filter((c) => c.script !== s);
    if (newSaved.length === 0) {
      lS.remove("*biewwl-app-scripts*");
    } else {
      lS.set("*biewwl-app-scripts*", newSaved);
    }
    setSavedScripts(newSaved);
  };

  return (
    <main className={`login c-${theme}`}>
      <Logo />

      <form className="login__form content" onSubmit={(e) => handleSubmit(e)}>
        {!loading && (
          <label htmlFor="script" className="login__form__label">
            <span className="login__form__label__text">AppScript</span>
            <input
              type="text"
              name="script"
              id="script"
              value={script}
              onChange={handleChange}
              className={`login__form__label__input bg-${theme} c-${theme}`}
            />
          </label>
        )}
        {error && (
          <span className="login__form__error">Esta não é a url correta</span>
        )}
        {loading ? (
          <Icon icon="eos-icons:loading" className="login__form__loading" />
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
      <div className="login__saved">
        {savedScripts.map((s, i) => (
          <div className={`login__saved__item content`} key={i}>
            <button
              className={`login__saved__item__button  c-${theme}`}
              onClick={(e) => handleSubmit(e, s.script)}
            >
              <Icon
                icon="lets-icons:key-alt-duotone"
                className="login__saved__item__button__icon"
              />

              <span className="login__saved__item__date">
                {formatDate(s.date)}
              </span>
            </button>
            <button
              className="login__saved__item__delete"
              onClick={() => handleDeleteSaved(s.script)}
            >
              <Icon icon="line-md:close" />
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Login;
