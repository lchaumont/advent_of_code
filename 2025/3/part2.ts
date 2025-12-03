const size = 12;

const main = (input: string) => {
    const banks: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    let anwser = 0;

    for (const bank of banks) {
        const batterries = bank.split("").map((n) => parseInt(n));

        const next = (index: number, start: number, current: string = ""): string => {
            const window = batterries.length - size - (start - index)

            const n = maxWithIndex(batterries.slice(start, start + window + 1));
            current += String(n.max);

            if (index < size - 1) return next(index + 1, start + n.index + 1, current);
            else return current;
        };

        const rBank = parseInt(next(0, 0));
        anwser += rBank;
    }

    return anwser;
};

const maxWithIndex = (numbers: number[]) => {
    const max = Math.max(...numbers);
    const index = numbers.indexOf(max);
    return {index, max};
};

export default main;
