import { Box } from '@mui/material'
import { Color, getPlayerColor, Player, PlayerStats } from 'src/utils/types'
import { getPlayerScore } from './Leaderboard'

type Props = {
  player: Player
  stat: PlayerStats
}

export default function PlayerStatMobile({ stat, player }: Props) {
  const score = getPlayerScore(stat)
  return (
    <Box
      style={{
        backgroundColor: getPlayerColor(player.url_handle),
        borderRadius: '10px',
        padding: '15px',
        marginBottom: '20px',
      }}
    >
      <Box display={'flex'} justifyContent={'space-between'} fontSize={'11px'}>
        <Box>Ходов — {stat.total_moves}</Box>
        <Box color={'rgba(255,255,255,0.8)'}>Очки — {score}</Box>
      </Box>
      <Box fontSize={'36px'} lineHeight={1.2}>
        {player.name} — {player.map_position} позиция
      </Box>
      <Box
        fontSize={'14px'}
        color={'rgba(255,255,255,0.8)'}
        lineHeight={1.4}
        marginTop={'10px'}
      >
        Пройдено игр — {stat.games_completed}
        <br />
        Дропнуто игр — {stat.games_dropped}
        <br />
        Просмотрено фильмов — {stat.movies}
        <br />
        Шейх-моментов — {stat.sheikh_moments}
      </Box>
    </Box>
  )
}
