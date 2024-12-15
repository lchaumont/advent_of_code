const main = (input: string) => {
    const [g, i] = input.replaceAll("\r", "").split("\n\n");

    const grid = g.split("\n").map((row) => row.split(""));
    const instructions = i.split("\n").join("").split("");

    let initialPosition = null;

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === "@") {
                initialPosition = {x, y};
            }
        }
    }

    let position = initialPosition!;

    const moves: {[key: string]: {x: number; y: number}} = {
        "<": {x: -1, y: 0},
        ">": {x: 1, y: 0},
        "^": {x: 0, y: -1},
        v: {x: 0, y: 1},
    };

    const move = (from: {x: number; y: number}, moveToMake: {x: number; y: number}): boolean => {
        let canMove = true;

        const to = {x: from.x + moveToMake.x, y: from.y + moveToMake.y};

        if (grid[to.y][to.x] === "O") {
            canMove = move(to, moveToMake);
        } else if (grid[to.y][to.x] === "#") {
            canMove = false;
        }

        if (canMove) {
            const current = grid[from.y][from.x];
            grid[from.y][from.x] = ".";
            grid[to.y][to.x] = current;
        }

        return canMove;
    };

    const moveRobot = (moveToMake: {x: number; y: number}) => {
        const r = move(position, moveToMake);
        if (r) position = {x: position.x + moveToMake.x, y: position.y + moveToMake.y};
    };

    for (const instruction of instructions) {
        const m = moves[instruction];
        moveRobot(m);
    }

    //console.log(grid.map((row) => row.join("")).join("\n"));

    let result = 0;

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === "O") {
                result += y * 100 + x;
            }
        }
    }

    return result;
};

export default main;
