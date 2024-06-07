import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";

const Input = styled(MuiInput)`
  color: white;
  border-bottom: 1px solid white;
  max-width: 50px;
`;

const NumberPicker = ({
  Icon,
  value,
  handleSliderChange,
  handleInputChange,
  title,
  helperText = "",
}) => {
  const handleBlur = () => {
    if (value < 0) {
      handleSliderChange({}, 0);
    } else if (value > 100) {
      handleSliderChange({}, 100);
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
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
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
export default NumberPicker;
