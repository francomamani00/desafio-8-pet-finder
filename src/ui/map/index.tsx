import React, { useEffect, useRef, useState } from "react";
import {
  latHook,
  lngHook,
  ubicacionPetToEditHook,
  usePetData,
} from "../../hooks";
import mapboxgl from "mapbox-gl";
import css from "./map.css";
import { TextField } from "../input-text";
import { Text } from "../text";
import { RedButton } from "../buttons";
import { useRecoilState } from "recoil";
import { mylat, ubicacionPetToEdit } from "../../atoms";

export const mapboxToken =
  "pk.eyJ1Ijoia2VhbmVkZXYiLCJhIjoiY2wzeXliMHBkMGVtcjNicDBsaGc1OGJ6NiJ9.1Db1Gwvjb0eViHzNQbTKMg";
mapboxgl.accessToken = mapboxToken;

export function Mapbox() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mylatHook, setLatHook] = latHook();
  const [mylngHook, setLngHook] = lngHook();
  const [petData, setPetData] = usePetData();
  const [lat, setLat] = useState(42.35);
  const [lng, setLng] = useState(-70.9);
  const [query, setQuery] = useState("");
  const [zoom, setZoom] = useState(9);
  const [ubieditData, setUbiEditData]: any = ubicacionPetToEditHook();
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [mylngHook, mylatHook],
      zoom: zoom,
    });
  }, [mapContainer]);

  async function searchPet() {
    const { features } = await (
      await fetch(
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
          query +
          ".json?country=ar&types=place%2Caddress%2Clocality%2Cneighborhood%2Cregion%2Cdistrict&postcode%2Cpoi&autocomplete=true&fuzzyMatch=true&routing=true&access_token=" +
          mapboxToken
      )
    ).json();
    const latitud = features["0"]?.geometry.coordinates[1];
    const longitud = features["0"]?.geometry.coordinates[0];
    map.current.setCenter([longitud, latitud]);
    const location = query;
    console.log(features);
    setLat(latitud);
    setLng(longitud);
    console.log(location, latitud, longitud);
    setPetData({ ...petData, lat: latitud, lng: longitud, location: location });
    setUbiEditData({ lat: latitud, lng: longitud, location: location });
    console.log("petdatahook", petData);
  }

  function handleChange(e) {
    setQuery(e.target.value);
  }

  return (
    <div className={css.container}>
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.css"
        rel="stylesheet"
      />
      <div className={css.map} ref={mapContainer}>
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className={css.spects}>
        <label className={css.label}>
          <Text className={css["textLabel"]}>Ubicación:</Text>
          <TextField
            className={css.textField}
            onChange={handleChange}
            name="name"
            type="string"
            placeholder="Por ejemplo: Jujuy, Argentina"
          />
        </label>
        <button
          className={css.buttonredsmall}
          type="button"
          onClick={searchPet}
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
