const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    type Rect = {
        x1: number;
        x2: number;
        y1: number;
        y2: number;
    };

    let data: Rect[] = [];
    lines.forEach((line: string) => {
        const [x1, y1, x2, y2] = line
            .split(" -> ")
            .map((pos: string) => pos.split(","))
            .flat()
            .map(Number);

        data.push({
            x1,
            x2,
            y1,
            y2,
        });
    });

    const map = new Map<string, number>();
    const getMapKey = (x: number, y: number) => `${x}-${y}`;
    const setOrIncrement = (x: number, y: number) => {
        const key = getMapKey(x, y);
        const value = map.get(key) ?? 0;
        map.set(key, value + 1);
    };

    for (const {x1, x2, y1, y2} of data) {
        const deltaX = Math.abs(x1 - x2);
        const deltaY = Math.abs(y1 - y2);

        if (deltaX === 0) {
            const start = Math.min(y1, y2);
            const end = Math.max(y1, y2);
            for (let y = start; y <= end; y++) {
                setOrIncrement(x1, y);
            }
        } else if (deltaY === 0) {
            const start = Math.min(x1, x2);
            const end = Math.max(x1, x2);
            for (let x = start; x <= end; x++) {
                setOrIncrement(x, y1);
            }
        } else if (deltaX === deltaY) {
            const xDirection = x1 < x2 ? 1 : -1;
            const yDirection = y1 < y2 ? 1 : -1;
            for (let i = 0; i <= deltaX; i++) {
                setOrIncrement(x1 + i * xDirection, y1 + i * yDirection);
            }
        } else {
            console.error("Unexpected input");
        }
    }

    const result = Array.from(map.values()).filter((value: number) => value >= 2).length;
    console.log(result);
};

export default main;
