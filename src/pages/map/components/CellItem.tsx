import { Box, Typography } from '@mui/material'
import ArrowBlue from 'assets/map/arrow_blue.png'
import ArrowGreen from 'assets/map/arrow_green.png'
import ArrowYellow from 'assets/map/arrow_yellow.png'
import Sign from 'assets/map/sign.png'
import { Player } from 'utils/types'
import { cellSize, MapCell } from '../types'

type Props = {
  cell: MapCell
  currentPlayer?: Player
  moveSteps?: number
}

export default function CellItem({ cell, currentPlayer, moveSteps }: Props) {
  let label = `${cell.id}`
  if (cell.id === 0) {
    label = 'Старт'
  } else if (cell.id === 102) {
    label = 'Финиш'
  } else if (cell.id === 101) {
    label = 'Рывок'
  }

  let relativeLocation = null
  if (currentPlayer && moveSteps && moveSteps !== 0) {
    const target = currentPlayer.map_position + moveSteps
    if (
      moveSteps > 0 &&
      cell.id > currentPlayer.map_position &&
      cell.id <= target
    ) {
      relativeLocation = cell.id - currentPlayer.map_position
    }
    if (
      moveSteps < 0 &&
      cell.id < currentPlayer.map_position &&
      cell.id >= target
    ) {
      relativeLocation = cell.id - currentPlayer.map_position
    }
  }

  const { style: arrowStyle, arrowImage } = getArrowStyle(cell)
  const labelLeft = cell.id === 101 ? '55px' : '17px'
  const labelTop = cell.id === 101 ? '7px' : '0px'

  return (
    <div
      id={`map-cell-${cell.id}`}
      style={{
        minHeight: cellSize,
        minWidth: cellSize,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box alignContent="center" position="absolute" top="0" left="0">
        <img
          src={arrowImage}
          width={"60px"}
          style={{
            position: 'absolute',
            ...arrowStyle
          }}
        />
        <span style={{
          display: 'inline',
          position: 'absolute',
          left: labelLeft,
          top: labelTop,
        }}>{label}</span>
      </Box>
      {relativeLocation && (
        <Box textAlign={'center'}>
          <Typography
            variant="h3"
            fontWeight={100}
            color={relativeLocation > 0 ? '#546e7a' : '#5d4037'}
          >
            {Math.abs(relativeLocation)}
          </Typography>
        </Box>
      )}
    </div>
  )
}

function getArrowStyle(cell: MapCell) {
  const style: {[k: string]: string} = {}

  if (cell.id === 101) {
    style.transform = 'scale(0.7)'
    style.left = '0px'
    style.top = '-10px'
    return {style, arrowImage: Sign}
  }


  let arrowImage = ArrowGreen
  if (cell.direction === 'up') {
    style.transform = 'rotate(-45deg)'
  } else if (cell.direction === 'left') {
    style.transform = 'scaleX(-1)'
  }

  if (cell.id > 40 && cell.id <= 80) {
    arrowImage = ArrowYellow
    if (cell.direction === 'right') {
      style.left = '-5px'
      style.top = '-7px'
    }
    if (cell.direction === 'left') {
      style.left = '0px'
      style.top = '-7px'
    }
    if (cell.direction === 'up') {
      style.left = '-5px'
      style.top = '-5px'
    }
  } else if (cell.id > 60) {
    arrowImage = ArrowBlue
    if (cell.direction === 'right') {
      style.left = '10px'
      style.top = '-3px'
    }
    if (cell.direction === 'left') {
      style.left = '-15px'
      style.top = '-3px'
    }
    if (cell.direction === 'up') {
      style.left = '6px'
      style.top = '-10px'
    }
  } else {
    arrowImage = ArrowGreen
    if (cell.direction === 'left') {
      style.left = '-5px'
      style.top = '-1px'
    }
    if (cell.direction === 'right') {
      style.left = '-4px'
      style.top = '-3px'
    }
    if (cell.direction === 'up') {
      style.left = '-2px'
      style.top = '-3px'
    }
  }
  return {style, arrowImage}
}
