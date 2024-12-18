import {Grid} from "../../lib/Grid";

const main = (input: string) => {
    const lines: number[][] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line) => line.split(",").map(Number));

    const width = 71;
    const height = 71;

    const grid = new Grid<string>(width, height, ".");

    for (let i = 0; i < 1024; i++) {
        const [x, y] = lines[i];
        grid.setCellValue(y, x, "#");
    }

    grid.log();

    const dijkstra = (): number[][] | null => {
        const end = [width - 1, height - 1];

        const visited = new Set<string>();
        const visitedKey = (row: number, col: number) => `${row},${col}`;

        const queue: [number, number, number, number[][]][] = [[0, 0, 0, [[0, 0]]]];

        while (queue.length > 0) {
            const [row, col, distance, path] = queue.shift()!;

            if (row === end[0] && col === end[1]) {
                return path;
            }

            if (visited.has(visitedKey(row, col))) {
                continue;
            }

            visited.add(visitedKey(row, col));

            const neighbors = grid.getNeighborsIndex(row, col);
            for (const [newRow, newCol] of neighbors) {
                if (grid.getCellValue(newRow, newCol) === "#") {
                    continue;
                }

                queue.push([newRow, newCol, distance + 1, [...path, [newRow, newCol]]]);
            }
        }

        return null;
    };

    let path = dijkstra();

    for (let i = 1024; i < lines.length; i++) {
        const [x, y] = lines[i];
        grid.setCellValue(y, x, "#");

        if (path && path.find(([row, col]) => row === y && col === x)) {
            path = dijkstra();
        }

        if (!path) {
            return `${x},${y}`;
        }
    }

    return "Not found";
};

export default main;
