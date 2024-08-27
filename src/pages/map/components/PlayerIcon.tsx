import { Box, Chip, Paper, Popper } from "@mui/material";
import { Player } from "pages/players/types";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  player: Player;
};

export default function PlayerIcon({ player }: Props) {
  const [cell, setCell] = useState<HTMLElement | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupAnchor, setPopupAnchor] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (cell) {
        clearInterval(interval);
        return;
      }
      const findCell = document.getElementById(`map-cell-${player.mapPosition}`);
      setCell(findCell);
    }, 50);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player]);

  // console.log({ player, cell });
  if (!cell) {
    return null;
  }

  const top = cell.offsetTop + 40;
  const left = cell.offsetLeft + 10;

  const handleClick = (event: React.MouseEvent) => {
    setPopupAnchor(event.currentTarget as HTMLElement);
    setPopupOpen(!popupOpen);
  };

  return (
    <Box position={"absolute"} top={top} left={left}>
      <Box position="relative">
        <Popper
          open={popupOpen}
          anchorEl={popupAnchor}
          placement="right"
          transition
          style={{
            position: "absolute",
            top: top - 30,
            // top: "0%",
            left: left + (popupAnchor?.offsetWidth || 0) + 10,

            // left: "70%",
            // transform: "translateX(-50%)",
          }}
          onClick={() => setPopupOpen(false)}
        >
          <Paper style={{ borderRadius: "30px", padding: 1, border: `2px solid ${player.color}` }}>
            <Box style={{}} padding={2}>
              Текущая игра: {player.currentGame}
              <br />
              <Link to={player.streamLink} target="_blank" rel="noopener noreferrer">
                Стрим
              </Link>
              <br />
              <br />
              <Link to={`/players/${player.id}`}>Страница игрока</Link>
              <br />
            </Box>
          </Paper>
        </Popper>
      </Box>
      <Chip
        onClick={handleClick}
        label={player.name}
        variant="outlined"
        style={{ background: player.color, color: "white", textDecoration: "underline" }}
      />
    </Box>
  );
}
