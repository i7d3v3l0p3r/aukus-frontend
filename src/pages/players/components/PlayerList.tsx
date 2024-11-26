import { Box, Button, Grid, Link } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { shuffle } from 'lodash'
import { useMemo, useState } from 'react'
import OpenIcon from 'assets/open_icon.svg'
import { fetchPlayers } from 'utils/api'
import PlayerSection from './PlayerSection'
import { PlayerPhotoMap } from './utils'

export default function PlayerList() {
  const [fetchStart] = useState(Date.now())

  const { data: playersData } = useQuery({
    queryKey: ['players'],
    queryFn: () => fetchPlayers(),
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
    <Box marginLeft={'10px'} marginRight={'10px'}>
      <Link
        href={'https://veksever.ru/twitch_live/aucus3'}
        target={'_blank'}
        rel="noopener nereferrer"
      >
        <Box textAlign={'center'} marginBottom={'20px'}>
          <Button>
            Мультистрим (Твич)
            <img
              src={OpenIcon}
              alt=""
              style={{ marginLeft: '10px', width: '17px', height: '17px' }}
            />
          </Button>
        </Box>
      </Link>
      {randomPlayers.map((player) => {
        const hasPhoto = PlayerPhotoMap[player.url_handle]
        if (!hasPhoto) {
          return null
        }
        return (
          <Box key={player.id} marginBottom={'150px'}>
            <PlayerSection player={player} />
          </Box>
        )
      })}
    </Box>
  )
}
