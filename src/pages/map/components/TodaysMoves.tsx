import { Box, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { find } from 'lodash'
import MoveCard from 'pages/player/components/MoveCard'
import { fetchMovesByDate, fetchPlayers } from 'utils/api'
import { Player } from 'utils/types'

export default function TodaysMoves() {
  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
  const formattedDate = today.toISOString().split('T')[0]

  const { data: todaysMoves, refetch: refetchMoves } = useQuery({
    queryKey: ['todaysMoves'],
    queryFn: () => fetchMovesByDate(formattedDate),
    refetchInterval: 1000 * 60,
  })

  const { data: playersData } = useQuery({
    queryKey: ['players'],
    queryFn: () => fetchPlayers(),
    refetchInterval: 1000 * 60,
  })

  if (!todaysMoves) {
    return null
  }

  return (
    <Box>
      <Box marginTop={'80px'} textAlign={'center'} marginBottom={'50px'}>
        <Typography fontWeight={600} fontSize={'48px'}>
          История ходов за сегодня
        </Typography>
      </Box>
      {todaysMoves.moves.map((move, index) => (
        <Box key={index}>
          <MoveCard
            move={move}
            id={move.player_move_id}
            player={find(
              playersData?.players || [],
              (player: Player) => player.id === move.player_id
            )}
            displayType="map"
            onSave={refetchMoves}
          />
        </Box>
      ))}
    </Box>
  )
}
