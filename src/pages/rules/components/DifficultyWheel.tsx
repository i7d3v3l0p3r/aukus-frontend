import { Box } from '@mui/material'

export default function DifficultyWheel() {
  return (
    <Box display={'flex'} justifyContent={'center'}>
      <Box
        style={{
          backgroundColor: 'black',
        }}
      >
        <Box textAlign={'center'} fontSize={'32px'}>
          Ролл сложности игры
        </Box>
        <Box>
          <iframe
            src="https://wheelofnames.com/ru/krm-bsb"
            title="Колесо сложности"
            width={'700px'}
            height={'700px'}
            style={{ border: 'none', padding: 0, margin: 0 }}
          />
        </Box>
      </Box>
    </Box>
  )
}
