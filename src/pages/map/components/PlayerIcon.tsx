import { Box } from '@mui/material'
import { animated, useSpring } from '@react-spring/web'
import { useEffect, useRef, useState } from 'react'
import { getPlayerColor, Player } from 'utils/types'
import FigureCopper from 'assets/map/Figure_Copper.png'
import FigureBlue from 'assets/map/Figure_Blue.png'
import FigureGreen from 'assets/map/Figure_Green.png'
import FigureRed from 'assets/map/Figure_Red.png'
import FigurePink from 'assets/map/Figure_Pink.png'
import FigurePurple from 'assets/map/Figure_Purple.png'
import FigureLightGreen from 'assets/map/Figure_LightGreen.png'
import FigureSalad from 'assets/map/Figure_Salad.png'
import FigureLightSalad from 'assets/map/Figure_LightSalad.png'

import { cellSize } from '../types'
import PlayerPopup from './PlayerPopup'
import { getMapCellById, laddersByCell, snakesByCell } from './utils'

const playerIcons: { [key: string]: string } = {
  lasqa: FigurePurple,
  roadhouse: FigureCopper,
  segall: FigureBlue,
  artur: FigureRed,
  uselessmouth: FigurePink,
  unclobjorn: FigureSalad,
  melharucos: FigureLightSalad,
  browjey: FigureLightGreen,
  flashko: FigureGreen,
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
    const currentLocation = { x: 0, y: 0 }
    const backward = moves < 0
    const moveOffset = backward ? -cellSize - 1 : cellSize + 1

    const ladder = laddersByCell[player.map_position + moves]
    const snake = snakesByCell[player.map_position + moves]

    const animationsList: Array<{ x: number; y: number }> = []
    for (let i = 0; i < Math.abs(moves); i++) {
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

    const findCell = document.getElementById(`map-cell-${player.map_position}`)
    if (findCell) {
      setAnchorCell(findCell)
    } else {
      const interval = setInterval(() => {
        const findCell = document.getElementById(
          `map-cell-${player.map_position}`
        )
        setAnchorCell(findCell)
        clearInterval(interval)
      }, 50)
      return () => clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player.map_position])

  // console.log({ player, cell });
  if (!anchorCell) {
    return null
  }

  const originTop = anchorCell.offsetTop + 40
  const originLeft = anchorCell.offsetLeft + 10

  const { x: relativeX, y: relativeY } = getRelativePosition(player, players)
  const positionTop = originTop + relativeY
  const positionLeft = originLeft + relativeX

  const handleClick = (event: React.MouseEvent) => {
    setPopupAnchor(event.currentTarget as HTMLElement)
    setPopupOpen(!popupOpen)
    event.stopPropagation()
  }

  const onlineColor = player.is_online ? 'green' : 'red'
  const playerColor = getPlayerColor(player)
  const playerIcon = playerIcons[player.url_handle] || FigureCopper

  return (
    <animated.div
      style={{
        position: 'absolute',
        top: positionTop,
        left: positionLeft,
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
          style={{ cursor: 'pointer', display: 'grid' }}
          ref={playerElement}
        >
          <img src={playerIcon} width={'40px'} alt="" />
          <span
            style={{
              fontSize: '12px',
              color: 'white',
              lineHeight: 1,
              backgroundColor: playerColor,
              paddingLeft: '5px',
              paddingRight: '5px',
            }}
          >
            {player.name}
          </span>
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

  const originColumn =
    originRow % 2 === 0 ? (mapPosition - 1) % 10 : 10 - (mapPosition % 10 || 10)

  const moveOffset = cellSize + 1

  return {
    x: (targetColumn - originColumn) * moveOffset,
    y: -(targetRow - originRow) * moveOffset,
  }
}

function getRelativePosition(player: Player, players: Player[]) {
  const playersOnSamePosition = players.filter(
    (p) => p.map_position === player.map_position && p.id !== player.id
  )
  if (playersOnSamePosition.length === 0) {
    return { x: 0, y: 0 }
  }

  const sortedPlayers = [player, ...playersOnSamePosition].sort(
    (a, b) => a.id - b.id
  )
  const playerIndex = sortedPlayers.findIndex((p) => p.id === player.id)
  return { x: playerIndex * 35, y: -playerIndex * 10 }
}
