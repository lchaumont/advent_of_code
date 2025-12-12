import {countOccurrences} from "../../lib/string-utils";

type Piece = {
    shape: string[];
    numberOfTileTaken: number;
};

type Puzzle = {
    width: number;
    height: number;
    shapes: number[];
};

const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split(/\n\n/)
        .filter((line: string) => line.trim() !== "");

    const pieces = lines.slice(0, lines.length - 1).reduce((acc, p) => {
        const s = p.split("\n");
        const index = parseInt(s[0].charAt(0));
        const shape = s.slice(1);
        const numberOfTileTaken = shape.flat().reduce((acc, cur) => acc + countOccurrences(cur, "#"), 0);
        acc.set(index, {
            shape,
            numberOfTileTaken,
        });

        return acc;
    }, new Map<number, Piece>());

    const puzzles: Puzzle[] = lines[lines.length - 1].split("\n").map((p) => {
        const [size, shapes] = p.split(": ");
        const [width, height] = size.split("x");

        return {
            width: parseInt(width),
            height: parseInt(height),
            shapes: shapes.split(" ").map((v) => parseInt(v)),
        };
    });

    // console.log(pieces);
    // console.log(puzzles);

    let answer = 0;

    for (const p of puzzles) {
        const sizeTakenByPieces = p.shapes.reduce((acc, cur, index) => {
            return acc + cur * pieces.get(index)!.numberOfTileTaken;
        }, 0);

        const sizeGrid = p.width * p.height;
        console.log(sizeGrid, sizeTakenByPieces);

        if (sizeGrid >= sizeTakenByPieces) {
            answer++;
        }
    }

    return answer;
};

export default main;
