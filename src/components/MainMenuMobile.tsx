import { Box, Button } from '@mui/material'
import { Link, ScrollRestoration } from 'react-router-dom'
import SnowflakeIcon from 'assets/snowflake.svg?react'
import MapIcon from 'assets/icons/map.png'
import LeadersIcon from 'assets/icons/leaders.png'
import PlayersIcon from 'assets/icons/players.png'
import RulesIcon from 'assets/icons/rules.png'
import AboutIcon from 'assets/icons/about.png'
import { TWallpaper } from '@twallpaper/react'
import '@twallpaper/react/css'
import LinkSpan from './LinkSpan'
import { useUser } from 'src/context/UserProvider'
import { Color, getPlayerColor, Page } from 'src/utils/types'

type Props = {
  currentPage: Page
}

export default function MainMenuMobile({ currentPage }: Props) {
  const currentUser = useUser()
  const playerColor = getPlayerColor(currentUser?.url_handle || '')
  const urlHandle = currentUser?.url_handle

  return (
    <Box>
      <ScrollRestoration />
      <TWallpaper
        options={{
          fps: 1,
          tails: 5,
          animate: false,
          scrollAnimate: false,
          colors: ['#1c1c1c', '#1c1c1c', '#1c1c1c', '#1c1c1c'],
          pattern: {
            image: 'https://twallpaper.js.org/patterns/games.svg',
            background: '#0c0c0c',
            blur: 0,
            size: '470px',
            opacity: 1,
            mask: true,
          },
        }}
      />
      <Box
        display="block"
        textAlign={'center'}
        marginTop={'0px'}
        marginBottom={'13px'}
        textTransform={'uppercase'}
        position="relative"
        zIndex={20}
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
      <Box
        padding={'10px'}
        display="flex"
        // alignItems={'center'}
        justifyContent={'start'}
        margin={'auto'}
        width={'fit-content'}
        sx={{ backgroundColor: Color.greyDark }}
        borderRadius="15px"
        height={'60px'}
        // position="relative"
      >
        <Link to="/" style={{ marginRight: 10 }}>
          <Button
            color={currentPage === 'map' ? 'primary' : 'info'}
            sx={{ width: '60px', height: '40px' }}
          >
            <img src={MapIcon} />
          </Button>
        </Link>

        <Link to="/stats" style={{ marginRight: 10, textDecoration: 'none' }}>
          <Button
            color={currentPage === 'stats' ? 'primary' : 'info'}
            sx={{ width: '60px', height: '40px' }}
          >
            <img src={LeadersIcon} />
          </Button>
        </Link>

        <Link to="/players" style={{ marginRight: 10 }}>
          <Button
            color={
              ['players', 'player'].includes(currentPage) ? 'primary' : 'info'
            }
            sx={{ width: '60px', height: '40px' }}
          >
            <img src={PlayersIcon} />
          </Button>
        </Link>

        <Link to="/rules" style={{ marginRight: 10 }}>
          <Button
            color={currentPage === 'rules' ? 'primary' : 'info'}
            sx={{ width: '60px', height: '40px' }}
          >
            <img src={RulesIcon} />
          </Button>
        </Link>

        <Link to="/about">
          <Button
            color={currentPage === 'about' ? 'primary' : 'info'}
            sx={{ width: '60px', height: '40px' }}
          >
            <img src={AboutIcon} />
          </Button>
        </Link>
      </Box>
    </Box>
  )
}
