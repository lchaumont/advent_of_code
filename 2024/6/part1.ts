const main = (input: string) => {

    enum Direction {
        NORTH,
        SOUTH,
        WEST,
        EAST
    };

    type Position = {
        x: number,
        y: number
    };

    const grid: string[][] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line: string) => line.split(""));

    // Search the '^'
    let x: number = 0;
    let y: number = 0;

    OUTER: for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === "^") {
                x = j;
                y = i;
                break OUTER;
            }
        }
    }

    // Move the '^'
    let direction: Direction = Direction.NORTH;
    const seen = new Set<string>();
    seen.add(`${x},${y}`);
    let currentPos: Position = { x, y };

    const move = (): boolean => {
        let nextPos: Position = { x: currentPos.x, y: currentPos.y };

        if (direction === Direction.NORTH) {
            nextPos.y--;
        } else if (direction === Direction.SOUTH) {
            nextPos.y++;
        } else if (direction === Direction.WEST) {
            nextPos.x--;
        } else if (direction === Direction.EAST) {
            nextPos.x++;
        }

        if (nextPos.y < 0 || nextPos.y >= grid.length || nextPos.x < 0 || nextPos.x >= grid[nextPos.y].length) {
            return false;
        }

        if (grid[nextPos.y][nextPos.x] === "#") {
            if (direction === Direction.NORTH) {
                direction = Direction.EAST;
            } else if (direction === Direction.SOUTH) {
                direction = Direction.WEST;
            } else if (direction === Direction.WEST) {
                direction = Direction.NORTH;
            } else if (direction === Direction.EAST) {
                direction = Direction.SOUTH;
            }
        } else {
            seen.add(`${nextPos.x},${nextPos.y}`);
            currentPos = nextPos;
        }

        return true;
    };

    let stamp = 0;
    while (move() && stamp < 1000000) {
        stamp++;
    }

    return seen.size;
};

export default main;