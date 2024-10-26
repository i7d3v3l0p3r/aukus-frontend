import React from 'react'
import { Box, Button } from '@mui/material'
import { useUser } from 'context/UserProvider'
import { Link, ScrollRestoration } from 'react-router-dom'
import { Color, getPlayerColor, Page } from 'utils/types'
import SnowflakeIcon from 'assets/snowflake.svg?react'
import LinkSpan from './LinkSpan'

type Props = {
  currentPage: Page
  replaceMenuButtons?: React.ReactNode
  rightSlot?: React.ReactNode
  leftSlot?: React.ReactNode
}

export default function MainMenu({
  currentPage,
  replaceMenuButtons,
  rightSlot,
  leftSlot,
}: Props) {
  const currentUser = useUser()
  const playerColor = getPlayerColor(currentUser?.url_handle || '')
  const urlHandle = currentUser?.url_handle

  return (
    <Box>
      <ScrollRestoration />
      <Box
        display="block"
        textAlign={'center'}
        marginTop={'15px'}
        marginBottom={'13px'}
        textTransform={'uppercase'}
      >
        <Link to={urlHandle ? `/players/${urlHandle}` : '/'}>
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
            АУКУС Сезон 3 {currentUser && `// ${currentUser.name}`}
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
              {leftSlot && (
                <Box marginRight={'30px'} position="absolute" right="100%">
                  {leftSlot}
                </Box>
              )}
              <Link to="/" style={{ marginRight: 10 }}>
                <Button
                  color={currentPage === 'map' ? 'primary' : 'info'}
                  sx={{ width: '150px', height: '40px' }}
                >
                  Карта
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
                  Лидеры
                </Button>
              </Link>

              <Link to="/players" style={{ marginRight: 10 }}>
                <Button
                  color={
                    ['players', 'player'].includes(currentPage)
                      ? 'primary'
                      : 'info'
                  }
                  sx={{ width: '150px', height: '40px' }}
                >
                  Участники
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
            <Box marginLeft={'30px'} position="absolute" left="100%">
              {rightSlot}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}
