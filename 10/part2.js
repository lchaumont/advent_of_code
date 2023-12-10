import fs from "fs";

const main = (input) => {
    input = input.replaceAll("\r", "").split("\n");

    const data = [];
    for (let i = 0; i < input.length; i++) {
        const row = input[i].split("");
        for (let j = 0; j < row.length; j++) {
            data.push({
                tile: row[j],
                x: j,
                y: i,
            });
        }
    }

    // Chercher le point de départ "S"
    const start = data.find((d) => d.tile === "S")

    // Initialiser les propriétés "from" et "direction" du point de départ
    const isTopConnected = data.find((d) => d.x === start.x && d.y === start.y - 1 && (d.tile === "|" || d.tile === "7" || d.tile === "F"));
    const isBottomConnected = data.find((d) => d.x === start.x && d.y === start.y + 1 && (d.tile === "|" || d.tile === "L" || d.tile === "J"));
    const isLeftConnected = data.find((d) => d.x === start.x - 1 && d.y === start.y && (d.tile === "-" || d.tile === "F" || d.tile === "L"));
    const isRightConnected = data.find((d) => d.x === start.x + 1 && d.y === start.y && (d.tile === "-" || d.tile === "7" || d.tile === "J"));

    if (isTopConnected && isBottomConnected) {
        start.tile = "|";
        start.from = "top";
        start.direction = "bottom";
    } else if (isLeftConnected && isRightConnected) {
        start.tile = "-";
        start.from = "left";
        start.direction = "right";
    } else if (isTopConnected && isLeftConnected) {
        start.tile = "J";
        start.from = "top";
        start.direction = "left";
    } else if (isTopConnected && isRightConnected) {
        start.tile = "L";
        start.from = "top";
        start.direction = "right";
    } else if (isBottomConnected && isLeftConnected) {
        start.tile = "7";
        start.from = "bottom";
        start.direction = "left";
    } else if (isBottomConnected && isRightConnected) {
        start.tile = "F";
        start.from = "bottom";
        start.direction = "right";
    }

    const cycle = [start];

    function getOppositeDirection(direction) {
        if (direction === "left") return "right";
        else if (direction === "right") return "left";
        else if (direction === "top") return "bottom";
        else if (direction === "bottom") return "top";
    }

    function getNextDirection(tile) {
        /*
            | is a vertical pipe connecting north and south.
            - is a horizontal pipe connecting east and west.
            L is a 90-degree bend connecting north and east.
            J is a 90-degree bend connecting north and west.
            7 is a 90-degree bend connecting south and west.
            F is a 90-degree bend connecting south and east.
            . is ground; there is no pipe in this tile.
            S is the starting position of the animal; there is a pipe on this
        */
        const mapping = {
            "|": ["top", "bottom"],
            "-": ["left", "right"],
            "L": ["top", "right"],
            "J": ["top", "left"],
            "7": ["bottom", "left"],
            "F": ["bottom", "right"]
        };

        return mapping[tile];
    }

    function getNextTile(currentTile) {
        const from = currentTile.from;
        const nextDirection = getNextDirection(currentTile.tile);
        const direction = nextDirection.find((d) => d !== from);
        currentTile.direction = direction;

        if (direction === "left") {
            return {...data.find((d) => d.x === currentTile.x - 1 && d.y === currentTile.y), from : getOppositeDirection(direction)};
        } else if (direction === "right") {
            return {...data.find((d) => d.x === currentTile.x + 1 && d.y === currentTile.y), from : getOppositeDirection(direction)};
        } else if (direction === "top") {
            return {...data.find((d) => d.x === currentTile.x && d.y === currentTile.y - 1), from : getOppositeDirection(direction)};
        } else if (direction === "bottom") {
            return {...data.find((d) => d.x === currentTile.x && d.y === currentTile.y + 1), from : getOppositeDirection(direction)};
        }
    }

    let currentTile = start;
    let safeGuard = 0;
    do {
        const from = getOppositeDirection(currentTile.direction);
        const nextTile = getNextTile(currentTile);
        nextTile.direction = from;

        cycle.push(nextTile);
        currentTile = nextTile;
        safeGuard++;
    } while ((currentTile.x !== start.x || currentTile.y !== start.y) && safeGuard < 100000)

    if (safeGuard === 100000) {
        console.log("Safe guard");
        return;
    }

    cycle.pop(); // Remove the last element which is the start
    
    let count = 0;
    
    const minX = Math.min(...cycle.map((c) => c.x));
    const maxX = Math.max(...cycle.map((c) => c.x));
    const minY = Math.min(...cycle.map((c) => c.y));
    const maxY = Math.max(...cycle.map((c) => c.y));

    const intervalsX = [];
    for (let y = minY; y <= maxY; y++) {
        const partsOfPath = cycle.filter((c) => c.y === y).sort((a, b) => a.x - b.x);
        const intervals = [];

        let nextInterval = undefined;
        for (let i = 0; i < partsOfPath.length; i++) {
            const part = partsOfPath[i];

            if (part.tile !== "-" && part.tile !== "J" && part.tile !== "L") {
                if (nextInterval) {
                    nextInterval[1] = part.x;

                    intervals.push(nextInterval);
                    nextInterval = undefined;
                } else if (!nextInterval) {
                    nextInterval = [part.x];
                }
            }
        }

        intervalsX[y] = intervals;
    }

    for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
            const isNotInCycle = !cycle.find((c) => c.x === x && c.y === y);
            const isInIntervals = intervalsX[y].find((i) => i[0] < x && x < i[1]);

            if (isNotInCycle && isInIntervals) {
                count++;
            }
        }
    }

    console.log(count);
};

export default main;
