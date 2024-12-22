const main = (input: string) => {
    const lines: number[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map(Number);

    const nextSecret = (current: number): number => {
        let r = current;
        r = prune(mix(r, r * 64));
        r = prune(mix(r, Math.floor(r / 32)));
        r = prune(mix(r, r * 2048));
        return r;
    };

    const mix = (value: number, secret: number): number => {
        return (secret ^ value) >>> 0;
    };

    const prune = (current: number): number => {
        return current % 16777216;
    };

    const mapBananas = new Map<string, number>();
    const toKey = (sequence: number[]): string => sequence.join(",");

    for (const line of lines) {
        let secret = line;
        let queue = [];
        let seen = new Set<string>();

        for (let i = 0; i < 2000; i++) {
            const n = nextSecret(secret);

            const delta = (n % 10) - (secret % 10);
            queue.push(delta);
            secret = n;

            if (queue.length > 4) {
                queue.shift();
                const k = toKey(queue);

                if (seen.has(k)) {
                    continue;
                }

                mapBananas.set(k, (mapBananas.get(k) ?? 0) + (n % 10));
                seen.add(k);
            }
        }
    }

    // Find max value
    let max = {key: "", value: 0};

    for (const [key, value] of mapBananas.entries()) {
        if (value > max.value) {
            max = {key, value};
        }
    }

    return max;
};

export default main;
