import { Box, Typography } from '@mui/material'
import BottomSection from 'components/BottomSection'
import LinkSpan from 'components/LinkSpan'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Color } from 'utils/types'
import DonaterRules from './components/DonaterRules'
import PlayerRules from './components/PlayerRules'

export default function RulesPage() {
  const [rulesPage, setRulesPage] = useState<'player' | 'donater'>('player')

  return (
    <Box marginLeft={20} marginRight={20}>
      <Box>
        <Box marginBottom={4}>
          <Link to="#" onClick={() => setRulesPage('player')}>
            <LinkSpan color={Color.purple}>Для стримеров</LinkSpan>
          </Link>
          <span style={{ marginLeft: 50 }} />
          <Link to="#" onClick={() => setRulesPage('donater')}>
            <LinkSpan color={Color.orange}>Для донатеров</LinkSpan>
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
