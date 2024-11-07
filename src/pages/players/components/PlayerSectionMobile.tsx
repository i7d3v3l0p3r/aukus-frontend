import { getPlayerColorName, Player } from 'src/utils/types'
import { PlayerPhotoMap } from './utils'
import { Box, Button } from '@mui/material'
import PlayerLinksMobile from './PlayerLinksMobile'
import { Link } from 'react-router-dom'

type Props = {
  player: Player
}

export default function PlayerSectionMobile({ player }: Props) {
  const photo = PlayerPhotoMap[player.url_handle]

  return (
    <Box
      // display="flex"
      justifyContent="start"
      margin={'auto'}
      width={'fit-content'}
    >
      <Box textAlign={'left'} width={'100%'}>
        <Box fontSize={'36px'} fontWeight={700} lineHeight={1.2} width={'100%'}>
          <Box margin={'auto'} width={'90%'}>
            {player.first_name || ''} «{player.name}»
          </Box>
          <Box
            // height={'340px'}
            width={'90%'}
            margin={'auto'}
            marginTop={'20px'}
            marginBottom={'0px'}
          >
            {photo && (
              <img
                src={photo}
                // height="340px"
                width={'100%'}
                alt="player pic"
                style={{ borderRadius: '15px' }}
              />
            )}
          </Box>
        </Box>
        <PlayerLinksMobile player={player} />
        <Box textAlign="center" marginTop={'30px'} width="100%">
          <Link to={`/players/${player.url_handle}`}>
            <Button
              variant="contained"
              fullWidth
              color={getPlayerColorName(player)}
              sx={{
                height: '45px',
                width: '300px',
                fontSize: '14px',
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
