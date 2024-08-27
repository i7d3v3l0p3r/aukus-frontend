import { Box, Grid } from "@mui/material";
import { players } from "pages/players/types";
import { cellSize, MainMap, MapCell } from "../types";
import CellItem from "./CellItem";
import PlayerIcon from "./PlayerIcon";

export default function MapComponent() {
  const cells = 100;
  const cellsInRow = 10;

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
    <Box style={{ overflowX: "auto", minWidth: "1500px" }}>
      <Grid container justifyContent={"center"}>
        {rows.map((row, index) => (
          <Grid container item key={index} xs="auto">
            {index === 0 && (
              <Grid item borderTop={1} borderRight={1} borderLeft={1}>
                <CellItem cell={finishCell} />
              </Grid>
            )}
            {index === 9 && (
              <Grid item border={1}>
                <CellItem cell={startCell} />
              </Grid>
            )}
            {index > 0 && index < 9 && (
              <Grid
                item
                borderRight={1}
                style={{ borderLeft: "1px solid transparent" }}
                borderTop={index === 1 ? 1 : 0}
              >
                <div style={{ minHeight: cellSize, minWidth: cellSize }} />
              </Grid>
            )}
            {row.map((cell) => (
              <Grid item key={cell.id} borderRight={1} borderTop={1} borderBottom={index === 9 ? 1 : 0}>
                <CellItem cell={cell} />
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
      <Box minHeight={100} />
      {players.map((player) => (
        <Box key={player.id}>
          <PlayerIcon key={player.id} player={player} />
        </Box>
      ))}
    </Box>
  );
}
