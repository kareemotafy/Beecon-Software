import { useEffect, useState } from "react";
import {
  VisibilityOff as VisibilityOffIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import GeneralLoading from "../components/GeneralLoading";
import { updateValue, watchValue } from "../../util/tools";

const Camera = () => {
  const [lastCameraFrame, setLastCameraFrame] = useState(undefined);
  const [isCameraActive, setIsCameraActive] = useState(undefined);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    watchValue("Camera", (data) => {
      const jsonData = JSON.parse(data);
      const base64String = jsonData.photo;
      setLastCameraFrame("data:image/jpeg;base64," + base64String);
    });

    watchValue("isCameraOn", (data) => setIsCameraActive(data), {
      skipPath: true,
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        {lastCameraFrame ? (
          isCameraActive ? (
            <img
              src={lastCameraFrame}
              alt=""
              style={{
                width: "100%",
                maxWidth: 400,
                height: "auto",
                marginTop: 20,
              }}
            />
          ) : (
            <img
              src="/StockVideo.png"
              alt=""
              style={{
                width: "100%",
                maxWidth: 300,
                height: "auto",
                marginTop: 20,
              }}
            />
          )
        ) : (
          <GeneralLoading />
        )}

        <Grid item xs={12}>
          <IconButton
            style={{ color: "white" }}
            onClick={() => updateValue("isCameraOn", !isCameraActive)}
          >
            {isCameraActive ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>

          <h2>Live Preview</h2>
          <h3>Current Time: {currentTime}</h3>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Camera;
