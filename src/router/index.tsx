import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout";
import { DatosGuardados } from "../pages/DatosGuardados";
import { EditPassword } from "../pages/EditPassword";
import { EditPet } from "../pages/EditPet";
import { EditProfile } from "../pages/EditProfile";
import { Home } from "../pages/HomePage";

import { Login } from "../pages/Login";
import { MisMascotas } from "../pages/MisMascotas";
import { Perdidas } from "../pages/Perdidas";
import { Profile } from "../pages/Profile";
import { ReportarMascota } from "../pages/ReportarMascota";
import { Search } from "../pages/Search";
import { SearchResults } from "../pages/SearchResults";
import { SendEmail } from "../pages/SendEmail";
import { SignUp } from "../pages/SignUp";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/usuario-nuevo" element={<SignUp />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/edit-name" element={<EditProfile />}></Route>
        <Route path="/edit-password" element={<EditPassword />}></Route>
        <Route path="/datos-guardados" element={<DatosGuardados />}></Route>
        <Route path="/perdidas" element={<Perdidas />}></Route>
        <Route path="/reportar-mascota" element={<ReportarMascota />}></Route>
        <Route path="/mis-mascotas" element={<MisMascotas />}></Route>
        <Route path="/send-email" element={<SendEmail />}></Route>
        <Route path="/edit-pet" element={<EditPet />}></Route>
      </Route>
    </Routes>
  );
}
export { AppRoutes };
