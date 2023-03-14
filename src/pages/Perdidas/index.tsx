import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { petToSendEmail } from "../../atoms";
import {
  latHook,
  lngHook,
  nameHook,
  newLoginHook,
  petsCercaMioHook,
  sendEmailHook,
} from "../../hooks";
import { RedButton } from "../../ui/buttons";
import { Text } from "../../ui/text";
import { Title } from "../../ui/text";
import css from "./perdidas.css";
function Perdidas() {
  // const [name, setName] = nameHook();
  const [pets, setPets] = petsCercaMioHook();

  const navigate = useNavigate();

  const [lat, setLat] = latHook();
  const [lng, setLng] = lngHook();
  const [emailData, setEmailData] = sendEmailHook();

  function handleButtonYoLoVi(pet) {
    // emailData;
    const objectId = {
      ...emailData,
      ownerEmail: pet.ownerEmail,
      emailEnviado: false,
      objectID: pet.objectID,
      petName: pet.petName,
    };
    setEmailData(objectId);
    console.log("yo lo vi dentro de perdidas", emailData);
    navigate("/send-email", { replace: true });
  }
  if (lat) {
    if (pets[0]) {
      return (
        <div className={css.conteiner}>
          <Title>Se encontraron todas estas mascotas cerca tuyo</Title>
          <ul>
            {pets.map((r) => (
              <li key={r.objectID} className={css["pet__card"]}>
                <img className={css["img-src__card"]} src={r.petImage}></img>
                <h3 className={css["location__card"]}>{r.location}</h3>
                <div className={css["footer__card"]}>
                  <Text>{r.petName}</Text>
                  <button
                    onClick={() => handleButtonYoLoVi(r)}
                    id={css["visto"]}
                    className={"button" + r.objectID}
                  >
                    Yo lo vi
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return (
        <div className={css.conteiner}>
          <Title>Se encontraron 0 mascotas cerca tuyo</Title>
        </div>
      );
    }
  } else {
    useEffect(() => {
      alert("necesitamos tu ubicacion");
      navigate("/", { replace: true });
    });
  }
}
export { Perdidas };
