import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Player } from "utils/types";

type Props = {
  player: Player;
};

export default function PlayerSection({ player }: Props) {
  return (
    <Box display="flex" justifyContent="center">
      <Box textAlign={"left"}>
        <h2>Имя {player.name}</h2>
        <Box height={200} width={300} sx={{ backgroundColor: "grey" }} />
        <Button>Twitch</Button>
        <Button>VKPlay</Button>
        <Button>Донейшн</Button>
        <Box textAlign="center" marginTop={3} width="100%">
          <Button variant="contained" color="info" fullWidth>
            <Link to={`/players/${player.url_handle}`}>Страница участника</Link>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
