import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

const getMSKTime = () => {
  // returns hour and minute without seconds
  const date = new Date()
  const mskTime = new Date(
    date.toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })
  )
  return mskTime.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
  })
}

export default function Clock() {
  const [time, setTime] = useState(getMSKTime())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getMSKTime())
    }, 10 * 1000)
    return () => clearInterval(interval)
  }, [])

  return <Box>МСК {time}</Box>
}
