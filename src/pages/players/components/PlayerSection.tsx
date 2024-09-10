import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { Player } from 'utils/types'

type Props = {
  player: Player
}

export default function PlayerSection({ player }: Props) {
  return (
    <Box display="flex" justifyContent="center">
      <Box textAlign={'left'}>
        <h1>Имя {player.name}</h1>
        <Box height={200} width={300} sx={{ backgroundColor: 'grey' }} />
        <Box marginTop={1}>
          <Button variant="text" style={{ backgroundColor: 'transparent' }}>
            <p className="purple">Twitch</p>
          </Button>
          <Button variant="text" style={{ backgroundColor: 'transparent' }}>
            <p className="blue">VKPlay</p>
          </Button>
          <Button variant="text" style={{ backgroundColor: 'transparent' }}>
            <p className="orange">Донейшн</p>
          </Button>
        </Box>
        <Box textAlign="center" marginTop={1} width="100%">
          <Link to={`/players/${player.url_handle}`}>
            <Button variant="contained" color="secondary" fullWidth>
              Страница участника
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
