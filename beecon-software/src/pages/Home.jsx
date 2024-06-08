import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { rtdbClient } from "../../util/firebase";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import GeneralLoading from "../components/GeneralLoading";
import { convertToDb, watchValue } from "../../util/tools";

const Home = () => {
  const [currentSoundLevel, setCurrentSoundLevel] = useState(null);
  const [currentWeight, setCurrentWeight] = useState(null);
  const [currentHumidity, setCurrentHumidity] = useState(null);
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [validRanges, setValidRanges] = useState({});
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    watchValue("humidity", setCurrentHumidity);
    watchValue("temperature", setCurrentTemperature);
    watchValue("sound", (val) => setCurrentSoundLevel(convertToDb(val)));
    watchValue("weight", setCurrentWeight);
    ["humidityAlert", "tempAlert", "soundAlert", "weightAlert"].forEach(
      (alert) => {
        watchValue(
          alert,
          (val) => {
            setValidRanges((prev) => ({ ...prev, [alert]: val }));
          },
          {
            skipPath: true,
          }
        );
      }
    );
    updateAlerts();
  }, []);

  const updateAlerts = () => {
    const newAlerts = [];
    const alerts = [
      {
        type: "humidityAlert",
        message: "Humidity",
        value: currentHumidity,
        unit: "%",
      },
      {
        type: "tempAlert",
        message: "Temperature",
        value: currentTemperature,
        unit: "°C",
      },
      {
        type: "soundAlert",
        message: "Sound level",
        value: currentSoundLevel,
        unit: "dB",
      },
      {
        type: "weightAlert",
        message: "Weight",
        value: currentWeight,
        unit: "g",
      },
    ];

    alerts.forEach((alert) => {
      const range = validRanges[alert.type];
      if (range) {
        if (alert.value < range[0]) {
          const difference = Math.round((range[0] - alert.value) * 100) / 100;
          newAlerts.push(
            `${alert.message} is below the recommended range by ${difference}${alert.unit}.`
          );
        } else if (alert.value > range[1]) {
          const difference = alert.value - range[1];
          newAlerts.push(
            `${alert.message} is above the recommended range by ${difference}${alert.unit}.`
          );
        }
      }
    });

    setAlerts(newAlerts);
  };

  useEffect(() => {
    updateAlerts();
  }, [
    currentHumidity,
    currentTemperature,
    currentSoundLevel,
    currentWeight,
    validRanges,
  ]);

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

          {alerts?.length > 0 ? (
            <ul>
              {alerts.map((alert, index) => (
                <li key={index} style={{ marginBottom: 10, color: "#DC143C" }}>
                  {alert}
                </li>
              ))}
            </ul>
          ) : (
            "There are currently no alerts."
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default Home;
