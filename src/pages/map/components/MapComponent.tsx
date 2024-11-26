import { Box, Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useUser } from 'context/UserProvider'
import useScreenSize from 'context/useScreenSize'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Fireworks } from '@fireworks-js/react'
import type { FireworksHandlers } from '@fireworks-js/react'
import { createPlayerMove, fetchPlayers, fetchStats } from 'utils/api'
import CrownIcon from 'assets/icons/crown.svg?react'
import { Color, getPlayerColor, NextTurnParams, Player } from 'utils/types'
import { useTimelapse } from '../hooks/useTimelapse'
import { cellSize, MainMap } from '../types'
import ActionButton from './action/ActionButton'
import CellItem from './CellItem'
import MapArrow from './MapArrow'
import PlayerIcon from './player/PlayerIcon'
import StaticPanel from './StaticPanel'
import SVGMarkers from './SVGMarkers'
import TesterButton from './TesterButton'
import TimelapseButton from './timelapse/TimelapseButton'
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
import LinkSpan from 'src/components/LinkSpan'
import { getPlayerScore } from 'src/pages/stats/components/Leaderboard'
import PlayerWinnerIcon from './player/PlayerWinnerIcon'
import { Link } from 'react-router-dom'

export default function MapComponent() {
  const [closePopups, setClosePopups] = useState(false)
  const [moveSteps, setMoveSteps] = useState(0)
  const [makingTurn, setMakingTurn] = useState(false)
  const [showArrows, setShowArrows] = useState(true)

  const [frozenDice, setFrozenDice] = useState<number | null>(null)

  const timelapseState = useTimelapse()
  const timelapseEnabled = timelapseState.state !== 'closed'

  const queryClient = useQueryClient()

  useEffect(() => {
    const mapWidth = 1715
    const diff = mapWidth - window.innerWidth
    if (diff > 0) {
      window.scrollTo({ left: diff / 2, behavior: 'smooth' })
    }
  }, [])

  const fireworksRef = useRef<FireworksHandlers>(null)

  const disableFireworks = () => {
    if (fireworksRef.current) {
      fireworksRef.current.stop()
    }
  }

  const enableFireworks = () => {
    if (fireworksRef.current) {
      fireworksRef.current.start()
    }
  }

  const toggleFireworks = () => {
    if (!fireworksRef.current) {
      return
    }
    if (fireworksRef.current.isRunning) {
      fireworksRef.current.stop()
    } else {
      fireworksRef.current.start()
    }
  }

  const { data: playersData } = useQuery({
    queryKey: ['players'],
    queryFn: () => fetchPlayers(),
    refetchInterval: 1000 * 30,
    enabled: !makingTurn,
  })

  let players = playersData?.players || []
  if (timelapseEnabled) {
    players = timelapseState.players
  }

  const playerWithMaxPosition =
    players.length > 0
      ? players.reduce((prev, current) =>
          prev.map_position > current.map_position ? prev : current
        )
      : null

  const winnerFound =
    !timelapseEnabled &&
    playerWithMaxPosition &&
    playerWithMaxPosition.map_position > 101

  const { data: playerStats } = useQuery({
    queryKey: ['playersStats'],
    queryFn: fetchStats,
    staleTime: 1000 * 60 * 1,
    enabled: !!winnerFound,
  })
  const playersStats = playerStats?.players || []

  const top3players: Player[] = []
  // const top3players: Player[] = players.slice(0, 3)
  if (winnerFound && playersStats.length > 2) {
    top3players.push(playerWithMaxPosition)
    const statsByScore = playersStats
      .filter((player) => player.id !== playerWithMaxPosition.id)
      .sort((a, b) => getPlayerScore(b) - getPlayerScore(a))
    const top2Scores = statsByScore.slice(0, 2)
    const top2player = players.find((player) => player.id === top2Scores[0].id)
    const top3player = players.find((player) => player.id === top2Scores[1].id)
    if (top2player) {
      top3players.push(top2player)
    }
    if (top3player) {
      top3players.push(top3player)
    }
  }

  useEffect(() => {
    if (winnerFound && !fireworksRef.current?.isRunning) {
      enableFireworks()
    }
    if (!winnerFound) {
      disableFireworks()
    }
  }, [winnerFound])

  const currentUser = useUser()
  useScreenSize({ updateOnResize: true })

  const currentPlayer = players?.find(
    (player) => player.id === currentUser?.user_id
  )

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
    setShowArrows(!showArrows)
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
      const newPosition = 102
      makeMove.mutate(
        {
          player_id: currentPlayer.id,
          dice_roll: 1,
          move_to: newPosition,
          stair_from: null,
          stair_to: null,
          snake_from: null,
          snake_to: null,
          type: params.type,
          item_title: params.itemTitle,
          item_length: params.itemLength,
          item_rating: params.itemRating,
          item_review: params.itemReview,
        },
        {
          onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['players'] })
          },
        }
      )
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
    queryClient.invalidateQueries({ queryKey: ['players'] })
  }

  const stopActions = winnerFound
  const showActionButton = currentPlayer && !timelapseEnabled && !stopActions
  const showBigTimelapse = !showActionButton && !timelapseEnabled

  return (
    <Box
      style={{
        overflowX: 'auto',
        // width: '1214px',
        // minWidth: '1214px',
        // maxWidth: '1214px',
      }}
      onClick={handleClick}
    >
      <SVGMarkers />
      <Fireworks
        ref={fireworksRef}
        options={{ opacity: 0.5, explosion: 8, intensity: 45, particles: 105 }}
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '700px',
          position: 'absolute',
          zIndex: 2,
        }}
      />

      {winnerFound && (
        <Box display={'flex'} justifyContent={'center'}>
          <Box
            fontSize={'20px'}
            textAlign={'center'}
            style={{
              backgroundColor: getPlayerColor(playerWithMaxPosition.url_handle),
              borderRadius: '10px',
              zIndex: 10,
              position: 'relative',
            }}
            width={'740px'}
            height={'44px'}
            padding={'10px'}
          >
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              height={'100%'}
            >
              <CrownIcon
                width={'24px'}
                height={'24px'}
                style={{ marginRight: '10px' }}
              />
              <Box>
                Можете выдыхать, ивент закончен:{' '}
                <Link to={`/players/${playerWithMaxPosition.url_handle}`}>
                  <LinkSpan color={'white'}>
                    {playerWithMaxPosition.name}
                  </LinkSpan>{' '}
                </Link>
                победил!
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {!winnerFound && <Box height={'44px'} />}

      <Box display={'flex'} justifyContent={'center'}>
        <Box
          style={{
            width: '1715px',
            height: '2146px',
            backgroundImage: "url('uploads/aukus_map_compressed.png')",
            backgroundRepeat:
              'no-repeat' /* Prevent the image from repeating */,
            backgroundPosition: 'center' /* Center the image */,
          }}
        >
          {winnerFound && top3players.length > 2 && (
            <Box position={'relative'}>
              <PlayerWinnerIcon
                player={top3players[0]}
                position={1}
                isMoving
                closePopup={closePopups}
              />
              <PlayerWinnerIcon
                player={top3players[1]}
                position={2}
                closePopup={closePopups}
              />
              <PlayerWinnerIcon
                player={top3players[2]}
                position={3}
                closePopup={closePopups}
              />
            </Box>
          )}
          <Grid
            container
            justifyContent={'center'}
            columns={11}
            width={'auto'}
            style={{
              backgroundSize: 'cover',
              borderRadius: '15px',
              marginTop: '300px',
            }}
          >
            <Grid container columns={10} width={'auto'}>
              <Grid item>
                <Box width={(cellSize + 1) * 10} height={cellSize} />
              </Grid>
            </Grid>
            <Grid container columns={10} width={'auto'}>
              <Grid item>
                <CellItem cell={lastCell} />
              </Grid>
              <Grid item>
                <Box width={(cellSize + 1) * 9} height={cellSize} />
              </Grid>
            </Grid>
            {map.cellRows.map((row, index) => (
              <Grid container key={index} columns={10} width={'auto'}>
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
            <Grid container columns={10} width={'auto'}>
              <Grid item>
                <CellItem cell={startCell} />
              </Grid>

              <Grid item>
                <Box
                  width={(cellSize + 1) * 9}
                  height={cellSize}
                  id={'map-cell-start'}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {ladders.map((ladder) => (
        <Fragment key={ladder.cellFrom}>
          <MapArrow
            from={ladder.cellFrom}
            to={ladder.cellTo}
            hide={!showArrows}
          />
        </Fragment>
      ))}
      {snakes.map((snake) => (
        <Fragment key={snake.cellFrom}>
          <MapArrow
            from={snake.cellFrom}
            to={snake.cellTo}
            hide={!showArrows}
          />
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
      <StaticPanel>
        <Box display="flex" justifyContent="center" width={'100%'}>
          {showActionButton && (
            <Box textAlign="center" width="100%" position={'relative'}>
              <Box
                sx={{
                  position: 'relative',
                  width: '320px',
                  display: 'inline-block',
                }}
                marginRight={'10px'}
                textAlign="center"
              >
                {/* <Box
                  position="absolute"
                  left={'-155px'}
                  width="fit-content"
                  display="inline"
                  style={{
                    background: Color.blue,
                    borderRadius: '10px',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    height: '44px',
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={showArrows}
                          onChange={(val) => setShowArrows(val.target.checked)}
                          color="customWhite"
                        />
                      }
                      label="Стрелки"
                    />
                  </FormGroup>
                </Box> */}
                <ActionButton
                  handleNextTurn={handleNextTurn}
                  player={currentPlayer}
                  onMakingTurn={handleMakingTurn}
                  onDiceRoll={handleDiceRoll}
                />
              </Box>
              <Box position="absolute" width="50px" display="inline">
                <TimelapseButton variant="small" />
              </Box>
            </Box>
          )}
        </Box>
        <Box display="flex" justifyContent="center" width={'100%'}>
          {showBigTimelapse && <TimelapseButton variant="big" />}
        </Box>
        {currentPlayer && !timelapseEnabled && (
          <Box marginTop={'10px'} display="block" textAlign="center">
            <TesterButton player={currentPlayer} freezeDice={setFrozenDice} />
          </Box>
        )}
        {timelapseEnabled && <TimelapseButton variant="big" />}
      </StaticPanel>
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
