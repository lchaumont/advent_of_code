const main = (input: string) => {
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

    const getNextDirection = (dir: Direction): Direction => {
        switch (dir) {
            case Direction.NORTH:
                return Direction.EAST;
            case Direction.SOUTH:
                return Direction.WEST;
            case Direction.WEST:
                return Direction.NORTH;
            case Direction.EAST:
                return Direction.SOUTH;
        }
    };

    const move = (
        position: Position,
        direction: Direction,
        seen: Array<{pos: Position; dir: Direction}>
    ): {
        position: Position;
        direction: Direction;
        seen: Array<{pos: Position; dir: Direction}>;
        isOutOfBounds: boolean;
        isLoop: boolean;
    } => {
        let nextPosition: Position = {x: position.x, y: position.y};
        let nextDirection: Direction = getNextDirection(direction);

        if (direction === Direction.NORTH) {
            nextPosition.y--;
        } else if (direction === Direction.SOUTH) {
            nextPosition.y++;
        } else if (direction === Direction.WEST) {
            nextPosition.x--;
        } else if (direction === Direction.EAST) {
            nextPosition.x++;
        }

        if (
            nextPosition.y < 0 ||
            nextPosition.y >= grid.length ||
            nextPosition.x < 0 ||
            nextPosition.x >= grid[nextPosition.y].length
        ) {
            return {position: {...nextPosition}, direction, seen, isOutOfBounds: true, isLoop: false};
        } else if (seen.some((s) => s.pos.x === nextPosition.x && s.pos.y === nextPosition.y && s.dir === direction)) {
            return {position: {...nextPosition}, direction, seen, isOutOfBounds: false, isLoop: true};
        }

        if (grid[nextPosition.y][nextPosition.x] === "#") {
            if (seen.some((s) => s.pos.x === position.x && s.pos.y === position.y && s.dir === nextDirection)) {
                return {position, direction, seen, isOutOfBounds: false, isLoop: true};
            }

            direction = nextDirection;
            seen.push({pos: {...position}, dir: direction});
            return {position, direction, seen, isOutOfBounds: false, isLoop: false};
        } else {
            seen.push({pos: {...nextPosition}, dir: direction});
            return {position: {...nextPosition}, direction, seen, isOutOfBounds: false, isLoop: false};
        }
    };

    let result = 0;
    let obstacles: Array<{x: number; y: number}> = [];

    const run = (
        initialPosition: Position,
        initialDirection: Direction,
        initialSeen: Array<{pos: Position; dir: Direction}>,
        isMainRun: boolean
    ): {b: boolean; l: boolean} => {
        let seen = [...initialSeen];
        seen.push({pos: {...initialPosition}, dir: initialDirection});

        let currentPosition: Position = initialPosition;
        let currentDirection: Direction = initialDirection;

        let b = false;
        let l = false;

        while (true) {
            const {
                position,
                direction,
                seen: newSeen,
                isOutOfBounds,
                isLoop,
            } = move(currentPosition, currentDirection, seen);

            currentPosition = position;
            currentDirection = direction;
            seen = newSeen;

            if (isOutOfBounds) {
                b = true;
                break;
            } else if (isLoop) {
                l = true;
                break;
            } else if (isMainRun) {
                // if we are about to leave the bounds, we can't anymore put obtacle in front of us, so skip the sub run
                if (
                    (currentPosition.x === 0 && currentDirection === Direction.WEST) ||
                    (currentPosition.x === grid[0].length - 1 && currentDirection === Direction.EAST) ||
                    (currentPosition.y === 0 && currentDirection === Direction.NORTH) ||
                    (currentPosition.y === grid.length - 1 && currentDirection === Direction.SOUTH)
                ) {
                    continue;
                }

                // Check if we can put a obstacle here by checking if going 90 degrees right, we can reach loop
                const {b: subB, l: subL} = run(currentPosition, getNextDirection(currentDirection), seen, false);
                if (subL) {
                    // If the run stop by reaching a loop, we can put an obstacle here
                    result++;

                    if (currentDirection === Direction.NORTH) {
                        obstacles.push({x: currentPosition.x, y: currentPosition.y - 1});
                        console.log("NORTH", {x: currentPosition.x, y: currentPosition.y - 1});
                    } else if (currentDirection === Direction.SOUTH) {
                        obstacles.push({x: currentPosition.x, y: currentPosition.y + 1});
                        console.log("SOUTH", {x: currentPosition.x, y: currentPosition.y + 1});
                    } else if (currentDirection === Direction.WEST) {
                        obstacles.push({x: currentPosition.x - 1, y: currentPosition.y});
                        console.log("WEST", {x: currentPosition.x - 1, y: currentPosition.y});
                    } else if (currentDirection === Direction.EAST) {
                        obstacles.push({x: currentPosition.x + 1, y: currentPosition.y});
                        console.log("EAST", {x: currentPosition.x + 1, y: currentPosition.y});
                    }
                }
            }
        }

        return {b, l};
    };

    run({x, y}, Direction.NORTH, [], true);

    const distinctObstacles = obstacles.filter((o, i) => obstacles.findIndex((ob) => ob.x === o.x && ob.y === o.y) === i);

    return {result, dis: distinctObstacles.length};
};

export default main;
