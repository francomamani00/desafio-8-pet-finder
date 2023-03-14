import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { tokenHook, useSearchResults, emailHook, nameHook } from "../../hooks";
import { atom, useRecoilState, useRecoilValue, selector } from "recoil";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import { BlackButton, RedButton } from "../../ui/buttons";
import { TextField } from "../../ui/input-text";
import { Text, Title } from "../../ui/text";
import { userLogin } from "../../lib";

import css from "./profile.css";
import { myemail, myname, mytoken } from "../../atoms";
function Profile() {
  //   console.log(email);

  const navigate = useNavigate();
  const [token, setToken] = tokenHook();

  const [email, setEmail] = emailHook();
  const [name, setName] = nameHook();
  function handleCloseSesion() {
    setToken("");
    setEmail("");
    setName("");
  }

  if (token) {
    const email = useRecoilValue(myemail);
    const name = useRecoilValue(myname);
    return (
      <div className={css.container}>
        <Title>Mi perfil</Title>
        <Text>Usuario: {name}</Text>
        <Text>Email: {email}</Text>
        <Link to={"/edit-name"}>
          <RedButton>EDITAR PERFIL</RedButton>
        </Link>
        <Link to={"/edit-password"}>
          <RedButton>EDITAR CONTRASEÑA</RedButton>
        </Link>
        <Link to={"/"} onClick={handleCloseSesion}>
          <BlackButton>CERRAR SESION</BlackButton>
        </Link>
      </div>
    );
  } else {
    useEffect(() => {
      navigate("/", { replace: true });
    });
  }
}
export { Profile };
