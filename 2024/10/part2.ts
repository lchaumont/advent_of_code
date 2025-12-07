import {Grid} from "../../lib/Grid";

const main = (input: string) => {
    const heights: number[][] = input
        .replaceAll("\r", "")
        .split("\n")
        .map((line: string) => line.split("").map((char: string) => parseInt(char)));

    const grid = new Grid<number>(heights.length, heights[0].length, 0);

    for (let y = 0; y < heights.length; y++) {
        for (let x = 0; x < heights[y].length; x++) {
            grid.setCellValue(x, y, heights[y][x]);
        }
    }

    const startsPositions = grid.searchIndexes((v) => v === 0);

    const score = (startPosition: [number, number]): number => {
        const [x, y] = startPosition;
        const currentValue = grid.getCellValue(x, y);

        if (currentValue === 9) return 1;

        const nextPossibles = grid
            .getNeighborsIndex(x, y, false)
            .filter(([nx, ny]) => grid.getCellValue(nx, ny) === currentValue + 1);

        if (nextPossibles.length === 0) return 0;
        return nextPossibles.reduce((acc, cur) => {
            const r = score(cur);
            return acc + r;
        }, 0);
    };

    let result = 0;

    for (const start of startsPositions) {
        const r = score(start);
        result += r;
    }

    return result;
};

export default main;
