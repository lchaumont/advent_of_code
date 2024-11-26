import {countChars} from "../../lib/string-utils";

const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    let sum = 0;

    lines.forEach((line: string) => {
        const [l, w, h]: number[] = line.split("x").map((s: string) => parseInt(s, 10));
        const [lw, wh, lh] = [l * w, w * h, h * l];
        const min = Math.min(lw, wh, lh);

        const total = 2 * lw + 2 * wh + 2 * lh + min;
        sum += total;
    });

    console.log(sum);
};

export default main;
