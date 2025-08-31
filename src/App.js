import Home from "./pages/Home";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Graph from "./pages/Graph";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Create from "./pages/Create_new";
import { useContext, useEffect } from "react";
import { DataContext } from "./context/DataContext";
import Login from "./pages/Login";
import { getNames } from "./api/get";
import Navigation from "./components/Navigation";
import { ThemeContext } from "./context/ThemeContext";
import { Helmet } from "react-helmet";
import Calculate from "./pages/Calculate";
import Help from "./pages/Help";
import ProfitByBet from "./pages/ProfitByBet_new";
import { ModeContext } from "./context/ModeContext";
import BetHouses from "./pages/BetHouses";
import "./App.css";

function PrivateRoute({ element, script, ...rest }) {
  return script ? element : <Navigate to="/login" />;
}

function PublicRoute({ element, script, ...rest }) {
  return !script ? element : <Navigate to="/" />;
}

function App() {
  const { pathname } = useLocation();

  const { script, logout } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);

  const themeColor = theme === "light" ? "#eee" : "#000";

  useEffect(() => {
    const verify = async () => {
      if (script) {
        try {
          await getNames(script);
        } catch (error) {
          logout();
        }
      }
    };
    verify();
  }, [pathname, logout, script]);

    const { mode } = useContext(ModeContext);

    const bgZen = mode === "zen" ? "-zen" : "";

  return (
    <div className={`App bg${bgZen}-${theme}`}>
      <ScrollToTop />
      <Helmet>
        <meta name="theme-color" content={themeColor} />
      </Helmet>
      <Routes>
        <Route
          path="/login"
          element={<PublicRoute element={<Login />} script={script} />}
        />
        <Route path="/calculate" element={<Calculate />} />
        <Route path="/guide" element={<Help />} />
        <Route
          path="/"
          element={<PrivateRoute element={<Home />} script={script} />}
        />
        <Route
          path="/graph"
          element={<PrivateRoute element={<Graph />} script={script} />}
        />
        <Route
          path="/create"
          element={<PrivateRoute element={<Create />} script={script} />}
        />
        <Route
          path="/bet-houses"
          element={<BetHouses />}
        />
        <Route
          path="/profit-graph"
          element={<ProfitByBet element={<Home />} script={script} />}
        />
      </Routes>
      <Footer />
      {pathname !== "/login" && <div className="bottom-gradient"></div>}
      <Navigation />
    </div>
  );
}

export default App;
