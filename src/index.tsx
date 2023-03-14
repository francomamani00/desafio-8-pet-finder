import React from "react";
import ReactDOM from "react-dom";
// const React = require("react");
import { AppRoutes } from "./router";
// import { Home } from "./pages/HomePage";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";
const root: any = document.getElementById("root");
createRoot(root).render(
  <RecoilRoot>
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Suspense>
  </RecoilRoot>
);
