import { Box } from '@mui/material'
import { animated, useSpring } from '@react-spring/web'
import { useEffect, useRef, useState } from 'react'
import { Color, getPlayerColor, Player } from 'utils/types'
import PlayerGreen from 'assets/map/PlayerGreen.webp'
import PlayerGreenLight from 'assets/map/PlayerGreenLight.webp'
import PlayerRed from 'assets/map/PlayerRed.webp'
import PlayerBlue from 'assets/map/PlayerBlue.webp'
import PlayerBlueLight from 'assets/map/PlayerBlueLight.webp'
import PlayerBlueDark from 'assets/map/PlayerBlueDark.webp'
import PlayerBrown from 'assets/map/PlayerBrown.webp'
import PlayerPink from 'assets/map/PlayerPink.webp'
import PlayerPinkLight from 'assets/map/PlayerPinkLight.webp'
import PlayerOrange from 'assets/map/PlayerOrange.webp'
import PlayerPurple from 'assets/map/PlayerPurple.webp'

import PlayerPurpleMoving from 'assets/map/PlayerPurpleMoving.gif'
import PlayerOrangeMoving from 'assets/map/PlayerOrangeMoving.gif'
import PlayerPinkMoving from 'assets/map/PlayerPinkMoving.gif'
import PlayerPinkLightMoving from 'assets/map/PlayerPinkLightMoving.gif'
import PlayerRedMoving from 'assets/map/PlayerRedMoving.gif'
import PlayerBlueMoving from 'assets/map/PlayerBlueMoving.gif'
import PlayerBlueLightMoving from 'assets/map/PlayerBlueLightMoving.gif'
import PlayerBlueDarkMoving from 'assets/map/PlayerBlueDarkMoving.gif'
import PlayerGreenMoving from 'assets/map/PlayerGreenMoving.gif'
import PlayerGreenLightMoving from 'assets/map/PlayerGreenLightMoving.gif'
import PlayerBrownMoving from 'assets/map/PlayerBrownMoving.gif'

import { cellSize } from '../../types'
import PlayerPopup from './PlayerPopup'
import { getMapCellById, laddersByCell, snakesByCell } from '../utils'

const playerIcons: { [key: string]: string } = {
  lasqa: PlayerBlue,
  praden: PlayerBrown,
  roadhouse: PlayerPurple,
  segall: PlayerOrange,
  artur: PlayerRed,
  uselessmouth: PlayerPink,
  unclobjorn: PlayerBlueDark,
  melharucos: PlayerBlueLight,
  browjey: PlayerGreen,
  f1ashko: PlayerPinkLight,
}

const playerMovingIcons: { [key: string]: string } = {
  lasqa: PlayerBlueMoving,
  praden: PlayerBrownMoving,
  roadhouse: PlayerPurpleMoving,
  segall: PlayerOrangeMoving,
  artur: PlayerRedMoving,
  uselessmouth: PlayerPinkMoving,
  unclobjorn: PlayerBlueDarkMoving,
  melharucos: PlayerBlueLightMoving,
  browjey: PlayerGreenMoving,
  f1ashko: PlayerPinkLightMoving,
}

type Props = {
  player: Player
  players: Player[]
  closePopup?: boolean
  moveSteps: number
  onAnimationEnd: (player: Player, steps: number) => void
}

