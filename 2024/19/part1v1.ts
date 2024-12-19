import {Heap} from "../../lib/Heap";

const main = (input: string) => {
    const [t, d]: string[] = input.replaceAll("\r", "").split("\n\n");

    const towels = t.split(", ");
    const designs = d.split("\n");

    let result = 0;

    for (const design of designs) {
        const heap = new Heap<{current: string; try: string}, number>(
            (a, b) => b - a,
            (a) => a.try.length
        );

        for (const towel of towels) {
            heap.insert({current: "", try: towel});
        }

        while (!heap.isEmpty()) {
            const current = heap.extract()!;
            const concat = current.current + current.try;

            if (concat === design) {
                result++;
                break;
            }

            if (design.startsWith(concat)) {
                for (const towel of towels) {
                    heap.insert({current: concat, try: towel});
                }
            }
        }
    }

    return result;
};

export default main;
