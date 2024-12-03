import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

const targetDate = new Date('2024-12-25T20:00:00+03:00')

export function getEventTimeLeft() {
  return Math.max(targetDate.getTime() - new Date().getTime(), 0)
}

export default function Countdown() {
  const [timeDiff, setTimeDiff] = useState<number>(
    targetDate.getTime() - new Date().getTime()
  )

  useEffect(() => {
    const interval = setInterval(() => {
      const difference = getEventTimeLeft()
      setTimeDiff(difference) // Ensure it doesn't go negative
    }, 1000)

    return () => clearInterval(interval) // Cleanup interval on component unmount
  }, [targetDate])

  // Calculate days, hours, minutes, and seconds from the difference
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60)
  const seconds = Math.floor((timeDiff / 1000) % 60)

  const hoursPadded = hours.toString().padStart(2, '0')
  const minutesPadded = minutes.toString().padStart(2, '0')
  const secondsPadded = seconds.toString().padStart(2, '0')

  let daysString = 'дней'
  if (days % 10 === 1 && days !== 11) {
    daysString = 'день'
  } else if (days % 10 >= 2 && days % 10 <= 4 && (days < 10 || days > 20)) {
    daysString = 'дня'
  }

  return (
    <span>
      До конца ивента: <span style={{ fontFamily: 'PT mono' }}>{days}</span>{' '}
      {daysString}{' '}
      <span style={{ fontFamily: 'PT mono' }}>
        {hoursPadded}:{minutesPadded}:{secondsPadded}
      </span>
    </span>
  )
}
