const main = (input: string) => {
    const [g, i] = input.replaceAll("\r", "").split("\n\n");

    const grid = g.split("\n").map((row) => {
        const r = row.split("");
        const nr = [];

        for (const c of r) {
            if (c === "#") {
                nr.push("#");
                nr.push("#");
            } else if (c === ".") {
                nr.push(".");
                nr.push(".");
            } else if (c === "O") {
                nr.push("[");
                nr.push("]");
            } else if (c === "@") {
                nr.push("@");
                nr.push(".");
            }
        }

        return nr;
    });
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

    const move = (from: {x: number; y: number}, moveToMake: {x: number; y: number}, applyMove: boolean): boolean => {
        let canMove = true;

        const to = {x: from.x + moveToMake.x, y: from.y + moveToMake.y};

        if (grid[to.y][to.x] === "#") {
            return false;
        }

        if (grid[to.y][to.x] === "[" && moveToMake.x !== -1) {
            const canRightMove = move({x: to.x + 1, y: to.y}, moveToMake, applyMove);
            const canLeftMove = move(to, moveToMake, applyMove);

            canMove = canLeftMove && canRightMove;
        } else if (grid[to.y][to.x] === "]" && moveToMake.x !== 1) {
            const canLeftMove = move({x: to.x - 1, y: to.y}, moveToMake, applyMove);
            const canRightMove = move(to, moveToMake, applyMove);

            canMove = canLeftMove && canRightMove;
        }

        if (canMove && applyMove) {
            const current = grid[from.y][from.x];
            grid[from.y][from.x] = ".";
            grid[to.y][to.x] = current;
        }

        return canMove;
    };

    const moveRobot = (moveToMake: {x: number; y: number}) => {
        const r = move(position, moveToMake, false);
        if (r) {
            move(position, moveToMake, true);
            position = {x: position.x + moveToMake.x, y: position.y + moveToMake.y}
        };
    };

    for (const instruction of instructions) {
        const m = moves[instruction];
        moveRobot(m);

        // console.log("----", instruction);
        // console.log(grid.map((row) => row.join("")).join("\n"));
    }

    let result = 0;

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === "[") {
                result += y * 100 + x;
            }
        }
    }

    return result;
};

export default main;
