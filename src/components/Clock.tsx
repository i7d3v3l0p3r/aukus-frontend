import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

const getMSKTime = () => {
  return new Date().toLocaleTimeString('ru-RU', {
    timeZone: 'Europe/Moscow',
  })
}

export default function Clock() {
  const [time, setTime] = useState(getMSKTime())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getMSKTime())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return <Box>МСК {time}</Box>
}
