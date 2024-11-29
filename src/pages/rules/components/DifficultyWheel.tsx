import { Box } from '@mui/material'

export default function DifficultyWheel() {
  return (
    <Box display={'flex'} justifyContent={'center'}>
      <Box style={{ backgroundColor: 'black', width: 'fit-content' }}>
        <Box textAlign={'center'} fontSize={'32px'}>
          Ролл сложности игры
        </Box>
        <iframe
          src="https://wheelofnames.com/ru/krm-bsb"
          title="Колесо сложности"
          width={'700px'}
          height={'500px'}
          style={{ border: 'none' }}
        />
      </Box>
    </Box>
  )
}
