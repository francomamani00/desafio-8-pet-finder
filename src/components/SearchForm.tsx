import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSearchResults } from "../hooks";
import { atom, useRecoilState, useRecoilValue, selector } from "recoil";
import { RedButton } from "../ui/buttons";
import { TextField } from "../ui/input-text";

// export const idState = selector({
//   key: "charCountState",
//   get: async ({ get }) => {
//     const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
//     const data = await res.json();
//     console.log(data);
//     // const user = get(userState);
//     return data?.title;
//   },
// });
function SearchForm() {
  const results = useSearchResults();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    const busqueda = e.target.busqueda.value;
    navigate("/search/" + busqueda, { replace: true });
    console.log("busqueda", busqueda);
  }
  return (
    <form onSubmit={handleSubmit}>
      <TextField type="text" name="busqueda" placeholder="escribi aca.." />
      <RedButton>Buscar</RedButton>
      <p>Resultados:{results.length}</p>
    </form>
  );
}
export { SearchForm };
