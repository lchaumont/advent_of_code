const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    const connections = new Map<string, string[]>();

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

    let currentMax: string[] = [];

    for (const [key, value] of connections) {
        if (value.length <= currentMax.length) continue;

        const current = [value[0]];

        for (let i = 1; i < value.length; i++) {
            const v = value[i];
            const vConnections = connections.get(v)!;

            if (current.every((c) => vConnections.includes(c))) {
                current.push(v);
            }
        }

        if (current.length > currentMax.length - 1) {
            currentMax = [key, ...current];
        }
    }

    return currentMax.sort().join(",");
};

export default main;
