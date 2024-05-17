import React from "react";
import SensorLineChart from "../components/SensorLineChart";

const Temperature = () => {
  return (
    <>
      <p style={{ marginTop: 0 }}>Historical Hive Temperature Data</p>
      <SensorLineChart
        sensorLabel="Temperature"
        sensorVariable="temperature"
        sensorPostFix="°C"
        lineBorderColor={"#fc6b03"}
      />
    </>
  );
};
export default Temperature;
