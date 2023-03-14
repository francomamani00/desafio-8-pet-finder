import React from "react";
import css from "./index.css";
export function Title(props) {
  return (
    <h1 {...props} className={css.title}>
      {props.children}
    </h1>
  );
}
export function Text(props) {
  return (
    <p {...props} className={css.text + " " + props.className}>
      {props.children}
    </p>
  );
}
