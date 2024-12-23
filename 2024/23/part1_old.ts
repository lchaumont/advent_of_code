import {combinations} from "../../lib/array-utils";
import {DisjointSet} from "../../lib/DisjointSet";

const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    const disjoinSet = new DisjointSet<string>();
    let result = 0;

    for (const line of lines) {
        const [l, r] = line.split("-");
        disjoinSet.union(l, r);
    }

    for (const subset of disjoinSet.getAllSubsets()) {
        const combinationss = combinations(subset, 3);

        for (const [a, b, c] of combinationss) {
            if (a.startsWith("t") || b.startsWith("t") || c.startsWith("t")) {
                result++;
            }
        }
    }

    return result;
};

export default main;
