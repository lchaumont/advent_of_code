const main = (input: string) => {
    let numbers: number[] = input
        .replaceAll("\r", "")
        .split(" ")
        .filter((n: string) => n.trim() !== "")
        .map((n: string) => parseInt(n));

    const numberOfBlinks = 25;

    const applyRules = (n: number): number[] => {
        if (n === 0) return [1];

        const asString = n.toString();

        if (asString.length % 2 === 0) {
            return [parseInt(asString.slice(0, asString.length / 2)), parseInt(asString.slice(asString.length / 2))];
        }

        return [n * 2024];
    };

    for (let i = 0; i < numberOfBlinks; i++) {
        const currentNumbers: number[] = [];

        for (const number of numbers) {
            const r = applyRules(number);
            currentNumbers.push(...r);
        }

        numbers = currentNumbers;
    }

    return numbers.length;
};

export default main;
