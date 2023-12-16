const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    const data = input.map((line, y) => {
        return line.split("").map((char, x) => {
            return {
                symbol: char,
                x,
                y,
                energized: false
            };
        });
    }).flat();

    const beamDirectionAlreadySeen = new Set();
    const remainingBeamsToHandle = [];

    function getKey(pos, direction) {
        return `${pos.symbol}-${pos.x}-${pos.y}-${direction}`;
    }

    function getNextTile(currentPos, direction) {
        const nextX = currentPos.x + (direction === "north" || direction === "south" ? 0 : direction === "east" ? 1 : -1);
        const nextY = currentPos.y + (direction === "east" || direction === "west" ? 0 : direction === "south" ? 1 : -1);

        return data.find((pos) => pos.x === nextX && pos.y === nextY);
    }

    function handleBeam(startPos, direction) {
        const key = getKey(startPos, direction);
        if (beamDirectionAlreadySeen.has(key)) {
            return;
        }

        startPos.energized = true;
        
        let nextTile = getNextTile(startPos, direction);
        while (nextTile !== undefined && nextTile.symbol === ".") {
            nextTile.energized = true;
            nextTile = getNextTile(nextTile, direction);
        }

        if (nextTile !== undefined) {
            if (nextTile.symbol === "|") {
                if (direction === "north" || direction === "south") {
                    remainingBeamsToHandle.push({ pos: nextTile, direction });
                } else {
                    remainingBeamsToHandle.push({ pos: nextTile, direction: "north" });
                    remainingBeamsToHandle.push({ pos: nextTile, direction: "south" });
                }
            }

            if (nextTile.symbol === "-") {
                if (direction === "east" || direction === "west") {
                    remainingBeamsToHandle.push({ pos: nextTile, direction });
                } else {
                    remainingBeamsToHandle.push({ pos: nextTile, direction: "east" });
                    remainingBeamsToHandle.push({ pos: nextTile, direction: "west" });
                }
            }

            if (nextTile.symbol === "/") {
                if (direction === "north") {
                    remainingBeamsToHandle.push({ pos: nextTile, direction: "east" });
                } else if (direction === "east") {
                    remainingBeamsToHandle.push({ pos: nextTile, direction: "north" });
                } else if (direction === "south") {
                    remainingBeamsToHandle.push({ pos: nextTile, direction: "west" });
                } else if (direction === "west") {
                    remainingBeamsToHandle.push({ pos: nextTile, direction: "south" });
                }
            }

            if (nextTile.symbol === "\\") {
                if (direction === "north") {
                    remainingBeamsToHandle.push({ pos: nextTile, direction: "west" });
                } else if (direction === "east") {
                    remainingBeamsToHandle.push({ pos: nextTile, direction: "south" });
                } else if (direction === "south") {
                    remainingBeamsToHandle.push({ pos: nextTile, direction: "east" });
                } else if (direction === "west") {
                    remainingBeamsToHandle.push({ pos: nextTile, direction: "north" });
                }
            }
        }

        beamDirectionAlreadySeen.add(key);
    }

    remainingBeamsToHandle.push({ pos: data.find((pos) => pos.x === 0 && pos.y === 0), direction: "south" });

    let safeLoop = 0;
    while (remainingBeamsToHandle.length > 0 && safeLoop < 100000) {
        const { pos, direction } = remainingBeamsToHandle.shift();
        handleBeam(pos, direction);
        safeLoop++;
    }

    console.log(data)
    //console.log(beamDirectionAlreadySeen)

    const totalEnergized = data.filter((pos) => pos.energized).length;
    console.log(totalEnergized);
};

export default main;
