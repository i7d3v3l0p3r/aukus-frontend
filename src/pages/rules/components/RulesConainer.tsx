import { Box } from '@mui/material'
import LinkSpan from 'components/LinkSpan'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Color } from 'utils/types'
import DonaterRules from './DonaterRules'
import PlayerRules from './PlayerRules'
import useScreenSize from 'src/context/useScreenSize'
import Countdown from './Countdown'

export default function RulesContainer() {
  const { headerSize } = useScreenSize()
  const [rulesPage, setRulesPage] = useState<'player' | 'donater'>('player')

  return (
    <Box display={'flex'} justifyContent="center">
      <Box width={'740px'} marginLeft={'10px'} marginRight={'10px'}>
        <Box marginBottom={'30px'}>
          <Link to="#" onClick={() => setRulesPage('player')}>
            <LinkSpan color={Color.blue} active={rulesPage === 'player'}>
              Для стримеров
            </LinkSpan>
          </Link>
          <span style={{ marginLeft: '50px' }} />
          <Link to="#" onClick={() => setRulesPage('donater')}>
            <LinkSpan color={Color.orange} active={rulesPage === 'donater'}>
              Для донатеров
            </LinkSpan>
          </Link>
          <span
            style={{
              lineHeight: '1.2',
              width: 'max-content',
              fontWeight: 600,
              marginLeft: '50px',
              // top={'1px'}
              // color: 'white5',
            }}
          >
            <Countdown />
          </span>
        </Box>
        <Box fontSize={headerSize} fontWeight={700} lineHeight={1.2}>
          {rulesPage === 'player'
            ? 'Общие правила проведения для участников'
            : 'Правила заказа игр'}
        </Box>

        <Box marginTop={'50px'} />
        {rulesPage === 'player' && <PlayerRules />}
        {rulesPage === 'donater' && <DonaterRules />}
      </Box>
    </Box>
  )
}
