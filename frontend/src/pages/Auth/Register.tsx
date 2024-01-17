import "./Auth.css";

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

// Hooks
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

// Redux
import { register, reset } from "../../slices/authSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { RoutesPath } from "../../utils/RoutesPath";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    console.log({ user });

    dispatch(register(user));
  };

  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  const handleOnChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleOnChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleOnChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleOnChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div id="register">
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastra-se para ver as fotos dos seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome</span>
        </label>
        <input
          type="text"
          placeholder="Nome"
          onChange={handleOnChangeName}
          value={name || ""}
        />
        <input
          type="email"
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
        <input
          type="password"
          placeholder="Confirme a senha"
          onChange={handleOnChangeConfirmPassword}
          value={confirmPassword || ""}
        />
        {!loading && <input type="submit" value="Cadastrar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Já tem conta ? <Link to={RoutesPath.LOGIN}>Clique aqui</Link>
      </p>
    </div>
  );
};

export default Register;
