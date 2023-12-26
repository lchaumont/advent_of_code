import _ from "lodash";

const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line) => line.split(""));

    const columns = [];
    for (let i = 0; i < input[0].length; i++) {
        columns.push([]);
    }

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            columns[j].push(input[i][j]);
        }
    }

    let sum= 0;
    for (let i = 0; i < columns.length; i++) {
        const column = columns[i];
        let columnSum = 0;
        let countOfBall = 0;

        for (let j = column.length - 1; j >= 0; j--) {
            const char = column[j];
            if (char === "#") {
                for (let k = 0; k < countOfBall; k++) {
                    columnSum = columnSum + (column.length - j - k - 1);
                }
                countOfBall = 0;
            }

            if (char === "O") {
                countOfBall++;
            }
        }

        if (countOfBall > 0) {
            for (let k = 0; k < countOfBall; k++) {
                columnSum = columnSum + (column.length - k);
            }
        }

        console.log("columnSum", columnSum);
        sum += columnSum;
    }

    console.log("sum", sum);
};

export default main;
