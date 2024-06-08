import React, { useState, useEffect } from "react";
import {
  LocalFireDepartment as LocalFireDepartmentIcon,
  AcUnit as AcUnitIcon,
  WaterDrop as WaterDropIcon,
  Hearing as HearingIcon,
  Scale as ScaleIcon,
} from "@mui/icons-material";
import { Grid } from "@mui/material";
import NumberPicker from "../components/NumberPicker";
import { updateValue, watchValue } from "../../util/tools";
import NumberRangePicker from "../components/NumberRangePicker";

const useUpdateValue = (key, value, condition) => {
  useEffect(() => {
    if (condition(value)) {
      updateValue(key, value);
    }
  }, [value]);
};

const Settings = () => {
  const [coolThresh, setCoolThresh] = useState(undefined);
  const [heatThresh, setHeatThresh] = useState(undefined);
  const [weightAlert, setWeightAlert] = useState([undefined, undefined]);
  const [soundAlert, setSoundAlert] = useState([undefined, undefined]);
  const [tempAlert, setTempAlert] = useState([undefined, undefined]);
  const [humidityAlert, setHumidityAlert] = useState([undefined, undefined]);

  const sockets = React.useMemo(
    () => [
      {
        name: "coolThresh",
        setter: setCoolThresh,
        condition: (val) => val !== undefined,
        getter: coolThresh,
      },
      {
        name: "heatThresh",
        setter: setHeatThresh,
        condition: (val) => val !== undefined,
        getter: heatThresh,
      },
      {
        name: "weightAlert",
        setter: setWeightAlert,
        condition: (val) => val.every((v) => v !== undefined),
        getter: weightAlert,
      },
      {
        name: "soundAlert",
        setter: setSoundAlert,
        condition: (val) => val.every((v) => v !== undefined),
        getter: soundAlert,
      },
      {
        name: "tempAlert",
        setter: setTempAlert,
        condition: (val) => val.every((v) => v !== undefined),
        getter: tempAlert,
      },
      {
        name: "humidityAlert",
        setter: setHumidityAlert,
        condition: (val) => val.every((v) => v !== undefined),
        getter: humidityAlert,
      },
    ],
    []
  );

  useEffect(() => {
    sockets.forEach(({ name, setter }) => {
      watchValue(name, (data) => setter(data), {
        skipPath: true,
      });
    });
  }, []);

  useUpdateValue("coolThresh", coolThresh, (val) => val !== undefined);
  useUpdateValue("heatThresh", heatThresh, (val) => val !== undefined);
  useUpdateValue("weightAlert", weightAlert, (val) =>
    val.every((v) => v !== undefined)
  );
  useUpdateValue("soundAlert", soundAlert, (val) =>
    val.every((v) => v !== undefined)
  );
  useUpdateValue("tempAlert", tempAlert, (val) =>
    val.every((v) => v !== undefined)
  );
  useUpdateValue("humidityAlert", humidityAlert, (val) =>
    val.every((v) => v !== undefined)
  );

  return (
    <Grid container>
      <Grid item xs={12}>
        <h1 style={{ fontSize: 42 }}>Settings</h1>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        container
        justifyContent="center"
        alignContent="flex-start"
      >
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
            endAdornment="°C"
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
            endAdornment="°C"
          />
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} container justifyContent="center">
        <Grid item xs={12}>
          <h2>Alerts</h2>
        </Grid>
        <Grid item xs={12} sm={9}>
          <NumberRangePicker
            value={weightAlert}
            Icon={ScaleIcon}
            title="Valid Weight Range"
            helperText="Specifies safe weight range for beehive."
            handleSliderChange={(e, newValue) => {
              setWeightAlert(newValue);
            }}
            handleInputChange={(event, index) => {
              setWeightAlert(
                weightAlert.map((val, i) =>
                  i === index
                    ? event.target.value === ""
                      ? ""
                      : Number(event.target.value)
                    : val
                )
              );
            }}
            rangeMin={0}
            rangeMax={10000}
            step={100}
            endAdornment="g"
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <NumberRangePicker
            value={soundAlert}
            Icon={HearingIcon}
            title="Valid Sound Range"
            helperText="Specifies safe sound range for beehive."
            handleSliderChange={(e, newValue) => {
              setSoundAlert(newValue);
            }}
            handleInputChange={(event, index) => {
              setSoundAlert(
                soundAlert.map((val, i) =>
                  i === index
                    ? event.target.value === ""
                      ? ""
                      : Number(event.target.value)
                    : val
                )
              );
            }}
            rangeMin={0}
            rangeMax={100}
            step={1}
            endAdornment="dB"
          />
        </Grid>

        <Grid item xs={12} sm={9}>
          <NumberRangePicker
            value={tempAlert}
            Icon={AcUnitIcon}
            title="Valid Temperature Range"
            helperText="Specifies safe temperature range for beehive."
            handleSliderChange={(e, newValue) => {
              setTempAlert(newValue);
            }}
            handleInputChange={(event, index) => {
              setTempAlert(
                tempAlert.map((val, i) =>
                  i === index
                    ? event.target.value === ""
                      ? ""
                      : Number(event.target.value)
                    : val
                )
              );
            }}
            rangeMin={0}
            rangeMax={100}
            step={1}
            endAdornment="°C"
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <NumberRangePicker
            value={humidityAlert}
            Icon={WaterDropIcon}
            title="Valid Humidity Range"
            helperText="Specifies safe humidity range for beehive."
            handleSliderChange={(e, newValue) => {
              setHumidityAlert(newValue);
            }}
            handleInputChange={(event, index) => {
              setHumidityAlert(
                humidityAlert.map((val, i) =>
                  i === index
                    ? event.target.value === ""
                      ? ""
                      : Number(event.target.value)
                    : val
                )
              );
            }}
            rangeMin={0}
            rangeMax={100}
            step={1}
            endAdornment="%"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Settings;
