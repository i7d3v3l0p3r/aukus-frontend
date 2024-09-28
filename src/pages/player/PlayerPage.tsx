import { Box } from '@mui/material'
import BottomSection from 'components/BottomSection'
import MainMenu from 'components/MainMenu'
import PlayerContent from './components/PlayerContent'

type Props = {}

export default function PlayerPage(props: Props) {
  return (
    <Box>
      <MainMenu currentPage="player" />
      <PlayerContent />
      <BottomSection />
    </Box>
  )
}
