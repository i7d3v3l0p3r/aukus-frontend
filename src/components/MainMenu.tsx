import { Grid, Link } from "@mui/material";

export default function MainMenu() {
  return (
    <Grid container>
      <Grid item padding={2}>
        <Link href="/">Карта</Link>
      </Grid>
      <Grid item padding={2}>
        <Link href="/players">Участники</Link>
      </Grid>
      <Grid item padding={2}>
        <Link href="/rules">Правила</Link>
      </Grid>
      <Grid item padding={2}>
        <Link href="/about">О Аукусе</Link>
      </Grid>
    </Grid>
  );
}
