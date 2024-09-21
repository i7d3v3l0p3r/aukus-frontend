import { Box, Button } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import useCurrentUser from 'hooks/useCurrentUser'
import { Link } from 'react-router-dom'
import { fetchPlayers } from 'utils/api'
import { Color, getPlayerColor, Page } from 'utils/types'
import { ReactComponent as SnowflakeIcon } from 'static/snowflake.svg'
import LinkSpan from './LinkSpan'

type Props = {
  currentPage: Page
}

export default function MainMenu({ currentPage }: Props) {
  const { currentUserId } = useCurrentUser()

  const { data: playersData } = useQuery({
    queryKey: ['players'],
    queryFn: fetchPlayers,
    staleTime: 1000 * 60 * 1,
  })
  const players = playersData?.players

  const currentPlayer = players?.find((player) => player.id === currentUserId)
  const playerColor = currentPlayer && getPlayerColor(currentPlayer)

  return (
    <Box>
      <Box
        display="block"
        textAlign={'center'}
        marginTop={'15px'}
        marginBottom={'13px'}
      >
        <Link to={currentPlayer ? `/players/${currentPlayer.url_handle}` : '/'}>
          <LinkSpan
            color={playerColor}
            style={{
              fontWeight: 'bold',
              paddingBottom: 0,
              lineHeight: '1.2',
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SnowflakeIcon
              width={'15px'}
              height={'15px'}
              style={{ marginRight: '8px' }}
            />
            АУКУС Сезон 3 {currentPlayer && `// ${currentPlayer.name}`}
          </LinkSpan>
        </Link>
      </Box>
      <Box display="flex" justifyContent={'center'} marginBottom={6}>
        <Box
          padding={'10px'}
          display="flex"
          alignItems={'center'}
          sx={{ backgroundColor: Color.greyDark }}
          borderRadius="15px"
          height={'60px'}
        >
          <Link to="/" style={{ marginRight: 10 }}>
            <Button
              color={currentPage === 'map' ? 'primary' : 'info'}
              sx={{ width: '150px', height: '40px' }}
            >
              Карта
            </Button>
          </Link>

          <Link to="/players" style={{ marginRight: 10 }}>
            <Button
              color={currentPage === 'players' ? 'primary' : 'info'}
              sx={{ width: '150px', height: '40px' }}
            >
              Участники
            </Button>
          </Link>

          <Link to="/stats" style={{ marginRight: 10, textDecoration: 'none' }}>
            <Button
              color={currentPage === 'stats' ? 'primary' : 'info'}
              sx={{ width: '150px', height: '40px' }}
            >
              Статистика
            </Button>
          </Link>

          <Link to="/rules" style={{ marginRight: 10 }}>
            <Button
              color={currentPage === 'rules' ? 'primary' : 'info'}
              sx={{ width: '150px', height: '40px' }}
            >
              Правила
            </Button>
          </Link>

          <Link to="/about">
            <Button
              color={currentPage === 'about' ? 'primary' : 'info'}
              sx={{ width: '150px', height: '40px' }}
            >
              О Сайте
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
