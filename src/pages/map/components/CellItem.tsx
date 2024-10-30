import { Box, Typography } from '@mui/material'
import ArrowBlue from 'assets/map/arrow_blue.png'
import ArrowGreen from 'assets/map/arrow_green.png'
import ArrowYellow from 'assets/map/arrow_yellow.png'
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

  let transformation = ''
  if (cell.direction === 'up') {
    transformation = 'rotate(-90deg)'
  } else if (cell.direction === 'left') {
    transformation = 'rotate(180deg)'
  }

  let arrowCoords = { top: "0px", left: "-5px" }
  let arrowImage = ArrowGreen
  if (cell.id > 40 && cell.id <= 60) {
    arrowImage = ArrowYellow
    arrowCoords.left = "-4px"
    arrowCoords.top = "-5px"
  } else if (cell.id > 60) {
    arrowImage = ArrowBlue
    arrowCoords.left = "5px"
  }

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
            transform: transformation,
            position: 'absolute',
            top: arrowCoords.top,
            left: arrowCoords.left,
          }}
        />
        <span style={{display: 'inline', position: 'absolute', left: '17px'}}>{label}</span>
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
