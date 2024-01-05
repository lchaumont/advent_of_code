import {leastCommonMultiple} from "../../lib/number-utils";
import {extractNumbers} from "../../lib/string-utils";

const main = (input: string) => {
    const monkeysRaw: string[] = input
        .replaceAll("\r", "")
        .split("\n\n")
        .filter((line: string) => line.trim() !== "");

    const monkeys = new Map<number, any>();
    monkeysRaw.forEach((monkeyRaw: string) => {
        const lines = monkeyRaw.split("\n");
        const number = extractNumbers(lines[0])[0];
        const items = extractNumbers(lines[1]);
        const operation = lines[2].split("new = ")[1];
        const test = extractNumbers(lines[3])[0];
        const ifTrue = extractNumbers(lines[4])[0];
        const ifFalse = extractNumbers(lines[5])[0];

        monkeys.set(number, {
            items,
            divisor: test,
            operation: (old: number) => eval(operation.replaceAll("old", old.toString())),
            throw: (worry: number) => (worry % test === 0 ? ifTrue : ifFalse),
            numberOfInspections: 0,
        });
    });

    const roundNumbers = 10000;
    const lcmDivisible = leastCommonMultiple(...[...monkeys.values()].map((monkey) => monkey.divisor));

    for (let i = 0; i < roundNumbers; i++) {
        for (let [key, monkey] of monkeys) {
            const items: number[] = monkey.items;

            while (items.length > 0) {
                monkey.numberOfInspections++;
                let item = items.shift() as number;
                item = item % lcmDivisible;
                const inspected = monkey.operation(item);
                const thrown = monkey.throw(inspected);
                monkeys.get(thrown).items.push(inspected);
            }
        }
    }

    console.log(monkeys);
    const sortedMonkeys = [...monkeys.values()].sort((a, b) => b.numberOfInspections - a.numberOfInspections);
    const result = sortedMonkeys[0].numberOfInspections * sortedMonkeys[1].numberOfInspections;
    console.log(result);
};

export default main;
