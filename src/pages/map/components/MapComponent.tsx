import { Box, Grid } from "@mui/material";
import { players } from "pages/players/types";
import { useRef } from "react";
import { cellSize, MainMap, MapCell } from "../types";
import CellItem from "./CellItem";
import PlayerIcon from "./PlayerIcon";

export default function MapComponent() {
  const cells = 100;
  const cellsInRow = 10;

  const cellsRef = useRef<HTMLElement[]>([]);
  const addCellRef = (id: number, element: HTMLElement) => {
    cellsRef.current[id] = element;
  };

  const finishCell = { id: 101, direction: null } as MapCell;
  const startCell = { id: 0, direction: "right" } as MapCell;

  const map: MainMap = {
    cells: [],
    start: 0,
    finish: 101,
  };
  let cellId = 1;
  for (let i = 0; i < cells; i++) {
    map.cells[cellId] = { id: cellId, direction: "right" };
    cellId++;
  }

  const cellsReversed = map.cells.slice().reverse();
  const rows = [];
  for (let i = 0; i < cells; i += cellsInRow) {
    let row = cellsReversed.slice(i, i + cellsInRow);
    // reverse every second row
    if (rows.length % 2 === 1) {
      row[0].direction = "up";
      row = row.reverse();
    } else {
      for (let j = 0; j < cellsInRow; j++) {
        row[j].direction = "left";
      }
      row[0].direction = "up";
    }
    rows.push(row);
  }

  map.cells[100].direction = "left";

  return (
    <Box>
      <Grid container justifyContent={"center"}>
        {rows.map((row, index) => (
          <Grid container item key={index} xs="auto">
            {index === 0 && (
              <Grid item border={1}>
                <CellItem cell={finishCell} addRef={addCellRef} />
              </Grid>
            )}
            {index === 9 && (
              <Grid item border={1}>
                <CellItem cell={startCell} addRef={addCellRef} />
              </Grid>
            )}
            {index > 0 && index < 9 && <Grid item xs={1} minHeight={cellSize} minWidth={cellSize}></Grid>}
            {row.map((cell) => (
              <Grid item key={cell.id} border={1}>
                <CellItem cell={cell} addRef={addCellRef} />
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
      {players.map((player) => (
        <Box key={player.id}>
          <PlayerIcon key={player.id} player={player} />
        </Box>
      ))}
    </Box>
  );
}
