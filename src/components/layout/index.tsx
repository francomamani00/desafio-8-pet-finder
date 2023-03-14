import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { SearchForm } from "../SearchForm";
import css from "./layout.css";
import { HeaderComp } from "../Header";
function Layout() {
  return (
    <div className={css.root}>
      <HeaderComp />
      <Outlet />
    </div>
  );
}
export { Layout };
