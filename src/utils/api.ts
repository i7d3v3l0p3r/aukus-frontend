import { playersMock } from "./mocks";
import { Player, PlayerMove, PlayerMoveRequest } from "./types";

type PlayerMovesResponse = {
  moves: Array<PlayerMove>;
};

export async function fetchPlayerMoves(id: number): Promise<PlayerMovesResponse> {
  return fetch(`/api/players/${id}`).then((res) => res.json());
}

type PlayersResponse = {
  players: Array<Player>;
};

const MOCK_API = true;

export async function fetchPlayers(): Promise<PlayersResponse> {
  if (MOCK_API) {
    return Promise.resolve({ players: playersMock });
  }
  return fetch(`/api/players`).then((res) => res.json());
}

export async function createPlayerMove(move: PlayerMoveRequest): Promise<void> {
  if (MOCK_API) {
    return Promise.resolve();
  }
  return fetch(`/api/player_move`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(move),
  }).then((res) => res.json());
}
