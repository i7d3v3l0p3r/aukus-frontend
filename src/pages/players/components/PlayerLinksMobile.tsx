import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import LinkSpan from 'src/components/LinkSpan'
import { Color, Player } from 'src/utils/types'

type Props = {
  player: Player
}

export default function PlayerLinksMobile({ player }: Props) {
  const linksMargin = '15px'
  return (
    <Box
      margin={'auto'}
      marginTop={'20px'}
      // marginLeft={'20px'}
      display={'flex'}
      justifyContent={'start'}
      width={'fit-content'}
      fontSize={'16px'}
    >
      {player.twitch_stream_link && (
        <Link
          to={player.twitch_stream_link}
          target="_blank"
          rel="noopener nereferrer"
          style={{ marginRight: linksMargin }}
        >
          <LinkSpan color={Color.purple}>Twitch</LinkSpan>
        </Link>
      )}
      {player.vk_stream_link && (
        <Link
          to={player.vk_stream_link}
          target="_blank"
          rel="noopener nereferrer"
          style={{ marginRight: linksMargin }}
        >
          <LinkSpan color={'#FF2B42'}>VK Видео</LinkSpan>
        </Link>
      )}
      {player.telegram_link && (
        <Link
          to={player.telegram_link}
          target="_blank"
          rel="noopener nereferrer"
          style={{ marginRight: linksMargin }}
        >
          <LinkSpan color={Color.blueTg}>Телега</LinkSpan>
        </Link>
      )}
      {player.donation_link && (
        <Link
          to={player.donation_link}
          target="_blank"
          rel="noopener nereferrer"
        >
          <LinkSpan color={Color.orange}>Донат</LinkSpan>
        </Link>
      )}
    </Box>
  )
}
