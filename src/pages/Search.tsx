import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
function Search() {
  const params = useParams();
  console.log(params.busqueda);
  useEffect(() => {
    // aca iria un fetch usando el param
    console.log("actual paramsss", params.busqueda);
  }, [params]);
  // cada vez q algo pase con params, nos va a avisar el efecto
  // entonces cada vez q los parametros cambian, el efecto va a cambiar
  return (
    <div>
      Soy el Search
      <Link to="/">Link a Home</Link>
      <Link to="/search/termos">Link a Busqueda de termos</Link>
    </div>
  );
}
export { Search };
