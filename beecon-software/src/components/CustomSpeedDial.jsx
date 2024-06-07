import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import {
  Water as WaterIcon,
  DeviceThermostat as DeviceThermostatIcon,
  Scale as ScaleIcon,
  Home as HomeIcon,
  PhotoCamera as PhotoCameraIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const actions = [
  { icon: <HomeIcon />, name: "Home", path: "/" },
  { icon: <WaterIcon />, name: "Humidity", path: "/humidity" },
  { icon: <DeviceThermostatIcon />, name: "Temperature", path: "/temperature" },
  { icon: <ScaleIcon />, name: "Weight", path: "/weight" },
  { icon: <PhotoCameraIcon />, name: "Camera", path: "/camera" },
];

const CustomSpeedDial = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{
          position: "fixed",
          bottom: 0,
          right: 0,
          zIndex: 1000,
          margin: 2,
        }}
        icon={<SpeedDialIcon />}
      >
        {actions.map(({ path, name, icon }) => (
          <SpeedDialAction
            onClick={() => {
              navigate(path);
            }}
            key={name}
            icon={icon}
            tooltipTitle={
              path !== window.location.pathname
                ? name
                : `You are here (${name})`
            }
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default CustomSpeedDial;
