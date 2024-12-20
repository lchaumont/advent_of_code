import {Grid} from "../../lib/Grid";

const main = (input: string) => {
    const regex = /(.*) (\d+),(\d+) through (\d+),(\d+)/;

    const lines = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line: string) => {
            const r = line.match(regex)!;

            return {
                instruction: r[1],
                fx: parseInt(r[2]),
                fy: parseInt(r[3]),
                tx: parseInt(r[4]),
                ty: parseInt(r[5]),
            };
        });

    const grid = new Grid<boolean>(1000, 1000, false);

    for (const {instruction, fx, fy, tx, ty} of lines) {
        for (let x = fx; x <= tx; x++) {
            for (let y = fy; y <= ty; y++) {
                switch (instruction) {
                    case "turn on":
                        grid.setCellValue(x, y, true);
                        break;
                    case "turn off":
                        grid.setCellValue(x, y, false);
                        break;
                    case "toggle":
                        grid.setCellValue(x, y, !grid.getCellValue(x, y));
                        break;
                }
            }
        }
    }

    return grid.search((v) => v).length;
};

export default main;
