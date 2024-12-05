import {groupBy} from "../../lib/array-utils";

const main = (input: string) => {
    let [r, u] = input.split("\n\n");

    const rules = r
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    const updates = u
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    let rulesGrouped = groupBy(rules, (rule) => rule.split("|")[0]);
    Object.keys(rulesGrouped).forEach((key) => {
        rulesGrouped[key] = rulesGrouped[key].map((rule) => rule.split("|")[1]);
    });

    console.log(rulesGrouped);

    for (const update of updates) {
        const numbers = update.split(",");

        for (let i = 0; i < numbers.length - 1; i++) {
            const current = numbers[i];
            const next = numbers[i + 1];

            
        }
    }
};

export default main;
