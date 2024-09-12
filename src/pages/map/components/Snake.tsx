import { Snake } from '../types'

type Props = {
  snake: Snake
}

export default function SnakeComponent({ snake }: Props) {
  const cellFrom = document.getElementById(`map-cell-${snake.cellFrom}`)
  const cellTo = document.getElementById(`map-cell-${snake.cellTo}`)

  if (!cellFrom || !cellTo) {
    return null
  }

  const topPoint = Math.min(cellTo.offsetTop, cellFrom.offsetTop)
  const leftPoint = Math.min(cellTo.offsetLeft, cellFrom.offsetLeft)

  const bottomPoint = Math.max(
    cellFrom.offsetTop + cellFrom.offsetHeight,
    cellTo.offsetTop + cellTo.offsetHeight
  )
  const rightPoint = Math.max(
    cellTo.offsetLeft + cellTo.offsetWidth,
    cellFrom.offsetLeft + cellFrom.offsetWidth
  )

  const arrowGoesToRight = cellTo.offsetLeft > cellFrom.offsetLeft
  const arrowGoesStraight = cellTo.offsetLeft === cellFrom.offsetLeft

  const fromX = cellFrom.offsetLeft - leftPoint + cellFrom.offsetWidth / 2
  const fromY = cellFrom.offsetTop - topPoint + cellFrom.offsetHeight / 2

  const toX =
    cellTo.offsetLeft -
    leftPoint +
    (arrowGoesToRight
      ? 10
      : arrowGoesStraight
        ? cellTo.offsetWidth / 2
        : cellTo.offsetWidth - 10)
  const toY = cellTo.offsetTop - topPoint + 10

  return (
    <svg
      id="svg"
      width={rightPoint - leftPoint}
      height={bottomPoint - topPoint}
      style={{
        position: 'absolute',
        top: topPoint,
        left: leftPoint,
        pointerEvents: 'none',
      }}
    >
      <line
        id="arrow"
        x1={fromX}
        y1={fromY}
        x2={toX}
        y2={toY}
        stroke="white"
        strokeWidth="2"
        markerStart="url(#red-arrow-start)"
        markerEnd="url(#red-arrow-end)"
      />
    </svg>
  )
}
