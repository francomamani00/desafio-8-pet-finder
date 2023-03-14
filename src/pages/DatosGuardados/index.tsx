import React, { useState } from "react";
import { Link } from "react-router-dom";
import { nameHook, newLoginHook } from "../../hooks";
import { RedButton } from "../../ui/buttons";
import { Title } from "../../ui/text";
import css from "./datosguardados.css";
function DatosGuardados() {
  // const [name, setName] = nameHook();
  const [newLogin, setNewLogin] = newLoginHook();
  function handleClick() {
    setNewLogin("");
  }

  if (newLogin) {
    return (
      <div className={css.conteiner}>
        <Title>
          Tus datos han sido guardados correctamente, porfavor ingrese sus datos
          nuevamente para logearse
        </Title>
        <Link onClick={handleClick} to="/login">
          <RedButton>Login</RedButton>
        </Link>
      </div>
    );
  } else {
    return (
      <div className={css.conteiner}>
        <Title>Tus datos han sido guardados correctamente</Title>
        <Link to="/">
          <RedButton>Home</RedButton>
        </Link>
      </div>
    );
  }
}
export { DatosGuardados };
