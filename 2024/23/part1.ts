import {combinations} from "../../lib/array-utils";

const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    let result = 0;

    const connections = new Map<string, string[]>();

    const seen = new Set<string>();
    const toKey = (key: string, a: string, b: string) => [key, a, b].sort().join(",");

    for (const line of lines) {
        const [l, r] = line.split("-");

        if (!connections.has(l)) {
            connections.set(l, [r]);
        } else {
            connections.get(l)!.push(r);
        }

        if (!connections.has(r)) {
            connections.set(r, [l]);
        } else {
            connections.get(r)!.push(l);
        }
    }

    for (const [key, value] of connections) {
        if (value.length <= 1) continue;

        const comb = combinations(value, 2);

        for (const [a, b] of comb) {
            if (!connections.get(a)!.includes(b)) continue;

            if (key.startsWith("t") || a.startsWith("t") || b.startsWith("t")) {
                const k = toKey(key, a, b);

                if (seen.has(k)) continue;

                seen.add(k);
                result++;
            }
        }
    }

    return result;
};

export default main;
