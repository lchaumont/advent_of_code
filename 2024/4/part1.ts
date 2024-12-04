const main = (input: string) => {
    const lines: string[][] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line: string) => line.split(""));

    let result = 0;

    const getPositionsToCheck = (x: number, y: number): Array<Array<{x: number; y: number}>> => {
        return [
            [
                {x: x - 3, y: y - 3},
                {x: x - 2, y: y - 2},
                {x: x - 1, y: y - 1},
            ],
            [
                {x, y: y - 3},
                {x, y: y - 2},
                {x, y: y - 1},
            ],
            [
                {x: x + 3, y: y - 3},
                {x: x + 2, y: y - 2},
                {x: x + 1, y: y - 1},
            ],
            [
                {x: x - 3, y},
                {x: x - 2, y},
                {x: x - 1, y},
            ],
            [
                {x: x + 3, y},
                {x: x + 2, y},
                {x: x + 1, y},
            ],
            [
                {x: x - 3, y: y + 3},
                {x: x - 2, y: y + 2},
                {x: x - 1, y: y + 1},
            ],
            [
                {x, y: y + 3},
                {x, y: y + 2},
                {x, y: y + 1},
            ],
            [
                {x: x + 3, y: y + 3},
                {x: x + 2, y: y + 2},
                {x: x + 1, y: y + 1},
            ],
        ];
    };

    for (let i = 0; i < lines.length; i++) {
        const row = lines[i];

        for (let j = 0; j < row.length; j++) {
            if (row[j] === "X") {
                const positionsToCheck = getPositionsToCheck(j, i);
                let count = 0;

                for (const positions of positionsToCheck) {
                    const cells = positions.map((pos) => {
                        const x = pos.x;
                        const y = pos.y;

                        if (y < 0 || y >= lines.length || x < 0 || x >= row.length) {
                            return ".";
                        }

                        return lines[y][x];
                    });

                    if (cells[0] === "S" && cells[1] === "A" && cells[2] === "M") {
                        count++;
                    }
                }
                result += count;
            }
        }
    }

    return result;
};

export default main;
