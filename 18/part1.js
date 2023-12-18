import fs from "fs";

const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .replaceAll("(", "")
        .replaceAll(")", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    const data = input.map((line) => {
        const [directionn, distance, color] = line.split(" ");
        return {
            direction: directionn,
            distance: parseInt(distance),
            color: color,
        };
    });

    const path = [];
    const pos = {x: 0, y: 0};
    function applyInstruction(pos, instruction) {
        const delta = {x: 0, y: 0};

        if (instruction.direction === "R") {
            delta.x = instruction.distance;
        } else if (instruction.direction === "L") {
            delta.x = -instruction.distance;
        } else if (instruction.direction === "U") {
            delta.y = -instruction.distance;
        } else if (instruction.direction === "D") {
            delta.y = +instruction.distance;
        }

        for (let x = 0; x < Math.abs(delta.x); x++) {
            pos.x += Math.sign(delta.x);
            path.push({x: pos.x, y: pos.y});
        }

        for (let y = 0; y < Math.abs(delta.y); y++) {
            pos.y += Math.sign(delta.y);
            path.push({x: pos.x, y: pos.y});
        }
    }

    for (const instruction of data) {
        applyInstruction(pos, instruction);
    }

    console.log(path);

    const minX = Math.min(...path.map((corner) => corner.x));
    const minY = Math.min(...path.map((corner) => corner.y));
    const maxX = Math.max(...path.map((corner) => corner.x));
    const maxY = Math.max(...path.map((corner) => corner.y));

    function logPath(path) {
        let log = "";
        for (let y = minY; y <= maxY; y++) {
            let line = "";
            for (let x = minX; x <= maxX; x++) {
                if (path.find((node) => node.x === x && node.y === y)) {
                    line += "#";
                } else {
                    line += ".";
                }
            }
            log += line + "\n";
        }

        return log;
    };

    /*
    fs.writeFile("./18/output.txt", logPath(path), (err) => {
        if (err) {
            console.error(err);
        }
    });
    */

    let counter = 0;
    for (let y = 0; y <= maxY; y++) {
        const linePath = path
            .filter((node) => node.y === y)
            .sort((a, b) => a.x - b.x)
            .filter((node, index, array) => {
                const previous = array[index - 1];
                const next = array[index + 1];

                if (previous === undefined || next === undefined) return true;
                if (previous && previous.x === node.x - 1 && next && next.x === node.x + 1) {
                    return false;
                }

                return true;
            });

        const width = Math.abs(linePath[0].x - linePath[linePath.length - 1].x) + 1;
        counter += width;
    }

    console.log(counter);
};

export default main;
