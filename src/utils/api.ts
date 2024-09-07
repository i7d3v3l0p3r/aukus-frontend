import { playersMock } from "./mocks";
import { Player, PlayerMove } from "./types";

type PlayerMovesResponse = {
  moves: Array<PlayerMove>;
};

export async function fetchPlayerMoves(id: number): Promise<PlayerMovesResponse> {
  return fetch(`/api/players/${id}`).then((res) => res.json());
}

type PlayersResponse = {
  players: Array<Player>;
};

export async function fetchPlayers(): Promise<PlayersResponse> {
  return Promise.resolve({ players: playersMock });
  return fetch(`/api/players`).then((res) => res.json());
}
