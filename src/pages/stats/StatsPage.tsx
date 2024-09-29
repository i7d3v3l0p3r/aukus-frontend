import { Box } from '@mui/material'
import BottomSection from 'components/BottomSection'
import MainMenu from 'components/MainMenu'
import Leaderboard from './components/Leaderboard'

export default function StatsPage() {
  return (
    <Box>
      <MainMenu currentPage="stats" />
      <Box marginTop={'100px'} />
      <Leaderboard />
      <BottomSection />
    </Box>
  )
}
