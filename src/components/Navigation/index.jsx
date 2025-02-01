import { Icon } from "@iconify/react/dist/iconify.js";
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/Navigation.css";
import { DataContext } from "../../context/DataContext";

function Navigation() {
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();
  const { logout } = useContext(DataContext);

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

  const component = (
    <nav className="navigation">
      <button onClick={handleOpen} className="navigation__item content">
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
          {filteredLinks.map(({ icon, path, title }, i) => {
            return (
              <Link
                to={path}
                className="navigation__item content"
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

  return pathname !== "/login" ? component : null;
}

export default Navigation;
