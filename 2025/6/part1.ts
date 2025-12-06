import { transposeMatrix } from "../../lib/array-utils";

const main = (input: string) => {
    const lines: string[][] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line: string) => line.split(" ").filter((n: string) => n.trim() !== ""));

    const problems = transposeMatrix(lines);

    let answer = 0;

    for (const problem of problems) {
        const operation = problem[problem.length - 1];

        if (operation === "+") {
            const r = problem.slice(0, problem.length - 1).reduce((acc, cur) => acc + parseInt(cur), 0);
            answer += r;
        } else if (operation === "*") {
            const r = problem.slice(0, problem.length - 1).reduce((acc, cur) => acc * parseInt(cur), 1)
            answer += r;
        }
    }

    return answer;
};

export default main;
