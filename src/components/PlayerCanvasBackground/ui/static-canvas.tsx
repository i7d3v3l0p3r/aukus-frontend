import React, { useRef } from 'react'
import { Box } from '@mui/material'
import { usePlayerCanvasBackgroundContext } from '../context'
import { useRefDimensions } from '../use-ref-dimensions'

function adjustCoordinates(
  x: number,
  y: number,
  width: number,
  height: number,
  angle: number,
  scaleX: number,
  scaleY: number
) {
  if (angle < 0) {
    angle = 360 + angle
  }

  // Convert degrees to radians
  const theta = angle * (Math.PI / 180)

  // Calculate the new position for rotation
  let newX =
    x - (width / 2) * (1 - Math.cos(theta)) - (height / 2) * Math.sin(theta)
  let newY =
    y - (height / 2) * (1 - Math.cos(theta)) + (width / 2) * Math.sin(theta)

  // Adjust for mirroring
  if (scaleX === -1) {
    // When mirroring, we need to shift the x position based on the rotation angle
    newX -= width * Math.cos(theta) // Adjust for width based on rotation
    newY -= height * Math.sin(theta) // Adjust for height based on rotation
  }
  if (scaleY === -1) {
    newX += (width / 2) * Math.sin(theta)
    newY -= height * Math.cos(theta)
  }

  // Return the transformed coordinates
  return { x: newX, y: newY }
}

export function StaticCanvas() {
  const { images } = usePlayerCanvasBackgroundContext()
  const containerRef = useRef<HTMLDivElement>(null)
  const dimensions = useRefDimensions(containerRef)

  const renderItems = () => {
    if (dimensions.width > 0) {
      return images.map((image) => {
        const { x, y } = adjustCoordinates(
          image.x,
          image.y,
          image.width,
          image.height,
          image.rotation,
          image.scaleX,
          image.scaleY
        )

        return (
          <Box
            key={image.id}
            component="img"
            src={`${image.url}`}
            sx={{
              position: 'absolute',
              top: y,
              left: dimensions.width / 2 + x,
              width: `${Math.abs(image.width)}px`,
              height: `${Math.abs(image.height)}px`,
              transform: `rotate(${image.rotation}deg) scaleX(${image.scaleX}) scaleY(${image.scaleY})`,
              userSelect: 'none',
            }}
            draggable={false}
          />
        )
      })
    }

    return null
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'absolute',
        zIndex: 0,
        width: '100%',
        height: '100%',
      }}
    >
      {renderItems()}
    </Box>
  )
}
