import { Box, Grid } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import BottomSection from 'components/BottomSection'
import { shuffle } from 'lodash'
import { fetchPlayers } from 'utils/api'
import PlayerSection from './components/PlayerSection'

export default function PlayersPage() {
  const { data: playersData } = useQuery({
    queryKey: ['players'],
    queryFn: fetchPlayers,
    staleTime: 1000 * 60 * 5,
  })
  const players = playersData?.players

  if (!players) {
    return <div>Загрузка...</div>
  }

  const randomPlayers = shuffle(players)

  return (
    <Box textAlign={'center'}>
      <Grid container columns={1}>
        {randomPlayers.map((player) => (
          <Grid item xs={1} key={player.id} marginBottom={6}>
            <PlayerSection player={player} />
          </Grid>
        ))}
      </Grid>
      <BottomSection />
    </Box>
  )
}
