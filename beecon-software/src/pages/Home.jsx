import { useEffect, useState } from "react";
import database from "../../util/firebase";
import { onValue, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

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
            path: "/temperature",
          },
          {
            variable: currentHumidity,
            name: "Humidity",
            postfix: "%",
            path: "/humidity",
          },
          {
            variable: currentSoundLevel,
            name: "Sound Level",
            postfix: "dB",
            path: "/sound",
          },
          {
            variable: currentWeight,
            name: "Current Weight",
            postfix: "g",
            path: "/weight",
          },
        ].map(({ variable, name, postfix, path }, index) => (
          <Grid item xs={6} key={index}>
            <button
              onClick={() => {
                navigate(path);
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
