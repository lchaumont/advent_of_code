const main = (input: string) => {
    const locks: number[][] = [];
    const keys: number[][] = [];

    input
        .replaceAll("\r", "")
        .split("\n\n")
        .filter((line: string) => line.trim() !== "")
        .forEach((pattern: string) => {
            const lines = pattern.split("\n");
            const isLock = lines[0] === "#####";

            const heights: number[] = [];

            for (const line of lines) {
                line.split("").forEach((char, index) => {
                    if (char === "#") {
                        heights[index] = (heights[index] || 0) + 1;
                    }
                });
            }

            if (isLock) {
                locks.push(heights);
            } else {
                keys.push(heights);
            }
        });

    let result = 0;

    for (const lock of locks) {
        for (const key of keys) {
            const isValid = lock.every((lockHeight, index) => lockHeight + key[index] <= 7);
            if (isValid) result++;
        }
    }

    return result;
};

export default main;
