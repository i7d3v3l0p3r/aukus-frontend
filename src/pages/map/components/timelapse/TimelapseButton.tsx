import {
  Box,
  Button,
  Slider,
  SliderMarkLabel,
  SliderThumb,
} from '@mui/material'
import { Mark } from '@mui/material/Slider/useSlider.types'
import { useQuery } from '@tanstack/react-query'
import { range } from 'lodash'
import { useState } from 'react'
import { fetchMovesByDate } from 'utils/api'
import { Color } from 'utils/types'

type Props = {}

type FormState = 'closed' | 'date' | 'move'

const StartDate = new Date('2024-10-01')
const Today = new Date()

const daysBetween = (date1: Date, date2: Date) => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime())
  return Math.abs(diffTime / (1000 * 60 * 60 * 24))
}

const AmountOfDays = daysBetween(StartDate, Today)
const StartDateDay = StartDate.getDate()

const DateMarks = range(0, AmountOfDays, 1).map((value) => ({
  value,
  label: (value + StartDateDay).toString(),
}))

export default function TimelapseButton() {
  const [formState, setFormState] = useState<FormState>('closed')
  const [dateDiff, setDateDiff] = useState<number>(1)
  const [moveId, setMoveId] = useState<number>(1)

  const currentDate = new Date(StartDate)
  currentDate.setDate(StartDate.getDate() + dateDiff)

  const dateString = currentDate.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  })

  const datePart = currentDate.toISOString().split('T')[0]

  const handleDateDiffChange = (value: number) => {
    setDateDiff(value)
    setMoveId(1)
  }

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
            min={0}
            max={AmountOfDays - 0.5}
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
            value={dateDiff}
            onChange={(_, value) =>
              handleDateDiffChange(Math.floor(value as number))
            }
          />
        </Box>
        <Box textAlign="center" display="relative">
          <Button
            onClick={() => setFormState('move')}
            sx={{ width: '320px', marginRight: '10px', position: 'relative' }}
          >
            Выбрать дату - {dateString}
          </Button>
          <Button
            onClick={() => setFormState('closed')}
            sx={{
              backgroundColor: 'black',
              position: 'absolute',
              width: '163px',
            }}
          >
            Закрыть
          </Button>
        </Box>
      </Box>
    )
  }

  const turnMarks = range(1, 21, 1).map((value) => ({
    value,
    label: value.toString(),
  }))

  const nextDay = new Date(currentDate)
  nextDay.setDate(currentDate.getDate() + 1)
  const nextDayString = nextDay.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  })

  const prevDay = new Date(currentDate)
  prevDay.setDate(currentDate.getDate() - 1)
  const prevDayString = prevDay.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  })

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
          max={turnMarks.length + 0.5}
          step={1}
          marks={turnMarks}
          slots={{
            markLabel: CustomMark,
            rail: CustomRail,
            thumb: CustomThumb,
          }}
          getAriaValueText={displayText}
          valueLabelDisplay="off"
          track={false}
          sx={{ margin: 0 }}
          value={moveId}
          onChange={(_, value) => {
            setMoveId(Math.floor(value as number))
          }}
        />
      </Box>
      <Box display={'flex'} justifyContent="center">
        {!datesEqual(currentDate, StartDate) ? (
          <Button
            onClick={() => setDateDiff(dateDiff - 1)}
            sx={{
              width: '204px',
              backgroundColor: 'black',

              left: '0',
            }}
          >
            {'<-'} {prevDayString}
          </Button>
        ) : (
          <Box sx={{ width: '204px' }} />
        )}
        <Button
          fullWidth
          onClick={() => setFormState('date')}
          sx={{
            width: '163px',

            marginRight: '10px',
            marginLeft: '10px',
          }}
        >
          Вернуться
        </Button>
        {!datesEqual(currentDate, Today) ? (
          <Button
            onClick={() => setDateDiff(dateDiff + 1)}
            sx={{
              width: '204px',
              backgroundColor: 'black',
            }}
          >
            {nextDayString} {'->'}
          </Button>
        ) : (
          <Box sx={{ width: '204px' }} />
        )}
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
    top: '0px',
    position: 'absolute',
    // left: `${index * 2}%`,
  }

  const offsetLeft = index > 9 ? '-6px' : '-3px'

  return (
    <div
      style={{
        ...props.style,
        ...baseStyles,
      }}
    >
      <span style={{ position: 'absolute', top: '-26px', left: offsetLeft }}>
        {mark.label}
      </span>
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
        width: '1265px',
        backgroundColor: Color.blue,
        borderRadius: '5px',
      }}
    />
  )
}

function CustomThumb(props: any) {
  // return <SliderThumb {...props} />
  // console.log(props)
  const className = props.className as string
  const isActive = className.includes('Mui-active')

  return (
    <SliderThumb
      {...props}
      style={{
        ...props.style,
        height: isActive ? '22px' : '18px',
        width: isActive ? '14px' : '12px',
        border: '1px solid white',
        backgroundColor: Color.white,
        borderRadius: isActive ? '10px' : '6px',
        transform: isActive ? 'translate(-36%, -78%)' : 'translate(-34%, -84%)',
      }}
    />
  )
}

function datesEqual(date1: Date, date2: Date) {
  const date1String = date1.toISOString().slice(0, 10)
  const date2String = date2.toISOString().slice(0, 10)
  return date1String === date2String
}
