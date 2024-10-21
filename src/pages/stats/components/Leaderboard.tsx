import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import LinkSpan from 'components/LinkSpan'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchPlayers, fetchStats } from 'utils/api'
import { Color, getPlayerColor, Player, PlayerStats } from 'utils/types'

export default function Leaderboard() {
  const [fetchStart] = useState(Date.now())

  const { data: playersData } = useQuery({
    queryKey: ['players'],
    queryFn: () => fetchPlayers(),
    staleTime: 1000 * 60 * 1,
  })
  const players = playersData?.players

  const { data } = useQuery({
    queryKey: ['playersStats'],
    queryFn: fetchStats,
    staleTime: 1000 * 60 * 1,
  })
  const playersStats = data?.players

  if (!playersStats || !players) {
    if (Date.now() - fetchStart > 1000) {
      return <div>Loading...</div>
    }
    return null
  }

  const playersById = players.reduce(
    (acc, player) => {
      acc[player.id] = player
      return acc
    },
    {} as Record<number, Player>
  )

  const playersStatsByPosition = playersStats.sort(
    (a, b) => b.map_position - a.map_position
  )

  const leaderColor = Color.blue

  return (
    <Box>
      <Box textAlign={'center'}>
        <Typography fontSize={'48px'} fontWeight={700} lineHeight={1}>
          Таблица лидеров
        </Typography>
      </Box>
      <Box
        marginLeft={4}
        marginRight={4}
        marginTop={'50px'}
        justifyContent="center"
        display="flex"
      >
        <TableContainer sx={{ width: 'auto' }}>
          <Table style={{borderSpacing: '0 10px', borderCollapse: 'separate'}}>
            <TableHead>
              <TableRow>
                <TableCell sx={{  }}>
                  #
                </TableCell>
                <TableCell sx={{  }}>
                  Участник
                </TableCell>
                <TableCell sx={{ }}>
                  Позиция
                </TableCell>
                <TableCell sx={{ }}>
                  Очки
                </TableCell>
                <TableCell sx={{  }}>
                  Пройдено игр
                </TableCell>
                <TableCell sx={{ }}>
                  Дропы
                </TableCell>
                <TableCell sx={{  }}>
                  Реролы
                </TableCell>
                <TableCell sx={{  }}>
                  Фильмы
                </TableCell>
                <TableCell sx={{  }}>
                  Шейх-моменты
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playersStatsByPosition.map((playerStat, index) => (
                <TableRow key={index} style={{
                  backgroundColor: Color.greyDark,
                  height: '39px',
                  borderRadius: '10px'
                }}>
                  <TableCell style={{height: '39px'}}>{index + 1}</TableCell>
                  <TableCell>
                    <Link
                      to={`/players/${playersById[playerStat.id].url_handle}`}
                    >
                      <LinkSpan
                        color={getPlayerColor(
                          playersById[playerStat.id].url_handle
                        )}
                      >
                        {playersById[playerStat.id].name}
                      </LinkSpan>
                    </Link>
                  </TableCell>
                  <TableCell>{playerStat.map_position}</TableCell>
                  <TableCell>{getPlayerScore(playerStat)}</TableCell>
                  <TableCell>{playerStat.games_completed}</TableCell>
                  <TableCell>{playerStat.games_dropped}</TableCell>
                  <TableCell>{playerStat.rerolls}</TableCell>
                  <TableCell>{playerStat.movies}</TableCell>
                  <TableCell>{playerStat.sheikh_moments}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

function getPlayerScore(player: PlayerStats) {
  const row = Math.floor(player.map_position / 10) || 1
  return player.games_completed * row - player.games_dropped
}
