import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BlackButton } from "../../ui/buttons";
import { TextField } from "../../ui/input-text";
import { Text, Title } from "../../ui/text";
import css from "./login.css";
import { LoginForm } from "../../components/LoginForm";
function Login() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className={css.container}>
      <Title>LOGIN</Title>
      <LoginForm></LoginForm>
      <Text>
        ¿No tenés cuenta aún? <Link to={"/usuario-nuevo"}>Crear cuenta</Link>
      </Text>
    </div>
  );
}
export { Login };
