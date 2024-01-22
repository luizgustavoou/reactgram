import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { useAuth } from "./hooks/useAuth";
import { RoutesPath } from "./utils/RoutesPath";
import EditProfile from "./pages/EditProfile/EditProfile";
import Profile from "./pages/Profile/Profile";

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route
              path={RoutesPath.HOME}
              element={auth ? <Home /> : <Navigate to={RoutesPath.LOGIN} />}
            />
            <Route
              path={RoutesPath.PROFILE}
              element={
                auth ? <EditProfile /> : <Navigate to={RoutesPath.LOGIN} />
              }
            />
            <Route
              path={RoutesPath.PROFILE}
              element={
                auth ? <EditProfile /> : <Navigate to={RoutesPath.LOGIN} />
              }
            />
            <Route
              path={RoutesPath.USERS_PROFILE}
              element={
                auth ? <Profile /> : <Navigate to={RoutesPath.LOGIN} />
              }
            />
            <Route
              path={RoutesPath.LOGIN}
              element={!auth ? <Login /> : <Navigate to={RoutesPath.HOME} />}
            />
            <Route
              path={RoutesPath.REGISTER}
              element={!auth ? <Register /> : <Navigate to={RoutesPath.HOME} />}
            />
          </Routes>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
