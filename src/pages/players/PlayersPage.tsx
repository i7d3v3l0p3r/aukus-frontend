import { Box, Grid } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import BottomSection from 'components/BottomSection'
import { shuffle } from 'lodash'
import { useState } from 'react'
import { fetchPlayers } from 'utils/api'
import PlayerSection from './components/PlayerSection'

export default function PlayersPage() {
  const [fetchStart] = useState(Date.now())

  const { data: playersData } = useQuery({
    queryKey: ['players'],
    queryFn: fetchPlayers,
    staleTime: 1000 * 60 * 5,
  })
  const players = playersData?.players

  if (!players) {
    if (Date.now() - fetchStart > 1000) {
      return <div>Загрузка...</div>
    }
    return null
  }

  const randomPlayers = shuffle(players)

  return (
    <Box textAlign={'center'}>
      <Grid container columns={1}>
        {randomPlayers.map((player) => (
          <Grid item xs={1} key={player.id} marginBottom={'150px'}>
            <PlayerSection player={player} />
          </Grid>
        ))}
      </Grid>
      <BottomSection />
    </Box>
  )
}
