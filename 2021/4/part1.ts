import {Grid} from "../../lib/Grid";
import {extractNumbers} from "../../lib/string-utils";

const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n\n")
        .filter((line: string) => line.trim() !== "");

    type Cell = {value: number; haveBeenDraw: boolean};

    const draws = lines[0].split(",").map(Number);
    const grids: Grid<Cell>[] = [];
    lines.slice(1).forEach((gridString: string) => {
        const grid = new Grid(5, 5, {value: 0, haveBeenDraw: false});

        gridString.split("\n").forEach((row: string, rowIndex: number) => {
            extractNumbers(row).forEach((value: number, colIndex: number) => {
                grid.setCellValue(rowIndex, colIndex, {value, haveBeenDraw: false});
            });
        });

        grids.push(grid);
    });

    DRAW_LOOP: for (const draw of draws) {
        for (const grid of grids) {
            const correspondingCell = grid.searchIndex((cell) => cell.value === draw)[0];

            if (correspondingCell) {
                grid.setCellValue(correspondingCell[0], correspondingCell[1], {value: draw, haveBeenDraw: true});

                const rowIndex = correspondingCell[0];
                const row = grid.getRow(rowIndex);
                if (row.every((cell) => cell.haveBeenDraw)) {
                    const sum = grid.search((cell) => !cell.haveBeenDraw).reduce((acc, cell) => acc + cell.value, 0);
                    console.log(sum * draw);

                    break DRAW_LOOP;
                }

                const colIndex = correspondingCell[1];
                const col = grid.getColumn(colIndex);
                if (col.every((cell) => cell.haveBeenDraw)) {
                    const sum = grid.search((cell) => !cell.haveBeenDraw).reduce((acc, cell) => acc + cell.value, 0);
                    console.log(sum * draw);

                    break DRAW_LOOP;
                }
            }
        }
    }
};

export default main;
