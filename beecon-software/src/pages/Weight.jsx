import React from "react";
import SensorLineChart from "../components/SensorLineChart";

const Humidity = () => {
  return (
    <>
      <p style={{ marginTop: 0 }}>Historical Hive Weight Data</p>
      <SensorLineChart
        sensorLabel="Weight"
        sensorVariable="weight"
        sensorPostFix="g"
        lineBorderColor={"#02a664"}
        dynamicTickStepSize={true}
      />
    </>
  );
};
export default Humidity;
