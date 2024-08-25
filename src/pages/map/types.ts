export type MapCell = {
  id: number;
  direction: "left" | "right" | "up" | null;
};

export type MainMap = {
  cells: Array<MapCell>;
  start: 0;
  finish: 101;
};

export const cellSize = 120;
