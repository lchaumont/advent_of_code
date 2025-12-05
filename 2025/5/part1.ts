import { mergeIntervals } from "../../lib/array-utils";

const main = (input: string) => {
    const [ranges, ids] = input
        .replaceAll("\r", "")
        .split("\n\n")
        .map((seg) => seg.split("\n")) 

    const intervals: [number, number][] = ranges.map(range => {
        const [l, r] = range.split("-");
        return [parseInt(l), parseInt(r)];
    });

    const mergedIntervals = mergeIntervals(intervals);

    let answer = 0;

    OUTER : for (const id of ids) {
        const n = parseInt(id);
        for (const interval of mergedIntervals) {
            if (n >= interval[0] && n <= interval[1]) {
                answer++;
                continue OUTER;
            }
        }
    }

    return answer;
};

export default main;