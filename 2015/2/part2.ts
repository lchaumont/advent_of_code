import {countChars} from "../../lib/string-utils";

const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    let sum = 0;

    lines.forEach((line: string) => {
        const [l, w, h]: number[] = line.split("x").map((s: string) => parseInt(s, 10));
        const max = Math.max(l, w, h);
        const minSurface = [l, w, h].filter((n: number) => n !== max);
        
        while (minSurface.length < 2) {
            minSurface.push(max);
        }

        const total = (2 * minSurface[0] + 2 * minSurface[1]) + l * w * h;
        sum += total;
    });

    console.log(sum);
};

export default main;
