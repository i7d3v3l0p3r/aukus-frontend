import { Box, Grid } from "@mui/material";
import { Player } from "utils/types";
import { useState } from "react";
import { cellSize, MainMap, MapCell } from "../types";
import ActionButton from "./ActionButton";
import CellItem from "./CellItem";
import PlayerIcon from "./PlayerIcon";
import { mapCellRows, mapCellsSorted } from "./utils";
import { createPlayerMove, fetchPlayers } from "utils/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import useCurrentUser from "hooks/useCurrentUser";

export default function MapComponent() {
  const finishCell = { id: 101, direction: null } as MapCell;
  const startCell = { id: 0, direction: "right" } as MapCell;

  const [closePopups, setClosePopups] = useState(false);
  const [moveSteps, setMoveSteps] = useState(0);

  const { data: playersData } = useQuery({ queryKey: ["players"], queryFn: fetchPlayers, refetchInterval: 10000 });
  const players = playersData?.players;

  const { currentUserId } = useCurrentUser();

  const currentPlayer = players?.find((player) => player.id === currentUserId);

  const makeMove = useMutation({
    mutationFn: createPlayerMove,
  });

  const map: MainMap = {
    cellRows: mapCellRows,
    cells: mapCellsSorted,
    startCell,
    finishCell,
  };

  const handleClick = () => {
    setClosePopups(!closePopups);
  };

  const handleActionClick = (player: Player, diceRoll: number) => {
    // save player position in API
    makeMove.mutate({
      player_id: player.id,
      dice_roll: diceRoll,
      stair_from: null,
      stair_to: null,
      snake_from: null,
      snake_to: null,
      type: "completed",
      item_title: "",
      item_length: "medium",
      item_rating: 0,
      item_review: "",
    });
    setMoveSteps(diceRoll);
  };

  const handleAnimationEnd = (player: Player, moves: number) => {
    setMoveSteps(0);
    player.map_position = Math.min(101, player.map_position + moves);
    player.map_position = Math.max(1, player.map_position);
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
          backgroundImage: "url('static/map_background.png')",
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
                <CellItem cell={cell} currentPlayer={currentPlayer} moveSteps={moveSteps} />
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
      {players &&
        players.map((player) => (
          <PlayerIcon
            key={player.id}
            player={player}
            closePopup={closePopups}
            moveSteps={moveSteps}
            onAnimationEnd={handleAnimationEnd}
          />
        ))}
      {currentPlayer && (
        <ActionButton handleNextTurn={(diceRoll: number) => handleActionClick(currentPlayer, diceRoll)} />
      )}
      <Box marginTop={20} />
    </Box>
  );
}
