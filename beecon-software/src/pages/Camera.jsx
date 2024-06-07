import { useEffect, useState } from "react";
import { rtdbClient } from "../../util/firebase";
import { onValue, ref as sRef } from "firebase/database";
import { Grid } from "@mui/material";

const watchValue = (watchValue, setter) => {
  const watchRef = sRef(rtdbClient, watchValue);
  onValue(watchRef, (snapshot) => {
    const data = snapshot.val();
    setter(data.sensorData);
  });
};

const Camera = () => {
  const [lastCameraFrame, setLastCameraFrame] = useState("");
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    watchValue("Camera", (data) => {
      const jsonData = JSON.parse(data);
      const base64String = jsonData.photo;
      setLastCameraFrame("data:image/jpeg;base64," + base64String);
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
        <h2>Live Preview</h2>
        <h3>Current Time: {currentTime}</h3>
      </Grid>
    </Grid>
  );
};

export default Camera;
