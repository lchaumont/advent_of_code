const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    const moves = input[0];
    const map = input.slice(1).map((line) => {
        const [from, to] = line.split(" = ");
        const [left, right] = to.replaceAll("(", "").replaceAll(")", "").split(", ");
        return {
            from,
            left,
            right
        };
    });

    let currentPositions = map.filter((item) => item.from[2] === "A");
    let remainingMoves = [...moves];

    for (let i = 0; i < currentPositions.length; i++) {
        let currentPosition = currentPositions[i];
        remainingMoves = [...moves];
        let safeGuard = 0;
        let alreadyVisited = [];
        let cycle = [];
        let cycleC = [];

        let beginningOfCycle = undefined;
        let checkFullCycle = false;
        let numberOfTimeCycleHaveBeenFound = 0;
        let cycleFound = false;

        const initial = currentPosition.from;

        do {
            safeGuard++;
            const nextMove = remainingMoves.shift();

            if (nextMove === "L") {
                currentPosition = map.find((item) => item.from === currentPosition.left);
            } else if (nextMove === "R") {
                currentPosition = map.find((item) => item.from === currentPosition.right);
            }

            if (!checkFullCycle && currentPosition.from[2] === "Z") {
                alreadyVisited.push(currentPosition.from);
                checkFullCycle = true;
                beginningOfCycle = currentPosition.from;
            } else if (checkFullCycle && currentPosition.from !== beginningOfCycle) {
                alreadyVisited.push(currentPosition.from);
            } else if (checkFullCycle && currentPosition.from === beginningOfCycle) {
                cycleFound = true;
                console.log("Cycle found");

                currentPosition.cycle = [...alreadyVisited];
                currentPosition.cycleLength = alreadyVisited.length;
                currentPosition.offset = safeGuard - alreadyVisited.length;
                currentPosition.initial = initial;
            }

            if (remainingMoves.length === 0) {
                remainingMoves = [...moves];
            }

            if (safeGuard % 100000 === 0) {
                console.log(safeGuard);
            }
        } while (!cycleFound && safeGuard < 1000000);

        if (safeGuard === 1000000) {
            console.log("Failed");
            console.log(alreadyVisited);
        } else {
            currentPositions[i] = currentPosition;
        }
    }

    console.log(currentPositions);
};

export default main;
