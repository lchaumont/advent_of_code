const distancesKey = (s: string, e: string): string => {
    return s + "," + e;
};

const main = (input: string) => {
    const locations = new Set<string>();
    const distances: Map<string, number> = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line: string) => {
            const [s, e, cost] = line.split(/\s(?:to|=)\s/);
            return {s, e, cost: parseInt(cost)};
        })
        .reduce((acc, cur) => {
            locations.add(cur.s);
            locations.add(cur.e);
            acc.set(distancesKey(cur.s, cur.e), cur.cost);
            acc.set(distancesKey(cur.e, cur.s), cur.cost);
            return acc;
        }, new Map<string, number>());

    let min = Number.MAX_VALUE;

    const dfs = (currentLocation: string, seen: string[], currentCost: number): number | undefined => {
        if (seen.includes(currentLocation)) return undefined;
        else if (currentCost > min) return undefined;

        seen.push(currentLocation);

        const remainingLocations = [...locations].filter((l) => !seen.includes(l));

        if (remainingLocations.length === 0) return currentCost;

        for (const l of remainingLocations) {
            const cost = dfs(l, [...seen], currentCost + distances.get(distancesKey(currentLocation, l))!);
            if (cost !== undefined && cost < min) {
                min = cost;
                return cost;
            }
        }
    };

    for (const l of locations) {
        dfs(l, [], 0);
    }

    return min;
};

export default main;
