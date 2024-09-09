export type Player = {
  id: number;
  name: string;
  stream_link: string;
  is_online: boolean;
  current_game: string;
  url_handle: string;
  map_position: number;
};

export type MoveType = "completed" | "drop" | "sheikh" | "reroll" | "movie";

export type DiceOption = "1d6" | "2d6" | "3d6" | "1d8" | "1d4";

export type ItemLength = "short" | "medium" | "long";

export type PlayerMove = {
  id: number;
  created_at: string;
  dice_roll: number;
  cell_from: number;
  cell_to: number;
  stair_from: number | null;
  stair_to: number | null;
  snake_from: number | null;
  snake_to: number | null;
  type: MoveType;
  item_title: string;
  item_review: string;
  item_rating: number;
  item_length: ItemLength | null;
};

export type PlayerMoveRequest = {
  player_id: number;
  dice_roll: number;
  move_to: number;
  stair_from: number | null;
  stair_to: number | null;
  snake_from: number | null;
  snake_to: number | null;
  type: MoveType;
  item_title: string;
  item_review: string;
  item_rating: number;
  item_length: ItemLength | null;
};

export type NextTurnParams = {
  diceRoll: number;
  stairFrom: number | null;
  stairTo: number | null;
  snakeFrom: number | null;
  snakeTo: number | null;
  type: MoveType;
  itemTitle: string;
  itemReview: string;
  itemRating: number;
  itemLength: ItemLength | null;
};

export type Page = "map" | "players" | "player" | "about" | "rules" | "stats";
