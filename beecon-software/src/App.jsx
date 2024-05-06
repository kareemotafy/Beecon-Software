import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "../styles/App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Home from "./pages/Home.jsx";
import GeneralLoading from "./components/GeneralLoading.jsx";
import GraphSpeedDial from "./components/GraphSpeedDial.jsx";

const routes = [
  { path: "*", element: <h1>404</h1> },
  { path: "/", element: <Home /> },
];

const generateRoutes = (routes) => {
  return routes.map(({ path, element }) => (
    <Route path={path} exact element={element} key={path} />
  ));
};

function App() {
  const renderedRoutes = generateRoutes(routes);

  return (
    <>
      <Suspense fallback={<GeneralLoading />}>
        <Routes>{renderedRoutes}</Routes>
        <GraphSpeedDial />
      </Suspense>
    </>
  );
}

export default App;
