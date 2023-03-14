import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSearchResults, nameHook } from "../../hooks";
import { atom, useRecoilState, useRecoilValue, selector } from "recoil";
import { RedButton, BlackButton } from "../../ui/buttons";
import { TextField } from "../../ui/input-text";
import { Title } from "../../ui/text";
import { actualizarName } from "../../lib";
import css from "./editprofile.css";
import { mytoken } from "../../atoms";

function EditProfile() {
  const results = useSearchResults();
  const navigate = useNavigate();
  const token = useRecoilValue(mytoken);
  const [name, setName] = nameHook();

  async function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value;
    console.log("busqueda", name, token);
    if (name != "") {
      setTimeout(() => {
        const data = actualizarName(token, { name }, (cb) => {
          if (cb.message) {
            alert(cb.message);
          } else {
            setName(name);
            navigate("/datos-guardados", { replace: true });
          }
        });
      }, 1);
    } else {
      alert("Te olvidaste de poner tu nuevo nombre!");
    }
  }
  if (token) {
    return (
      <form className={css.conteiner} onSubmit={handleSubmit}>
        <Title>Editar el nombre:</Title>
        <TextField type="text" name="name" placeholder="Nuevo nombre" />
        <BlackButton>ACTUALIZAR</BlackButton>
      </form>
    );
  } else {
    useEffect(() => {
      navigate("/", { replace: true });
    });
  }
}
export { EditProfile };
