import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSearchResults } from "../../hooks";
import { atom, useRecoilState, useRecoilValue, selector } from "recoil";
import { Link } from "react-router-dom";

import huella from "../../assets/huella.png";
import x from "../../assets/marca-x.png";

import css from "./header.css";
import { mytoken } from "../../atoms";
function HeaderComp() {
  const Token = useRecoilState(mytoken);

  const navigate = useNavigate();
  const [isActive, setActive] = useState(false);

  function handleLogo() {
    navigate("/", { replace: true });
  }
  function handleBurger() {
    setActive(!isActive);
  }
  function handleX() {
    setActive(!isActive);
  }

  return (
    <div className={css["contenedor-all"]}>
      <div className={css.contenedor}>
        <a onClick={handleLogo} className={css.imagen}>
          <img className={css.img} src={huella} />
        </a>
        <div onClick={() => setActive(true)} className={css.burger}>
          {/* //"menu header__hamburger--open" */}
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <nav className={isActive ? css["desplegable-si"] : css["desplegable-no"]}>
        <a onClick={() => setActive(false)} className={css.imagenX}>
          <img className={css.imgX} src={x} />
        </a>
        <ul
          className={isActive ? css["container-links"] : css["container-links"]}
        >
          <li
            onClick={() => {
              setActive(false);
            }}
          >
            {!Token[0] ? (
              <Link to={"/login"}>Login</Link>
            ) : (
              <Link to={"/profile"}>Cuenta</Link>
            )}
          </li>
          <li
            onClick={() => {
              setActive(false);
            }}
          >
            <Link to={"/reportar-mascota"}>Reportar Mascota</Link>
          </li>
          <li
            onClick={() => {
              setActive(false);
            }}
          >
            <Link to={"/perdidas"}>Reportes cerca tuyo</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export { HeaderComp };
