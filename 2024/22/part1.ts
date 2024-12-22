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

    let result = 0;

    for (const line of lines) {
        let secret = line;
        for (let i = 0; i < 2000; i++) {
            secret = nextSecret(secret);
        }
        result += secret;
    }

    return result;
};

export default main;
