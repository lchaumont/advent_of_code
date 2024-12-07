import { cartesianProduct } from "../../lib/array-utils";

const main = (input: string) => {
    const lines = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line: string) => {
            const [l, r] = line.split(": ");
            const operands = r
                .split(" ")
                .map((x) => parseInt(x));
            return {
                target: parseInt(l),
                operands,
                numberOfOperators: operands.length - 1,
            };
        });

    let result = 0;

    OUTER: for (const line of lines) {
        const operatorsCombinations = cartesianProduct(Array.from({length: line.numberOfOperators}, () => ["+", "x"]));

        for (const combination of operatorsCombinations) {
            const lineResult = line.operands.reduce((acc, current, index) => {
                if (index === 0) return current;
                else {
                    const operator = combination[index - 1];
    
                    if (operator === "+") {
                        return acc += current;
                    } else {
                        return acc *= current;
                    }
                }
            }, 0);

            if (lineResult === line.target) {
                result += lineResult;
                continue OUTER;
            }
        }
    }

    return result;
};

export default main;
