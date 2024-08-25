import { Box, Chip } from "@mui/material";
import { Player } from "pages/players/types";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  player: Player;
};

export default function PlayerIcon({ player }: Props) {
  const [cell, setCell] = useState<HTMLElement | null>(null);

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

  console.log({ player, cell });
  if (!cell) {
    return null;
  }

  const top = cell.offsetTop + 40;
  const left = cell.offsetLeft + 10;

  return (
    <Box position={"absolute"} top={top} left={left}>
      <Link to={`/players/${player.id}`}>
        <Chip
          label={player.name}
          variant="outlined"
          style={{ background: player.color, color: "white", textDecoration: "underline" }}
        />
      </Link>
    </Box>
  );
}
