import {
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { PreviousGame } from '../data'

type Props = {
  games: PreviousGame[]
}

export default function PreviousGamesTable({ games }: Props) {
  return (
    <Box justifyContent="center" display="flex">
      <TableContainer sx={{ width: '70%' }}>
        <TableHead>
          <TableRow>
            <TableCell>Игра</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell>Оценка</TableCell>
            <TableCell>Отзыв</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {games.map((game, index) => (
            <TableRow key={index}>
              <TableCell>{game.game_title}</TableCell>
              <TableCell>{game.dropped ? 'Дропнул' : 'Прошел'}</TableCell>
              <TableCell>{game.rating}</TableCell>
              <TableCell>{game.review}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </Box>
  )
}
