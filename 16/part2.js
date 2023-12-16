const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    const data = input
        .map((line, y) => {
            return line.split("").map((char, x) => {
                return {
                    symbol: char,
                    x,
                    y,
                    energized: false,
                };
            });
        })
        .flat();

    function getKey(pos, direction) {
        return `${pos.symbol}-${pos.x}-${pos.y}-${direction}`;
    }

    function getNextTile(currentPos, direction) {
        const nextX =
            currentPos.x + (direction === "north" || direction === "south" ? 0 : direction === "east" ? 1 : -1);
        const nextY =
            currentPos.y + (direction === "east" || direction === "west" ? 0 : direction === "south" ? 1 : -1);

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
                    remainingBeamsToHandle.push({pos: nextTile, direction});
                } else {
                    remainingBeamsToHandle.push({pos: nextTile, direction: "north"});
                    remainingBeamsToHandle.push({pos: nextTile, direction: "south"});
                }
            }

            if (nextTile.symbol === "-") {
                if (direction === "east" || direction === "west") {
                    remainingBeamsToHandle.push({pos: nextTile, direction});
                } else {
                    remainingBeamsToHandle.push({pos: nextTile, direction: "east"});
                    remainingBeamsToHandle.push({pos: nextTile, direction: "west"});
                }
            }

            if (nextTile.symbol === "/") {
                if (direction === "north") {
                    remainingBeamsToHandle.push({pos: nextTile, direction: "east"});
                } else if (direction === "east") {
                    remainingBeamsToHandle.push({pos: nextTile, direction: "north"});
                } else if (direction === "south") {
                    remainingBeamsToHandle.push({pos: nextTile, direction: "west"});
                } else if (direction === "west") {
                    remainingBeamsToHandle.push({pos: nextTile, direction: "south"});
                }
            }

            if (nextTile.symbol === "\\") {
                if (direction === "north") {
                    remainingBeamsToHandle.push({pos: nextTile, direction: "west"});
                } else if (direction === "east") {
                    remainingBeamsToHandle.push({pos: nextTile, direction: "south"});
                } else if (direction === "south") {
                    remainingBeamsToHandle.push({pos: nextTile, direction: "east"});
                } else if (direction === "west") {
                    remainingBeamsToHandle.push({pos: nextTile, direction: "north"});
                }
            }
        }

        beamDirectionAlreadySeen.add(key);
    }
    
    const beamDirectionAlreadySeen = new Set();
    let remainingBeamsToHandle = [];

    const totalEnergizedArray = [];
    const rowLength = data[data.length - 1].y + 1;
    const columnLength = data[data.length - 1].x + 1;
    const potentialStarts = data.filter(
        (pos) => pos.x === 0 || pos.x === columnLength - 1 || pos.y === 0 || pos.y === rowLength - 1
    );

    for (const potentialStart of potentialStarts) {
        remainingBeamsToHandle.push({pos: potentialStart, direction: potentialStart.x === 0 ? "east" : potentialStart.x === columnLength - 1 ? "west" : potentialStart.y === 0 ? "south" : "north"});

        let safeLoop = 0;
        while (remainingBeamsToHandle.length > 0 && safeLoop < 100000) {
            const {pos, direction} = remainingBeamsToHandle.shift();
            handleBeam(pos, direction);
            safeLoop++;
        }

        if (safeLoop >= 100000) {
            console.log("safeLoop exceeded");
        }

        //console.log(data);
        //console.log(beamDirectionAlreadySeen)

        const totalEnergized = data.filter((pos) => pos.energized).length;
        totalEnergizedArray.push(totalEnergized);

        data.forEach((pos) => (pos.energized = false));
        beamDirectionAlreadySeen.clear();
        remainingBeamsToHandle = [];
    }

    console.log(totalEnergizedArray);
    console.log(Math.max(...totalEnergizedArray));
};

export default main;
