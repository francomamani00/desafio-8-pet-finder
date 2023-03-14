import { atom, selector } from "recoil";
import { getReportesCerca } from "../lib";
// import { recoilPersist } from "recoil-persist";
export const mytoken = atom({
  key: "token",
  default: "",
});
export const myemail = atom({
  key: "email",
  default: "",
});

export const myname = atom({
  key: "name",
  default: "",
});
export const newlogin = atom({
  key: "newlogin",
  default: "",
});

export const mylat = atom({
  key: "mylat",
  default: "",
});
export const mylng = atom({
  key: "mylng",
  default: "",
});
export const petsCercaMio = atom({
  key: "petsCercaMio",
  default: [],
});
export const mypets = atom({
  key: "mypets",
  default: [],
});
export const petAtom = atom({
  key: "petAtom", // unique ID (with respect to other atoms/selectors)
  default: {
    ownerEmail: "",
    petName: "",
    location: "",
    lat: 0,
    lng: 0,
    petImage: "",
    commentary: "",
  }, // default value (aka initial value)
  //effects_UNSTABLE: [persistAtom],
});

export const petToSendEmail = atom({
  key: "petToSendEmail",
  default: {
    ownerEmail: "",
    objectID: "",
    petName: "",
    nombreDelReportador: "",
    telefono: "",
    bio: "",
    emailEnviado: false,
  },
});

export const editPet = atom({
  key: "editPet",
  default: {
    report: 0,
    newPetName: "",
    newLocation: "",
    newPetImage: "",
    newPetLat: 0,
    newPetLng: 0,
    newCommentary: "",
  },
});

export const ubicacionPetToEdit = atom({
  key: "ubicacionPetToEdit",
  default: {
    lat: 0,
    lng: 0,
  },
});
// export const resultsState = selector({
//   key: "searchResults",
//   get: async ({ get }) => {
//     const valorDeQuery = get(result);
//     const lat = get(mylat);
//     const lng = get(mylng);
//   },
// });
