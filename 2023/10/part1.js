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
    const start = data.find((d) => d.tile === "S");
    const cycle = [start];

    // Cherche un premier tuyan de départ
    let from = "left";
    let firstTile = data.find((d) => {
        if (d.x === start.x - 1 && d.y === start.y) return d.tile === "-" || d.tile === "L" || d.tile === "F";
        if (d.x === start.x + 1 && d.y === start.y) return d.tile === "-" || d.tile === "J" || d.tile === "7";
        if (d.x === start.x && d.y === start.y - 1) return d.tile === "|" || d.tile === "7" || d.tile === "F";
        if (d.x === start.x && d.y === start.y + 1) return d.tile === "|" || d.tile === "J" || d.tile === "L";
    });
    cycle.push(firstTile);

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
            "F": ["bottom", "right"],
        };

        return mapping[tile];
    }

    function getNextTile(currentTile, from) {
        const nextDirection = getNextDirection(currentTile.tile);
        const direction = nextDirection.find((d) => d !== from);

        if (direction === "left") {
            return [data.find((d) => d.x === currentTile.x - 1 && d.y === currentTile.y), "right"];
        } else if (direction === "right") {
            return [data.find((d) => d.x === currentTile.x + 1 && d.y === currentTile.y), "left"];
        } else if (direction === "top") {
            return [data.find((d) => d.x === currentTile.x && d.y === currentTile.y - 1), "bottom"];
        } else if (direction === "bottom") {
            return [data.find((d) => d.x === currentTile.x && d.y === currentTile.y + 1), "top"];
        }
    }

    let currentTile = firstTile;
    let safeGuard = 0;
    while (currentTile.tile !== "S" && safeGuard < 100000) {
        const [nextTile, nextFrom] = getNextTile(currentTile, from);
        cycle.push(nextTile);
        currentTile = nextTile;
        from = nextFrom;
        safeGuard++;
    }

    if (safeGuard === 100000) {
        console.log("Safe guard");
        return;
    }

    cycle.pop();
    console.log(cycle.length);
    console.log(Math.floor(cycle.length / 2));
};

export default main;
