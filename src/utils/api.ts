import {
  playerMovesMock,
  playersMock,
  playersMockById,
  playerStatsMock,
} from './mocks'
import { Player, PlayerMove, PlayerMoveRequest, PlayerStats } from './types'

const MOCK_API = process.env.NODE_ENV === 'development'

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
  return fetch(`/api/players/${id}`).then((res) => res.json())
}

type PlayersResponse = {
  players: Array<Player>
}

export async function fetchPlayers(): Promise<PlayersResponse> {
  if (MOCK_API) {
    console.log('fetching players')
    return Promise.resolve({ players: playersMock })
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

type CurrentUserResponse = {
  user_id: number
  role: 'player' | 'moder'
}

export async function fetchCurrentUser(): Promise<CurrentUserResponse> {
  if (MOCK_API) {
    console.log('fetching current user')
    return Promise.resolve({ user_id: playersMock[0].id, role: 'player' })
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

export async function setVodLink(move_id: number, link: string): Promise<void> {
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
