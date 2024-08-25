import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function MainMenu() {
  return (
    <Grid container>
      <Grid item padding={2}>
        <Link to="/">Карта</Link>
      </Grid>
      <Grid item padding={2}>
        <Link to="/players">Участники</Link>
      </Grid>
      <Grid item padding={2}>
        <Link to="/rules">Правила</Link>
      </Grid>
      <Grid item padding={2}>
        <Link to="/about">О Аукусе</Link>
      </Grid>
      <Grid item padding={2}>
        <Link to="/plan">План</Link>
      </Grid>
    </Grid>
  );
}
