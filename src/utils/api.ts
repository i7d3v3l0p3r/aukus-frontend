import {
  playerMovesMock,
  playersMock,
  playersMockById,
  playerStatsMock,
} from './mocks'
import {
  CurrentUser,
  Player,
  PlayerMove,
  PlayerMoveRequest,
  PlayerStats,
} from './types'

const MOCK_API = process.env.NODE_ENV === 'development'

type PlayersResponse = {
  players: Array<Player>
}

export async function fetchPlayers(move_id?: number): Promise<PlayersResponse> {
  if (MOCK_API) {
    console.log('fetching players', move_id)
    return Promise.resolve({ players: playersMock })
  }
  if (move_id) {
    return fetch(`/api/players?move_id=${move_id}`).then((res) => res.json())
  }
  return fetch(`/api/players`).then((res) => res.json())
}

export async function createPlayerMove(move: PlayerMoveRequest): Promise<void> {
  if (MOCK_API) {
    console.log('creating player move', move)
    return Promise.resolve()
  }
  return fetch(`/api/player_move`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(move),
  }).then((res) => res.json())
}

export async function fetchCurrentUser(): Promise<CurrentUser> {
  if (MOCK_API) {
    console.log('fetching current user')
    return Promise.resolve({
      user_id: 1,
      role: 'player',
      moder_for: undefined,
      url_handle: 'lasqa',
      name: 'Lasqa',
    })
  }
  return fetch(`/api/current_user`).then((res) => res.json())
}

type StatsResponse = {
  players: Array<PlayerStats>
}

export async function fetchStats(): Promise<StatsResponse> {
  if (MOCK_API) {
    console.log('fetching stats')
    return Promise.resolve({
      players: playerStatsMock(),
    })
  }
  return fetch(`/api/player_stats`).then((res) => res.json())
}

type GameNamesResponse = {
  gameName: string
}

export async function fetchGameNames(
  name: string
): Promise<GameNamesResponse[]> {
  if (MOCK_API) {
    console.log('fetching game names', name)
    return Promise.resolve([
      { gameName: 'mock game' },
      { gameName: 'mock game 2' },
    ])
  }
  return fetch(`/hltb/v1/query?title=${name}`).then((res) => res.json())
}

type UpdateLinkParams = {
  move_id: number
  link: string
}

export async function updateVodLink({
  move_id,
  link,
}: UpdateLinkParams): Promise<void> {
  if (MOCK_API) {
    console.log('setting vod link', link)
    return Promise.resolve()
  }
  return fetch(`/api/player_move_vod_link`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ move_id, vod_link: link }),
  }).then((res) => res.json())
}

type PlayerMovesResponse = {
  moves: Array<PlayerMove>
}

export async function fetchPlayerMoves(
  id: number
): Promise<PlayerMovesResponse> {
  if (MOCK_API) {
    console.log('fetching player moves', id)
    return Promise.resolve({ moves: playerMovesMock() })
  }
  return fetch(`/api/moves?player_id=${id}`).then((res) => res.json())
}

export async function fetchMovesByDate(
  date: string
): Promise<PlayerMovesResponse> {
  if (MOCK_API) {
    console.log('fetching moves by date', date)
    return Promise.resolve({ moves: playerMovesMock() })
  }
  return fetch(`/api/moves?date=${date}`).then((res) => res.json())
}

type ResetPointaucTokenResponse = {
  token: string
}

export async function resetPointaucToken(): Promise<ResetPointaucTokenResponse> {
  if (MOCK_API) {
    console.log('resetting token')
    return Promise.resolve({ token: 'xxx' })
  }
  return fetch('/api/reset_pointauc_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
}
