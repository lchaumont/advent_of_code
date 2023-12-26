const { open } = require("node:fs/promises");

function isNumeric(str) {
    return !isNaN(str) && !isNaN(parseInt(str));
}

function searchOccurence(str) {
    let occurences = [];

    ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "1", "2", "3", "4", "5", "6", "7", "8", "9"].forEach((number) => {
        let regex = new RegExp(number, "g");
        let match;
        while ((match = regex.exec(str)) !== null) {
            occurences.push({
                number: number,
                index: match.index,
            });
        }
    });

    return occurences;
}

function fromStringToNumber(str) {
    const mapping = {
        "one": "1",
        "two": "2",
        "three": "3",
        "four": "4",
        "five": "5",
        "six": "6",
        "seven": "7",
        "eight": "8",
        "nine": "9",
    }

    return mapping[str];
}

(async () => {
    const file = await open("./input.txt");

    let sum = 0;
    for await (const line of file.readLines()) {
        const occurences = searchOccurence(line);
        const occurencesFormatted = occurences.sort((a, b) => a.index - b.index).map((occurence) => isNumeric(occurence.number) ? occurence.number : fromStringToNumber(occurence.number));

        const numbersJoined = occurencesFormatted[0] + occurencesFormatted[occurencesFormatted.length - 1];
        sum += parseInt(numbersJoined);
    }

    console.log(sum);
})();
