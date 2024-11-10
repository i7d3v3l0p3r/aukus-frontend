import { Box } from '@mui/material'
import Clock from './Clock'

export default function FloatingClock() {
  return (
    <Box position="fixed" left={'15px'} bottom={'20px'}>
      <Clock />
    </Box>
  )
}
