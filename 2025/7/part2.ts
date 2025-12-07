import {Grid} from "../../lib/Grid";

const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    const rowCount = lines.length;
    const grid = new Grid<string>(rowCount, lines[0].length, "");

    // Initialisation
    for (let y = 0; y < rowCount; y++) {
        const line = lines[y];
        for (let x = 0; x < line.length; x++) {
            grid.setCellValue(y, x, line[x]);
        }
    }

    const S = grid.searchIndex((v) => v === "S");
    if (S === null) return;

    const [row, col] = S;

    const cache = new Map<string, number>();

    const apply = (row: number, col: number): number => {
        for (let r = row; r < rowCount; r++) {
            const key = getKey(r, col);
            if (cache.has(key)) {
                return cache.get(key)!;
            }

            const cell = grid.getCellValue(r, col);

            if (cell === "^") {
                const left = apply(r, col - 1);
                const lKey = getKey(r, col - 1);
                cache.set(lKey, left);

                const right = apply(r, col + 1);
                const rKey = getKey(r, col + 1);
                cache.set(rKey, right);

                return left + right;
            }
        }

        return 1;
    };

    const getKey = (row: number, col: number) => String(row) + "-" + String(col);

    return apply(row, col);
};

export default main;
