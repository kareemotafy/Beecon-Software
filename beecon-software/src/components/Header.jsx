import BeeconLogo from "/beecon-logo.svg";
import { Grid } from "@mui/material";

const Header = () => {
  return (
    <Grid container>
      <Grid item xs={12} container justifyContent="center">
        <h2 style={{ marginTop: 25 }}>
          <span>
            <img
              src={BeeconLogo}
              alt=""
              style={{
                width: 40,
                height: "auto",
                display: "block",
                margin: "auto",
              }}
            />
          </span>
          IOT Beehive
        </h2>
      </Grid>
    </Grid>
  );
};
export default Header;
