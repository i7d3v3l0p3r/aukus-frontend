import { Box, Button } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import useCurrentUser from 'hooks/useCurrentUser'
import { Link } from 'react-router-dom'
import { fetchPlayers } from 'utils/api'
import { Color, Page } from 'utils/types'

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

  return (
    <Box>
      <Box display="block" textAlign={'center'} marginTop={2} marginBottom={2}>
        <Link to={currentPlayer ? `/players/${currentPlayer.url_handle}` : '/'}>
          <Button variant="text" style={{ backgroundColor: 'transparent' }}>
            <p
              className="purple"
              style={{
                fontWeight: 'bold',
                paddingBottom: 0,
                lineHeight: '1.2',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src="/static/logo.png"
                  alt="logo"
                  style={{ width: '15px', marginRight: '8px' }}
                />
                АУКУС 2024 {currentPlayer && `// ${currentPlayer.name}`}
              </span>
            </p>
          </Button>
        </Link>
      </Box>
      <Box display="flex" justifyContent={'center'} marginBottom={6}>
        <Box
          padding={1.5}
          sx={{ backgroundColor: Color.greyDark }}
          borderRadius="15px"
        >
          <Link to="/" style={{ marginRight: 10 }}>
            <Button
              color={currentPage === 'map' ? 'primary' : 'info'}
              sx={{ width: '150px' }}
            >
              Карта
            </Button>
          </Link>

          <Link to="/players" style={{ marginRight: 10 }}>
            <Button
              color={currentPage === 'players' ? 'primary' : 'info'}
              sx={{ width: '150px' }}
            >
              Участники
            </Button>
          </Link>

          <Link to="/rules" style={{ marginRight: 10 }}>
            <Button
              color={currentPage === 'rules' ? 'primary' : 'info'}
              sx={{ width: '150px' }}
            >
              Правила
            </Button>
          </Link>

          <Link to="#" style={{ marginRight: 10, textDecoration: 'none' }}>
            <Button
              color={currentPage === 'stats' ? 'primary' : 'info'}
              sx={{ width: '150px' }}
            >
              Статистика
            </Button>
          </Link>

          <Link to="/about">
            <Button
              color={currentPage === 'about' ? 'primary' : 'info'}
              sx={{ width: '150px' }}
            >
              О Сайте
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
