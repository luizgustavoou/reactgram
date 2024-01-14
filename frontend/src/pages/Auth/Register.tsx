import "./Auth.css";

// Components
import { Link } from "react-router-dom";

// Hooks
import { FormEvent, useEffect, useState } from "react";

const Register = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>ReactGram</h2>
      <p className="subtitle">Cdastra-se para ver as fotos dos seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" />
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />
        <input type="password" placeholder="Confirme a senha" />
        <input type="submit" value="Cadastrar" />
      </form>
      <p>
        Já tem conta ? <Link to="/login">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Register;