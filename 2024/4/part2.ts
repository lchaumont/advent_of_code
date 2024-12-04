const main = (input: string) => {
    const lines: string[][] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line: string) => line.split(""));

    let result = 0;

    const getPositionsToCheck = (x: number, y: number): Array<{x: number; y: number}> => {
        return [
            {x: x - 1, y: y - 1},
            {x: x + 1, y: y - 1},
            {x: x - 1, y: y + 1},
            {x: x + 1, y: y + 1},
        ];
    };

    const distance = (a: {x: number; y: number}, b: {x: number; y: number}) => {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    };

    for (let i = 0; i < lines.length; i++) {
        const row = lines[i];

        for (let j = 0; j < row.length; j++) {
            if (row[j] === "A") {
                const positionsToCheck = getPositionsToCheck(j, i);

                const cells = positionsToCheck.map((pos) => {
                    const x = pos.x;
                    const y = pos.y;

                    if (y < 0 || y >= lines.length || x < 0 || x >= row.length) {
                        return {content: "", x, y};
                    }

                    return {content: lines[y][x], x, y};
                });

                const Ms = cells.filter((cell) => cell.content === "M");
                const Ss = cells.filter((cell) => cell.content === "S");

                if (Ms.length === 2 && Ss.length === 2 && distance(Ms[0], Ms[1]) === 2 && distance(Ss[0], Ss[1]) === 2) {
                    result++;
                }
            }
        }
    }

    return result;
};

export default main;
