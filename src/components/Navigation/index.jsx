import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/Navigation.css";

function Navigation() {
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

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
      {open &&
        filteredLinks.map(({ icon, path, title }, i) => {
          return (
            <Link
              to={path}
              className="navigation__item content"
              onClick={() => setOpen(false)}
              key={i}
            >
              <Icon icon={icon} className="navigation__item__icon" />
              <span className="navigation__item__icon__title">{title}</span>
            </Link>
          );
        })}
    </nav>
  );

  return pathname !== "login" ? component : null;
}

export default Navigation;
