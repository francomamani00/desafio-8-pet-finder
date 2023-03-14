import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  emailHook,
  nameHook,
  newLoginHook,
  useSearchResults,
} from "../../hooks";
import { atom, useRecoilState, useRecoilValue, selector } from "recoil";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import { BlackButton, RedButton } from "../../ui/buttons";
import { TextField } from "../../ui/input-text";
import { Text, Title } from "../../ui/text";

import huella from "../../assets/huella.png";
import x from "../../assets/marca-x.png";

import css from "./signupform.css";
import { usuarioNuevo } from "../../lib";
function SignUpForm() {
  const results = useSearchResults();
  const navigate = useNavigate();
  const [name, setName] = nameHook();
  const [email, setEmail] = emailHook();
  const [newLogin, setNewLogin] = newLoginHook();

  async function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const password2 = e.target.password2.value;
    if (password === password2) {
      console.log(email, password);
      // const data = await usuarioNuevo(name, email, password);
      setTimeout(() => {
        const data = usuarioNuevo(name, email, password, (cb) => {
          if (cb.message) {
            alert(cb.message);
          } else {
            setNewLogin("hola");
            navigate("/datos-guardados", { replace: true });
          }
        });
      }, 1);
    } else {
      alert("las contraseñas no coinciden");
    }
    //   const huella = require("url:../../../src/assets/huella.png");
    //   console.log(huella);
  }
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <TextField type="text" name="name" placeholder="Nombre" required />
      <TextField
        type="email"
        name="email"
        placeholder="Correo electronico"
        required
      />
      <TextField
        type="password"
        name="password"
        placeholder="Contraseña"
        required
      />
      <TextField
        type="password"
        name="password2"
        placeholder="Repite la Contraseña"
        required
      />
      <RedButton>REGISTRARSE</RedButton>
    </form>
  );
}

export { SignUpForm };
