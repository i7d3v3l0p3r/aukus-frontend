import { Box, Button, Chip, Paper, Popper } from '@mui/material'
import { Color, Player } from 'utils/types'
import { useEffect, useRef } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSpring, animated } from '@react-spring/web'
import { getMapCellById, laddersByCell, snakesByCell } from './utils'
import { cellSize } from '../types'

type Props = {
  player: Player
  closePopup?: boolean
  moveSteps: number
  onAnimationEnd: (player: Player, steps: number) => void
}

export default function PlayerIcon({
  player,
  closePopup,
  moveSteps,
  onAnimationEnd,
}: Props) {
  const [anchorCell, setAnchorCell] = useState<HTMLElement | null>(null)
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupAnchor, setPopupAnchor] = useState<HTMLElement | null>(null)
  const playerElement = useRef<HTMLDivElement>(null)

  const [springs, api] = useSpring(() => {
    return {
      from: {
        x: 0,
        y: 0,
      },
    }
  }, [])

  useEffect(() => {
    if (popupOpen) {
      setPopupOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closePopup])

  const startChainedAnimation = (moves: number) => {
    let normalizedMoves = moves
    if (player.map_position < 101 && player.map_position + moves > 101) {
      normalizedMoves = 101 - player.map_position
    }
    if (player.map_position + moves < 1) {
      normalizedMoves = -player.map_position - 1
    }

    const currentLocation = { x: 0, y: 0 }
    const backward = moves < 0
    const moveOffset = backward ? -cellSize - 1 : cellSize + 1

    const ladder = laddersByCell[player.map_position + normalizedMoves]
    const snake = snakesByCell[player.map_position + normalizedMoves]

    const animationsList: Array<{ x: number; y: number }> = []
    for (let i = 0; i < Math.abs(normalizedMoves); i++) {
      const nextCell = backward
        ? getMapCellById(player.map_position - i - 1)
        : getMapCellById(player.map_position + i)
      // console.log("next cell", { nextCell }, player.mapPosition, i);

      if (!nextCell) {
        continue
      }

      const nextLocation = { x: currentLocation.x, y: currentLocation.y }

      // console.log({ nextCell, currentLocation, position: player.mapPosition });
      switch (nextCell.direction) {
        case 'right':
          nextLocation.x += moveOffset
          break
        case 'left':
          nextLocation.x -= moveOffset
          break
        case 'up':
          nextLocation.y -= moveOffset
          break
      }

      animationsList.push(nextLocation)
      currentLocation.x = nextLocation.x
      currentLocation.y = nextLocation.y
    }

    if (ladder) {
      animationsList.push(
        calculateAnimation(player.map_position, ladder.cellTo)
      )
    }

    if (snake) {
      animationsList.push(calculateAnimation(player.map_position, snake.cellTo))
    }

    console.log({ animationsList })

    api.start({
      from: { x: 0, y: 0 },
      to: async (next, cancel) => {
        for (let i = 0; i < animationsList.length; i++) {
          await next(animationsList[i])
        }
        onAnimationEnd(player, moves)
      },
      config: { duration: 1000 },
    })
  }

  useEffect(() => {
    if (moveSteps !== 0 && player.map_position <= 101) {
      if (anchorCell) {
        window.scrollTo({
          top: anchorCell.offsetTop - window.innerHeight / 2,
          behavior: 'smooth',
        })
      }
      startChainedAnimation(moveSteps)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveSteps])

  useEffect(() => {
    if (anchorCell) {
      api.start({ from: { x: 0, y: 0 }, to: { x: 0, y: 0 } })
    }
  }, [anchorCell, api, player.map_position])

  useEffect(() => {
    // console.log("updating map position to", player.mapPosition);
    const interval = setInterval(() => {
      const findCell = document.getElementById(
        `map-cell-${player.map_position}`
      )
      setAnchorCell(findCell)
      clearInterval(interval)
    }, 50)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player.map_position])

  // console.log({ player, cell });
  if (!anchorCell) {
    return null
  }

  const top = anchorCell.offsetTop + 40
  const left = anchorCell.offsetLeft + 10

  const handleClick = (event: React.MouseEvent) => {
    setPopupAnchor(event.currentTarget as HTMLElement)
    setPopupOpen(!popupOpen)
    event.stopPropagation()
  }

  const chipColor = player.is_online ? 'green' : 'red'

  const playerColor = 'blue'

  return (
    <animated.div style={{ position: 'absolute', top, left, ...springs }}>
      <Box position="relative">
        <Popper
          open={popupOpen}
          anchorEl={popupAnchor}
          placement="right"
          transition
          style={{
            position: 'absolute',
            top: top - 30,
            // top: "0%",
            left: left + (popupAnchor?.offsetWidth || 0) + 10,

            // left: "70%",
            // transform: "translateX(-50%)",
          }}
          onClick={() => setPopupOpen(false)}
        >
          <Paper
            style={{
              borderRadius: '30px',
              padding: 1,
              background: Color.greyLight,
            }}
          >
            <Box padding={2}>
              <Link to={`/players/${player.url_handle}`}>
                <span className="purple">
                  <strong>{player.name}</strong>
                </span>
              </Link>
              <br />
              <Box marginTop={1}>Игра: {player.current_game}</Box>
              <br />
              {player.is_online ? (
                <Link
                  to={player.stream_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="green">Смотреть</span>
                </Link>
              ) : (
                'Офлайн'
              )}
            </Box>
          </Paper>
        </Popper>
      </Box>
      <Chip
        ref={playerElement}
        onClick={handleClick}
        label={player.name}
        variant="outlined"
        style={{
          background: playerColor,
          color: 'white',
          textDecoration: 'underline',
          border: `2px solid ${chipColor}`,
        }}
      />
    </animated.div>
  )
}

function calculateAnimation(mapPosition: number, cellTo: number) {
  const targetRow = Math.floor((cellTo - 1) / 10)
  const targetColumn =
    targetRow % 2 === 0 ? (cellTo - 1) % 10 : 10 - (cellTo % 10 || 10)

  let originRow = Math.floor((mapPosition - 1) / 10)
  if (originRow < 0) {
    originRow = 0
  }

  const originColumn =
    originRow % 2 === 0 ? (mapPosition - 1) % 10 : 10 - (mapPosition % 10 || 10)

  const moveOffset = cellSize + 1

  return {
    x: (targetColumn - originColumn) * moveOffset,
    y: -(targetRow - originRow) * moveOffset,
  }
}
