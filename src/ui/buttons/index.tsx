import React from "react";
import css from "./index.css";
export function BlackButton({ children }, props?) {
  return (
    <button {...props} className={css.button}>
      {children}
    </button>
  );
}
export function RedButton({ children }, props?) {
  return (
    <button {...props} className={css.buttonred}>
      {children}
    </button>
  );
}
