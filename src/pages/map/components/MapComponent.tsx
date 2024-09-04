import { Box, Grid } from "@mui/material";
import { Player, players as playersPreset } from "pages/players/types";
import { useState } from "react";
import { cellSize, MainMap, MapCell } from "../types";
import ActionButton from "./ActionButton";
import CellItem from "./CellItem";
import PlayerIcon from "./PlayerIcon";
import { mapCellRows, mapCellsSorted } from "./utils";

export default function MapComponent() {
  const finishCell = { id: 101, direction: null } as MapCell;
  const startCell = { id: 0, direction: "right" } as MapCell;

  const [closePopups, setClosePopups] = useState(false);
  const [moveSteps, setMoveSteps] = useState(0);

  const map: MainMap = {
    cellRows: mapCellRows,
    cells: mapCellsSorted,
    startCell,
    finishCell,
  };

  const handleClick = () => {
    setClosePopups(!closePopups);
  };

  const handleActionClick = (diceRoll: number) => {
    // save player position in API
    setMoveSteps(diceRoll);
  };

  const handleAnimationEnd = (player: Player, moves: number) => {
    setMoveSteps(0);
    player.mapPosition = Math.min(101, player.mapPosition + moves);
    player.mapPosition = Math.max(1, player.mapPosition);
  };

  return (
    <Box
      style={{
        overflowX: "auto",
        minWidth: "1500px",
      }}
      onClick={handleClick}
    >
      <Grid
        container
        justifyContent={"center"}
        style={{
          backgroundImage: "url('map_background.png')",
          backgroundPosition: "center" /* Center the image */,
          backgroundRepeat: "no-repeat" /* Prevent the image from repeating */,
        }}
      >
        {map.cellRows.map((row, index) => (
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
                <CellItem cell={cell} currentPlayer={playersPreset[0]} moveSteps={moveSteps} />
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
      <PlayerIcon
        player={playersPreset[0]}
        closePopup={closePopups}
        moveSteps={moveSteps}
        onAnimationEnd={handleAnimationEnd}
      />
      <ActionButton handleNextTurn={handleActionClick} />
      <Box marginTop={20} />
    </Box>
  );
}
