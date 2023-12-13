import _ from "lodash";

const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .split("\n\n")
        .filter((line) => line.trim() !== "")
        .map((line) => line.split("\n"));

    const inputAsColumns = input.map((grid) => {
        const columns = [];
        for (let index = 0; index < grid[0].length; index++) {
            columns.push(grid.map((line) => line[index]).join(""));
        }
        return columns;
    });

    let sum = 0;
    for (let index = 0; index < input.length; index++) {
        const grid = input[index];
        const columns = inputAsColumns[index];

        let mirror = undefined;

        const potentialHorizontalMirrorIndex = [];
        grid.forEach((line, i) => {
            if (grid[i + 1] !== undefined && line.split("").every((char, j) => char === grid[i + 1][j])) potentialHorizontalMirrorIndex.push(i);
        });

        if (potentialHorizontalMirrorIndex !== undefined && potentialHorizontalMirrorIndex.length > 0) {
            OUTER : for (let i = 0; i < potentialHorizontalMirrorIndex.length; i++) {
                const lineIndex = potentialHorizontalMirrorIndex[i];

                for (let j = lineIndex; lineIndex + (lineIndex - j) + 1 < grid.length && j >= 0; j--) {
                    const l1 = grid[j];
                    const l2 = grid[lineIndex + (lineIndex - j) + 1];
                    if (l1 !== l2) continue OUTER;
                }

                if (mirror !== undefined) {
                    console.log("Multiple mirrors");
                }

                mirror = {
                    type: "horizontal",
                    index: lineIndex,
                };
            }
        }

        const potentialVerticalMirrorIndex = [];
        columns.forEach((line, i) => {
            if (columns[i + 1] !== undefined && line.split("").every((char, j) => char === columns[i + 1][j])) potentialVerticalMirrorIndex.push(i);
        });

        if (potentialVerticalMirrorIndex !== undefined && potentialVerticalMirrorIndex.length > 0) {
            OUTER : for (let i = 0; i < potentialVerticalMirrorIndex.length; i++) {
                const lineIndex = potentialVerticalMirrorIndex[i];
                
                for (let j = lineIndex; lineIndex + (lineIndex - j) + 1 < columns.length && j >= 0; j--) {
                    const l1 = columns[j];
                    const l2 = columns[lineIndex + (lineIndex - j) + 1];
                    if (l1 !== l2) continue OUTER;
                }

                if (mirror !== undefined) {
                    console.log("Multiple mirrors");
                }

                mirror = {
                    type: "vertical",
                    index: lineIndex,
                };
            }
        }

        if (mirror === undefined) {
            console.log("/////////////")
            console.log("No mirror");
            console.log(grid);
            console.log(columns);
            console.log("/////////////")
        }

        const part2PotentialHorizontalMirrorIndex = [];
        grid.forEach((line, i) => {
            if (mirror.type === "horizontal" && i === mirror.index) return;
            if (grid[i + 1] !== undefined && line.split("").every((char, j) => char === grid[i + 1][j])) part2PotentialHorizontalMirrorIndex.push(i);
            else if (grid[i + 1] !== undefined) {
                let numberOfDifferences = 0;
                for (let index = 0; index < line.length && index < grid[i + 1].length; index++) {
                    if (line[index] !== grid[i + 1][index]) numberOfDifferences++;
                }

                if (numberOfDifferences === 1) part2PotentialHorizontalMirrorIndex.push(i);
            }
        });

        const part2PotentialVerticalMirrorIndex = [];
        columns.forEach((line, i) => {
            if (mirror.type === "vertical" && i === mirror.index) return;
            if (columns[i + 1] !== undefined && line.split("").every((char, j) => char === columns[i + 1][j])) part2PotentialVerticalMirrorIndex.push(i);
            else if (columns[i + 1] !== undefined) {
                let numberOfDifferences = 0;
                for (let index = 0; index < line.length && index < columns[i + 1].length; index++) {
                    if (line[index] !== columns[i + 1][index]) numberOfDifferences++;
                }

                if (numberOfDifferences === 1) part2PotentialVerticalMirrorIndex.push(i);
            }
        });

        let part2Mirror = undefined;

        if (part2PotentialHorizontalMirrorIndex !== undefined && part2PotentialHorizontalMirrorIndex.length > 0) {
            OUTER : for (let i = 0; i < part2PotentialHorizontalMirrorIndex.length; i++) {
                const lineIndex = part2PotentialHorizontalMirrorIndex[i];

                for (let j = lineIndex; lineIndex + (lineIndex - j) + 1 < grid.length && j >= 0; j--) {
                    const l1 = grid[j];
                    const l2 = grid[lineIndex + (lineIndex - j) + 1];

                    let numberOfDifferences = 0;
                    for (let index = 0; index < l1.length && index < l2.length; index++) {
                        if (l1[index] !== l2[index]) numberOfDifferences++;
                    }

                    if (numberOfDifferences > 1) continue OUTER;
                }

                if (part2Mirror !== undefined) {
                    console.log("Multiple mirrors");
                }

                part2Mirror = {
                    type: "horizontal",
                    index: lineIndex,
                };
            }
        }

        if (part2PotentialVerticalMirrorIndex !== undefined && part2PotentialVerticalMirrorIndex.length > 0) {
            OUTER : for (let i = 0; i < part2PotentialVerticalMirrorIndex.length; i++) {
                const lineIndex = part2PotentialVerticalMirrorIndex[i];

                for (let j = lineIndex; lineIndex + (lineIndex - j) + 1 < columns.length && j >= 0; j--) {
                    const l1 = columns[j];
                    const l2 = columns[lineIndex + (lineIndex - j) + 1];

                    let numberOfDifferences = 0;
                    for (let index = 0; index < l1.length && index < l2.length; index++) {
                        if (l1[index] !== l2[index]) numberOfDifferences++;
                    }

                    if (numberOfDifferences > 1) continue OUTER;
                }

                if (part2Mirror !== undefined) {
                    console.log("Multiple mirrors");
                }

                part2Mirror = {
                    type: "vertical",
                    index: lineIndex,
                };
            }
        }

        if (part2Mirror === undefined) {
            console.log("/////////////")
            console.log("No Part 2 mirror");
            console.log(grid);
            console.log(columns);
            console.log("/////////////")
        }

        if (part2Mirror.type === "horizontal") {
            sum += (part2Mirror.index + 1) * 100;
        } else if (part2Mirror.type === "vertical") {
            sum += (part2Mirror.index + 1)
        }
    }

    console.log(sum);
};

export default main;
