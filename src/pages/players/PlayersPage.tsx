import { Box } from '@mui/material'
import BottomSection from 'components/BottomSection'
import MainMenu from 'components/MainMenu'
import PlayerList from './components/PlayerList'

export default function PlayersPage() {
  return (
    <Box>
      <MainMenu currentPage="players" />
      <PlayerList />
      <BottomSection />
    </Box>
  )
}
