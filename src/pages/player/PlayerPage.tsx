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
import { Link, useParams } from 'react-router-dom'
import { fetchPlayerMoves, fetchPlayers } from 'utils/api'
import { Color, getPlayerColor, MoveType } from 'utils/types'
import PreviousGamesTable from './components/PeviousGamesTable'
import { aukus1Games, aukus2Games } from './data'

type Props = {}

export default function PlayerPage(props: Props) {
  const { id: playerHandle } = useParams()

  const { data: playersData, isLoading: isPlayerLoading } = useQuery({
    queryKey: ['players'],
    queryFn: fetchPlayers,
    staleTime: 1000 * 60 * 1,
  })
  const players = playersData?.players

  const player = players?.find((player) => player.url_handle === playerHandle)

  const { data: playerMovesData, isLoading: isMovesLoading } = useQuery({
    queryKey: ['playerMoves', playerHandle],
    queryFn: () => player && fetchPlayerMoves(player.id),
    staleTime: 1000 * 60 * 1,
    enabled: !!player,
  })

  const playerMoves = playerMovesData?.moves

  if (isPlayerLoading || isMovesLoading) {
    return <h1>Загрузка</h1>
  }

  if (!player || playerMoves === undefined) {
    return <h1>Игрок не найден</h1>
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
        <Link to={player.stream_link} target="_blank" rel="noopener noreferrer">
          <Button sx={{ paddingLeft: 6, paddingRight: 6 }}>
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
        <TableContainer sx={{ width: '70%' }}>
          <TableHead>
            <TableRow>
              <TableCell>Ход</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Игра</TableCell>
              <TableCell>Результат</TableCell>
              <TableCell>Ролл кубика</TableCell>
              <TableCell>Новая позиция</TableCell>
              <TableCell>Отзыв</TableCell>
              <TableCell>Ссылка на вод</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playerMoves.map((move, index) => {
              return (
                <TableRow>
                  <TableCell>{playerMoves.length - index}</TableCell>
                  <TableCell>{formatDate(move.created_at)}</TableCell>
                  <TableCell>{move.item_title}</TableCell>
                  <TableCell>{formatMoveType(move.type)}</TableCell>
                  <TableCell>{move.dice_roll}</TableCell>
                  <TableCell>{move.cell_to}</TableCell>
                  <TableCell>{move.item_review}</TableCell>
                  <TableCell>"link"</TableCell>
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
  return `${day}.${month}.${year}`
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
