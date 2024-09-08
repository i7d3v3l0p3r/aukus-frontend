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
        <Box marginTop={1}>
          <Button>
            <p className="purple">Twitch</p>
          </Button>
          <Button>
            <p className="blue">VKPlay</p>
          </Button>
          <Button>
            <p className="orange">Донейшн</p>
          </Button>
        </Box>
        <Box textAlign="center" marginTop={1} width="100%">
          <Button variant="contained" color="secondary" fullWidth>
            <Link to={`/players/${player.url_handle}`}>Страница участника</Link>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
