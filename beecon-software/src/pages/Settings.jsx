import React, { useState, useEffect } from "react";
import {
  LocalFireDepartment as LocalFireDepartmentIcon,
  AcUnit as AcUnitIcon,
} from "@mui/icons-material";
import { Grid } from "@mui/material";
import NumberPicker from "../components/NumberPicker";
import { updateValue, watchValue } from "../../util/tools";

const Settings = () => {
  const [coolThresh, setCoolThresh] = useState(undefined);
  const [heatThresh, setHeatThresh] = useState(undefined);

  useEffect(() => {
    watchValue("coolThresh", (data) => setCoolThresh(data), {
      skipPath: true,
    });
    watchValue("heatThresh", (data) => setHeatThresh(data), {
      skipPath: true,
    });
  }, []);

  useEffect(() => {
    if (coolThresh === undefined) {
      return;
    }
    updateValue("coolThresh", coolThresh);
  }, [coolThresh]);

  useEffect(() => {
    if (coolThresh === undefined) {
      return;
    }
    updateValue("heatThresh", heatThresh);
  }, [heatThresh]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <h1 style={{ fontSize: 42 }}>Settings</h1>
      </Grid>

      <Grid item xs={12} md={6} container justifyContent="center">
        <Grid item xs={12}>
          <h2>Thresholds</h2>
        </Grid>
        <Grid item xs={12} md={6}>
          <NumberPicker
            value={coolThresh}
            Icon={AcUnitIcon}
            title="Cooling Threshold"
            helperText="Temperature at which the fan will turn on."
            handleSliderChange={(e, newValue) => {
              setCoolThresh(newValue);
            }}
            handleInputChange={(event) => {
              setCoolThresh(
                event.target.value === "" ? "" : Number(event.target.value)
              );
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <NumberPicker
            value={heatThresh}
            Icon={LocalFireDepartmentIcon}
            title="Heating Threshold"
            helperText="Temperature at which the heater will turn on."
            handleSliderChange={(e, newValue) => {
              setHeatThresh(newValue);
            }}
            handleInputChange={(event) => {
              setHeatThresh(
                event.target.value === "" ? "" : Number(event.target.value)
              );
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <h2>Alerts</h2>
      </Grid>
    </Grid>
  );
};
export default Settings;
