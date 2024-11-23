import { Box } from '@mui/material'
import BottomSection from 'components/BottomSection'
import MainMenu from 'components/MainMenu'
import MapComponent from './components/MapComponent'
import TimelapseProvider from './hooks/useTimelapse'
import useScreenSize from 'src/context/useScreenSize'
import MapComponentMobile from './components/MapComponentMobile'

export default function MapPage() {
  const { isMobile } = useScreenSize()
  return (
    <Box>
      <MainMenu currentPage={'map'} />
      {isMobile ? (
        <MapComponentMobile />
      ) : (
        <Box
          alignContent={'center'}
          display="flex"
          alignItems="center"
          justifyContent={'start'}
          margin={'auto'}
          marginTop={'50px'}
          width={'fit-content'}
        >
          <TimelapseProvider>
            <MapComponent />
          </TimelapseProvider>
        </Box>
      )}
      <BottomSection />
    </Box>
  )
}
