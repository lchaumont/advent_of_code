import { transposeMatrix } from "../../lib/array-utils";

type Problem = {
    symbol: "+" | "*";
    startIndex: number | null;
    endIndex: number | null;
    rawNumbers: string[];
    numbers: number[];
};

const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    const problems: Problem[] = [];

    const symbols = lines[lines.length - 1];

    let problem: Problem | null = null;
    for (let i = 0; i < symbols.length; i++) {
        const char = symbols.charAt(i);
        if (char === "+" || char === "*") {
            if (problem !== null) {
                problem.endIndex = i - 2;
                problems.push(problem);
            }

            problem = {
                symbol: char,
                startIndex: i,
                endIndex: null,
                rawNumbers: [],
                numbers: [],
            };
        } else if (i === symbols.length - 1 && problem !== null) {
            problem.endIndex = i;
            problems.push(problem);
        }
    }

    for (const line of lines.slice(0, lines.length - 1)) {
        for (const problem of problems) {
            problem.rawNumbers.push(line.substring(problem.startIndex!, problem.endIndex! + 1))
        }
    }

    let answer = 0;

    for (const problem of problems) {
        const matrix = problem.rawNumbers.map(n => n.split(""));
        const transposed = transposeMatrix(matrix);
        problem.numbers = transposed.map((line) => parseInt(line.join("").trim()));

        const operation = problem.symbol;

        if (operation === "+") {
            const r = problem.numbers.reduce((acc, cur) => acc + cur, 0);
            answer += r;
        } else if (operation === "*") {
            const r = problem.numbers.reduce((acc, cur) => acc * cur, 1);
            answer += r;
        }
    }

    return answer;
};

export default main;
