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

    const corners = [];
    const pos = {x: 0, y: 0};

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    let pathLength = 0;
    function applyInstruction(instruction) {
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

        if (delta.x !== 0) {
            corners.push({x: pos.x, y: pos.y});
            pos.x += delta.x;
        }

        if (delta.y !== 0) {
            corners.push({x: pos.x, y: pos.y});
            pos.y += delta.y;
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

    let area = 0;

    for (let i = 0; i< corners.length; i++) {
        const corner = corners[i];
        const nextCorner = corners[i + 1] ? corners[i + 1] : corners[0];
        area = area + (corner.x * nextCorner.y) - (corner.y * nextCorner.x);
    }

    const finalArea = area / 2;
    console.log(finalArea + pathLength / 2 + 1);
};

export default main;
