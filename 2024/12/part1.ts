import {Grid} from "../../lib/Grid";

const main = (input: string) => {
    const chars: string[][] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line: string) => line.split(""));

    const grid = new Grid<string>(chars.length, chars[0].length, ".");

    chars.forEach((row: string[], y: number) => {
        row.forEach((char: string, x: number) => {
            grid.setCellValue(x, y, char);
        });
    });

    const areas: Array<{
        type: string;
        cells: Array<{x: number; y: number}>;
        area: number;
        perimeter: number;
    }> = [];

    const seen = new Set<string>();
    const fromPositionToKey = (x: number, y: number) => `${x},${y}`;

    const dfs = (x: number, y: number, type: string, cells: Array<{x: number; y: number}>) => {
        if (seen.has(fromPositionToKey(x, y))) {
            return;
        }

        cells.push({x, y});
        seen.add(fromPositionToKey(x, y));

        grid.getNeighborsIndex(x, y)
            .filter(([x, y]) => grid.getCellValue(x, y) === type)
            .forEach(([x, y]) => dfs(x, y, type, cells));
    };

    const calculatePerimeter = (type: string, cells: Array<{x: number; y: number}>): number => {
        return cells.reduce((acc, {x, y}) => 
            acc + (4 - grid.getNeighborsIndex(x, y).filter(([x, y]) => grid.getCellValue(x, y) === type).length)
        , 0);
    };

    for (let x = 0; x < grid.rows; x++) {
        for (let y = 0; y < grid.cols; y++) {
            if (seen.has(fromPositionToKey(x, y))) {
                continue;
            }

            const type = grid.getCellValue(x, y);
            const cells: Array<{x: number; y: number}> = [];
            dfs(x, y, type, cells);

            areas.push({
                type,
                cells,
                area: cells.length,
                perimeter: calculatePerimeter(type, cells),
            });
        }
    }

    const result = areas.reduce((acc, {area, perimeter}) => acc + area * perimeter, 0);

    return result;
};

export default main;
