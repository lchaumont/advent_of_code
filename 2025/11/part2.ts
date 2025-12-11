import { memoize } from "../../lib/memoization-utils";

const main = (input: string) => {
    const devices: Map<string, string[]> = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .reduce((acc: Map<string, string[]>, line: string) => {
            const [input, out] = line.split(": ");
            acc.set(input, out.split(" "));
            return acc;
        }, new Map());

    const dfs = memoize((key: string, fft: boolean, dac: boolean): number => {
        fft = fft || key === "fft";
        dac = dac || key === "dac";

        const nexts = devices.get(key)!;
        if (nexts.length === 1 && nexts[0] === "out") {
            return fft && dac ? 1 : 0
        }

        let local = 0;
        for (const n of nexts) local += dfs(n, fft, dac);
        return local;
    });

    return dfs("svr");
};

export default main;