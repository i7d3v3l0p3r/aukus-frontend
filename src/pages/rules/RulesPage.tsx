import { Box, Typography } from '@mui/material'
import BottomSection from 'components/BottomSection'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import DonaterRules from './components/DonaterRules'
import PlayerRules from './components/PlayerRules'

export default function RulesPage() {
  const [rulesPage, setRulesPage] = useState<'player' | 'donater'>('player')

  return (
    <Box marginLeft={20} marginRight={20}>
      <Box>
        <Box marginBottom={4}>
          <Link to="#" onClick={() => setRulesPage('player')}>
            <span className="purple">Для стримеров</span>
          </Link>
          <span style={{ marginLeft: 50 }} />
          <Link to="#" onClick={() => setRulesPage('donater')}>
            <span className="orange">Для донатеров</span>
          </Link>
        </Box>
        <Typography variant="h4">
          Правила проведения описывают все аспекты Аукуса
        </Typography>

        <Box marginTop={2} />
        {rulesPage === 'player' && <PlayerRules />}
        {rulesPage === 'donater' && <DonaterRules />}
      </Box>
      <BottomSection />
    </Box>
  )
}
