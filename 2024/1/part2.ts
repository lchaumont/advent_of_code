import {countBy} from "../../lib/array-utils";

const main = (input: string): number => {
    const left: number[] = [];
    const right: number[] = [];

    input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .forEach((line: string) => {
            const [l, r] = line.split("   ").map((x) => parseInt(x));
            left.push(l);
            right.push(r);
        });

    let answer = 0;

    const rightCount = countBy<number, number>(right, (x) => x);

    for (let i = 0; i < left.length; i++) {
        const l = left[i];
        answer += l * (rightCount[l] ?? 0);
    }

    return answer;
};

export default main;
