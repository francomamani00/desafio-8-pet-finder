import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  useSearchResults,
  nameHook,
  latHook,
  lngHook,
  myPetsHook,
  emailHook,
  usePetData,
  sendEmailHook,
  petsCercaMioHook,
} from "../../hooks";
import { atom, useRecoilState, useRecoilValue, selector } from "recoil";
import { RedButton, BlackButton } from "../../ui/buttons";
import { TextArea, TextField } from "../../ui/input-text";
import { Title, Text } from "../../ui/text";
import { Mapbox } from "../../ui/map";
import {
  actualizarName,
  getReportesCerca,
  getReportesDeUnUser,
  reportarMascota,
  sendEmail,
} from "../../lib";
import css from "./sendemail.css";
import { mytoken, petToSendEmail } from "../../atoms";
import { Dropzone } from "dropzone";
import * as mapboxgl from "mapbox-gl";
import * as MapboxClient from "mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
// const mapboxClient = new MapboxClient(
//   "pk.eyJ1IjoiZnJhbmNvbWFtYW5pMzUxMCIsImEiOiJjbGRqbTAzZTcxNWVrM3BsaHoweDIwd2JoIn0.yEHysk4IAuGiecNisazuCQ"
// );
// const apikey =
//   "pk.eyJ1IjoiZnJhbmNvbWFtYW5pMzUxMCIsImEiOiJjbGRqbTAzZTcxNWVrM3BsaHoweDIwd2JoIn0.yEHysk4IAuGiecNisazuCQ";
// const mapboxClient = new MapboxClient(apikey);
// process.env.MAPBOX_API_KEY
function SendEmail() {
  const results = useSearchResults();
  const navigate = useNavigate();
  const [pets, setPets] = petsCercaMioHook();

  const token = useRecoilValue(mytoken);
  const [name, setName] = nameHook();
  const [lat, setLat] = latHook();
  const [lng, setLng] = lngHook();
  const [myPets, setMyPets] = myPetsHook();
  const [petData, setPetData] = usePetData();
  const [ownerEmail, setOwnerEmail] = emailHook();
  const [imgFile, setImgFile]: any = useState();
  const [emailData, setEmailData] = sendEmailHook();
  console.log("emailData dentro de sendemail", emailData);

  async function handleSubmit(e) {
    e.preventDefault();
    // const petName = e.target.petName.value;
    if (emailData.petName) {
      const nombreDelReportador = e.target.nombreDelReportador.value;
      const telefono = e.target.telefono.value;
      const bio = e.target.bio.value;
      const petEMAIL = {
        ...emailData,

        nombreDelReportador,
        telefono,
        bio,
        emailEnviado: true,
      };
      console.log(
        "pet a reportar para que entre en la funcion",
        petEMAIL,
        token
      );
      const mensajeAEnviar = {
        to: petEMAIL.ownerEmail,
        from: "francocruzfjm7@gmail.com",
        subject: `Vieron tu mascota: ${petEMAIL.petName}!`,
        text: "and",
        html: `<strong>Hola! Tenemos buenas noticias acerca de ${petEMAIL.petName}!!
                <br>Ya que ${petEMAIL.nombreDelReportador}, tiene informacion de tu mascota.
                <br>Te dejó este mensaje: "${petEMAIL.bio}".
                <br>Y aqui esta su telefono para que puedas comunicarte: ${petEMAIL.telefono}
                </strong>`,
      };
      if (petEMAIL.nombreDelReportador != "") {
        setTimeout(() => {
          const data = sendEmail(mensajeAEnviar, (cb) => {
            if (cb.message) {
              alert(cb.message);
            } else {
              alert("tu mensaje ha sido enviado al dueño de la mascota!!");
              console.log("parece q esta todo okkkk");
              navigate("/", { replace: true });
            }
          });
        }, 1000);
        console.log(petEMAIL);
      } else {
        alert("Te olvidaste de poner el nombre de tu mascota");
      }
    }
  }
  async function handleMyPets() {
    setTimeout(() => {
      const data = getReportesDeUnUser(token, (cb) => {
        console.log("cb", cb);
        setMyPets(cb);
        navigate("/mis-mascotas", { replace: true });
      });
    }, 1000);
  }
  function onHandleVolver() {
    navigate("/perdidas", { replace: true });
  }
  return (
    <div className={css.conteinerAll}>
      <div className="avisar__container">
        <div className={css.buttonback} onClick={onHandleVolver}>
          <BlackButton>Volver</BlackButton>
        </div>
        <form className={css.conteiner} onSubmit={handleSubmit}>
          <Title>Reportar info de: {emailData.petName}</Title>
          <label className={css.label}>
            <Text>Tu nombre</Text>
            <TextField type="text" name="nombreDelReportador" required />
          </label>
          <label className={css.label}>
            <Text>Tu telefono</Text>
            <TextField type="text" name="telefono" required />
          </label>
          <label className={css.label}>
            <Text>Donde lo viste</Text>
            <TextArea name="bio" required />
          </label>
          <BlackButton>ENVIAR</BlackButton>
        </form>
      </div>
    </div>
  );
}
export { SendEmail };
