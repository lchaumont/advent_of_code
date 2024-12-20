import {Grid} from "../../lib/Grid";

const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    const width = lines[0].length;
    const height = lines.length;

    const grid = new Grid<string>(width, height, ".");

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        for (let j = 0; j < line.length; j++) {
            grid.setCellValue(i, j, line[j]);
        }
    }

    const referenceTime = grid.search((v) => v === ".").length + 1;
    const toBreak = 100;
    let result = 0;

    const start = grid.searchIndex((v) => v === "S")[0];
    const end = grid.searchIndex((v) => v === "E")[0];

    grid.setCellValue(end[0], end[1], ".");

    let [cx, cy] = start;
    let nx, ny;
    const referenceTimes = new Map<string, number>();
    const cheatedTimes: {key: string; cost: number}[] = [];
    const toKey = (x: number, y: number) => `${x},${y}`;

    const getPositionsInRange = (start: {x: number; y: number}, range: number) => {
        const {x, y} = start;
        const positions = [];

        for (let dx = -range; dx <= range; dx++) {
            for (let dy = -range; dy <= range; dy++) {
                const distance = Math.abs(dx) + Math.abs(dy);
                if (distance <= range && distance > 1) {
                    positions.push({x: x + dx, y: y + dy, dx, dy, distance});
                }
            }
        }

        return positions;
    };

    let cost = 0;

    while (cx !== end[0] || cy !== end[1]) {
        const key = toKey(cx, cy);
        referenceTimes.set(key, cost);

        const deltas = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
        ];

        for (const [dx, dy] of deltas) {
            const adjx = cx + dx;
            const adjy = cy + dy;

            if (grid.isInGridBounds(adjx, adjy) && grid.getCellValue(adjx, adjy) === ".") {
                const k = toKey(adjx, adjy);
                if (!referenceTimes.has(k)) {
                    nx = adjx;
                    ny = adjy;
                    break;
                }
            }
        }

        getPositionsInRange({x: cx, y: cy}, 20).forEach(({x, y, dx, dy, distance}) => {
            if (grid.isInGridBounds(x, y) && grid.getCellValue(x, y) === ".") {
                const k = toKey(x, y);
                cheatedTimes.push({key: k, cost: cost + distance});
            }
        });

        cx = nx!;
        cy = ny!;
        cost++;
    }

    referenceTimes.set(toKey(end[0], end[1]), referenceTime);

    cheatedTimes.forEach(({cost, key}) => {
        const rTime = referenceTimes.get(key)!;

        if (rTime - cost >= toBreak) {
            result++;
        }
    });

    return result;
};

export default main;
