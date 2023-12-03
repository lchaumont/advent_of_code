const { open } = require("node:fs/promises");

(async () => {
    const file = await open("./input.txt");

    let fileOccurences = [];
    let rowIndex = 0;
    for await (const line of file.readLines()) {
        let regexNumber = /\d+/gm
        let symbols = /[\*]/gm

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
        let gears = row.filter((item) => item.type === "symbol");

        for (const gear of gears) {
            const colIndex = gear.index;

            const topLine = fileOccurences[rowIndex - 1] !== undefined && fileOccurences[rowIndex - 1].filter((item) => item.type === "number" && (item.index >= colIndex - 1 && item.index <= colIndex + 1) || (item.index + item.number.length >= colIndex && item.index + item.number.length <= colIndex + 1));
            const sameLine = row.filter((item) => item.type === "number" && (item.index + item.number.length === colIndex || item.index === colIndex + 1));
            const bottomLine = fileOccurences[rowIndex + 1] !== undefined && fileOccurences[rowIndex + 1].filter((item) => item.type === "number" && (item.index >= colIndex - 1 && item.index <= colIndex + 1) || (item.index + item.number.length >= colIndex && item.index + item.number.length <= colIndex + 1));

            const matches = [...topLine, ...sameLine, ...bottomLine];
            if (matches.length === 2) {
                sum+= parseInt(matches[0].number) * parseInt(matches[1].number);
            }
        }
    }

    console.log(sum);
})();
