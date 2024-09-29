import { Box, Grid } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useUser } from 'context/UserProvider'
import useScreenSize from 'context/useScreenSize'
import { Fragment, useState } from 'react'
import { createPlayerMove, fetchPlayers } from 'utils/api'
import { NextTurnParams, Player } from 'utils/types'
import { cellSize, MainMap } from '../types'
import ActionButton from './ActionButton'
import CellItem from './CellItem'
import MapArrow from './MapArrow'
import PlayerIcon from './PlayerIcon'
import SVGMarkers from './SVGMarkers'
import TesterButton from './TesterButton'
import TodaysMoves from './TodaysMoves'
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
  const [makingTurn, setMakingTurn] = useState(false)

  const [frozenDice, setFrozenDice] = useState<number | null>(null)

  const { data: playersData } = useQuery({
    queryKey: ['players'],
    queryFn: fetchPlayers,
    refetchInterval: 1000 * 30,
    enabled: !makingTurn,
  })
  const players = playersData?.players

  const { userId } = useUser()
  useScreenSize()

  const currentPlayer = players?.find((player) => player.id === userId)

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

  const handleMakingTurn = (value: boolean) => {
    setMakingTurn(value)
  }

  const handleDiceRoll = (params: NextTurnParams) => {
    if (!currentPlayer) {
      return
    }

    const diceRoll = frozenDice || params.diceRoll
    if (currentPlayer.map_position === 101 && params.type === 'completed') {
      // win condition
      return
    }

    const newPosition = getNextPlayerPosition(currentPlayer, diceRoll)
    // console.log(
    //   'current position',
    //   currentPlayer.map_position,
    //   'to',
    //   newPosition,
    //   'dice roll',
    //   diceRoll
    // )

    // save player position in API
    makeMove.mutate({
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
    })
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

    const steps = getMoveSteps(currentPlayer, diceRoll)
    setMoveSteps(steps)
  }

  const handleAnimationEnd = (player: Player, moves: number) => {
    if (player.id !== currentPlayer?.id) {
      return
    }
    const newPosition = getNextPlayerPosition(player, moves)
    player.map_position = newPosition
    setMoveSteps(0)
    setMakingTurn(false)
  }

  return (
    <Box
      style={{
        overflowX: 'auto',
        width: '1500px',
        minWidth: '1500px',
        maxWidth: '1500px',
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
          backgroundImage: "url('static/map_background3.png')",
          backgroundPosition: 'center' /* Center the image */,
          backgroundRepeat: 'no-repeat' /* Prevent the image from repeating */,
        }}
      >
        <Grid container columns={11} width={'auto'}>
          <Grid item>
            <Box width={(cellSize + 1) * 11} height={cellSize * 2} />
          </Grid>
        </Grid>
        {map.cellRows.map((row, index) => (
          <Grid container key={index} columns={11} width={'auto'}>
            {index === 0 && (
              <Grid
                item
                sx={{
                  borderRight: '1px solid transparent',
                  borderTop: '1px solid transparent',
                  borderLeft: '1px solid transparent',
                }}
              >
                <CellItem cell={lastCell} />
              </Grid>
            )}
            {index === 9 && (
              <Grid item sx={{ border: '1px solid transparent' }}>
                <CellItem cell={startCell} />
              </Grid>
            )}
            {index > 0 && index < 9 && (
              <Grid
                item
                sx={{
                  borderRight: '1px solid transparent',
                  borderLeft: '1px solid transparent',
                  borderTop: index === 1 ? '1px solid transparent' : 0,
                }}
              >
                <div style={{ height: cellSize, width: cellSize }} />
              </Grid>
            )}
            {row.map((cell) => (
              <Grid
                item
                key={cell.id}
                sx={{
                  borderRight: '1px solid transparent',
                  borderBottom: index === 9 ? '1px solid transparent' : 0,
                  borderTop: '1px solid transparent',
                }}
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
        <Grid container columns={11} width={'auto'}>
          <Grid item>
            <Box
              width={(cellSize + 1) * 11}
              height={cellSize}
              id={'map-cell-start'}
            />
          </Grid>
        </Grid>
      </Grid>
      {ladders.map((ladder) => (
        <Fragment key={ladder.cellFrom}>
          <MapArrow from={ladder.cellFrom} to={ladder.cellTo} />
        </Fragment>
      ))}
      {snakes.map((snake) => (
        <Fragment key={snake.cellFrom}>
          <MapArrow from={snake.cellFrom} to={snake.cellTo} />
        </Fragment>
      ))}
      {players &&
        players.map((player) => (
          <PlayerIcon
            key={player.id}
            player={player}
            players={players}
            closePopup={closePopups}
            moveSteps={player.id === currentPlayer?.id ? moveSteps : 0}
            onAnimationEnd={handleAnimationEnd}
          />
        ))}
      {currentPlayer && (
        <ActionButton
          handleNextTurn={handleNextTurn}
          player={currentPlayer}
          onMakingTurn={handleMakingTurn}
          onDiceRoll={handleDiceRoll}
        />
      )}

      {currentPlayer && (
        <TesterButton player={currentPlayer} freezeDice={setFrozenDice} />
      )}

      <TodaysMoves />
    </Box>
  )
}

function getNextPlayerPosition(player: Player, moves: number) {
  const steps = getMoveSteps(player, moves)
  const newPosition = player.map_position + steps

  const ladder = laddersByCell[newPosition]
  const snake = snakesByCell[newPosition]

  if (ladder) {
    return ladder.cellTo
  }
  if (snake) {
    return snake.cellTo
  }
  return Math.min(102, newPosition)
}

function getMoveSteps(player: Player, moves: number) {
  const newPosition = player.map_position + moves
  if (player.map_position < 101 && newPosition > 101) {
    return 101 - player.map_position
  }
  if (player.map_position === 101 && newPosition > 101) {
    return 1
  }
  if (newPosition < 0) {
    return -player.map_position
  }
  return moves
}
