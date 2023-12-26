const { open } = require("node:fs/promises");

(async () => {
    const file = await open("./input.txt");

    let fileOccurences = [];
    let rowIndex = 0;
    for await (const line of file.readLines()) {
        let regexNumber = /\d+/gm
        let symbols = /[^\d\.]/gm

        let rowOccurences = [];

        let match;
        while ((match = regexNumber.exec(line)) !== null) {
            rowOccurences.push({
                number: match[0],
                index: match.index,
                type : "number"
            });
        }

        while ((match = symbols.exec(line)) !== null) {
            rowOccurences.push({
                number: match[0],
                index: match.index,
                type : "symbol"
            });
        }

        fileOccurences.push(rowOccurences);

        rowIndex++;
    }

    let sum = 0;
    for (let rowIndex = 0; rowIndex < fileOccurences.length; rowIndex++) {
        let row = fileOccurences[rowIndex];
        let numbers = row.filter((item) => item.type === "number");

        for (const number of numbers) {
            const colIndex = number.index;

            const topLine = fileOccurences[rowIndex - 1] !== undefined && fileOccurences[rowIndex - 1].find((item) => item.type === "symbol" && item.index >= colIndex - 1 && item.index <= colIndex + number.number.length);
            const sameLine = row.find((item) => item.type === "symbol" && (item.index === colIndex - 1 || item.index === colIndex + number.number.length));
            const bottomLine = fileOccurences[rowIndex + 1] !== undefined && fileOccurences[rowIndex + 1].find((item) => item.type === "symbol" && item.index >= colIndex - 1 && item.index <= colIndex + number.number.length);

            if (topLine || sameLine || bottomLine) {
                sum+= parseInt(number.number);
            } else {
                console.log(number.number);
            }
        }
    }

    console.log(sum);
})();
