import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  editPetHook,
  latHook,
  lngHook,
  myPetsHook,
  nameHook,
  newLoginHook,
  petsCercaMioHook,
} from "../../hooks";
import { RedButton } from "../../ui/buttons";
import { Text } from "../../ui/text";
import { Title } from "../../ui/text";
import css from "./mismascotas.css";
function MisMascotas() {
  // const [name, setName] = nameHook();
  const navigate = useNavigate();
  const [pets, setPets] = myPetsHook();
  const hay = false;
  const [lat, setLat] = latHook();
  const [lng, setLng] = lngHook();
  const [editData, setEditData] = editPetHook();

  function handleClick(pet) {
    const objectId = {
      ...editData,
      report: pet.id,
      petName: pet.petName,
      petId: pet.id,
    };
    setEditData(objectId);
    console.log("yo lo vi dentro de perdidas", editData);
    navigate("/edit-pet", { replace: true });
  }

  if (pets[0]) {
    return (
      <div className={css.conteiner}>
        <Title>Tus reportes:</Title>
        <ul>
          {pets.map((r) => (
            <li key={r.id} className={css["pet__card"]}>
              <img className={css["img-src__card"]} src={r.petImage}></img>
              <h3 className={css["location__card"]}>{r.location}</h3>
              <div className={css["footer__card"]}>
                <Text>{r.petName}</Text>
                <button
                  id={css["visto"]}
                  onClick={() => handleClick(r)}
                  className={"button" + r.id}
                >
                  Editar
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
        <Title>No reportaste todavia ninguna mascota</Title>
      </div>
    );
  }
}
export { MisMascotas };
