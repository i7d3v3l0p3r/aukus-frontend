import { Circle } from '@mui/icons-material'
import { IconContainerProps, Rating } from '@mui/material'
import { useState } from 'react'
import { Color } from 'utils/types'

function IconContainer(props: IconContainerProps) {
  const { value, color, ...other } = props
  const round = Math.round(value)

  const isExact = value % 1 === 0

  const active = other.className?.includes('MuiRating-iconFilled')
  const style = { fontSize: 24, ...(active && color ? { color } : {}) }

  return (
    <span {...other}>
      <Circle style={style} />
      {isExact && (
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 15,
            color: 'white',
          }}
        >
          {round}
        </span>
      )}
    </span>
  )
}

function getIconContainerWithColor(value?: number | null) {
  if (!value) {
    return (props: IconContainerProps) => <IconContainer {...props} />
  }

  const color =
    value <= 4
      ? Color.red
      : value <= 7
        ? Color.yellow
        : value > 9
          ? Color.purple
          : Color.green

  return (props: IconContainerProps) => (
    <IconContainer {...props} color={color} />
  )
}

export default function NumRating(props: React.ComponentProps<typeof Rating>) {
  const [activeValue, setActiveValue] = useState<number>(0)

  const handleChangeActive = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setActiveValue(newValue)
    props.onChangeActive?.(event, newValue)
  }

  return (
    <Rating
      {...props}
      onChangeActive={handleChangeActive}
      icon={<Circle color="primary" />}
      IconContainerComponent={getIconContainerWithColor(activeValue)}
    />
  )
}
