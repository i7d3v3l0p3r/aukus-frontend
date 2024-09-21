import { OpenInNew } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { getPlayerColorName, Player } from 'utils/types'

type Props = {
  player: Player
}

export default function StreamLink({ player }: Props) {
  return (
    <Link
      to={player.twitch_stream_link || player.vk_stream_link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {player.is_online ? (
        <OnlineButton player={player} />
      ) : (
        <OfflineButton player={player} />
      )}
    </Link>
  )
}

function OnlineButton({ player }: Props) {
  return (
    <Button
      sx={{
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: '50px',
        paddingRight: '50px',
      }}
      color={getPlayerColorName(player)}
    >
      <Box display="flex" alignItems={'center'} fontSize={'14px'}>
        Сейчас играет в: {player.stream_last_category}
        <OpenInNew sx={{ marginLeft: 1 }} />
      </Box>
    </Button>
  )
}

function OfflineButton({ player }: Props) {
  return (
    <Button
      sx={{
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: '50px',
        paddingRight: '50px',
      }}
      color={getPlayerColorName(player)}
      variant="outlined"
    >
      Стример оффлайн
    </Button>
  )
}
