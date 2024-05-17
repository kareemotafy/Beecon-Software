import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { rtdbClient } from "../../util/firebase";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import GeneralLoading from "../components/GeneralLoading";
import { convertToDb } from "../../util/tools";

const watchValue = (watchValue, setter) => {
  const watchRef = ref(rtdbClient, watchValue);
  onValue(watchRef, (snapshot) => {
    const data = snapshot.val();
    setter(data.sensorData);
  });
};

function Home() {
  const [currentSoundLevel, setCurrentSoundLevel] = useState(null);
  const [currentWeight, setCurrentWeight] = useState(null);
  const [currentHumidity, setCurrentHumidity] = useState(null);
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    watchValue("humidity", setCurrentHumidity);
    watchValue("temperature", setCurrentTemperature);
    watchValue("sound", (val) => setCurrentSoundLevel(convertToDb(val)));
    watchValue("weight", setCurrentWeight);
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
              {typeof variable === "number" ? (
                <>
                  {name} is: {variable}
                  {postfix}
                </>
              ) : (
                <GeneralLoading />
              )}
            </button>
          </Grid>
        ))}
      </Grid>
      <Grid item md={6} xs={12} style={{ textAlign: "left" }}>
        <div style={{ marginLeft: 10 }}>
          <h3>Alerts:</h3>
          {alerts?.length > 0 ? alerts.map() : "There are currently no alerts."}
        </div>
      </Grid>
    </Grid>
  );
}

export default Home;
