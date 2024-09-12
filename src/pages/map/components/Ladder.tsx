import { Ladder } from '../types'

type Props = {
  ladder: Ladder
}

export default function LadderComponent({ ladder }: Props) {
  const cellFrom = document.getElementById(`map-cell-${ladder.cellFrom}`)
  const cellTo = document.getElementById(`map-cell-${ladder.cellTo}`)

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
  const toY = cellTo.offsetTop - topPoint + cellTo.offsetHeight - 10

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
        markerStart="url(#green-arrow-start)"
        markerEnd="url(#green-arrow-end)"
      />
    </svg>
  )
}
