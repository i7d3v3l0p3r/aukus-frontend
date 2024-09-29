import { Box } from '@mui/material'
import BottomSection from 'components/BottomSection'
import MainMenu from 'components/MainMenu'
import PlayerContent from './components/PlayerContent'

export default function PlayerPage() {
  return (
    <Box>
      <MainMenu currentPage="player" />
      <PlayerContent />
      <BottomSection />
    </Box>
  )
}
