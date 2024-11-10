import { Box } from '@mui/material'
import TodaysMoves from './TodaysMoves'

export default function MapComponentMobile() {
  return (
    <Box marginTop={'100px'}>
      <Box
        width={'fit-content'}
        margin={'auto'}
        fontWeight={600}
        fontSize={'36px'}
      >
        <Box>Положение на карте</Box>
      </Box>
      <TodaysMoves />
    </Box>
  )
}
