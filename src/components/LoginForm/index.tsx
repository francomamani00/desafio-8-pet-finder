import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { tokenHook, emailHook, nameHook, useSearchResults } from "../../hooks";
import { atom, useRecoilState, useRecoilValue, selector } from "recoil";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import { BlackButton, RedButton } from "../../ui/buttons";
import { TextField } from "../../ui/input-text";
import { Text, Title } from "../../ui/text";
import { userLogin, getUsuario } from "../../lib";

import css from "./loginForm.css";
function LoginForm() {
  const [token, setToken] = tokenHook();

  const [email, setEmail] = emailHook();
  const [name, setName] = nameHook();
  const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // setEmail(email);
    setPassword(password);
    setLoading(true);

    if (email) {
      const data = await userLogin(email, password);
      if (data.token) {
        console.log(data);
        setToken(data.token);
        setTimeout(() => {
          getUsuario(data.userId, data.token, (cb) => {
            console.log("cb", cb);
            setName(cb.name);
            setEmail(cb.email);
            navigate("/", { replace: true });
          });
        }, 1);
      } else {
        window.alert("Contraseña o email incorrecto");
        location.reload();
      }
      console.log("data", data);
    }
  }

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <Text>Ingrese su correo electronico</Text>
      <TextField type="text" name="email" placeholder="Correo electronico" />
      <TextField type="password" name="password" placeholder="Contraseña" />
      <RedButton>Ingresar</RedButton>
    </form>
  );
}

export { LoginForm };
