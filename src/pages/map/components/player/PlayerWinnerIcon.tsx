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
  predan: PlayerBrown,
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
  predan: PlayerBrownMoving,
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
  closePopup?: boolean
  isMoving?: boolean
  position: 1 | 2 | 3
}

export default function PlayerWinnerIcon({
  player,
  closePopup,
  isMoving,
  position,
}: Props) {
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupAnchor, setPopupAnchor] = useState<HTMLElement | null>(null)
  const iconRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (popupOpen) {
      setPopupOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closePopup])

  const positionToCoordsMap = {
    1: { top: -5, left: 365, scale: 1.3 },
    2: { top: 23, left: 555, scale: 1.2 },
    3: { top: 100, left: 664, scale: 1.1 },
  }

  const coords = positionToCoordsMap[position]

  const isStillAnimated = iconRef.current?.src.endsWith('gif')

  const finalPositionTop = coords.top
  const finalPositionLeft = coords.left

  const handleClick = (event: React.MouseEvent) => {
    setPopupAnchor(event.currentTarget as HTMLElement)
    setPopupOpen(!popupOpen)
    event.stopPropagation()
  }

  const onlineColor = player.is_online ? Color.green : Color.red
  const playerColor = getPlayerColor(player.url_handle)
  const playerIcon = isMoving
    ? playerMovingIcons[player.url_handle] || PlayerBlueLightMoving
    : playerIcons[player.url_handle] || PlayerBlueLight

  return (
    <Box
      style={{
        position: 'absolute',
        top: finalPositionTop,
        left: finalPositionLeft,
        zIndex: 10,
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
        >
          <img
            ref={iconRef}
            src={playerIcon}
            width={`${40 * coords.scale}px`}
            alt=""
            style={{ verticalAlign: 'middle' }}
          />
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
    </Box>
  )
}
