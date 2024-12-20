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

    const grid = new Grid<number>(1000, 1000, 0);

    for (const {instruction, fx, fy, tx, ty} of lines) {
        for (let x = fx; x <= tx; x++) {
            for (let y = fy; y <= ty; y++) {
                const current = grid.getCellValue(x, y);

                switch (instruction) {
                    case "turn on":
                        grid.setCellValue(x, y, current + 1);
                        break;
                    case "turn off":
                        grid.setCellValue(x, y, current === 0 ? 0 : current - 1);
                        break;
                    case "toggle":
                        grid.setCellValue(x, y, current + 2);
                        break;
                }
            }
        }
    }

    let result = 0;

    for (let x = 0; x < 1000; x++) {
        for (let y = 0; y < 1000; y++) {
            result += grid.getCellValue(x, y);
        }
    }

    return result;
};

export default main;
