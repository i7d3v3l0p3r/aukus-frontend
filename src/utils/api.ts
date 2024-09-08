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

const MOCK_API = process.env.NODE_ENV === "development";

export async function fetchPlayers(): Promise<PlayersResponse> {
  if (MOCK_API) {
    return Promise.resolve({ players: playersMock });
  }
  return fetch(`/api/players`).then((res) => res.json());
}

export async function createPlayerMove(move: PlayerMoveRequest): Promise<void> {
  if (MOCK_API) {
    playersMock[move.player_id].map_position += move.dice_roll;
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

type CurrentUserIdResponse = {
  user_id: number;
};

export async function fetchCurrentUser(): Promise<CurrentUserIdResponse> {
  if (MOCK_API) {
    return Promise.resolve({ user_id: playersMock[0].id });
  }
  return fetch(`/api/get_current_user_id`).then((res) => res.json());
}
