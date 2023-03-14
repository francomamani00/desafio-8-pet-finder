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
  ubicacionPetToEditHook,
  editPetHook,
} from "../../hooks";
import { atom, useRecoilState, useRecoilValue, selector } from "recoil";
import { RedButton, BlackButton } from "../../ui/buttons";
import { TextArea, TextField } from "../../ui/input-text";
import { Title, Text } from "../../ui/text";
import { Mapbox } from "../../ui/map";
import {
  actualizarName,
  editarMascota,
  getReportesCerca,
  getReportesDeUnUser,
  reportarMascota,
} from "../../lib";
import css from "./reportarmascota.css";
import { mytoken } from "../../atoms";
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
function EditPet() {
  const results = useSearchResults();
  const navigate = useNavigate();
  const token = useRecoilValue(mytoken);
  const [name, setName] = nameHook();
  const [lat, setLat] = latHook();
  const [lng, setLng] = lngHook();
  const [myPets, setMyPets] = myPetsHook();
  const [petData, setPetData] = usePetData();
  const [ownerEmail, setOwnerEmail] = emailHook();
  const [imgFile, setImgFile]: any = useState();
  const [ubieditData, setUbiEditData]: any = ubicacionPetToEditHook();
  const [editData, setEditData] = editPetHook();
  // let pictureFile;
  async function handleDropzone() {
    const myDropzone = new Dropzone("#dropzone", {
      url: "/file/post",
      autoProcessQueue: false,
      clickable: true,
    });

    myDropzone.on("addedfile", function (file) {
      // pictureFile = file;
      setImgFile(file);
      console.log("addedfile", file);
      document.querySelector(".dz-error-mark").remove();
      document.querySelector(".dz-success-mark").remove();
      document.querySelector(".dz-error-message").remove();
      document.querySelector(".dz-progress").remove();
      document.querySelector(".dz-details").remove();
      // // usando este evento pueden acceder al dataURL directamente
      // pictureFile = file;
    });
  }

  console.log("imgFile", imgFile);
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("ubiedittada", ubieditData);
    console.log("dentro de edit-pet", editData);
    if (imgFile) {
      const petName = e.target.petName.value;
      const petImage = imgFile.dataURL;
      const commentary = e.target.commentary.value;
      const petEditado = {
        petId: editData.petId,
        newPetName: petName,
        newPetImage: petImage,
        newCommentary: commentary,
        newLocation: ubieditData.location,
        newPetLat: ubieditData.lat,
        newPetLng: ubieditData.lng,
      };
      console.log(
        "pet a reportar para que entre en la funcion",
        petEditado,
        token
      );
      if (petName != "") {
        setTimeout(() => {
          const data = editarMascota(token, petEditado, (cb) => {
            if (cb.message) {
              alert(cb.message);
            } else {
              console.log("parece q esta todo okkkk");
              setEditData(petEditado);
              navigate("/datos-guardados", { replace: true });
            }
          });
        }, 1000);
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
  if (token) {
    return (
      <div className={css.conteinerAll}>
        <form className={css.conteiner} onSubmit={handleSubmit}>
          <Title>Editar tu mascota: {editData.petName}</Title>
          <Text>Ingresa los datos de tu mascota !!!</Text>
          <div
            onClick={handleDropzone}
            id={"dropzone"}
            className={css["mascota__imagen"] + " " + "profile-picture-button"}
          >
            <div className={css["mascota__cargar"] + " " + "dz-clickable"}>
              AGREGAR FOTO
            </div>
          </div>
          <TextField
            type="text"
            name="petName"
            placeholder="Nombre de la mascota"
          />
          <TextArea name="commentary" placeholder="Detalles de la mascota" />
          <Mapbox></Mapbox>
          {/* <div className="conteiner__mapa">
            <input
              className="input-busqueda-location"
              type="text"
              name="location"
              placeholder="mi ubicación"
            />
            <div id="map" style={{ width: 350, height: 350 }}></div>
            <button
              // onClick={handleLocation}
              className="button small__button save-location"
            >
              Agregar ubicacion
            </button>
          </div> */}
          <BlackButton>REPORTAR MASCOTA</BlackButton>
        </form>
      </div>
    );
  } else {
    useEffect(() => {
      navigate("/login", { replace: true });
    });
  }
}
export { EditPet };
