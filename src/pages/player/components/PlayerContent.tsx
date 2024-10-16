import {
  Box,
  FormControl,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import LinkSpan from 'components/LinkSpan'
import { useUser } from 'context/UserProvider'
import { Fragment, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchPlayerMoves, fetchPlayers } from 'utils/api'
import { getPlayerColor } from 'utils/types'
import { aukus1Games } from '../data_aukus1'
import MoveCard, { formatDate } from './MoveCard'
import StreamLink from './StreamLink'
import { PlayerCanvasBackground } from 'components/PlayerCanvasBackground'
import { ReactComponent as SearchIcon } from 'assets/search-normal.svg'
import OldMoveCard from './OldMoveCard'
import { aukus2Games } from '../data_aukus2'

type Props = {}

export default function PlayerContent(props: Props) {
  const { id: playerHandle } = useParams()
  const [fetchStart] = useState(Date.now())
  const [filter, setFilter] = useState('')

  const currentPlayer = useUser()

  const { data: playersData } = useQuery({
    queryKey: ['players'],
    queryFn: () => fetchPlayers(),
    staleTime: 1000 * 60 * 1,
  })
  const players = playersData?.players
  const player = players?.find((player) => player.url_handle === playerHandle)

  const { data: playerMovesData, refetch: refetchMoves } = useQuery({
    queryKey: ['playerMoves', player?.id || 0],
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

  const isOwner = player.id === currentPlayer?.user_id
  // const canEdit = isOwner || (role === 'moder' && moderFor === player.id)
  const canEdit = !!currentPlayer

  playerMoves.sort((a, b) => {
    return b.id - a.id
  })

  const playerColor = getPlayerColor(player.url_handle)

  let filteredMoves = playerMoves
  if (filter) {
    filteredMoves = playerMoves.filter((move) => {
      return move.item_title.toLowerCase().includes(filter.toLowerCase())
    })
  }

  const aukus1games = aukus1Games[player.url_handle]
  let aukus1FilteredGames = aukus1games?.games ?? []
  if (filter && aukus1FilteredGames) {
    aukus1FilteredGames = aukus1games.games.filter((game) => {
      return game.title.toLowerCase().includes(filter.toLowerCase())
    })
  }

  const aukus2games = aukus2Games[player.url_handle]
  let aukus2FilteredGames = aukus2games?.games ?? []
  if (filter && aukus2FilteredGames) {
    aukus2FilteredGames = aukus2games.games.filter((game) => {
      return game.title.toLowerCase().includes(filter.toLowerCase())
    })
  }

  return (
    <Box>
      <PlayerCanvasBackground
        player={player}
        canEdit={canEdit}
        isOwner={isOwner}
      >
        <Box marginTop={'100px'} position={'relative'} zIndex={5}>
          <Box textAlign={'center'}>
            <Typography fontSize="48px" fontWeight={700}>
              {player.first_name} {player.name}
            </Typography>
            <Box marginTop={'30px'} marginBottom={'50px'}>
              <StreamLink player={player} />
            </Box>
            <Box marginBottom={'50px'}>
              <TextField
                placeholder="Поиск среди всех игр Аукусов"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  style: {
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    paddingLeft: '10px',
                    height: '39px',
                  },
                }}
                style={{
                  width: '800px',
                  fontSize: '16px important!',
                }}
              />
            </Box>

            {player.current_game && !filter && (
              <CurrentMove
                id={playerMoves.length + 1}
                title={player.current_game}
                playerColor={playerColor}
                updatedAt={player.current_game_updated_at}
              />
            )}

            {filteredMoves.map((move, index) => {
              return (
                <Box key={index}>
                  <MoveCard
                    id={playerMoves.length - index}
                    move={move}
                    displayType="player"
                    onSave={refetchMoves}
                  />
                </Box>
              )
            })}
          </Box>
        </Box>
      </PlayerCanvasBackground>

      {aukus2FilteredGames && (
        <Box marginTop={filter ? '50px' : '200px'}>
          <Typography fontSize={'24px'} fontWeight={600} align="center">
            <Link
              to={aukus2games.link}
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkSpan color={playerColor}>Аукус Сезон 2 (2023)</LinkSpan>
            </Link>
          </Typography>

          <Box marginBottom={'50px'} />

          {aukus2FilteredGames.map((game, index) => (
            <Fragment key={index}>
              <OldMoveCard id={index + 1} game={game} />
            </Fragment>
          ))}
        </Box>
      )}

      {aukus1FilteredGames && (
        <Box marginTop={filter ? '50px' : '200px'}>
          <Typography fontSize={'24px'} fontWeight={600} align="center">
            <Link
              to={aukus1games.link}
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkSpan color={playerColor}>Аукус Сезон 1 (2022)</LinkSpan>
            </Link>
          </Typography>

          <Box marginBottom={'50px'} />

          {aukus1FilteredGames.map((game, index) => (
            <Fragment key={index}>
              <OldMoveCard id={index + 1} game={game} />
            </Fragment>
          ))}
        </Box>
      )}
    </Box>
  )
}

type CurrentMoveProps = {
  id: number
  title: string
  playerColor: string
  updatedAt: string
}

function CurrentMove({ id, title, playerColor, updatedAt }: CurrentMoveProps) {
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
          <Box>{formatDate(updatedAt)}</Box>
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
