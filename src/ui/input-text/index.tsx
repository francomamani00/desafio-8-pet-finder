import React from "react";
import css from "./index.css";
export function TextField(props) {
  return <input {...props} className={css.textfield} />;
}
export function TextArea(props) {
  return <textarea {...props} className={css.textarea}></textarea>;
}
