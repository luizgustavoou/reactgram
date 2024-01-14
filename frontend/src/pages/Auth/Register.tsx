import "./Auth.css";

// Components
import { Link } from "react-router-dom";

// Hooks
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    console.log({ user });
  };

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
        <input type="submit" value="Cadastrar" />
      </form>
      <p>
        Já tem conta ? <Link to="/login">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Register;
