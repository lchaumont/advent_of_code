import fs from "fs";

const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .replaceAll("(", "")
        .replaceAll(")", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    const data = input.map((line) => {
        const [direction, distance, color] = line.split(" ");
        return {
            direction,
            distance: parseInt(distance),
            color,
        };
    });

    const path = [];
    const pos = {x: 0, y: 0};
    let previousDirection = "U";
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
            let symbol = undefined;
            if (
                (previousDirection === "R" && instruction.direction === "U") ||
                (previousDirection === "D" && instruction.direction === "L")
            ) {
                symbol = "┛";
            } else if (
                (previousDirection === "R" && instruction.direction === "D") ||
                (previousDirection === "U" && instruction.direction === "L")
            ) {
                symbol = "┓";
            } else if (
                (previousDirection === "L" && instruction.direction === "U") ||
                (previousDirection === "D" && instruction.direction === "R")
            ) {
                symbol = "┗";
            } else if (
                (previousDirection === "L" && instruction.direction === "D") ||
                (previousDirection === "U" && instruction.direction === "R")
            ) {
                symbol = "┏";
            } else if (
                (previousDirection === "R" && instruction.direction === "R") ||
                (previousDirection === "L" && instruction.direction === "L")
            ) {
                symbol = "━";
            } else if (
                (previousDirection === "U" && instruction.direction === "U") ||
                (previousDirection === "D" && instruction.direction === "D")
            ) {
                symbol = "┃";
            }

            path.push({x: pos.x, y: pos.y, symbol});
            pos.x += Math.sign(delta.x);
            previousDirection = instruction.direction;
        }

        for (let y = 0; y < Math.abs(delta.y); y++) {
            let symbol = undefined;
            if (
                (previousDirection === "R" && instruction.direction === "U") ||
                (previousDirection === "D" && instruction.direction === "L")
            ) {
                symbol = "┛";
            } else if (
                (previousDirection === "R" && instruction.direction === "D") ||
                (previousDirection === "U" && instruction.direction === "L")
            ) {
                symbol = "┓";
            } else if (
                (previousDirection === "L" && instruction.direction === "U") ||
                (previousDirection === "D" && instruction.direction === "R")
            ) {
                symbol = "┗";
            } else if (
                (previousDirection === "L" && instruction.direction === "D") ||
                (previousDirection === "U" && instruction.direction === "R")
            ) {
                symbol = "┏";
            } else if (
                (previousDirection === "R" && instruction.direction === "R") ||
                (previousDirection === "L" && instruction.direction === "L")
            ) {
                symbol = "━";
            } else if (
                (previousDirection === "U" && instruction.direction === "U") ||
                (previousDirection === "D" && instruction.direction === "D")
            ) {
                symbol = "┃";
            }

            path.push({x: pos.x, y: pos.y, symbol});
            pos.y += Math.sign(delta.y);
            previousDirection = instruction.direction;
        }
    }

    for (const instruction of data) {
        applyInstruction(pos, instruction);
    }

    const minX = Math.min(...path.map((corner) => corner.x));
    const minY = Math.min(...path.map((corner) => corner.y));
    const maxX = Math.max(...path.map((corner) => corner.x));
    const maxY = Math.max(...path.map((corner) => corner.y));

    function logPath(path) {
        let log = "";
        for (let y = minY; y <= maxY; y++) {
            let line = "";
            for (let x = minX; x <= maxX; x++) {
                const node = path.find((node) => node.x === x && node.y === y);
                if (node !== undefined) {
                    line += node.symbol;
                } else {
                    line += ".";
                }
            }
            log += line + "\n";
        }

        return log;
    }
    
    path.find((node) => node.x === 0 && node.y === 0).symbol = "O"

    fs.writeFile("./18/output_test.txt", logPath(path), (err) => {
        if (err) {
            console.error(err);
        }
    });

    let counter = 0;
    for (let y = minY; y <= maxY; y++) {
        const corners = path.filter((node) => node.y === y).sort((a, b) => a.x - b.x)
            .filter((node) => !(node.symbol === "━" || node.symbol === "┛" || node.symbol === "┗"));

        if (corners.length % 2 === 1) {
            console.error("WTF")
        } else {
            for (let i = 0; i < corners.length; i += 2) {
                const startX = corners[i].x;
                const endX = corners[i + 1].x;

                for (let x = startX; x <= endX; x++) {
                    if (!path.find((node) => node.x === x && node.y === y)) {
                        counter++;
                    }
                }
            }
        }
    }

    counter += path.length;
    console.log(counter);
};

export default main;
