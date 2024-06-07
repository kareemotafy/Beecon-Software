import React from "react";

import { Grid } from "@mui/material";

const Settings = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        title
      </Grid>
      <Grid item xs={12} md={6}>
        alert
      </Grid>
      <Grid item xs={12} md={6}>
        threshold
      </Grid>
    </Grid>
  );
};
export default Settings;
