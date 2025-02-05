import { Icon } from "@iconify/react/dist/iconify.js";
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/Navigation.css";
import { DataContext } from "../../context/DataContext";
import { ThemeContext } from "../../context/ThemeContext";

function Navigation() {
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();
  const { logout } = useContext(DataContext);
  const { theme, setDark, setLight, setAuto } = useContext(ThemeContext);

  const navLinks = [
    {
      path: "/graph",
      icon: "material-symbols:waterfall-chart",
      title: "Gráfico",
    },
    {
      path: "/create",
      icon: "gridicons:create",
      title: "Criar",
    },
    {
      path: "/",
      icon: "iconamoon:home-duotone",
      title: "Início",
    },
  ];

  const handleOpen = () => setOpen(!open);

  const filteredLinks = navLinks.filter((l) => l.path !== pathname);

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  return (
    <nav className="navigation">
      <button
        onClick={handleOpen}
        className={`navigation__item content c-${theme}`}
      >
        {!open && <Icon icon="line-md:close-to-menu-alt-transition" />}
        {open && (
          <Icon
            icon="line-md:menu-to-close-alt-transition"
            className="navigation__item__icon --close"
          />
        )}
      </button>
      {open && (
        <>
          {pathname !== "/login" && (
            <button
              className="navigation__item content --logout"
              onClick={handleLogout}
            >
              <Icon
                icon="solar:logout-line-duotone"
                className="navigation__item__icon"
              />
              <span className="navigation__item__title">Sair</span>
            </button>
          )}
          <div className={`navigation__theme`}>
            {theme !== "light" && (
              <button
                className={`navigation__item content c-${theme}`}
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
                className={`navigation__item content c-${theme}`}
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
              className={`navigation__item content c-${theme}`}
              onClick={setAuto}
            >
              <Icon
                icon="ic:twotone-hdr-auto"
                className="navigation__item__icon"
              />
            </button>
          </div>
          {pathname !== "/login" &&
            filteredLinks.map(({ icon, path, title }, i) => {
              return (
                <Link
                  to={path}
                  className={`navigation__item content c-${theme}`}
                  onClick={() => setOpen(false)}
                  key={i}
                >
                  <Icon icon={icon} className="navigation__item__icon" />
                  <span className="navigation__item__title">{title}</span>
                </Link>
              );
            })}
        </>
      )}
    </nav>
  );
}

export default Navigation;
