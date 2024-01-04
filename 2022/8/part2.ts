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
        distanceFromLeft: number;
        distanceFromRight: number;
        distanceFromTop: number;
        distanceFromBottom: number;
    };

    let data: Tree[][] = lines.map((line: string, rowIndex: number) => {
        return line.split("").map((char: string, colIndex: number) => {
            return {
                size: parseInt(char),
                x: colIndex,
                y: rowIndex,
                distanceFromLeft: 0,
                distanceFromRight: 0,
                distanceFromTop: 0,
                distanceFromBottom: 0,
            };
        });
    });

    function findBlockingTreeMax(tree: Tree, seen: Map<number, number>) {
        return Math.max(...[...seen].filter(([key, value]) => key >= tree.size).map(([key, value]) => value));
    }

    function findBlockingTreeMin(tree: Tree, seen: Map<number, number>) {
        return Math.min(...[...seen].filter(([key, value]) => key >= tree.size).map(([key, value]) => value));
    }

    for (const row of data) {
        let seen = new Map<number, number>();

        for (let j = 0; j < row.length; j++) {
            const cell = row[j];

            let blockingTreeIndex = findBlockingTreeMax(cell, seen);
            if (blockingTreeIndex === Infinity || blockingTreeIndex === -Infinity) blockingTreeIndex = 0;
            cell.distanceFromLeft = j - blockingTreeIndex;

            if (seen.has(cell.size)) {
                seen.set(cell.size, Math.max(seen.get(cell.size)!, j));
            } else {
                seen.set(cell.size, j);
            }
        }

        seen = new Map<number, number>();

        for (let j = row.length - 1; j >= 0; j--) {
            const cell = row[j];

            let blockingTreeIndex = findBlockingTreeMin(cell, seen);
            if (blockingTreeIndex === Infinity || blockingTreeIndex === -Infinity) blockingTreeIndex = row.length - 1;
            cell.distanceFromRight = blockingTreeIndex - j;

            if (seen.has(cell.size)) {
                seen.set(cell.size, Math.min(seen.get(cell.size)!, j));
            } else {
                seen.set(cell.size, j);
            }
        }
    }

    data = transposeMatrix(data);

    for (const row of data) {
        let seen = new Map<number, number>();

        for (let j = 0; j < row.length; j++) {
            const cell = row[j];

            let blockingTreeIndex = findBlockingTreeMax(cell, seen);
            if (blockingTreeIndex === Infinity || blockingTreeIndex === -Infinity) blockingTreeIndex = 0;
            cell.distanceFromTop = j - blockingTreeIndex;

            if (seen.has(cell.size)) {
                seen.set(cell.size, Math.max(seen.get(cell.size)!, j));
            } else {
                seen.set(cell.size, j);
            }
        }

        seen = new Map<number, number>();

        for (let j = row.length - 1; j >= 0; j--) {
            const cell = row[j];

            let blockingTreeIndex = findBlockingTreeMin(cell, seen);
            if (blockingTreeIndex === Infinity || blockingTreeIndex === -Infinity) blockingTreeIndex = row.length - 1;
            cell.distanceFromBottom = blockingTreeIndex - j;

            if (seen.has(cell.size)) {
                seen.set(cell.size, Math.min(seen.get(cell.size)!, j));
            } else {
                seen.set(cell.size, j);
            }
        }
    }

    const result = Math.max(
        ...data
            .flat()
            .map(
                (tree: Tree) =>
                    tree.distanceFromLeft * tree.distanceFromRight * tree.distanceFromTop * tree.distanceFromBottom
            )
    );
    console.log(result);
};

export default main;
