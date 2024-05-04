import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import {
  Water as WaterIcon,
  DeviceThermostat as DeviceThermostatIcon,
  Scale as ScaleIcon,
  Hearing as HearingIcon,
  Home as HomeIcon,
  PhotoCamera as PhotoCameraIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const actions = [
  { icon: <HomeIcon />, name: "Home", path: "/" },
  { icon: <WaterIcon />, name: "Humidity", path: "/humidity" },
  { icon: <DeviceThermostatIcon />, name: "Temperature", path: "/temperature" },
  { icon: <ScaleIcon />, name: "Weight", path: "/weight" },
  { icon: <HearingIcon />, name: "Sound", path: "/sound" },
  { icon: <PhotoCameraIcon />, name: "Camera", path: "/camera" },
];

export default function GraphSpeedDial() {
  const navigate = useNavigate();
  return (
    <Box>
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
        icon={<SpeedDialIcon />}
      >
        {actions
          .filter(({ path }) => {
            return path !== window.location.pathname;
          })
          .map((action) => (
            <SpeedDialAction
              onClick={() => {
                navigate(action.path);
              }}
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
      </SpeedDial>
    </Box>
  );
}
