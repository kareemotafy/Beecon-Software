import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";

const Input = styled(MuiInput)`
  border-bottom: 1px solid white;
  width: 70px;
`;

const NumberRangePicker = ({
  Icon,
  value,
  handleSliderChange,
  handleInputChange,
  title,
  helperText = "",
  rangeMin = 0,
  rangeMax = 100,
  step = 1,
  endAdornment,
}) => {
  const handleBlur = () => {
    if (value < rangeMin) {
      handleSliderChange({}, rangeMin);
    } else if (value > rangeMax) {
      handleSliderChange({}, rangeMax);
    }
  };

  return (
    <Box style={{ margin: 10 }}>
      <Typography id="input-slider" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <Icon />
        </Grid>
        <Grid item xs>
          <Slider
            value={value}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            valueLabelDisplay="auto"
            step={step}
            min={rangeMin}
            max={rangeMax}
          />
        </Grid>
        <Grid item>
          <Input
            value={value[0]}
            size="medium"
            onChange={(val) => handleInputChange(val, 0)}
            onBlur={handleBlur}
            style={{ marginRight: 10 }}
            inputProps={{
              step,
              min: rangeMin,
              max: rangeMax,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
            endAdornment={endAdornment}
          />
          <Input
            value={value[1]}
            size="medium"
            onChange={(val) => handleInputChange(val, 1)}
            onBlur={handleBlur}
            inputProps={{
              step,
              min: rangeMin,
              max: rangeMax,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
            endAdornment={endAdornment}
          />
        </Grid>
      </Grid>
      <Typography
        textAlign="left"
        style={{ fontSize: 12, marginLeft: 10, color: "#A0A0A0" }}
      >
        {helperText}
      </Typography>
    </Box>
  );
};
export default NumberRangePicker;
