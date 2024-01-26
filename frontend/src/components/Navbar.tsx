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
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";

// Redux
import { reset, logout } from "../slices/authSlice";
import { RoutesPath } from "../utils/RoutesPath";
import { ChangeEvent, FormEvent, useState } from "react";

function Navbar() {
  const { auth } = useAuth();
  const { user } = useAppSelector((state) => state.auth);

  const [query, setQuery] = useState("");

  const handleOnSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query) return;

    return navigate(`/search?q=${query}`);
  };
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
      <form id="search-form" onSubmit={handleSearch}>
        <BsSearch />
        <input
          type="text"
          placeholder="Pesquisar"
          value={query || ""}
          onChange={handleOnSearchChange}
        />
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
