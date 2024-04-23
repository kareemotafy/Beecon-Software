import { useEffect, useState } from "react";
import viteLogo from "/vite.svg";
import database from "./firebase.js";
import "./App.css";
import { onValue, ref } from "firebase/database";

function App() {
  const [humidity, setHumidity] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [lastCameraFrame, setLastCameraFrame] = useState(undefined);

  useEffect(() => {
    const humidityRef = ref(database, "humidity/-NrGoC9TBenvpraAS1-3");
    onValue(humidityRef, (snapshot) => {
      const data = snapshot.val();
      setHumidity(data.sensorData);
    });
    const temperatureRef = ref(database, "temperature/-NrGoC3ej6uAGWODWpl-");
    onValue(temperatureRef, (snapshot) => {
      const data = snapshot.val();
      setTemperature(data.sensorData);
    });
    const cameraRef = ref(database, "Camera");
    onValue(cameraRef, (snapshot) => {
      const data = snapshot.val();
      const jsonData = JSON.parse(data.sensorData);
      const base64String = jsonData.photo;
      setLastCameraFrame("data:image/jpeg;base64," + base64String);
    });
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>IOT Beehive</h1>

      <div className="card">
        <button style={{ margin: 5 }}>Humidity is {humidity}</button>
        <button style={{ margin: 5 }}>Temperature is {temperature}</button>
      </div>
      <div className="card">
        <img src={lastCameraFrame} alt="" />
      </div>
    </>
  );
}

export default App;
