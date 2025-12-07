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

    let anwser = new Set();

    const apply = (row: number, col: number) => {
        for (let r = row; r < rowCount; r++) {
            const key = getKey(r, col);
            if (anwser.has(key)) return;

            const cell = grid.getCellValue(r, col);

            if (cell === "^") {
                anwser.add(key);
                apply(r, col - 1);
                apply(r, col + 1);
                return;
            }
        }
    };

    const getKey = (row: number, col: number) => String(row) + "-" + String(col);

    apply(row, col);

    return anwser.size;
};

export default main;
