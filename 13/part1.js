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

        console.log(mirror);

        if (mirror.type === "horizontal") {
            sum += (mirror.index + 1) * 100;
        } else if (mirror.type === "vertical") {
            sum += (mirror.index + 1)
        }
    }

    console.log(sum);
};

export default main;
