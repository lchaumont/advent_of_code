import { mergeIntervals } from "../../lib/array-utils";

const main = (input: string) => {
    const [ranges] = input
        .replaceAll("\r", "")
        .split("\n\n")
        .map((seg) => seg.split("\n")) 

    const intervals: [number, number][] = ranges.map(range => {
        const [l, r] = range.split("-");
        return [parseInt(l), parseInt(r)];
    });

    const mergedIntervals = mergeIntervals(intervals);

    return mergedIntervals.reduce((acc, cur) => acc + (cur[1] - cur[0] + 1), 0);
};

export default main;