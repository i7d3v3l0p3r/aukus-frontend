import { Box } from '@mui/material'
import BottomSection from 'components/BottomSection'
import MapComponent from './components/MapComponent'

export default function MapPage() {
  return (
    <Box>
      <Box alignContent={'center'} display="flex" alignItems="center">
        <MapComponent />
      </Box>
      <BottomSection />
    </Box>
  )
}
