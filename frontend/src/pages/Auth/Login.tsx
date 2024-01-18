import "./Auth.css";

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

// Hooks
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { RoutesPath } from "../../utils/RoutesPath";
import { IAuthLogin } from "../../interfaces/IAuthLogin";
import { login, reset } from "../../slices/authSlice";

// Redux

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user: IAuthLogin = {
      email,
      password,
    };

    dispatch(login(user));
  };

  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  const handleOnChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleOnChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div id="login">
      <h2>ReactGram</h2>
      <p className="subtitle">Faça o login para ver o que há de novo.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="E-mail"
          onChange={handleOnChangeEmail}
          value={email || ""}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={handleOnChangePassword}
          value={password || ""}
        />

        {status != "loading" && <input type="submit" value="Entrar" />}
        {status == "loading" && <input type="submit" value="Aguarde..." disabled />}
        {status == "error" && <Message msg={error as string} type="error" />}
      </form>
      <p>
        Não tem uma conta? <Link to={RoutesPath.REGISTER}>Clique aqui</Link>
      </p>
    </div>
  );
};

export default Login;
