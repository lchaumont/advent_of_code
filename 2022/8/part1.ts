import fs from "fs";
import {transposeMatrix} from "../../lib/array-utils";

const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    type Tree = {
        size: number;
        x: number;
        y: number;
        isVisibleFromLeft: boolean;
        isVisibleFromRight: boolean;
        isVisibleFromTop: boolean;
        isVisibleFromBottom: boolean;
    };

    let data: Tree[][] = lines.map((line: string, rowIndex: number) => {
        return line.split("").map((char: string, colIndex: number) => {
            return {
                size: parseInt(char),
                x: colIndex,
                y: rowIndex,
                isVisibleFromLeft: true,
                isVisibleFromRight: true,
                isVisibleFromTop: true,
                isVisibleFromBottom: true,
            };
        });
    });

    for (let i = 0; i < data.length; i++) {
        const row = data[i];

        let currentMaxSize = -1;
        for (let j = 0; j < row.length; j++) {
            const cell = row[j];

            if (cell.size > currentMaxSize) {
                currentMaxSize = cell.size;
            } else {
                cell.isVisibleFromLeft = false;
            }
        }

        currentMaxSize = -1;
        for (let j = row.length - 1; j >= 0; j--) {
            const cell = row[j];

            if (cell.size > currentMaxSize) {
                currentMaxSize = cell.size;
            } else {
                cell.isVisibleFromRight = false;
            }
        }
    }

    data = transposeMatrix(data);

    for (let i = 0; i < data.length; i++) {
        const row = data[i];

        let currentMaxSize = -1;
        for (let j = 0; j < row.length; j++) {
            const cell = row[j];

            if (cell.size > currentMaxSize) {
                currentMaxSize = cell.size;
            } else {
                cell.isVisibleFromTop = false;
            }
        }

        currentMaxSize = -1;
        for (let j = row.length - 1; j >= 0; j--) {
            const cell = row[j];

            if (cell.size > currentMaxSize) {
                currentMaxSize = cell.size;
            } else {
                cell.isVisibleFromBottom = false;
            }
        }
    }

    data = transposeMatrix(data);
    
    const result = data.flat().filter((cell: Tree) => cell.isVisibleFromLeft || cell.isVisibleFromRight || cell.isVisibleFromTop || cell.isVisibleFromBottom).length;

    const log = data
        .map((row: Tree[]) => {
            return row
                .map((cell: Tree) => {
                    if (
                        cell.isVisibleFromLeft ||
                        cell.isVisibleFromRight ||
                        cell.isVisibleFromTop ||
                        cell.isVisibleFromBottom
                    ) {
                        return cell.size;
                    } else {
                        return ".";
                    }
                })
                .join("");
        })
        .join("\n");

    fs.writeFile(`2022/8/input_result.txt`, log, (err) => {
        if (err) {
            console.error(err);
        }
    });

    console.log(result);
};

export default main;
