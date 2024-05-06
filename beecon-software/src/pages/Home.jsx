import { useEffect, useState } from "react";
import database from "../../util/firebase";
import { onValue, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import BeeconLogo from "/beecon-logo.svg";

const watchValue = (watchValue, setter) => {
  const watchRef = ref(database, watchValue);
  onValue(watchRef, (snapshot) => {
    const data = snapshot.val();
    setter(data.sensorData);
  });
};

function Home() {
  const [currentSoundLevel, setCurrentSoundLevel] = useState(0);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [currentHumidity, setCurrentHumidity] = useState(0);
  const [currentTemperature, setCurrentTemperature] = useState(0);
  const [lastCameraFrame, setLastCameraFrame] = useState(undefined);

  useEffect(() => {
    watchValue("humidity", setCurrentHumidity);
    watchValue("temperature", setCurrentTemperature);
    watchValue("Camera", (data) => {
      const jsonData = JSON.parse(data);
      const base64String = jsonData.photo;
      setLastCameraFrame("data:image/jpeg;base64," + base64String);
    });
  }, []);

  const navigate = useNavigate();

  return (
    <Grid container>
      <Grid item xs={12} container justifyContent="center">
        <h2 style={{ marginTop: 25 }}>
          <span>
            <img
              src={BeeconLogo}
              alt=""
              style={{
                width: 40,
                height: "auto",
                display: "block",
                margin: "auto",
              }}
            />
          </span>
          IOT Beehive
        </h2>
      </Grid>

      <Grid
        item
        md={6}
        xs={12}
        container
        justifyContent="space-around"
        alignItems="center"
      >
        {[
          {
            variable: currentTemperature,
            name: "Temperature",
            postfix: "°C",
          },
          {
            variable: currentHumidity,
            name: "Humidity",
            postfix: "%",
          },
          {
            variable: currentSoundLevel,
            name: "Sound Level",
            postfix: "dB",
          },
          {
            variable: currentWeight,
            name: "Current Weight",
            postfix: "g",
          },
        ].map(({ variable, name, postfix }, index) => (
          <Grid item xs={6} key={index}>
            <button
              onClick={() => {
                navigate(`/${name.toLowerCase()}`);
              }}
              style={{ margin: 5, minHeight: 75 }}
            >
              {name} is: {variable}
              {postfix}
            </button>
          </Grid>
        ))}
      </Grid>
      <Grid item md={6} xs={12}>
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
      </Grid>
    </Grid>
  );
}

export default Home;
