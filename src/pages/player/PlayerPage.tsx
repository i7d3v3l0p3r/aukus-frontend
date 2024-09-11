import {
  Box,
  Button,
  Grid,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { sample } from 'lodash'
import { Link, useParams } from 'react-router-dom'
import { PlayerMove } from 'utils/types'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchPlayerMoves, fetchPlayers } from 'utils/api'
import { OpenInNew } from '@mui/icons-material'

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
        <TableContainer sx={{ width: 'auto' }}>
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
            {playerMoves.map((move) => {
              return (
                <TableRow>
                  <TableCell>{move.id}</TableCell>
                  <TableCell>{move.created_at}</TableCell>
                  <TableCell>{move.item_title}</TableCell>
                  <TableCell>{move.type}</TableCell>
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
    </Box>
  )
}
