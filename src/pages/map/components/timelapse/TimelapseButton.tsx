import {
  Box,
  Button,
  Slider,
  SliderMarkLabel,
  SliderThumb,
} from '@mui/material'
import { Mark } from '@mui/material/Slider/useSlider.types'
import { range } from 'lodash'
import { useState } from 'react'
import { Color } from 'utils/types'

type Props = {}

type FormState = 'closed' | 'date' | 'move'

const DateMarks = range(1, 40, 1).map((value) => ({
  value,
  label: value.toString(),
}))

export default function TimelapseButton() {
  const [formState, setFormState] = useState<FormState>('closed')
  const [date, setDate] = useState<number>(1)

  if (formState === 'closed') {
    return (
      <Button onClick={() => setFormState('date')} sx={{ width: '320px' }}>
        Timelapse
      </Button>
    )
  }

  if (formState === 'date') {
    return (
      <Box width={'100%'}>
        <Box
          style={{
            display: 'flex',
            alignContent: 'flex-end',
            flexWrap: 'wrap',
            backgroundColor: 'black',
            width: '100%',
            height: '63px',
            paddingLeft: '10px',
            paddingRight: '10px',
            borderRadius: '10px',
            marginBottom: '10px',
          }}
        >
          <Slider
            min={1}
            max={40}
            step={1}
            marks={DateMarks}
            slots={{
              markLabel: CustomMark,
              rail: CustomRail,
              thumb: CustomThumb,
            }}
            getAriaValueText={displayText}
            valueLabelDisplay="off"
            track={false}
            sx={{ margin: 0 }}
            value={date}
            onChange={(_, value) => setDate(value as number)}
          />
        </Box>
        <Box display="flex" justifyContent="center">
          <Button
            onClick={() => setFormState('move')}
            sx={{ width: '320px', marginRight: '10px' }}
          >
            Выбрать дату - {date}
          </Button>
          <Button
            onClick={() => setFormState('closed')}
            sx={{ backgroundColor: 'black' }}
          >
            Закрыть
          </Button>
        </Box>
      </Box>
    )
  }

  return (
    <Box width={'100%'}>
      <Box
        style={{
          display: 'flex',
          alignContent: 'flex-end',
          flexWrap: 'wrap',
          backgroundColor: 'black',
          width: '100%',
          height: '63px',
          paddingLeft: '10px',
          paddingRight: '10px',
          borderRadius: '10px',
          marginBottom: '10px',
        }}
      >
        <Slider
          min={1}
          max={40}
          step={1}
          marks={DateMarks}
          slots={{
            markLabel: CustomMark,
            rail: CustomRail,
            thumb: CustomThumb,
          }}
          getAriaValueText={displayText}
          valueLabelDisplay="off"
          track={false}
          sx={{ margin: 0 }}
          value={date}
          onChange={(_, value) => setDate(value as number)}
        />
      </Box>
      <Box display="flex" justifyContent="center">
        <Button
          sx={{ width: '204px', marginRight: '10px', backgroundColor: 'black' }}
        >
          Пред. день
        </Button>
        <Button
          fullWidth
          onClick={() => setFormState('date')}
          sx={{ width: '163px', marginRight: '10px' }}
        >
          Вернуться
        </Button>
        <Button sx={{ width: '204px', backgroundColor: 'black' }}>
          След. день
        </Button>
      </Box>
    </Box>
  )
}

function displayText(value: number) {
  return `${value}`
}

function CustomMark(props: any) {
  const index = props['data-index'] as number
  const mark = props.ownerState.marks[index] as Mark

  const baseStyles = {
    backgroundColor: 'black',
    height: '24px',
    // width: '50px',
    color: 'white',
    top: '-24px',
    position: 'absolute',
    // left: `${index * 2}%`,
  }

  return (
    <div
      style={{
        ...props.style,
        ...baseStyles,
      }}
    >
      <span>{mark.label}</span>
      <div
        style={{
          height: '18px',
          width: '4px',
          backgroundColor: Color.blue,
          borderRadius: '5px',
        }}
      />
    </div>
  )
}

function CustomRail(props: any) {
  return (
    <div
      style={{
        ...props.style,
        position: 'absolute',
        height: '4px',
        top: '10px',
        width: '100%',
        backgroundColor: Color.blue,
        borderRadius: '5px',
      }}
    />
  )
}

function CustomThumb(props: any) {
  // return <SliderThumb {...props} />
  return (
    <SliderThumb
      {...props}
      style={{
        ...props.style,
        height: '18px',
        width: '12px',
        backgroundColor: Color.white,
        borderRadius: '6px',
        transform: 'translate(-36%, -84%)',
      }}
    />
  )
}
