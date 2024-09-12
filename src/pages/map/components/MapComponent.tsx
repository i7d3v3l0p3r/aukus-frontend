import { Box, Grid } from '@mui/material'
import { NextTurnParams, Player } from 'utils/types'
import { useState, Fragment } from 'react'
import { cellSize, MainMap, MapCell } from '../types'
import ActionButton from './ActionButton'
import CellItem from './CellItem'
import PlayerIcon from './PlayerIcon'
import {
  ladders,
  laddersByCell,
  mapCellRows,
  mapCellsSorted,
  snakes,
  snakesByCell,
} from './utils'
import { createPlayerMove, fetchPlayers } from 'utils/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import useCurrentUser from 'hooks/useCurrentUser'
import LadderComponent from './Ladder'
import SnakeComponent from './Snake'
import SVGMarkers from './SVGMarkers'

export default function MapComponent() {
  const finishCell = { id: 101, direction: null } as MapCell
  const startCell = { id: 0, direction: 'right' } as MapCell

  const [closePopups, setClosePopups] = useState(false)
  const [moveSteps, setMoveSteps] = useState(0)

  const { data: playersData } = useQuery({
    queryKey: ['players'],
    queryFn: fetchPlayers,
    refetchInterval: 10000,
    enabled: moveSteps === 0,
  })
  const players = playersData?.players

  const { currentUserId } = useCurrentUser()

  const currentPlayer = players?.find((player) => player.id === currentUserId)

  const makeMove = useMutation({
    mutationFn: createPlayerMove,
  })

  const map: MainMap = {
    cellRows: mapCellRows,
    cells: mapCellsSorted,
    startCell,
    finishCell,
  }

  const handleClick = () => {
    setClosePopups(!closePopups)
  }

  const handleNextTurn = (params: NextTurnParams) => {
    if (!currentPlayer) {
      return
    }

    if (currentPlayer.map_position === 101 && params.diceRoll > 0) {
      // win condition
    }

    // save player position in API
    makeMove.mutate({
      player_id: currentPlayer.id,
      dice_roll: params.diceRoll,
      move_to: currentPlayer.map_position + params.diceRoll,
      stair_from: params.stairFrom,
      stair_to: params.stairTo,
      snake_from: params.snakeFrom,
      snake_to: params.snakeTo,
      type: params.type,
      item_title: params.itemTitle,
      item_length: params.itemLength,
      item_rating: params.itemRating,
      item_review: params.itemReview,
    })
    setMoveSteps(params.diceRoll)
  }

  const handleAnimationEnd = (player: Player, moves: number) => {
    if (player.id !== currentPlayer?.id) {
      return
    }
    setMoveSteps(0)
    const newPosition = getNextPlayerPosition(player, moves)
    player.map_position = newPosition
  }

  return (
    <Box
      style={{
        overflowX: 'auto',
        minWidth: '1500px',
      }}
      onClick={handleClick}
    >
      <SVGMarkers />
      <Grid
        container
        justifyContent={'center'}
        style={{
          backgroundImage: "url('static/map_background.png')",
          backgroundPosition: 'center' /* Center the image */,
          backgroundRepeat: 'no-repeat' /* Prevent the image from repeating */,
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
                style={{ borderLeft: '1px solid transparent' }}
                borderTop={index === 1 ? 1 : 0}
              >
                <div style={{ minHeight: cellSize, minWidth: cellSize }} />
              </Grid>
            )}
            {row.map((cell) => (
              <Grid
                item
                key={cell.id}
                borderRight={1}
                borderTop={1}
                borderBottom={index === 9 ? 1 : 0}
              >
                <CellItem
                  cell={cell}
                  currentPlayer={currentPlayer}
                  moveSteps={moveSteps}
                />
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
      {ladders.map((ladder) => (
        <Fragment key={ladder.cellFrom}>
          <LadderComponent ladder={ladder} />
        </Fragment>
      ))}
      {snakes.map((snake) => (
        <Fragment key={snake.cellFrom}>
          <SnakeComponent snake={snake} />
        </Fragment>
      ))}
      {players &&
        players.map((player) => (
          <PlayerIcon
            key={player.id}
            player={player}
            closePopup={closePopups}
            moveSteps={player.id === currentPlayer?.id ? moveSteps : 0}
            onAnimationEnd={handleAnimationEnd}
          />
        ))}
      {currentPlayer && (
        <ActionButton handleNextTurn={handleNextTurn} player={currentPlayer} />
      )}

      <Box marginTop={20} />
    </Box>
  )
}

function getNextPlayerPosition(player: Player, moves: number) {
  const newPosition = player.map_position + moves
  if (player.map_position < 101 && newPosition > 101) {
    return 101
  }

  if (newPosition < 0) {
    return 0
  }

  const ladder = laddersByCell[newPosition]
  const snake = snakesByCell[newPosition]

  if (ladder) {
    return ladder.cellTo
  }
  if (snake) {
    return snake.cellTo
  }
  return newPosition
}
