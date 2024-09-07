import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { playersMock } from "utils/mocks";

export default function PlayersPage() {
  return (
    <Box textAlign={"center"}>
      <h1>Участники</h1>
      <Grid container columns={1}>
        {playersMock.map((player) => (
          <Grid item xs={1} key={player.id} marginTop={1}>
            <Link to={`/players/${player.url_handle}`}>{player.name}</Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
