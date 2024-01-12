import "./Navbar.css";

// Components
import { Link, NavLink } from "react-router-dom";
import { BsHouseDoorFill, BsSearch } from "react-icons/bs";

function Navbar() {
  return (
    <nav id="nav">
      <Link to="/">ReactGram</Link>
      <form>
        <BsSearch />
      </form>
      <ul id="nav-links">
        <NavLink to="/">
          <BsHouseDoorFill />
        </NavLink>
        <NavLink to="/login">Entrar</NavLink>
        <NavLink to="/register">Cadastrar</NavLink>
      </ul>
    </nav>
  );
}

export default Navbar;
