import { Box } from '@mui/material'
import BottomSection from 'components/BottomSection'
import MainMenu from 'components/MainMenu'
import RulesContainer from './components/RulesConainer'
import DifficultyWheel from './components/DifficultyWheel'

export default function RulesPage() {
  return (
    <Box>
      <MainMenu currentPage={'rules'} />
      <DifficultyWheel />
      <Box marginTop={'100px'} />
      <RulesContainer />
      <BottomSection />
    </Box>
  )
}
