const main = (input: string) => {
    let numbers: number[] = input
        .replaceAll("\r", "")
        .split(" ")
        .filter((n: string) => n.trim() !== "")
        .map((n: string) => parseInt(n));

    const numberOfBlinks = 75;
    const cache = new Map<string, number>();

    const applyRules = (n: number): number[] => {
        if (n === 0) return [1];

        const asString = n.toString();

        if (asString.length % 2 === 0) {
            return [parseInt(asString.slice(0, asString.length / 2)), parseInt(asString.slice(asString.length / 2))];
        }

        return [n * 2024];
    };

    const countAfterXBlinks = (stone: number, blinks: number): number => {
        if (blinks === 0) return 1;

        const cacheKey = `${stone}-${blinks}`;

        const fromCache = cache.get(cacheKey);
        if (fromCache !== undefined) return fromCache;

        const r = applyRules(stone).reduce((acc: number, n: number) => acc + countAfterXBlinks(n, blinks - 1), 0);

        cache.set(cacheKey, r);
        return r;
    };

    const result = numbers.reduce((acc: number, n: number) => acc + countAfterXBlinks(n, numberOfBlinks), 0);
    return result;
};

export default main;