export default function PlayerIcon({
  player,
  players,
  closePopup,
  moveSteps,
  onAnimationEnd,
}: Props) {
  const [anchorCell, setAnchorCell] = useState<HTMLElement | null>(null)
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupAnchor, setPopupAnchor] = useState<HTMLElement | null>(null)
  const playerElement = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLImageElement>(null)

  const playersOnSamePosition = players.filter(
    (p) => p.map_position === player.map_position && p.id !== player.id
  )

  const { x: relativeX, y: relativeY } = getRelativePosition(
    player,
    playersOnSamePosition
  )

  const isMoving = moveSteps !== 0

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
    const backward = moves < 0
    const moveOffset = backward ? -cellSize - 1 : cellSize + 1

    const ladder = laddersByCell[player.map_position + moves]
    const snake = snakesByCell[player.map_position + moves]

    const animationsList: Array<{ x: number; y: number }> = []
    if (player.map_position === 0) {
      // move to beginning of start area
      animationsList.push({ x: -relativeX, y: -relativeY })
      // move to start cell
      animationsList.push({ x: -relativeX - moveOffset, y: -relativeY })
    }

    for (let i = 0; i < Math.abs(moves); i++) {
      const nextCell = backward
        ? getMapCellById(player.map_position - i - 1)
        : getMapCellById(player.map_position + i)
      // console.log("next cell", { nextCell }, player.mapPosition, i);

      if (!nextCell) {
        continue
      }

      let nextX = animationsList[animationsList.length - 1]?.x || 0
      let nextY = animationsList[animationsList.length - 1]?.y || 0

      // console.log({ nextCell, currentLocation, position: player.mapPosition });
      switch (nextCell.direction) {
        case 'right':
          nextX += moveOffset
          break
        case 'left':
          nextX -= moveOffset
          break
        case 'up':
          nextY -= moveOffset
          break
      }

      animationsList.push({ x: nextX, y: nextY })
    }

    if (ladder) {
      const ladderAnimation = calculateAnimation(
        player.map_position,
        ladder.cellTo
      )
      if (player.map_position === 0) {
        const adjustedForStart = {
          x: ladderAnimation.x - relativeX - moveOffset,
          y: ladderAnimation.y - moveOffset,
        }
        animationsList.push(adjustedForStart)
      } else {
        animationsList.push(ladderAnimation)
      }
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
    if (isMoving && player.map_position <= 101) {
      if (anchorCell) {
        window.scrollTo({
          top: anchorCell.offsetTop - window.innerHeight / 2,
          behavior: 'smooth',
        })
      }
      startChainedAnimation(moveSteps)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMoving, moveSteps])

  useEffect(() => {
    if (anchorCell) {
      api.start({ from: { x: 0, y: 0 }, to: { x: 0, y: 0 } })
    }
  }, [anchorCell, api, player.map_position])

  useEffect(() => {
    // console.log("updating map position to", player.mapPosition);

    const cellId =
      player.map_position > 0
        ? `map-cell-${player.map_position}`
        : 'map-cell-start'

    const findCell = document.getElementById(cellId)
    if (findCell) {
      setAnchorCell(findCell)
    } else {
      const interval = setInterval(() => {
        const findCell = document.getElementById(cellId)
        setAnchorCell(findCell)
        clearInterval(interval)
      }, 50)
      return () => clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player.map_position, isMoving])

  // console.log({ player, cell });
  if (!anchorCell) {
    return null
  }

  const originTop = anchorCell.offsetTop + 30
  const originLeft = anchorCell.offsetLeft + 10

  const positionTop = originTop + relativeY
  const positionLeft = originLeft + relativeX

  const isStillAnimated = iconRef.current?.src.endsWith('gif')

  let finalPositionTop = positionTop
  let finalPositionLeft = positionLeft

  if (isMoving || isStillAnimated) {
    // adjust height for animation
    finalPositionTop = positionTop - 14
  }

  const handleClick = (event: React.MouseEvent) => {
    setPopupAnchor(event.currentTarget as HTMLElement)
    setPopupOpen(!popupOpen)
    event.stopPropagation()
  }

  // const onlineColor = player.is_online ? Color.green : Color.red
  const playerColor = getPlayerColor(player.url_handle)
  const playerIcon = isMoving
    ? playerMovingIcons[player.url_handle] || PlayerBlueLightMoving
    : playerIcons[player.url_handle] || PlayerBlueLight

  const hideAvatar =
    playersOnSamePosition.length > 1 && player.map_position !== 0 && !isMoving

  return (
    <animated.div
      style={{
        position: 'absolute',
        top: finalPositionTop,
        left: finalPositionLeft,
        ...springs,
      }}
    >
      <Box position="relative">
        <PlayerPopup
          open={popupOpen}
          player={player}
          anchorEl={popupAnchor}
          close={() => setPopupOpen(false)}
        />
        <Box
          onClick={handleClick}
          style={{ cursor: 'pointer', display: 'block', textAlign: 'center' }}
          ref={playerElement}
        >
          {!hideAvatar && (
            <img
              ref={iconRef}
              src={playerIcon}
              width={'40px'}
              alt=""
              style={{ verticalAlign: 'middle' }}
            />
          )}
          <p style={{ padding: 0, margin: 0, lineHeight: 1 }}>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 500,
                height: '23px',
                color: 'white',
                lineHeight: 1,
                backgroundColor: player.is_online
                  ? playerColor
                  : Color.greyLight,
                paddingLeft: '5px',
                paddingRight: '5px',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                paddingTop: '3px',
                paddingBottom: '3px',
              }}
            >
              {player.name}
            </span>
          </p>
        </Box>
      </Box>
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

  let originColumn =
    originRow % 2 === 0 ? (mapPosition - 1) % 10 : 10 - (mapPosition % 10 || 10)
  if (originColumn < 0) {
    originColumn = 0
  }

  const moveOffset = cellSize + 1

  return {
    x: (targetColumn - originColumn) * moveOffset,
    y: -(targetRow - originRow) * moveOffset,
  }
}

function getRelativePosition(player: Player, players: Player[]) {
  if (players.length === 0) {
    return { x: 0, y: 0 }
  }

  const sortedPlayers = [player, ...players].sort((a, b) => a.id - b.id)
  const playerIndex = sortedPlayers.findIndex((p) => p.id === player.id)

  if (player.map_position === 0) {
    return { x: playerIndex * 80, y: 0 }
  }
  if (sortedPlayers.length === 2) {
    return { x: playerIndex * 50 - 10, y: -(playerIndex * 25 - 10) }
  }
  if (sortedPlayers.length === 3) {
    return { x: 15, y: playerIndex * 30 - 10 }
  }
  return { x: 20, y: playerIndex * 25 - 10 }
}
