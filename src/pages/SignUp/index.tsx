import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BlackButton } from "../../ui/buttons";
import { TextField } from "../../ui/input-text";
import { Text, Title } from "../../ui/text";
import css from "./signup.css";
import { SignUpForm } from "../../components/SignUpForm";
function SignUp() {
  function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
  }
  return (
    <div className={css.container}>
      <Title>Registrarse</Title>
      <Text>Complete el formulario para registrarse.</Text>
      <SignUpForm></SignUpForm>
    </div>
  );
}
export { SignUp };
