import { useEffect, useState } from "react";
import database from "../util/firebase";
import { onValue, ref } from "firebase/database";
import { Hive as HiveIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Grid, SvgIcon } from "@mui/material";
import BeeconLogo from "/beecon-logo.svg";

const watchValue = (watchValue, setter) => {
  const watchRef = ref(database, watchValue);
  onValue(watchRef, (snapshot) => {
    const data = snapshot.val();
    setter(data.sensorData);
  });
};

function Home() {
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
    <>
      <Grid container>
        <Grid item xs={12}>
          <h1>IOT Beehive</h1>
          <div>
            <img
              src={BeeconLogo}
              alt=""
              style={{
                width: 140,
                height: "auto",
                display: "block",
                margin: "auto",
              }}
            />
          </div>
        </Grid>
        <Grid item md={6} xs={12} container justifyContent="space-around">
          {[
            {
              variable: currentHumidity,
              name: "Humidity",
            },
            {
              variable: currentTemperature,
              name: "Temperature",
            },
          ].map(({ variable, name }, index) => (
            <Grid item xs={6} key={index}>
              <button
                onClick={() => {
                  navigate(`/${name.toLowerCase()}`);
                }}
                style={{ margin: 5 }}
              >
                {name} is: {variable}
              </button>
            </Grid>
          ))}
        </Grid>
        <Grid item md={6} xs={12}>
          <img
            src={lastCameraFrame}
            alt=""
            style={{ width: 400, height: "auto" }}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
