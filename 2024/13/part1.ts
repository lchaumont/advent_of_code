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
            return {ax, ay, bx, by, px, py};
        });

    let result = 0;

    MAIN: for (const {ax, ay, bx, by, px, py} of configurations) {
        for (let i = 0; i < 100; i++) {
            for (let j = 0; j < 100; j++) {
                if (ax * i + bx * j === px && ay * i + by * j === py) {
                    result += i * 3 + j;
                    continue MAIN;
                }
            }
        }
    }

    return result;
};

export default main;
