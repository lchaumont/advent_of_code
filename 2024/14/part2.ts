import fs from "fs";

const main = (input: string) => {
    const robots: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
    }> = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line) => {
            const [pos, vel] = line.split(" ");
            const [x, y] = pos
                .substring(2)
                .split(",")
                .map((n) => parseInt(n));
            const [vx, vy] = vel
                .substring(2)
                .split(",")
                .map((n) => parseInt(n));
            return {x, y, vx, vy};
        });

    const exportGrid = (robots: Array<{x: number; y: number}>): string => {
        const gridWidth = 101;
        const gridHeight = 103;

        const grid = Array.from({length: gridHeight}, () => Array.from({length: gridWidth}, () => "."));

        robots.forEach((r) => {
            grid[r.y][r.x] = "#";
        });

        return grid.map((row) => row.join("")).join("\n");
    };

    const gridWidth = 101;
    const gridHeight = 103;

    const neighbors = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];

    let maxCount = 0;

    for (let i = 0; i < 20000; i++) {
        robots.forEach((r) => {
            r.x = (r.x + r.vx) % gridWidth;
            r.y = (r.y + r.vy) % gridHeight;

            if (r.x < 0) r.x += gridWidth;
            if (r.y < 0) r.y += gridHeight;
        });

        let count = 0;

        for (let j = 0; j < robots.length; j++) {
            const r = robots[j];
            neighbors.forEach(([dx, dy]) => {
                if (robots.some((r2) => r2.x === r.x + dx && r2.y === r.y + dy)) {
                    count++;
                }
            });

            if (count > 280) {
                fs.writeFileSync("2024/14/output.txt", exportGrid(robots));
                return i + 1;
            }
        }
    }
};

export default main;
