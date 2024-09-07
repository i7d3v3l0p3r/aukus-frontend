import { PlayerMove } from "./types";

type PlayerMovesResponse = {
  moves: Array<PlayerMove>;
};

export async function fetchPlayerMoves(id: number): Promise<PlayerMovesResponse> {
  return fetch(`/api/players/${id}`).then((res) => res.json());
}
