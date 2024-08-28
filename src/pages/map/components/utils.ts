import { MapCell } from "../types";

function generateMapCells() {
  const cellsAmount = 100;
  const cellsInRow = 10;
  const cells: Array<MapCell> = [];

  let cellId = 1;
  for (let i = 0; i < cellsAmount; i++) {
    cells[cellId] = { id: cellId, direction: "right" };
    cellId++;
  }

  const cellsReversed = cells.slice().reverse();
  const rows = [];
  for (let i = 0; i < cellsAmount; i += cellsInRow) {
    let row = cellsReversed.slice(i, i + cellsInRow);
    // reverse every second row
    if (rows.length % 2 === 1) {
      row[0].direction = "up";
      row = row.reverse();
    } else {
      for (let j = 0; j < cellsInRow; j++) {
        row[j].direction = "left";
      }
      row[0].direction = "up";
    }
    rows.push(row);
  }

  cells[100].direction = "left";
  return rows;
}

export const mapCells: Array<MapCell> = generateMapCells()
  .flat()
  .sort((cell: MapCell) => cell.id);
export const mapCellRows: Array<Array<MapCell>> = generateMapCells();
