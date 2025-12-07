import {Grid} from "../../lib/Grid";
import {reverseArray} from "../../lib/array-utils";
import {extractNumbers} from "../../lib/string-utils";

const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n\n")
        .filter((line: string) => line.trim() !== "");

    type Cell = {value: number; haveBeenDraw: boolean};

    const draws = reverseArray(lines[0].split(",").map(Number));
    const grids: Grid<Cell>[] = [];
    lines.slice(1).forEach((gridString: string) => {
        const grid = new Grid(5, 5, {value: 0, haveBeenDraw: true});

        gridString.split("\n").forEach((row: string, rowIndex: number) => {
            extractNumbers(row).forEach((value: number, colIndex: number) => {
                grid.setCellValue(rowIndex, colIndex, {value, haveBeenDraw: true});
            });
        });

        grids.unshift(grid);
    });

    DRAW_LOOP: for (const draw of draws) {
        for (const grid of grids) {
            const correspondingCell = grid.searchIndexes((cell) => cell.value === draw)[0];

            if (correspondingCell) {
                grid.setCellValue(correspondingCell[0], correspondingCell[1], {value: draw, haveBeenDraw: false});

                const searchIndexWithBingos = Array.from(Array(5).keys()).filter((rowIndex) => {
                    const row = grid.getRow(rowIndex);
                    const rowIsBingo = row.every((cell) => cell.haveBeenDraw);

                    const col = grid.getColumn(rowIndex);
                    const colIsBingo = col.every((cell) => cell.haveBeenDraw);

                    return !rowIsBingo && !colIsBingo;
                });

                if (searchIndexWithBingos.length === 5) {
                    const sum = grid.search((cell) => !cell.haveBeenDraw).reduce((acc, cell) => acc + cell.value, 0) - draw;
                    console.log(sum * draw);

                    break DRAW_LOOP;
                }
            }
        }
    }
};

export default main;
