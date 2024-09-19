import { Box, Grid } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import useCurrentUser from 'hooks/useCurrentUser'
import { Fragment, useState } from 'react'
import { createPlayerMove, fetchPlayers } from 'utils/api'
import { NextTurnParams, Player } from 'utils/types'
import { cellSize, MainMap } from '../types'
import ActionButton from './ActionButton'
import CellItem from './CellItem'
import LadderComponent from './Ladder'
import PlayerIcon from './PlayerIcon'
import SnakeComponent from './Snake'
import SVGMarkers from './SVGMarkers'
import TesterButton from './TesterButton'
import {
  ladders,
  laddersByCell,
  lastCell,
  mapCellRows,
  mapCellsSorted,
  snakes,
  snakesByCell,
  startCell,
} from './utils'

export default function MapComponent() {
  const [closePopups, setClosePopups] = useState(false)
  const [moveSteps, setMoveSteps] = useState(0)

  const [frozenDice, setFrozenDice] = useState<number | null>(null)

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
    finishCell: lastCell,
  }

  const handleClick = () => {
    setClosePopups(!closePopups)
  }

  const handleNextTurn = (params: NextTurnParams) => {
    if (!currentPlayer) {
      return
    }

    const diceRoll = frozenDice || params.diceRoll

    if (currentPlayer.map_position === 101 && params.type === 'completed') {
      // win condition
      return
    }

    const currentPosition = currentPlayer.map_position
    const newPosition = getNextPlayerPosition(currentPlayer, diceRoll)

    // save player position in API
    makeMove.mutate(
      {
        player_id: currentPlayer.id,
        dice_roll: diceRoll,
        move_to: newPosition,
        stair_from: params.stairFrom,
        stair_to: params.stairTo,
        snake_from: params.snakeFrom,
        snake_to: params.snakeTo,
        type: params.type,
        item_title: params.itemTitle,
        item_length: params.itemLength,
        item_rating: params.itemRating,
        item_review: params.itemReview,
      },
      {
        onSuccess: () => {
          if (frozenDice) {
            currentPlayer.map_position = currentPosition
          }
        },
      }
    )

    setMoveSteps(diceRoll)
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
        columns={11}
        width={'auto'}
        style={{
          backgroundImage: "url('static/map_background2.png')",
          backgroundPosition: 'center' /* Center the image */,
          backgroundRepeat: 'no-repeat' /* Prevent the image from repeating */,
        }}
      >
        <Grid container columns={11} width={'auto'}>
          <Grid item border={1}>
            <Box minWidth={(cellSize + 1) * 11} minHeight={cellSize * 2} />
          </Grid>
        </Grid>
        {map.cellRows.map((row, index) => (
          <Grid container key={index} columns={11} width={'auto'}>
            {index === 0 && (
              <Grid item borderTop={1} borderRight={1} borderLeft={1}>
                <CellItem cell={lastCell} />
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

      {currentPlayer && (
        <TesterButton player={currentPlayer} freezeDice={setFrozenDice} />
      )}
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
  return Math.min(101, newPosition)
}
