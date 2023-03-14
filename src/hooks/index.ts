import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { atom, useRecoilState, useRecoilValue, selector } from "recoil";
import {
  mytoken,
  myemail,
  myname,
  newlogin,
  mylat,
  mylng,
  petsCercaMio,
  mypets,
  petAtom,
  petToSendEmail,
  editPet,
  ubicacionPetToEdit,
} from "../atoms";
export const queryState = atom({
  key: "query",
  default: "",
});
export const resultsState = selector({
  key: "searchResults",
  get: async ({ get }) => {
    const valorDeQuery = get(queryState);
    if (valorDeQuery) {
      const response = await fetch(
        "https://api.mercadolibre.com/sites/MLA/search?q=" + valorDeQuery
      );
      const res = await response.json();
      return res.results;
    } else {
      return [];
    }
  },
});

export function useSearchResults() {
  const params = useParams();
  const query = params.query;

  const [value, setQueryValue] = useRecoilState(queryState);
  const results = useRecoilValue(resultsState);
  // console.log(results);

  // const [results, setResults] = useState([]);
  // // genera un state q va a guardar los resultados de la busqueda
  // // luego declara esta funcion pullResults q basicamente llama a la api
  // //de meli y el resultado lo guarda en state
  // async function pullResults() {
  //   const response = await fetch(
  //     "https://api.mercadolibre.com/sites/MLA/search?q=" + query
  //   );
  //   const res = await response.json();
  //   console.log(results);
  //   setResults(res.results);
  // }
  // // y finalmente un useEffect q el componente q invoque a este hook
  // //   haga un pullresult cuando comienza o cuando EXISTE query
  useEffect(() => {
    if (query) {
      console.log("soy el custom hook.", query);
      setQueryValue(query);
    }
  }, [query]);
  return results;
}

export function tokenHook(): any {
  const [token, setToken] = useRecoilState(mytoken);
  return [token, setToken];
}

export function emailHook(): any {
  const [email, setEmail] = useRecoilState(myemail);
  return [email, setEmail];
}
export function nameHook(): any {
  const [name, setName] = useRecoilState(myname);
  return [name, setName];
}
export function newLoginHook(): any {
  const [newLogin, setNewLogin] = useRecoilState(newlogin);
  return [newLogin, setNewLogin];
}
export function latHook(): any {
  const [lat, setLat] = useRecoilState(mylat);
  return [lat, setLat];
}
export function lngHook(): any {
  const [lng, setLng] = useRecoilState(mylng);
  return [lng, setLng];
}
export function petsCercaMioHook(): any {
  const [pets, setPets] = useRecoilState(petsCercaMio);
  return [pets, setPets];
}
export function myPetsHook(): any {
  const [myPets, setMyPets] = useRecoilState(mypets);
  return [myPets, setMyPets];
}
export function usePetData(): any {
  const [petData, setPetData] = useRecoilState(petAtom);
  return [petData, setPetData];
}
export function sendEmailHook(): any {
  const [emailData, setEmailData] = useRecoilState(petToSendEmail);
  return [emailData, setEmailData];
}
export function editPetHook(): any {
  const [editData, setEditData] = useRecoilState(editPet);
  return [editData, setEditData];
}
export function ubicacionPetToEditHook(): any {
  const [ubieditData, setUbiEditData] = useRecoilState(ubicacionPetToEdit);
  return [ubieditData, setUbiEditData];
}
