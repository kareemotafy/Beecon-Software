import { useNavigate } from "react-router-dom";
import BeeconLogo from "/beecon-logo.svg";
import { Grid, IconButton } from "@mui/material";
import { Settings as SettingsIcon } from "@mui/icons-material";
const Header = () => {
  const navigate = useNavigate();
  return (
    <Grid container>
      <Grid item xs={12} container justifyContent="center">
        <h2
          style={{ marginTop: 25, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
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
          BEECON
        </h2>
        <IconButton
          style={{
            position: "absolute",
            right: 0,
          }}
          onClick={() => navigate("/settings")}
        >
          <SettingsIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};
export default Header;
