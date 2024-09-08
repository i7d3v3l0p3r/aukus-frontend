import { Box, Button, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchPlayers } from "utils/api";
import PlayerSection from "./components/PlayerSection";

export default function PlayersPage() {
  const { data: playersData } = useQuery({
    queryKey: ["players"],
    queryFn: fetchPlayers,
    staleTime: 1000 * 60 * 5,
  });
  const players = playersData?.players;

  if (!players) {
    return <div>Загрузка...</div>;
  }

  return (
    <Box textAlign={"center"}>
      <Grid container columns={1}>
        {players.map((player) => (
          <Grid item xs={1} key={player.id} marginTop={6}>
            <PlayerSection player={player} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
