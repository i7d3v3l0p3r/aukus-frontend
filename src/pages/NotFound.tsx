import { Box } from '@mui/material'

export default function NotFound() {
  return (
    <Box display="flex" justifyContent="center">
      <Box marginTop={'150px'}>
        <img src="https://cdn.7tv.app/emote/01HNKT4960000EXZQWSVKBCAGF/4x.png" />
        <Box textAlign={'center'} marginTop={'20px'} fontSize={'32px'}>
          404 Не Найдено
        </Box>
      </Box>
    </Box>
  )
}
