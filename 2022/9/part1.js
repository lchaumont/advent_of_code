import _ from "lodash";

const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    const data = input.map((line) => {
        const [direction, number] = line.split(" ")
        return {direction, number: parseInt(number)}
    });

    let hPos = {x: 0, y: 0};
    let tPos = {x: 0, y: 0};
    let visited = [{x: 0, y: 0}];
    let previousHeadPosition = {x: 0, y: 0};

    function shouldTailMove() {
        const xDelta = Math.abs(hPos.x - tPos.x);
        const yDelta = Math.abs(hPos.y - tPos.y);

        return xDelta === 2 || yDelta === 2;
    }

    function moveHead(direction) {
        previousHeadPosition.x = hPos.x;
        previousHeadPosition.y = hPos.y;

        switch (direction) {
            case "U":
                hPos.y = hPos.y + 1;
                break;
            case "D":
                hPos.y = hPos.y - 1;
                break;
            case "L":
                hPos.x = hPos.x - 1;
                break;
            case "R":
                hPos.x = hPos.x + 1;
                break;
        }

        if (shouldTailMove()) {
            tPos.x = previousHeadPosition.x;
            tPos.y = previousHeadPosition.y;
            
            if (!visited.some((pos) => pos.x === tPos.x && pos.y === tPos.y)) {
                visited.push({...tPos});
            }
        }
    }

    for (const move of data) {
        const {direction, number} = move;

        for (let j = 0; j < number; j++) {
            moveHead(direction);
        }
    }

    console.log(positions);
    console.log(visited);
    console.log(visited.length);
};

export default main;
