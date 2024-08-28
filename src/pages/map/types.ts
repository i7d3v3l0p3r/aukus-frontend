export type MapCell = {
  id: number;
  direction: "left" | "right" | "up" | null;
};

export type MainMap = {
  cellRows: Array<Array<MapCell>>;
  cells: Array<MapCell>;
  startCell: MapCell;
  finishCell: MapCell;
};

export const cellSize = 120;

type Ladder = {
  cellFrom: number;
  cellTo: number;
};

type Snake = {
  cellFrom: number;
  cellTo: number;
};
