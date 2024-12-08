type Position = {
    x: number;
    y: number;
};

const main = (input: string) => {
    const grid: string[][] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line: string) => line.split(""));

    const antennas = new Map<string, Array<Position>>();

    grid.forEach((row: string[], y: number) => {
        row.forEach((cell: string, x: number) => {
            if (cell !== ".") {
                if (!antennas.has(cell)) {
                    antennas.set(cell, []);
                }

                antennas.get(cell)!.push({x, y});
            }
        });
    });

    const gridWidth = grid[0].length;
    const gridHeight = grid.length;

    const isInBounds = (pos: Position) => pos.x >= 0 && pos.x < gridWidth && pos.y >= 0 && pos.y < gridHeight;

    //console.log(antennas);

    const antinodes = new Set<string>();
    const keyAntinodes = (pos: Position) => `${pos.x},${pos.y}`;

    antennas.forEach((positions: Array<Position>, key: string) => {
        for (let i = 0; i < positions.length; i++) {
            for (let j = i + 1; j < positions.length; j++) {
                const p1 = positions[i];
                const p2 = positions[j];

                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;

                const newAntinodex1 = {x: p1.x - dx, y: p1.y - dy};
                if (isInBounds(newAntinodex1)) antinodes.add(keyAntinodes(newAntinodex1));

                const newAntinodex2 = {x: p2.x + dx, y: p2.y + dy};
                if (isInBounds(newAntinodex2)) antinodes.add(keyAntinodes(newAntinodex2));
            }
        }
    });

    //console.log(antinodes);
    return antinodes.size;
};

export default main;
