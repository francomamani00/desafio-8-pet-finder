import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { latHook, lngHook, petsCercaMioHook, resultsState } from "../../hooks";
import { getReportesCerca } from "../../lib";
import { BlackButton } from "../../ui/buttons";
// import { TextField } from "../ui/input-text";
import { Text, Title } from "../../ui/text";
import css from "./homepage.css";
function Home() {
  const navigate = useNavigate();
  const [lat, setLat] = latHook();
  const [lng, setLng] = lngHook();
  const [pets, setPets] = petsCercaMioHook();
  function handleClick() {
    navigator.geolocation.getCurrentPosition((e) => {
      const mylat = e.coords.latitude as any;
      const mylng = e.coords.longitude as any;
      setTimeout(() => {
        console.log(mylat, mylng);
        setLat(mylat);
        setLng(mylng);
        const data = getReportesCerca(mylat, mylng, (cb) => {
          setPets(cb);
          console.log("cb", cb);
          navigate("/perdidas", { replace: true });
        });
      }, 1000);
      // state.setLoc(lat, lng, () => {
      //   state.getReportesCerca((cb) => {
      //     Router.go("/perdidas");
      //   });
      // });
    });
  }
  return (
    <div className={css.conteiner}>
      <Title>Estas son las mascotas perdidas cerca tuyo</Title>
      <Text>Necesitamos permiso para conocer tu ubicacion</Text>
      {/* aca creo que no va ahacer falta el link porque voy a usar navigator en el handle click */}
      <div onClick={handleClick}>
        <BlackButton>DAR MI UBICACION</BlackButton>
      </div>
    </div>
  );
}
export { Home };
