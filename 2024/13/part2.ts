import {extractNumbers2} from "../../lib/string-utils";

const main = (input: string) => {
    const configurations = input
        .replaceAll("\r", "")
        .split("\n\n")
        .filter((line: string) => line.trim() !== "")
        .map((line: string) => {
            const [a, b, prize] = line.split("\n");
            const [ax, ay] = extractNumbers2(a);
            const [bx, by] = extractNumbers2(b);
            const [px, py] = extractNumbers2(prize);
            return {ax, ay, bx, by, px: px + 10000000000000, py : py + 10000000000000};
        });

    let result = 0;

    for (const {ax, ay, bx, by, px, py} of configurations) {
        const a = (px * by - py * bx) / (ax * by - ay * bx);
        const b = (ax * py - ay * px) / (ax * by - ay * bx);

        if (a % 1 === 0 && b % 1 === 0) {
            result += a * 3 + b;
            continue;
        }
    }

    return result;
};

export default main;
