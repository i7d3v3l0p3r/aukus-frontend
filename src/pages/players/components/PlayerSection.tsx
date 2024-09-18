import { Box, Button, Typography } from '@mui/material'
import LinkSpan from 'components/LinkSpan'
import { Link } from 'react-router-dom'
import { Color, getPlayerColorName, Player } from 'utils/types'

type Props = {
  player: Player
}

export default function PlayerSection({ player }: Props) {
  return (
    <Box display="flex" justifyContent="center">
      <Box textAlign={'left'}>
        <Typography variant="h3">Имя {player.name}</Typography>
        <Box
          height={300}
          width={550}
          marginTop={'30px'}
          sx={{ backgroundColor: 'grey' }}
        />
        <Box marginTop={'20px'} marginLeft={'20px'}>
          <Link
            to={player.twitch_stream_link}
            target="_blank"
            rel="noopener nereferrer"
            style={{
              marginRight: '30px',
            }}
          >
            <LinkSpan color={Color.purple}>Twitch</LinkSpan>
          </Link>
          <Link
            to={player.vk_stream_link}
            target="_blank"
            rel="noopener nereferrer"
            style={{ marginRight: '30px' }}
          >
            <LinkSpan color={Color.blue}>VKPlay</LinkSpan>
          </Link>
          <Link
            to={player.donation_link}
            target="_blank"
            rel="noopener nereferrer"
          >
            <LinkSpan color={Color.orange}>Донейшн</LinkSpan>
          </Link>
        </Box>
        <Box textAlign="center" marginTop={'30px'} width="100%">
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
