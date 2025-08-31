import { Icon } from "@iconify/react/dist/iconify.js";
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import { ThemeContext } from "../../context/ThemeContext";
import { ModeContext } from "../../context/ModeContext";
import "./styles/Navigation.css";

function Navigation() {
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();
  const { logout, script } = useContext(DataContext);
  const { mode, setZen, setNormal } = useContext(ModeContext);
  const { theme, setDark, setLight, setAuto } = useContext(ThemeContext);

  const navLinks = [
    {
      path: "/create",
      icon: "gridicons:create",
      title: "Criar",
    },
    {
      path: "/bet-houses",
      icon: "fluent-mdl2:website",
      title: "Casas de Apostas",
    },
    {
      path: "/",
      icon: "iconamoon:home-duotone",
      title: "Início",
    },
  ];

  const nonZenLinks = [
    {
      path: "/profit-graph",
      icon: "uil:list-ol",
      title: "Lucro por casa",
    },
    {
      path: "/graph",
      icon: "material-symbols:waterfall-chart",
      title: "Gráfico",
    },
  ];

  const filteredNavLinks =
    mode === "zen" ? navLinks : [...navLinks, ...nonZenLinks];

  const handleOpen = () => setOpen(!open);

  const filteredLinks = filteredNavLinks.filter((l) => l.path !== pathname);

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  return (
    <div className="navigation__container">
      <button
        onClick={handleOpen}
        className={`navigation__item content bg-${theme} c-${theme}`}
      >
        {!open && <Icon icon="si:grid-duotone" className="navigation__item__icon --menu" />}
        {open && (
          <Icon
            icon="material-symbols:close-rounded"
            className="navigation__item__icon --menu --close"
          />
        )}
      </button>
      {open && (
        <nav className={`navigation content bg-${theme}-2`}>
          <>
            {script && (
              <button
                className={`navigation__item bg-${theme} --logout`}
                onClick={handleLogout}
              >
                <Icon
                  icon="solar:logout-line-duotone"
                  className="navigation__item__icon"
                />
                <span className="navigation__item__title">Sair</span>
              </button>
            )}
            {!script && pathname !== "/login" && (
              <Link
                className={`navigation__item bg-${theme} --login`}
                to={"/login"}
                onClick={handleOpen}
              >
                <Icon
                  icon="solar:login-line-duotone"
                  className="navigation__item__icon"
                />
                <span className="navigation__item__title">Login</span>
              </Link>
            )}
            <div className={`navigation__theme`}>
              {theme !== "light" && (
                <button
                  className={`navigation__item bg-${theme} c-${theme}`}
                  onClick={setLight}
                >
                  <Icon
                    icon="line-md:sun-rising-loop"
                    className="navigation__item__icon --light"
                  />
                  <span className="navigation__item__title">Claro</span>
                </button>
              )}
              {theme !== "dark" && (
                <button
                  className={`navigation__item bg-${theme} c-${theme}`}
                  onClick={setDark}
                >
                  <Icon
                    icon="line-md:moon-rising-loop"
                    className="navigation__item__icon --dark"
                  />
                  <span className="navigation__item__title">Escuro</span>
                </button>
              )}
              <button
                className={`navigation__item bg-${theme} c-${theme}`}
                onClick={setAuto}
              >
                <Icon
                  icon="ic:twotone-hdr-auto"
                  className="navigation__item__icon"
                />
              </button>
            </div>
            {script &&
              filteredLinks.map(({ icon, path, title }, i) => {
                return (
                  <Link
                    to={path}
                    className={`navigation__item bg-${theme} c-${theme}`}
                    onClick={() => setOpen(false)}
                    key={i}
                  >
                    <Icon icon={icon} className="navigation__item__icon" />
                    <span className="navigation__item__title">{title}</span>
                  </Link>
                );
              })}
            {pathname !== "/calculate" && (
              <Link
                className={`navigation__item bg-${theme} --calculate`}
                to="/calculate"
                onClick={handleOpen}
              >
                <Icon
                  icon="fluent:math-symbols-20-filled"
                  className="navigation__item__icon"
                />
                <span className={`navigation__item__title c-${theme}`}>
                  Calcular
                </span>
              </Link>
            )}
            {script && mode === "normal" && (
              <button
                className={`navigation__item bg-zen-${theme} --zen`}
                onClick={setZen}
              >
                <Icon
                  icon="solar:meditation-round-line-duotone"
                  className="navigation__item__icon"
                />
                <span className="navigation__item__title">Modo Zen</span>
              </button>
            )}
            {script && mode === "zen" && (
              <button
                className={`navigation__item bg-${theme}`}
                onClick={setNormal}
              >
                <Icon
                  icon="ph:lightning-duotone"
                  className="navigation__item__icon"
                />
                <span className={`navigation__item__title c-${theme}`}>
                  Modo Normal
                </span>
              </button>
            )}
          </>
        </nav>
      )}
    </div>
  );
}

export default Navigation;
