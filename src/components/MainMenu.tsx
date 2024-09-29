import React from 'react'
import { Box, Button } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useUser } from 'context/UserProvider'
import { Link, ScrollRestoration } from 'react-router-dom'
import { fetchPlayers } from 'utils/api'
import { Color, getPlayerColor, Page } from 'utils/types'
import { ReactComponent as SnowflakeIcon } from 'assets/snowflake.svg'
import LinkSpan from './LinkSpan'

type Props = {
  currentPage: Page
  replaceMenuButtons?: React.ReactNode
  rightSlot?: React.ReactNode
}

export default function MainMenu({
  currentPage,
  replaceMenuButtons,
  rightSlot,
}: Props) {
  const { userId } = useUser()
  const { data: playersData } = useQuery({
    queryKey: ['players'],
    queryFn: fetchPlayers,
    staleTime: 1000 * 60 * 1,
  })
  const players = playersData?.players

  const currentPlayer = players?.find((player) => player.id === userId)
  const playerColor = currentPlayer && getPlayerColor(currentPlayer)

  return (
    <Box>
      <ScrollRestoration />
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
              fontWeight: 600,
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
      <Box display="flex" justifyContent={'center'}>
        <Box
          padding={'10px'}
          display="flex"
          alignItems={'center'}
          sx={{ backgroundColor: Color.greyDark }}
          borderRadius="15px"
          height={'60px'}
          position="relative"
        >
          {replaceMenuButtons || (
            <>
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

              <Link
                to="/stats"
                style={{ marginRight: 10, textDecoration: 'none' }}
              >
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
            </>
          )}

          {rightSlot && (
            <Box
              marginLeft={2.5}
              padding={'10px'}
              borderRadius="15px"
              sx={{
                position: 'absolute',
                left: '100%',
                backgroundColor: Color.greyDark,
              }}
            >
              {rightSlot}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}
