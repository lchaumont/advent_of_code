import {extractNumbers} from "../../lib/string-utils";

const main = (input: string) => {
    const lines: number[][] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line: string) => extractNumbers(line.trim(), " "));

    let answer = 0;

    lines.forEach((l) => {
        let sens = null;

        for (let i = 0; i < l.length - 1; i++) {
            const current = l[i];
            const next = l[i + 1];

            const diff = current - next;
            if (diff === 0 || Math.abs(diff) > 3) {
                return;
            }

            if (sens === null) {
                sens = diff > 0;
            } else if (diff > 0 !== sens) {
                return;
            }
        }

        console.log(l);
        answer += 1;
    });

    return answer;
};

export default main;
