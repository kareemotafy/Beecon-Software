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
        <div style={{ minHeight: 345 }}>
          {lastCameraFrame ? (
            isCameraActive ? (
              <img
                src={lastCameraFrame}
                alt=""
                style={{
                  backgroundColor: "#D8CBB9",
                  borderRadius: 5,
                  padding: 7,
                  width: "100%",
                  maxWidth: 400,
                  height: "auto",
                  marginBottom: 20,
                }}
              />
            ) : (
              <img
                src="/StockVideo.png"
                alt=""
                style={{
                  backgroundColor: "#D8CBB9",
                  borderRadius: 5,
                  padding: 7,
                  width: "100%",
                  maxWidth: 400,
                  height: "auto",
                  marginBottom: 20,
                }}
              />
            )
          ) : (
            <GeneralLoading />
          )}
        </div>

        <Grid item xs={12}>
          <IconButton
            style={{ border: "1px solid white" }}
            onClick={() => updateValue("isCameraOn", !isCameraActive)}
          >
            {isCameraActive ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>

          <h3>Current Time: {currentTime}</h3>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Camera;
