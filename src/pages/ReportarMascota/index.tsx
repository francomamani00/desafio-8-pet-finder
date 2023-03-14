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
function ReportarMascota() {
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
  console.log("petData", petData);
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
  // async function handleLocation() {
  //   function setReportLocation(lat, lng) {
  //     console.log("setreportlocation", lat, lng);
  //   }
  //   function initMap() {
  //     mapboxgl.accessToken = process.env.MAPBOX_API_KEY;
  //     return new mapboxgl.Map({
  //       container: "map",
  //       style: "mapbox://styles/mapbox/streets-v11",
  //       center: [lng, lat],
  //       zoom: 14,
  //     });
  //   }
  //   function initSearchForm(callback) {
  //     const inputBusqueda: any = document.querySelector(
  //       ".input-busqueda-location"
  //     );
  //     const saveBusqueda: any = document.querySelector(".save-location");
  //     saveBusqueda.addEventListener("click", (e) => {
  //       e.preventDefault();
  //       mapboxClient.geocodeForward(
  //         inputBusqueda.value,
  //         {
  //           country: "ar",
  //           autocomplete: true,
  //           language: "es",
  //         },
  //         function (err, data, res) {
  //           if (!err) callback(data.features);
  //         }
  //       );
  //     });
  //   }
  //   (function () {
  //     const map = initMap();
  //     initSearchForm(function (results) {
  //       const firstResult = results[0];

  //       const marker = new mapboxgl.Marker()
  //         .setLngLat(firstResult.geometry.coordinates)
  //         .addTo(map);
  //       map.setCenter(firstResult.geometry.coordinates);
  //       map.setZoom(14);
  //       setReportLocation(
  //         firstResult.geometry.coordinates[1],
  //         firstResult.geometry.coordinates[0]
  //       );
  //     });
  //   })();
  // }
  // console.log("pictureFile", pictureFile);
  console.log("imgFile", imgFile);
  async function handleSubmit(e) {
    e.preventDefault();
    if (imgFile) {
      const petName = e.target.petName.value;
      const petImage = imgFile.dataURL;
      const commentary = e.target.commentary.value;
      const petReport = {
        petName,
        lat: petData.lat,
        lng: petData.lng,
        petImage,
        location: petData.location,
        commentary,
        ownerEmail,
      };
      console.log(
        "pet a reportar para que entre en la funcion",
        petReport,
        token
      );
      if (petName != "") {
        setTimeout(() => {
          const data = reportarMascota(token, petReport, (cb) => {
            if (cb.message) {
              alert(cb.message);
            } else {
              console.log("parece q esta todo okkkk");
              setPetData(petReport);
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
        <div onClick={handleMyPets}>
          <BlackButton>Mis mascotas reportadas</BlackButton>
        </div>
        <form className={css.conteiner} onSubmit={handleSubmit}>
          <Title>Agregar Mascota</Title>
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
export { ReportarMascota };
