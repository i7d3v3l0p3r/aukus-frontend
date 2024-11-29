import { Box } from '@mui/material'

export default function DifficultyWheel() {
  return (
    <Box style={{ transform: 'scale(0.8)' }}>
      <iframe
        src="https://wheelofnames.com/ru/krm-bsb"
        title="Колесо сложности"
        width={'700px'}
        height={'500px'}
        style={{ backgroundColor: 'black', border: 'none' }}
      />
    </Box>
  )
}
