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

                let factor = 0;
                let inBound = true;

                do {
                    const newAntinodex = {x: p1.x - factor * dx, y: p1.y - factor * dy};
                    if (isInBounds(newAntinodex)) {
                        antinodes.add(keyAntinodes(newAntinodex));
                        factor++;
                    } else {
                        inBound = false;
                    }
                } while (inBound);

                factor = 0;
                inBound = true;

                do {
                    const newAntinodex = {x: p2.x + factor * dx, y: p2.y + factor * dy};
                    if (isInBounds(newAntinodex)) {
                        antinodes.add(keyAntinodes(newAntinodex));
                        factor++;
                    } else {
                        inBound = false;
                    }
                } while (inBound);
            }
        }
    });

    //console.log(antinodes);
    return antinodes.size;
};

export default main;
