import { ArrowRightAltSharp } from "@mui/icons-material";
import { Box, Chip } from "@mui/material";
import { cellSize, MapCell } from "../types";

type Props = {
  cell: MapCell;
  addRef: (id: number, el: HTMLElement) => void;
};

export default function CellItem({ cell, addRef }: Props) {
  const directionIcons = {
    right: <ArrowRightAltSharp sx={{ fontSize: 30, verticalAlign: "middle" }} />,
    left: <ArrowRightAltSharp sx={{ fontSize: 30, verticalAlign: "middle", transform: "rotate(180deg)" }} />,
    up: <ArrowRightAltSharp sx={{ fontSize: 30, verticalAlign: "middle", transform: "rotate(-90deg)" }} />,
  };

  const label = cell.id === 0 ? "Старт" : cell.id === 101 ? "Финиш" : cell.id;

  return (
    <div id={`map-cell-${cell.id}`} style={{ minHeight: cellSize, minWidth: cellSize }}>
      <Box alignContent="center">
        <Chip label={label} />
        {cell.direction && directionIcons[cell.direction]}
      </Box>
    </div>
  );
}
