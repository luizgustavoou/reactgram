import "./Navbar.css";

// Components
import { Link, NavLink } from "react-router-dom";
import {
  BsFillCameraFill,
  BsFillPersonFill,
  BsHouseDoorFill,
  BsSearch,
} from "react-icons/bs";

// Hooks
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";

// Redux
import { reset, logout } from "../slices/authSlice";
import { RoutesPath } from "../utils/routes.path";

function Navbar() {
  const { auth } = useAuth();
  const { user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate(RoutesPath.LOGIN);
  };
  return (
    <nav id="nav">
      <Link to={RoutesPath.HOME}>ReactGram</Link>
      <form id="search-form">
        <BsSearch />
        <input type="text" placeholder="Pesquisar" />
      </form>
      <ul id="nav-links">
        {auth ? (
          <>
            <li>
              <NavLink to={RoutesPath.HOME}>
                <BsHouseDoorFill />
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={`/users/${user._id}`}>
                  <BsFillCameraFill />
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to={RoutesPath.PROFILE}>
                <BsFillPersonFill />
              </NavLink>
            </li>
            <li>
              <span onClick={handleLogout}>Sair</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to={RoutesPath.LOGIN}>Entrar</NavLink>
            </li>
            <li>
              <NavLink to={RoutesPath.REGISTER}>Cadastrar</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
