import { OpenInNew } from '@mui/icons-material'
import {
  Box,
  Button,
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
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchPlayerMoves, fetchPlayers } from 'utils/api'
import {
  Color,
  getPlayerColor,
  getPlayerColorName,
  MoveType,
} from 'utils/types'
import PreviousGamesTable from './components/PeviousGamesTable'
import { aukus1Games, aukus2Games } from './data'

type Props = {}

export default function PlayerPage(props: Props) {
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

  return (
    <Box>
      <Box textAlign={'center'}>
        <h1>Страница участника {player.name}</h1>
        <Link
          to={player.twitch_stream_link || player.vk_stream_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            sx={{ paddingLeft: 6, paddingRight: 6 }}
            color={getPlayerColorName(player)}
          >
            <Box display="flex" alignItems={'center'}>
              Сейчас играет в: {player.current_game}
              <OpenInNew sx={{ marginLeft: 1 }} />
            </Box>
          </Button>
        </Link>
      </Box>

      <Box
        marginTop={6}
        marginLeft={4}
        marginRight={4}
        justifyContent="center"
        display="flex"
      >
        <TableContainer sx={{ width: 'auto', border: 'none' }}>
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
                width={'140px'}
                sx={{ borderBottom: `2px solid ${playerColor}` }}
              >
                Позиция
              </TableCell>
              <TableCell
                width={'400px'}
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
                <TableRow sx={{ border: 0 }}>
                  <TableCell sx={{ border: 0 }}>
                    {playerMoves.length - index}
                  </TableCell>
                  <TableCell sx={{ border: 0 }}>
                    {formatDate(move.created_at)}
                  </TableCell>
                  <TableCell sx={{ border: 0 }}>{move.item_title}</TableCell>
                  <TableCell sx={{ border: 0 }}>
                    <MoveTypeItem move={move.type} />
                  </TableCell>
                  <TableCell sx={{ border: 0 }}>{move.dice_roll}</TableCell>
                  <TableCell sx={{ border: 0 }}>{move.cell_to}</TableCell>
                  <TableCell sx={{ border: 0 }}>{move.item_review}</TableCell>
                  <TableCell sx={{ border: 0 }}>"link"</TableCell>
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

          <PreviousGamesTable games={aukus2games.games} />
        </Box>
      )}

      {aukus1games && (
        <Box marginTop={10}>
          <Typography variant="h5" align="center">
            <Link
              to={aukus1games.link}
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkSpan color={playerColor}>Игры с Аукуса 1</LinkSpan>
            </Link>
          </Typography>

          <PreviousGamesTable games={aukus1games.games} />
        </Box>
      )}
      <BottomSection />
    </Box>
  )
}

function formatDate(dateString: string) {
  // Create a new Date object
  const date = new Date(dateString)

  // Extract the day, month, and year
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
  const year = String(date.getFullYear()).slice(-2) // Get last two digits of the year

  // Format the date as dd.mm.yy
  return `${day}.${month}`
}

function MoveTypeItem({ move }: { move: MoveType }) {
  const colorMap = {
    completed: Color.green,
    drop: Color.red,
    reroll: Color.blue,
    movie: Color.purple,
    sheikh: Color.orange,
  }
  return (
    <span
      style={{
        border: `1px solid ${colorMap[move]}`,
        paddingTop: '3px',
        paddingBottom: '3px',
        paddingLeft: '10px',
        paddingRight: '10px',
        borderRadius: '5px',
      }}
    >
      {formatMoveType(move)}
    </span>
  )
}

function formatMoveType(move: MoveType) {
  switch (move) {
    case 'completed':
      return 'Пройдено'
    case 'drop':
      return 'Дроп'
    case 'reroll':
      return 'Реролл'
    case 'movie':
      return 'Фильм'
    case 'sheikh':
      return 'Шейх-момент'
  }
  return ''
}
