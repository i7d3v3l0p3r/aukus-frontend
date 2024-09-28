import { Box } from '@mui/material'
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
    <Box marginTop={'100px'}>
      {todaysMoves.moves.map((move, index) => (
        <Box key={index}>
          <MoveCard move={move} id={move.id} />
        </Box>
      ))}
    </Box>
  )
}
