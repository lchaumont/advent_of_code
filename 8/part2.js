import _ from "lodash";

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
            right,
        };
    });

    let currentPositions = map.filter((item) => item.from[2] === "A");
    let remainingMoves = [...moves];
    let steps = 0;
    let safeGuard = 0;

    while (!currentPositions.every((item) => item.from[2] === "Z") && safeGuard < 1000000000) {
        steps++;
        safeGuard++;
        const nextMove = remainingMoves.shift();
        
        for (let i = 0; i < currentPositions.length; i++) {
            let currentPosition = currentPositions[i];

            if (nextMove === "L") {
                currentPositions[i] = map.find((item) => item.from === currentPosition.left);
            }
    
            if (nextMove === "R") {
                currentPositions[i] = map.find((item) => item.from === currentPosition.right);
            }
        }

        if (remainingMoves.length === 0) {
            remainingMoves = [...moves];
        }

        if (safeGuard % 1000000 === 0) {
            console.log(safeGuard);
        }
    }

    console.log(currentPositions);
    console.log(steps);
};

export default main;
