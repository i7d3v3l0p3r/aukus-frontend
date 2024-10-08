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
        <Typography fontSize={'48px'} fontWeight={700} lineHeight={1}>
          {player.first_name || ''} {player.name}
        </Typography>
        <Box
          height={'300px'}
          width={'550px'}
          marginTop={'30px'}
          sx={{ backgroundColor: 'grey' }}
        />
        <Box marginTop={'20px'} marginLeft={'20px'}>
          {player.twitch_stream_link && (
            <Link
              to={player.twitch_stream_link}
              target="_blank"
              rel="noopener nereferrer"
            >
              <LinkSpan color={Color.purple} style={{ fontSize: '20px' }}>
                Twitch
              </LinkSpan>
            </Link>
          )}
          {player.vk_stream_link && (
            <Link
              to={player.vk_stream_link}
              target="_blank"
              rel="noopener nereferrer"
              style={{ marginLeft: '30px' }}
            >
              <LinkSpan color={Color.blue} style={{ fontSize: '20px' }}>
                VKPlay
              </LinkSpan>
            </Link>
          )}
          {player.telegram_link && (
            <Link
              to={player.telegram_link}
              target="_blank"
              rel="noopener nereferrer"
              style={{ marginLeft: '30px' }}
            >
              <LinkSpan color={Color.blueTg} style={{ fontSize: '20px' }}>
                Телеграм
              </LinkSpan>
            </Link>
          )}
          {player.donation_link && (
            <Link
              to={player.donation_link}
              target="_blank"
              rel="noopener nereferrer"
              style={{ marginLeft: '30px' }}
            >
              <LinkSpan color={Color.orange} style={{ fontSize: '20px' }}>
                Донейшн
              </LinkSpan>
            </Link>
          )}
        </Box>
        <Box textAlign="center" marginTop={'30px'} width="100%">
          <Link to={`/players/${player.url_handle}`}>
            <Button
              variant="contained"
              fullWidth
              color={getPlayerColorName(player)}
              sx={{
                height: '50px',
                width: '550px',
              }}
              style={{ borderRadius: '15px' }}
            >
              Страница участника
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
