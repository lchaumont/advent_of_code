import {groupAndMapBy, groupBy} from "../../lib/array-utils";
import { init } from 'z3-solver';

const main = (input: string) => {
    let [r, u] = input.replaceAll("\r", "").split("\n\n");

    const rules = r
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line: string) => line.split("|").map((n) => parseInt(n)));

    const updates = u
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line: string) => line.split(",").map((n) => parseInt(n)));

    let rulesGrouped = groupAndMapBy(rules, (rule) => rule[0], (rule) => rule[1]);

    let result = 0;

    for (let i = 0; i < updates.length; i++) {
        const indexes = updates[i];

        let isOk = true;

        OUTER: for (let j = 0; j < indexes.length; j++) {
            const current = indexes[j];

            for (let k = j; k < indexes.length; k++) {
                const target = indexes[k];
                const rulesForTarget = rulesGrouped[target];

                if (rulesForTarget && rulesForTarget.includes(current)) {
                    isOk = false;
                    break OUTER;
                }
            }
        }

        if (!isOk) {
            indexes.sort((a, b) => {
                const rulesForB = rulesGrouped[b];

                if (rulesForB && rulesForB.includes(a)) {
                    return 1;
                } else {
                    return -1;
                }
            });

            const toAdd = indexes[Math.floor(indexes.length / 2)];
            console.log(toAdd);
            result += toAdd;
        }
    }

    return result;
};

export default main;
