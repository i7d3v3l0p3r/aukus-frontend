import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { PreviousGame } from '../data'
import MoveTypeItem from './MoveTypeItem'

type Props = {
  games: PreviousGame[]
  playerColor: string
}

export default function PreviousGamesTable({ games, playerColor }: Props) {
  return (
    <Box justifyContent="center" display="flex" marginLeft={6} marginRight={6}>
      <TableContainer sx={{ width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                width={'200px'}
                sx={{
                  borderBottom: `2px solid ${playerColor}`,
                }}
              >
                Игра
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: `2px solid ${playerColor}`,
                }}
              >
                Статус
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: `2px solid ${playerColor}`,
                }}
              >
                Оценка
              </TableCell>
              <TableCell
                width={'400px'}
                sx={{
                  borderBottom: `2px solid ${playerColor}`,
                }}
              >
                Отзыв
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {games.map((game, index) => (
              <TableRow key={index}>
                <TableCell>{game.game_title}</TableCell>
                <TableCell>
                  {game.dropped ? (
                    <MoveTypeItem move="drop" />
                  ) : (
                    <MoveTypeItem move="completed" />
                  )}
                </TableCell>
                <TableCell>{game.rating}</TableCell>
                <TableCell>{game.review}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
