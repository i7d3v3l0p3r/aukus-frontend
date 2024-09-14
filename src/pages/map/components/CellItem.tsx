import { ArrowRightAltSharp } from '@mui/icons-material'
import { Box, Chip, Typography } from '@mui/material'
import { Player } from 'utils/types'
import { cellSize, MapCell } from '../types'

type Props = {
  cell: MapCell
  currentPlayer?: Player
  moveSteps?: number
}

export default function CellItem({ cell, currentPlayer, moveSteps }: Props) {
  const directionIcons = {
    right: (
      <ArrowRightAltSharp sx={{ fontSize: 30, verticalAlign: 'middle' }} />
    ),
    left: (
      <ArrowRightAltSharp
        sx={{
          fontSize: 30,
          verticalAlign: 'middle',
          transform: 'rotate(180deg)',
        }}
      />
    ),
    up: (
      <ArrowRightAltSharp
        sx={{
          fontSize: 30,
          verticalAlign: 'middle',
          transform: 'rotate(-90deg)',
        }}
      />
    ),
  }

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
      <Box alignContent="center" position="absolute" top={0} left={0}>
        <Chip label={label} />
        {cell.direction && directionIcons[cell.direction]}
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
