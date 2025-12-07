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

    const start = grid.searchIndexes((v) => v === "S")[0];
    const end = grid.searchIndexes((v) => v === "E")[0];

    grid.setCellValue(end[0], end[1], ".");

    let [cx, cy] = start;
    let nx, ny;
    const referenceTimes = new Map<string, number>();
    const cheatedTimes: {key: string; cost: number}[] = [];
    const toKey = (x: number, y: number) => `${x},${y}`;

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
                }
            } else {
                const adj2x = cx + 2 * dx;
                const adj2y = cy + 2 * dy;

                if (grid.isInGridBounds(adj2x, adj2y) && grid.getCellValue(adj2x, adj2y) === ".") {
                    const k = toKey(adj2x, adj2y);
                    cheatedTimes.push({key: k, cost: cost + 2});
                }
            }
        }

        cx = nx!;
        cy = ny!;
        cost++;
    }

    referenceTimes.set(toKey(end[0], end[1]), referenceTime);

    cheatedTimes.forEach(({cost, key}) => {
        const rTime = referenceTimes.get(key)!;

        if (rTime - cost >= toBreak) {
            console.log(key, rTime, cost);
            result++;
        }
    });

    return result;
};

export default main;
