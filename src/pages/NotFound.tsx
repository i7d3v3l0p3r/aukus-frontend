import { Box } from '@mui/material'

export default function NotFound() {
  return (
    <Box display="flex" justifyContent="center">
      <Box marginTop={'150px'}>
        <img
          src="https://cdn.7tv.app/emote/01J4RNW84G0006H6JAMR0FAC09/2x.avif"
          width={'300px'}
        />
        <Box textAlign={'center'} marginTop={'20px'} fontSize={'32px'}>
          404 Не Найдено
        </Box>
      </Box>
    </Box>
  )
}
