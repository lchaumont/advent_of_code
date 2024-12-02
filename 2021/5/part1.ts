const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    type Rect = {
        minX: number;
        maxX: number;
        minY: number;
        maxY: number;
    };

    let data: Rect[] = [];
    lines.forEach((line: string) => {
        const [x1, y1, x2, y2] = line
            .split(" -> ")
            .map((pos: string) => pos.split(","))
            .flat();
        const xs = [x1, x2].map(Number).sort((a, b) => a - b);
        const ys = [y1, y2].map(Number).sort((a, b) => a - b);

        data.push({
            minX: xs[0],
            maxX: xs[1],
            minY: ys[0],
            maxY: ys[1],
        });
    });

    data = data.filter((rect: Rect) => rect.minX === rect.maxX || rect.minY === rect.maxY);

    const map = new Map<string, number>();
    const getMapKey = (x: number, y: number) => `${x}-${y}`;
    const setOrIncrement = (x: number, y: number) => {
        const key = getMapKey(x, y);
        const value = map.get(key) ?? 0;
        map.set(key, value + 1);
    };

    for (const {minX, maxX, minY, maxY} of data) {
        if (minX === maxX) {
            for (let y = minY; y <= maxY; y++) {
                setOrIncrement(minX, y);
            }
        } else if (minY === maxY) {
            for (let x = minX; x <= maxX; x++) {
                setOrIncrement(x, minY);
            }
        }
    }

    const result = Array.from(map.values()).filter((value: number) => value >= 2).length;
    console.log(result);
};

export default main;
