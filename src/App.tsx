import {
  createTheme,
  CssBaseline,
  PaletteColor,
  ThemeProvider,
} from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AboutPage from 'pages/about/AboutPage'
import RulesPage from 'pages/rules/RulesPage'
import StatsPage from 'pages/stats/StatsPage'
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Color, CustomColorOverrides } from 'utils/types'
import './App.css'
import MainScreen from './components/MainScreen'
import MapPage from './pages/map/MapPage'
import PlayerPage from './pages/player/PlayerPage'
import PlayersPage from './pages/players/PlayersPage'

// Update the Button's color options types
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides extends CustomColorOverrides {}
}

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <MainScreen currentPage="map">
          <MapPage />
        </MainScreen>
      ),
    },
    {
      path: '/players',
      element: (
        <MainScreen currentPage="players">
          <PlayersPage />
        </MainScreen>
      ),
    },
    {
      path: '/players/:id',
      element: (
        <MainScreen currentPage="player">
          <PlayerPage />
        </MainScreen>
      ),
    },
    {
      path: '/rules',
      element: (
        <MainScreen currentPage="rules">
          <RulesPage />
        </MainScreen>
      ),
    },
    {
      path: '/about',
      element: (
        <MainScreen currentPage="about">
          <AboutPage />
        </MainScreen>
      ),
    },
    {
      path: '/stats',
      element: (
        <MainScreen currentPage="stats">
          <StatsPage />
        </MainScreen>
      ),
    },
  ],
  { basename: '/' }
)

let darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: Color.blue,
    },
    secondary: {
      main: '#007AFF',
    },
    info: {
      main: Color.greyLight,
    },
    text: {
      primary: '#fff',
      secondary: '#a6d4fa',
    },
    background: {
      default: '#0c0c0c',
    },
  },
  typography: {
    fontFamily: '"Golos Text", sans-serif',
    fontWeightRegular: 600,
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        color: 'primary',
        disableElevation: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
})

const makeCustomColors = (colors: { [key: string]: string }) => {
  const transformedColors: { [key: string]: PaletteColor } = {}

  Object.entries(colors).forEach(([key, value]) => {
    const customKey = `custom${key.charAt(0).toUpperCase()}${key.slice(1)}`

    transformedColors[customKey] = darkTheme.palette.augmentColor({
      color: { main: value },
      name: customKey,
    })
  })

  return transformedColors
}

darkTheme = createTheme(darkTheme, {
  palette: makeCustomColors(Color),
})

const queryClient = new QueryClient()

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </React.StrictMode>
  )
}

export default App
