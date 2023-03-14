import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSearchResults, nameHook } from "../../hooks";
import { atom, useRecoilState, useRecoilValue, selector } from "recoil";
import { RedButton, BlackButton } from "../../ui/buttons";
import { TextField } from "../../ui/input-text";
import { Title } from "../../ui/text";
import { actualizarName, actualizarPassword } from "../../lib";
import css from "./editpassword.css";
import { mytoken } from "../../atoms";

function EditPassword() {
  const navigate = useNavigate();
  const token = useRecoilValue(mytoken);
  const [name, setName] = nameHook();

  async function handleSubmit(e) {
    e.preventDefault();
    const password = e.target.password.value;
    const password2 = e.target.password2.value;
    console.log("password", password, password2, token);
    if (password == password2) {
      setTimeout(() => {
        console.log("entroaca");
        const data = actualizarPassword(token, { password }, (cb) => {
          console.log("data", data);
          if (cb.message) {
            alert(cb.message);
          } else {
            navigate("/datos-guardados", { replace: true });
          }
        });
      }, 1);
    } else {
      alert("Ambas contraseñas no coinciden!");
    }
    // if (name != "") {
    //   setTimeout(() => {
    //     const data = actualizarName(token, { name }, (cb) => {
    //       if (cb.message) {
    //         alert(cb.message);
    //       } else {
    //         setName(name);
    //         navigate("/datos-guardados", { replace: true });
    //       }
    //     });
    //   }, 1);
    // } else {
    //   alert("Te olvidaste de poner tu nuevo nombre!");
    // }
  }
  if (token) {
    return (
      <form className={css.conteiner} onSubmit={handleSubmit}>
        <Title>Editar tu password:</Title>
        <TextField
          type="password"
          name="password"
          placeholder="Nuevo password"
        />
        <TextField
          type="password"
          name="password2"
          placeholder="Repite tu password"
        />
        <BlackButton>ACTUALIZAR</BlackButton>
      </form>
    );
  } else {
    useEffect(() => {
      navigate("/", { replace: true });
    });
  }
}
export { EditPassword };
