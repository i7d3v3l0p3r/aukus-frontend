export type GameRecord = {
  startDate: string;
  endDate: string;
  game: string;
  turn: number;
  status: "drop" | "completed";
  diceRoll: number;
  nextPosition: number;
  review: string;
  vodLink: string;
};
