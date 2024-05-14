import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "../styles/App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Header from "./components/Header.jsx";
import GeneralLoading from "./components/GeneralLoading.jsx";
import GraphSpeedDial from "./components/GraphSpeedDial.jsx";
import Home from "./pages/Home.jsx";
import Temperature from "./pages/Temperature.jsx";
import Camera from "./pages/Camera.jsx";

// TODO: add lazy loading in imports
const routes = [
  { path: "*", element: <h1>404</h1> },
  { path: "/", element: <Home /> },
  {
    path: "/temperature",
    element: <Temperature />,
  },
  {
    path: "/camera",
    element: <Camera />,
  },
  // {
  //   path: "/humidity",
  //   element: React.lazy(() => import("./pages/Humidity.jsx")),
  // },
  // {
  //   path: "/weight",
  //   element: React.lazy(() => import("./pages/Weight.jsx")),
  // },
  // {
  //   path: "/sound",
  //   element: React.lazy(() => import("./pages/Sound.jsx")),
  // },
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
        <Header />
        <Routes>{renderedRoutes}</Routes>
        <GraphSpeedDial />
      </Suspense>
    </>
  );
}

export default App;
