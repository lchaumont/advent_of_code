import _ from "lodash";

const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    function getMapKey(x, y) {
        return `${x}-${y}`;
    }

    let data = input.map((line, rowIndex) => {
        return line.split("").map((char, columnIndex) => {
            return {
                x: columnIndex,
                y: rowIndex,
                value: char,
            };
        }).filter((pos) => pos.value !== "#");
    });

    data = data.flat();
    const start = data[0]
    const end = data[data.length - 1];

    const map = new Map();
    //const alreadySeen = new Set();

    data.forEach((pos) => {
        map.set(getMapKey(pos.x, pos.y), pos.value);
    });

    function getOppositeDirection(direction) {
        if (direction === "left") return "right";
        if (direction === "right") return "left";
        if (direction === "top") return "bottom";
        if (direction === "bottom") return "top";
    }

    function getPossibleStep(pos) {
        const { x, y, direction } = pos;
        const from = getOppositeDirection(direction);

        return [{ x: x - 1, y, direction: "left" }, { x: x + 1, y, direction: "right" }, { x, y: y - 1, direction: "top" }, { x, y: y + 1, direction: "bottom" }].filter((pos) => {
            const key = getMapKey(pos.x, pos.y);
            const next = map.get(key);

            if (!next) {
                return false;
            }

            if (pos.direction === from) return false;
            else if (pos.direction === "left" && next === ">") return false;
            else if (pos.direction === "top" && next === "v") return false;

            return true;
        });
    }

    const queue = [{ ...start, direction: "bottom", length: 0 }];
    const possiblePathLength = [];

    let safeLoop = 0;
    const safeLoopMax = 5000000;

    while (queue.length > 0 && safeLoop < safeLoopMax) {
        const current = queue.shift();
        const possibleSteps = getPossibleStep(current);

        //console.log(current, possibleSteps);

        FOR_STEP : for (const step of possibleSteps) {
            if (step.x === end.x && step.y === end.y) {
                possiblePathLength.push(current.length + 1);
                break FOR_STEP;
            }

            queue.push({ ...step, length: current.length + 1 });
        }

        safeLoop++;
    }

    if (safeLoop >= safeLoopMax) throw new Error("Infinite loop");

    console.log(possiblePathLength);
    console.log(Math.max(...possiblePathLength));
};

export default main;
