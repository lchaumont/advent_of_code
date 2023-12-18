import fs from "fs";
import path from "path";

const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .replaceAll("(", "")
        .replaceAll(")", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    function getDirection(digit) {
        if (digit === 0) {
            return "R";
        } else if (digit === 1) {
            return "D";
        } else if (digit === 2) {
            return "L";
        }

        return "U";
    }

    function fromHex(hex) {
        return parseInt(hex, 16);
    }

    const data = input.map((line) => {
        let [ig, ig2, color] = line.split(" ");

        color = color.replaceAll("#", "");
        const direction = getDirection(parseInt(color[5]));
        const distance = fromHex(color.slice(0, 5));

        return {
            direction,
            distance,
        };
    });

    console.log(data);

    const corners = [];
    const pos = {x: 0, y: 0};
    let previousDirection = "U";

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    let pathLength = 0;
    function applyInstruction(instruction) {
        const delta = {x: 0, y: 0};

        let symbol = undefined;
        if (instruction.direction === "R") {
            delta.x = instruction.distance;
            if (previousDirection === "U") symbol = "┏";
            else if (previousDirection === "D") symbol = "┗";
            else if (previousDirection === "L") symbol = "━";
        } else if (instruction.direction === "L") {
            delta.x = -instruction.distance;
            if (previousDirection === "U") symbol = "┓";
            else if (previousDirection === "D") symbol = "┛";
            else if (previousDirection === "R") symbol = "━";
        } else if (instruction.direction === "U") {
            delta.y = -instruction.distance;
            if (previousDirection === "R") symbol = "┛";
            else if (previousDirection === "L") symbol = "┗";
            else if (previousDirection === "D") symbol = "┃";
        } else if (instruction.direction === "D") {
            delta.y = +instruction.distance;
            if (previousDirection === "R") symbol = "┓";
            else if (previousDirection === "L") symbol = "┏";
            else if (previousDirection === "U") symbol = "┃";
        }

        if (delta.x !== 0) {
            corners.push({x: pos.x, y: pos.y, symbol});
            pos.x += delta.x;
            previousDirection = instruction.direction;
        }

        if (delta.y !== 0) {
            corners.push({x: pos.x, y: pos.y, symbol});
            pos.y += delta.y;
            previousDirection = instruction.direction;
        }

        if (pos.x < minX) {
            minX = pos.x;
        }

        if (pos.x > maxX) {
            maxX = pos.x;
        }

        if (pos.y < minY) {
            minY = pos.y;
        }

        if (pos.y > maxY) {
            maxY = pos.y;
        }

        pathLength += Math.abs(delta.x) + Math.abs(delta.y);
    }

    for (const instruction of data) {
        applyInstruction(instruction);
    }

    console.log(corners)
    console.log(pathLength);
    console.log(minX, minY, maxX, maxY);
};

export default main;
