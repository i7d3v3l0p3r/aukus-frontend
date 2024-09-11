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
        x1={cellFrom.offsetLeft - leftPoint + cellFrom.offsetWidth / 2}
        y1={cellFrom.offsetTop - topPoint + cellFrom.offsetHeight / 2}
        x2={cellTo.offsetLeft - leftPoint + cellTo.offsetWidth / 2}
        y2={cellTo.offsetTop - topPoint + cellTo.offsetHeight / 2}
        stroke="white"
        stroke-width="2"
        marker-start="url(#start-arrow-snake)"
        marker-end="url(#end-arrow-snake)"
      />
      <defs>
        <marker
          id="start-arrow-snake"
          markerWidth="10"
          markerHeight="7"
          refX="2"
          refY="3.5"
          orient="auto"
          stroke="white"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="red" />
        </marker>
        <marker
          id="end-arrow-snake"
          markerWidth="10"
          markerHeight="7"
          refX="0"
          refY="3.5"
          orient="auto"
          stroke="white"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="red" />
        </marker>
      </defs>
    </svg>
  )
}
