import Home from "./pages/Home";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Graph from "./pages/Graph";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Create from "./pages/Create";
import "./App.css";
import { useContext, useEffect } from "react";
import { DataContext } from "./context/DataContext";
import Login from "./pages/Login";
import { getResults } from "./api/get";
import Navigation from "./components/Navigation";

function PrivateRoute({ element, script, ...rest }) {
  return script ? element : <Navigate to="/login" />;
}

function PublicRoute({ element, script, ...rest }) {
  return !script ? element : <Navigate to="/" />;
}

function App() {
  const { pathname } = useLocation();

  const { script, logout } = useContext(DataContext);

  useEffect(() => {
    const verify = async () => {
      if (script) {
        const { error } = await getResults(script);
        if (error) {
          logout();
        }
      }
    };
    verify();
  }, [pathname]);

  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route
          path="/login"
          element={<PublicRoute element={<Login />} script={script} />}
        />
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
      </Routes>
      <Footer />
      <div className="bottom-gradient"></div>
      <Navigation />
    </div>
  );
}

export default App;
