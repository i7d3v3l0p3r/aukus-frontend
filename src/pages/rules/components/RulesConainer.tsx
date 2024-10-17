import { Box, Typography } from '@mui/material'
import LinkSpan from 'components/LinkSpan'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Color } from 'utils/types'
import DonaterRules from './DonaterRules'
import PlayerRules from './PlayerRules'

export default function RulesContainer() {
  const [rulesPage, setRulesPage] = useState<'player' | 'donater'>('player')

  return (
    <Box display={'flex'} justifyContent="center">
      <Box width={'740px'}>
        <Box marginBottom={'30px'}>
          <Link to="#" onClick={() => setRulesPage('player')}>
            <LinkSpan color={Color.purple} active={rulesPage === 'player'}>
              Общие правила проведения для участников
            </LinkSpan>
          </Link>
          <span style={{ marginLeft: '50px' }} />
          <Link to="#" onClick={() => setRulesPage('donater')}>
            <LinkSpan color={Color.orange} active={rulesPage === 'donater'}>
              Правила заказа игр на аукусе
            </LinkSpan>
          </Link>
        </Box>
        <Typography fontSize={'48px'} fontWeight={700} lineHeight={1.2}>
          Правила проведения описывают все аспекты Аукуса
        </Typography>

        <Box marginTop={'50px'} />
        {rulesPage === 'player' && <PlayerRules />}
        {rulesPage === 'donater' && <DonaterRules />}
      </Box>
    </Box>
  )
}
