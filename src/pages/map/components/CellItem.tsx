import { ArrowRightAltSharp } from "@mui/icons-material";
import { Box, Chip, Typography } from "@mui/material";
import { Player } from "pages/players/types";
import { cellSize, MapCell } from "../types";

type Props = {
  cell: MapCell;
  currentPlayer?: Player;
};

export default function CellItem({ cell, currentPlayer }: Props) {
  const directionIcons = {
    right: <ArrowRightAltSharp sx={{ fontSize: 30, verticalAlign: "middle" }} />,
    left: <ArrowRightAltSharp sx={{ fontSize: 30, verticalAlign: "middle", transform: "rotate(180deg)" }} />,
    up: <ArrowRightAltSharp sx={{ fontSize: 30, verticalAlign: "middle", transform: "rotate(-90deg)" }} />,
  };

  const label = cell.id === 0 ? "Старт" : cell.id === 101 ? "Финиш" : cell.id;

  let relativeLocation = null;
  if (currentPlayer) {
    const diff = cell.id - currentPlayer.mapPosition;
    if (diff >= -6 && diff <= 6 && diff !== 0) {
      relativeLocation = diff;
    }
  }

  return (
    <div
      id={`map-cell-${cell.id}`}
      style={{
        minHeight: cellSize,
        minWidth: cellSize,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box alignContent="center" position="absolute" top={0} left={0}>
        <Chip label={label} />
        {cell.direction && directionIcons[cell.direction]}
      </Box>
      {relativeLocation && (
        <Box textAlign={"center"}>
          <Typography variant="h3" fontWeight={100} color={relativeLocation > 0 ? "#546e7a" : "#5d4037"}>
            {Math.abs(relativeLocation)}
          </Typography>
        </Box>
      )}
    </div>
  );
}
