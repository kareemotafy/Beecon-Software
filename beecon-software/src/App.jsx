import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "../styles/App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Header from "./components/Header.jsx";
import GeneralLoading from "./components/GeneralLoading.jsx";
import CustomSpeedDial from "./components/CustomSpeedDial.jsx";
import Home from "./pages/Home.jsx";
import Camera from "./pages/Camera.jsx";
import Temperature from "./pages/Temperature.jsx";
// import Sound from "./pages/Sound.jsx";
import Weight from "./pages/Weight.jsx";
import Humidity from "./pages/Humidity.jsx";
import Settings from "./pages/Settings.jsx";
import { ThemeProvider, createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

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
  {
    path: "/weight",
    element: <Weight />,
  },
  {
    path: "/humidity",
    element: <Humidity />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
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

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={darkTheme}>
          <Suspense fallback={<GeneralLoading />}>
            <Header />
            <Routes>{renderedRoutes}</Routes>
            <CustomSpeedDial />
          </Suspense>
        </ThemeProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
