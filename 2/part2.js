const { open } = require("node:fs/promises");

function parseLine(line) {
    const lineSplitted = line.split(":")[1].trim();
    const subsets = lineSplitted.split(";").map((x) => x.trim());

    const minimums = {
        red: 0,
        green: 0,
        blue: 0,
    }

    for (const subset of subsets) {
        const subsetSplitted = subset.split(",").map((x) => x.trim());

        const red = parseInt(subsetSplitted.find((prompt) => prompt.includes("red"))?.match(/(\d+) red/)[1] ?? 0);
        const green = parseInt(subsetSplitted.find((prompt) => prompt.includes("green"))?.match(/(\d+) green/)[1] ?? 0);
        const blue = parseInt(subsetSplitted.find((prompt) => prompt.includes("blue"))?.match(/(\d+) blue/)[1] ?? 0);

        minimums.red = Math.max(minimums.red, red);
        minimums.green = Math.max(minimums.green, green);
        minimums.blue = Math.max(minimums.blue, blue);
    }

    return minimums.red * minimums.green * minimums.blue;
}

(async () => {
    const file = await open("./input.txt");

    let sum = 0;
    for await (const line of file.readLines()) {
        const gameNumber = line.match(/Game (\d+):/)[1];
        const linePower = parseLine(line)
        sum += parseInt(linePower);
    }

    console.log(sum);
})();
