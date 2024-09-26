import {
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import BottomSection from 'components/BottomSection'
import LinkSpan from 'components/LinkSpan'
import MainMenu from 'components/MainMenu'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchPlayerMoves, fetchPlayers } from 'utils/api'
import { Color, getPlayerColor } from 'utils/types'
import MoveTypeItem from './components/MoveTypeItem'
import PreviousGamesTable from './components/PeviousGamesTable'
import PlayerContent from './components/PlayerContent'
import StreamLink from './components/StreamLink'
import { aukus1Games, aukus2Games } from './data'

type Props = {}

export default function PlayerPage(props: Props) {
  return (
    <Box>
      <MainMenu currentPage="player" />
      <PlayerContent />
      <BottomSection />
    </Box>
  )
}
