import { Grid } from "../../lib/Grid";

const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    const grid = new Grid<string>(lines[0].length, lines.length, ".");

    // Initialisation
    for (let y = 0; y < lines.length; y++) {
        const line = lines[y];
        for (let x = 0; x < line.length; x++) {
            grid.setCellValue(y, x, line.charAt(x));
        }
    }

    let answer = 0;

    for (let y = 0; y < lines.length; y++) {
        const line = lines[y];
        for (let x = 0; x < line.length; x++) {
            const v = grid.getCellValue(y, x);
            if (v !== "@") continue;

            const neighbors = grid.getNeighbors(y, x, true, false);
            const countRoll = neighbors.reduce((acc, cur) => cur === "@" ? acc + 1 : acc, 0);
            if (countRoll < 4) answer++;
        }
    }

    return answer;
};

export default main;
