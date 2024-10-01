import { Box } from '@mui/material'
import BottomSection from 'components/BottomSection'
import MainMenu from 'components/MainMenu'
import MapComponent from './components/MapComponent'

export default function MapPage() {
  return (
    <Box>
      <MainMenu currentPage={'map'} />
      <Box
        marginTop={'100px'}
        alignContent={'center'}
        display="flex"
        alignItems="center"
        justifyContent={'center'}
      >
        <MapComponent />
      </Box>
      <BottomSection />
    </Box>
  )
}
