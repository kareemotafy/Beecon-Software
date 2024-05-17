import React from "react";
import SensorLineChart from "../components/SensorLineChart";

const Humidity = () => {
  return (
    <>
      <p style={{ marginTop: 0 }}>Historical Hive Humidity Data</p>
      <SensorLineChart
        sensorLabel="Humidity"
        sensorVariable="humidity"
        sensorPostFix="%"
        lineBorderColor={"#0398fc"}
      />
    </>
  );
};
export default Humidity;
