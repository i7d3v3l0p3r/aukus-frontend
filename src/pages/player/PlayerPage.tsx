import { Box, Grid } from '@mui/material'
import { sample } from 'lodash'
import { Link, useParams } from 'react-router-dom'
import { PlayerMove } from 'utils/types'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchPlayerMoves, fetchPlayers } from 'utils/api'

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

  return (
    <Box marginLeft={2}>
      <h1>Страница участника {player.name}</h1>
      <Link to={player.stream_link}>{player.stream_link}</Link>

      <Box marginTop={2} />
      <Grid container>
        <Grid container columns={8}>
          {' '}
          <Grid item xs={1}>
            Дата
          </Grid>
          <Grid item xs={1}>
            Ход
          </Grid>
          <Grid item xs={1}>
            Игра
          </Grid>
          <Grid item xs={1}>
            Результат
          </Grid>
          <Grid item xs={1}>
            Ролл кубика
          </Grid>
          <Grid item xs={1}>
            Новая позиция
          </Grid>
          <Grid item xs={1}>
            Отзыв
          </Grid>
          <Grid item xs={1}>
            Ссылка на вод
          </Grid>
        </Grid>
        {playerMoves.map((move) => (
          <Grid
            container
            columns={8}
            paddingTop={1}
            borderTop={1}
            key={move.id}
          >
            <Grid item xs={1}>
              {move.created_at}
            </Grid>
            <Grid item xs={1}>
              {move.id}
            </Grid>
            <Grid item xs={1}>
              {move.item_title}
            </Grid>
            <Grid item xs={1}>
              {move.type}
            </Grid>
            <Grid item xs={1}>
              {move.type === 'drop' ? -move.dice_roll : move.dice_roll}
            </Grid>
            <Grid item xs={1}>
              {move.cell_to}
            </Grid>
            <Grid item xs={1}>
              {move.item_review}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
