import { useEffect, useState } from 'react'

type Props = {
  from: number
  to: number
}

export default function MapArrow({ from, to }: Props) {
  const [cellFrom, setCellFrom] = useState<HTMLElement | null>(null)
  const [cellTo, setCellTo] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const fromEl = document.getElementById(`map-cell-${from}`)
      const toEl = document.getElementById(`map-cell-${to}`)
      if (from && to) {
        setCellFrom(fromEl)
        setCellTo(toEl)
        observer.disconnect()
      }
    })

    // Observe changes to the entire document body or a specific container
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
    return () => {
      observer.disconnect() // Cleanup the observer on component unmount
    }
  }, [from, to])

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

  const isSnake = from > to

  let toY = cellTo.offsetTop - topPoint + cellTo.offsetHeight - 10
  if (isSnake) {
    toY = cellTo.offsetTop - topPoint + 10
  }

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
        markerStart={
          isSnake ? 'url(#red-arrow-start)' : 'url(#green-arrow-start)'
        }
        markerEnd={isSnake ? 'url(#red-arrow-end)' : 'url(#green-arrow-end)'}
      />
    </svg>
  )
}
