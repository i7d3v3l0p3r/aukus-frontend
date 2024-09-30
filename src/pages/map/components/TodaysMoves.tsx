import { Box, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import MoveCard from 'pages/player/components/MoveCard'
import { fetchMovesByDate } from 'utils/api'

export default function TodaysMoves() {
  const today = new Date()
  const formattedDate = today.toISOString().split('T')[0]

  const { data: todaysMoves } = useQuery({
    queryKey: ['todaysMoves'],
    queryFn: () => fetchMovesByDate(formattedDate),
    refetchInterval: 1000 * 60,
  })

  if (!todaysMoves) return null

  return (
    <Box>
      <Box marginTop={'80px'} textAlign={'center'} marginBottom={'50px'}>
        <Typography fontWeight={600} fontSize={'48px'}>
          История ходов за сегодня
        </Typography>
      </Box>
      {todaysMoves.moves.map((move, index) => (
        <Box key={index}>
          <MoveCard move={move} id={move.id} />
        </Box>
      ))}
    </Box>
  )
}
