import {combinations} from "../../lib/array-utils";
import {extractNumbers} from "../../lib/string-utils";

const main = (input: string) => {
    const lines: number[][] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line: string) => extractNumbers(line.trim(), " "));

    let answer = 0;

    const isValid = (line: number[]): boolean => {
        let sens = null;

        for (let i = 0; i < line.length - 1; i++) {
            const current = line[i];
            const next = line[i + 1];

            const diff = current - next;
            if (diff === 0 || Math.abs(diff) > 3) return false;

            if (sens === null) sens = diff > 0;
            else if (diff > 0 !== sens) return false;
        }

        return true;
    };

    lines.forEach((l) => {
        const subCombinations = combinations(l, l.length - 1);

        if (subCombinations.some((c) => isValid(c))) {
            answer++;
        }
    });

    return answer;
};

export default main;
