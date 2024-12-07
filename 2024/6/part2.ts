enum Direction {
    NORTH = "NORTH",
    SOUTH = "SOUTH",
    WEST = "WEST",
    EAST = "EAST",
}

type Position = {
    x: number;
    y: number;
};

const moves = {
    [Direction.NORTH]: {dx: 0, dy: -1, next: Direction.EAST},
    [Direction.SOUTH]: {dx: 0, dy: 1, next: Direction.WEST},
    [Direction.WEST]: {dx: -1, dy: 0, next: Direction.NORTH},
    [Direction.EAST]: {dx: 1, dy: 0, next: Direction.SOUTH},
};

const main = (input: string) => {
    const grid: string[][] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line: string) => line.split(""));

    // Search the '^'
    const guardPosition: Position = {x: -1, y: -1};

    OUTER: for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === "^") {
                guardPosition.x = j;
                guardPosition.y = i;
                break OUTER;
            }
        }
    }

    // All possible positions for new obstacle
    const possibleObstacles: Position[] = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === ".") {
                possibleObstacles.push({x: j, y: i});
            }
        }
    }

    const seenKey = (position: Position, direction: Direction) => `${position.x},${position.y},${direction}`;

    const run = (grid: string[][]): boolean => {
        let currentPosition: Position = {x: guardPosition.x, y: guardPosition.y};
        let currentDirection: Direction = Direction.NORTH;
        let seen: Set<String> = new Set();
        seen.add(seenKey(currentPosition, currentDirection));

        while (true) {
            const move: {dx: number; dy: number; next: Direction} = moves[currentDirection];
            const {x: nextX, y: nextY} = {x: currentPosition.x + move.dx, y: currentPosition.y + move.dy};

            if (
                nextX < 0 ||
                nextX >= grid[0].length ||
                nextY < 0 ||
                nextY >= grid.length
            ) {
                return false;
            }

            if (grid[nextY][nextX] === "#") {
                currentDirection = move.next;
                continue;
            }

            const key = seenKey({x: nextX, y: nextY}, currentDirection);
            if (seen.has(key)) {
                return true;
            }

            seen.add(key);

            currentPosition = {x: nextX, y: nextY};
        }
    };

    const validObstacles = Array<Position>();

    for (const obstacle of possibleObstacles) {
        grid[obstacle.y][obstacle.x] = "#";
        const r = run(grid);

        if (r) {
            console.log("Obstacle at", obstacle);
            validObstacles.push(obstacle);
        }

        grid[obstacle.y][obstacle.x] = ".";
    }

    return validObstacles.length;
};

export default main;
