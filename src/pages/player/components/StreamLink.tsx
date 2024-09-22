import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { getPlayerColorName, Player } from 'utils/types'
import OpenIcon from 'assets/open_icon.svg'

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
        lineHeight: '1',
      }}
      color={getPlayerColorName(player)}
    >
      <Box display="flex" alignItems={'center'} fontSize={'14px'}>
        Сейчас на стриме: {player.stream_last_category}
        <img
          src={OpenIcon}
          alt=""
          style={{ marginLeft: '10px', width: '17px', height: '17px' }}
        />
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
        lineHeight: '1',
      }}
      color={getPlayerColorName(player)}
      variant="outlined"
    >
      Стример оффлайн
    </Button>
  )
}
