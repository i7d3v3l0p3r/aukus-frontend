import { Box, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import LinkSpan from 'components/LinkSpan'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchPlayerMoves, fetchPlayers } from 'utils/api'
import { getPlayerColor } from 'utils/types'
import { aukus1Games, aukus2Games } from '../data'
import MoveCard from './MoveCard'
import PreviousGamesTable from './PeviousGamesTable'
import StreamLink from './StreamLink'

type Props = {}

export default function PlayerContent(props: Props) {
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
        <Typography fontSize="48px" fontWeight={700}>
          Страница участника {player.name}
        </Typography>
        <Box marginTop={'30px'} marginBottom={'50px'}>
          <StreamLink player={player} />
        </Box>

        {player.current_game && (
          <CurrentMove
            id={playerMoves.length + 1}
            title={player.current_game}
            playerColor={playerColor}
          />
        )}

        {playerMoves.map((move, index) => {
          return (
            <Box key={index}>
              <MoveCard
                id={playerMoves.length - index}
                move={move}
                player={player}
              />
            </Box>
          )
        })}
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
    </Box>
  )
}

type CurrentMoveProps = {
  id: number
  title: string
  playerColor: string
}

function CurrentMove({ id, title, playerColor }: CurrentMoveProps) {
  return (
    <Box display={'flex'} justifyContent={'center'} marginBottom={'50px'}>
      <Box
        borderRadius={'15px'}
        border={`2px solid ${playerColor}`}
        width={'800px'}
        textAlign={'left'}
        padding={'15px'}
        lineHeight={1}
      >
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          fontSize={'14px'}
          fontWeight={400}
          marginBottom={'15px'}
        >
          <Box>Ход — {id}</Box>
          <Box>Сейчас</Box>
        </Box>
        <Box
          fontSize={'14px'}
          style={{ backgroundColor: playerColor }}
          width={'fit-content'}
          paddingTop={'5px'}
          paddingBottom={'5px'}
          paddingLeft={'12px'}
          paddingRight={'12px'}
          borderRadius={'5px'}
          marginBottom={'15px'}
        >
          Выпало на ауке
        </Box>
        <Box fontSize={'24px'}>{title}</Box>
      </Box>
    </Box>
  )
}
