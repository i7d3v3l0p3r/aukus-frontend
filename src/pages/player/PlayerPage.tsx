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
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchPlayerMoves, fetchPlayers } from 'utils/api'
import { Color, getPlayerColor } from 'utils/types'
import MoveTypeItem from './components/MoveTypeItem'
import PreviousGamesTable from './components/PeviousGamesTable'
import StreamLink from './components/StreamLink'
import { aukus1Games, aukus2Games } from './data'
import { PlayerCanvasBackground } from '../../components/PlayerCanvasBackground';


export default function PlayerPage({ header }: {
  header: (rightSlot: React.ReactNode, buttons: React.ReactNode) => React.ReactNode
}) {
  const { id: playerHandle } = useParams()
  const [fetchStart] = useState(Date.now())

  const { data: playersData } = useQuery({
    queryKey: ['players'],
    queryFn: fetchPlayers,
    staleTime: 1000 * 60 * 1,
  })
  const players = playersData?.players

  const player = players?.find((player) => player.url_handle === playerHandle)

  const { data: playerMovesData } = useQuery({
    queryKey: ['playerMoves', playerHandle],
    queryFn: () => player && fetchPlayerMoves(player.id),
    staleTime: 1000 * 60 * 1,
    enabled: !!player,
  })

  const playerMoves = playerMovesData?.moves

  if (!playersData || !playerMovesData) {
    if (Date.now() - fetchStart > 1000) {
      return <div>Загрузка</div>
    }
    return null
  }

  if (!player || playerMoves === undefined) {
    return <div>Игрок не найден</div>
  }

  playerMoves.sort((a, b) => {
    return b.id - a.id
  })

  const playerColor = getPlayerColor(player)

  const aukus1games = aukus1Games[player.url_handle]
  const aukus2games = aukus2Games[player.url_handle]

  const greyColor = '#CECECE'

  return (
    <PlayerCanvasBackground
      header={header}
      player={player}
    >
      <Box>
        <Box textAlign={'center'}>
          <Typography fontSize="48px" fontWeight={700}>
            Страница участника {player.name}
          </Typography>
          <Box marginTop={'30px'}>
            <StreamLink player={player} />
          </Box>
        </Box>

        <Box
          marginTop={6}
          marginLeft={4}
          marginRight={4}
          justifyContent="center"
          display="flex"
        >
          <TableContainer sx={{ width: 'auto' }}>
            <TableHead>
              <TableRow>
                <TableCell
                  width={'60px'}
                  sx={{
                    borderBottom: `2px solid ${playerColor}`,
                  }}
                >
                  Ход
                </TableCell>
                <TableCell
                  width={'60px'}
                  sx={{ borderBottom: `2px solid ${playerColor}` }}
                >
                  Дата
                </TableCell>
                <TableCell
                  width={'200px'}
                  sx={{ borderBottom: `2px solid ${playerColor}` }}
                >
                  Игра
                </TableCell>
                <TableCell
                  width={'160px'}
                  sx={{ borderBottom: `2px solid ${playerColor}` }}
                >
                  Результат
                </TableCell>
                <TableCell
                  width={'80px'}
                  sx={{ borderBottom: `2px solid ${playerColor}` }}
                >
                  Ролл
                </TableCell>
                <TableCell
                  width={'100px'}
                  sx={{ borderBottom: `2px solid ${playerColor}` }}
                >
                  Позиция
                </TableCell>
                <TableCell
                  width={'80px'}
                  sx={{ borderBottom: `2px solid ${playerColor}` }}
                >
                  Оценка
                </TableCell>
                <TableCell
                  width={'360px'}
                  sx={{ borderBottom: `2px solid ${playerColor}` }}
                >
                  Отзыв
                </TableCell>
                <TableCell
                  width={'130px'}
                  sx={{ borderBottom: `2px solid ${playerColor}` }}
                >
                  Смотреть
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playerMoves.map((move, index) => {
                return (
                  <TableRow>
                    <TableCell style={{ color: greyColor }}>
                      {playerMoves.length - index}
                    </TableCell>
                    <TableCell style={{ color: greyColor }}>
                      {formatDate(move.created_at)}
                    </TableCell>
                    <TableCell>{move.item_title}</TableCell>
                    <TableCell>
                      <MoveTypeItem move={move.type} />
                    </TableCell>
                    <TableCell style={{ color: greyColor }}>
                      {move.dice_roll}
                    </TableCell>
                    <TableCell style={{ color: greyColor }}>
                      {move.cell_to}
                    </TableCell>
                    <TableCell>{move.item_rating}/10</TableCell>
                    <TableCell>{move.item_review}</TableCell>
                    <TableCell>
                      <LinkSpan color={Color.blue}>Ссылки</LinkSpan>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </TableContainer>
        </Box>
        {aukus2games && (
          <Box marginTop={10}>
            <Typography variant="h5" align="center">
              <Link
                to={aukus2games.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                <LinkSpan color={playerColor}>Игры с Аукуса 2</LinkSpan>
              </Link>
            </Typography>

            <PreviousGamesTable
              games={aukus2games.games}
              playerColor={playerColor}
            />
          </Box>
        )}

        {aukus1games && (
          <Box marginTop={10}>
            <Typography fontSize={'24px'} fontWeight={600} align="center">
              <Link
                to={aukus1games.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                <LinkSpan color={playerColor}>Игры с Аукуса 1</LinkSpan>
              </Link>
            </Typography>

            <Box marginBottom={4} />

            <PreviousGamesTable
              games={aukus1games.games}
              playerColor={playerColor}
            />
          </Box>
        )}
        <BottomSection />
      </Box>
    </PlayerCanvasBackground>
  )
}

function formatDate(dateString: string) {
  // Create a new Date object
  const date = new Date(dateString)

  // Extract the day, month, and year
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
  // const year = String(date.getFullYear()).slice(-2) // Get last two digits of the year

  // Format the date as dd.mm.yy
  return `${day}.${month}`
}
