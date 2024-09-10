import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AboutPage from 'pages/about/AboutPage'
import RulesPage from 'pages/rules/RulesPage'
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import MainScreen from './components/MainScreen'
import MapPage from './pages/map/MapPage'
import PlayerPage from './pages/player/PlayerPage'
import PlayersPage from './pages/players/PlayersPage'

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
  ],
  { basename: '/' }
)

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#34C759',
    },
    secondary: {
      main: '#007AFF',
    },
    info: {
      main: '#414141',
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
        },
      },
    },
  },
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
