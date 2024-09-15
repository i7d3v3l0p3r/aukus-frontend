import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import {
  ColorNameByUrlHandle,
  getPlayerColor,
  getPlayerColorName,
  Player,
} from 'utils/types'

type Props = {
  player: Player
}

export default function PlayerSection({ player }: Props) {
  return (
    <Box display="flex" justifyContent="center">
      <Box textAlign={'left'}>
        <h1>Имя {player.name}</h1>
        <Box height={300} width={550} sx={{ backgroundColor: 'grey' }} />
        <Box marginTop={1} marginLeft={1}>
          <Link
            to={player.stream_link}
            target="_blank"
            rel="noopener nereferrer"
            style={{ marginRight: 20 }}
          >
            <span className="purple">Twitch</span>
          </Link>
          <Link
            to={player.stream_link}
            target="_blank"
            rel="noopener nereferrer"
            style={{ marginRight: 20 }}
          >
            <span className="blue">VKPlay</span>
          </Link>
          <Link
            to={player.stream_link}
            target="_blank"
            rel="noopener nereferrer"
          >
            <span className="orange">Донейшн</span>
          </Link>
        </Box>
        <Box textAlign="center" marginTop={2} width="100%">
          <Link to={`/players/${player.url_handle}`}>
            <Button
              variant="contained"
              fullWidth
              color={getPlayerColorName(player)}
            >
              Страница участника
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
