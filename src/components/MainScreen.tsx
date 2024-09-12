import { Box } from '@mui/material'
import { ScrollRestoration } from 'react-router-dom'
import { Page } from 'utils/types'
import MainMenu from './MainMenu'

type Props = {
  currentPage: Page
  children?: React.ReactNode
}

export default function MainScreen({ children, currentPage }: Props) {
  return (
    <Box>
      <MainMenu currentPage={currentPage} />
      {children}
      <ScrollRestoration />
    </Box>
  )
}
