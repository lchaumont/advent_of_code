const { open } = require("node:fs/promises");

function isGameValid(line) {
    const lineSplitted = line.split(":")[1].trim();
    const subsets = lineSplitted.split(";").map((x) => x.trim());

    for (const subset of subsets) {
        const subsetSplitted = subset.split(",").map((x) => x.trim());

        const formatted = {
            red: parseInt(subsetSplitted.find((prompt) => prompt.includes("red"))?.match(/(\d+) red/)[1] ?? 0),
            green: parseInt(subsetSplitted.find((prompt) => prompt.includes("green"))?.match(/(\d+) green/)[1] ?? 0),
            blue: parseInt(subsetSplitted.find((prompt) => prompt.includes("blue"))?.match(/(\d+) blue/)[1] ?? 0),
        }

        if (!isSubsetValid(formatted)) return false
    }

    return true;
}

function isSubsetValid(subset) {
    const maxRedCubes = 12;
    const maxGreenCubes = 13;
    const maxBlueCubes = 14;

    return subset.red <= maxRedCubes && subset.green <= maxGreenCubes && subset.blue <= maxBlueCubes;
}

(async () => {
    const file = await open("./input.txt");

    let sum = 0;
    for await (const line of file.readLines()) {
        const gameNumber = line.match(/Game (\d+):/)[1];
        if (isGameValid(line)) {
            sum += parseInt(gameNumber);
        }
    }

    console.log(sum);
})();
