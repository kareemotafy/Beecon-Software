import { useNavigate } from "react-router-dom";
import BeeconLogo from "/beecon-logo.svg";
import { Grid } from "@mui/material";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        container
        justifyContent="center"
        onClick={() => navigate("/")}
      >
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
