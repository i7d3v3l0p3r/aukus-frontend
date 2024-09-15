import { Box, Button } from '@mui/material'
import LinkSpan from 'components/LinkSpan'
import { Link } from 'react-router-dom'
import {
  Color,
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
        <Box marginTop={2} marginLeft={1}>
          <Link
            to={player.stream_link}
            target="_blank"
            rel="noopener nereferrer"
            style={{
              marginRight: 20,
            }}
          >
            <LinkSpan color={Color.purple}>Twitch</LinkSpan>
          </Link>
          <Link
            to={player.stream_link}
            target="_blank"
            rel="noopener nereferrer"
            style={{ marginRight: 20 }}
          >
            <LinkSpan color={Color.blue}>VKPlay</LinkSpan>
          </Link>
          <Link
            to={player.stream_link}
            target="_blank"
            rel="noopener nereferrer"
          >
            <LinkSpan color={Color.orange}>Донейшн</LinkSpan>
          </Link>
        </Box>
        <Box textAlign="center" marginTop={3} width="100%">
          <Link to={`/players/${player.url_handle}`}>
            <Button
              variant="contained"
              fullWidth
              color={getPlayerColorName(player)}
              sx={{ height: '50px' }}
            >
              Страница участника
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
