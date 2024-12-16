import {Grid} from "../../lib/Grid";

const main = (input: string) => {
    const chars: string[][] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line: string) => line.split(""));

    const width = chars[0].length;
    const height = chars.length;

    const grid = new Grid(height, width, "");

    for (let i = 0; i < chars.length; i++) {
        for (let j = 0; j < chars[i].length; j++) {
            grid.setCellValue(i, j, chars[i][j]);
        }
    }

    const start = {x: 1, y: height - 2};
    const end = {x: width - 2, y: 1};

    // Generic Djikstra's algorithm, but neighbors in same direction cost 1, others cost 1001
    const visited = new Map<string, number>();
    const visitedKey = (x: number, y: number, cost: number, direction: string) => `${x},${y},${direction}`;

    const queue = [
        {x: start.x, y: start.y, cost: 0, cumulativeCost: 0, direction: "E", path: [] as {x: number; y: number}[]},
    ];

    let result = Infinity;
    let bestPaths: {x: number; y: number}[][] = [];

    while (queue.length > 0) {
        const current = queue.shift();
        if (current === undefined) break;

        if (current.x !== end.x || current.y !== end.y) {
            const key = visitedKey(current.x, current.y, current.cost, current.direction);

            if (visited.has(key) && visited.get(key)! < current.cumulativeCost) {
                continue;
            }

            visited.set(key, current.cumulativeCost);
        }

        if (current.x === end.x && current.y === end.y) {
            if (result > current.cumulativeCost) {
                result = current.cumulativeCost;
                bestPaths = [current.path];
            } else if (result === current.cumulativeCost) {
                bestPaths.push(current.path);
            }

            continue;
        }

        const neighbors = [
            {
                x: current.x + 1,
                y: current.y,
                cost: current.direction === "E" ? 1 : 1001,
                cumulativeCost: current.cumulativeCost + (current.direction === "E" ? 1 : 1001),
                direction: "E",
                path: [...current.path, {x: current.x + 1, y: current.y}],
            },
            {
                x: current.x - 1,
                y: current.y,
                cost: current.direction === "W" ? 1 : 1001,
                cumulativeCost: current.cumulativeCost + (current.direction === "W" ? 1 : 1001),
                direction: "W",
                path: [...current.path, {x: current.x - 1, y: current.y}],
            },
            {
                x: current.x,
                y: current.y + 1,
                cost: current.direction === "S" ? 1 : 1001,
                cumulativeCost: current.cumulativeCost + (current.direction === "S" ? 1 : 1001),
                direction: "S",
                path: [...current.path, {x: current.x, y: current.y + 1}],
            },
            {
                x: current.x,
                y: current.y - 1,
                cost: current.direction === "N" ? 1 : 1001,
                cumulativeCost: current.cumulativeCost + (current.direction === "N" ? 1 : 1001),
                direction: "N",
                path: [...current.path, {x: current.x, y: current.y - 1}],
            },
        ].filter((neighbor) => {
            return (
                (current.direction === "E" && neighbor.direction !== "W") ||
                (current.direction === "W" && neighbor.direction !== "E") ||
                (current.direction === "N" && neighbor.direction !== "S") ||
                (current.direction === "S" && neighbor.direction !== "N")
            );
        });

        for (const neighbor of neighbors) {
            if (neighbor.x < 0 || neighbor.x >= width || neighbor.y < 0 || neighbor.y >= height) {
                continue;
            }

            if (grid.getCellValue(neighbor.y, neighbor.x) === "#") {
                continue;
            }

            if (neighbor.x === current.x && neighbor.y === current.y) {
                continue;
            }

            queue.push(neighbor);
        }
    }

    const setPositions = new Set<string>();
    const toSet = (x: number, y: number) => `${x},${y}`;

    for (const path of bestPaths) {
        for (const position of path) {
            setPositions.add(toSet(position.x, position.y));
        }
    }

    return setPositions.size + 1;
};

export default main;
