const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    const numericKeyPad = [
        ["7", "8", "9"],
        ["4", "5", "6"],
        ["1", "2", "3"],
        ["#", "0", "A"],
    ];

    const directionnalKeyPad = [
        ["#", "^", "A"],
        ["<", "v", ">"],
    ];

    const cache = new Map<string, number>();
    const cacheKey = (keys: string, depth: number) => `${keys}-${depth}`;

    const run = (
        keys: string,
        depth: number = 0,
        cost: number = 0
    ): number => {
        const keyPad = depth === 0 ? numericKeyPad : directionnalKeyPad;
        let currentPosition = depth === 0 ? [2, 3] : [2, 0];

        let minimalSequenceCost = 0;

        if (depth === 3) {
            return keys.length;
        }

        const cachedResult = cache.get(cacheKey(keys, depth));
        if (cachedResult !== undefined) {
            return cachedResult;
        }

        for (const key of keys) {
            let tx = null;
            let ty = null;

            for (let y = 0; y < keyPad.length; y++) {
                for (let x = 0; x < keyPad[y].length; x++) {
                    if (keyPad[y][x] === key) {
                        tx = x;
                        ty = y;
                        break;
                    }
                }
            }

            const dx = tx! - currentPosition[0];
            const dy = ty! - currentPosition[1];

            const sequences: number[] = [];
            const possibleSequences = generateMoveSequences(currentPosition, dx, dy, depth);

            for (const nSequence of possibleSequences) {
                const s = run(nSequence + "A", depth + 1, cost);
                sequences.push(s);
            }

            const minCost = Math.min(...sequences);

            minimalSequenceCost += minCost;
            currentPosition = [tx!, ty!];
        }

        cache.set(cacheKey(keys, depth), cost + minimalSequenceCost);
        return cost + minimalSequenceCost;
    };

    const generateMoveSequences = (currentPosition: number[], dx: number, dy: number, depth: number): string[] => {
        const sequences: string[] = [];
        const totalMoves = Math.abs(dx) + Math.abs(dy);

        const forbiddenPosition = depth === 0 ? [0, 3] : [0, 0];

        const horizontalMovement = dx > 0 ? ">" : dx < 0 ? "<" : "";
        const verticalDirection = dy > 0 ? "v" : dy < 0 ? "^" : "";

        const positionsEqual = ([x1, y1]: number[], [x2, y2]: number[]): boolean => {
            return x1 === x2 && y1 === y2;
        };

        const generateSequence = (
            current: string,
            horizontalMovesTaken: number,
            verticalMovesTaken: number,
            currentPosition: number[]
        ) => {
            if (current.length === totalMoves) {
                sequences.push(current);
                return;
            }

            const [currentX, currentY] = currentPosition;

            if (horizontalMovesTaken < Math.abs(dx)) {
                const newX = currentX + (dx > 0 ? 1 : -1);
                const newPosition = [newX, currentY];
                if (!positionsEqual(newPosition, forbiddenPosition)) {
                    generateSequence(
                        current + horizontalMovement,
                        horizontalMovesTaken + 1,
                        verticalMovesTaken,
                        newPosition
                    );
                }
            }

            if (verticalMovesTaken < Math.abs(dy)) {
                const newY = currentY + (dy > 0 ? 1 : -1);
                const newPosition = [currentX, newY];
                if (!positionsEqual(newPosition, forbiddenPosition)) {
                    generateSequence(
                        current + verticalDirection,
                        horizontalMovesTaken,
                        verticalMovesTaken + 1,
                        newPosition
                    );
                }
            }
        };

        generateSequence("", 0, 0, currentPosition);

        return sequences;
    };
    
    let result = 0;

    for (const line of lines) {
        const cost = run(line, 0, 0);
        console.log("Sequence", line, cost);

        result += parseInt(line.substring(0, 3)) * cost;
    }

    return result;
};

export default main;
