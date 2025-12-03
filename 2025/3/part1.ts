const main = (input: string) => {
    const banks: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    let anwser = 0;

    for (const bank of banks) {
        const batterries = bank.split("").map((n) => parseInt(n));
        const left = maxWithIndex(batterries.slice(0, batterries.length -1));
        const right = maxWithIndex(batterries.slice(left.index + 1, batterries.length));
        anwser += parseInt(String(left.max) + String(right.max));
    }

    return anwser;
};

const maxWithIndex = (numbers: number[]) => {
    const max = Math.max(...numbers);
    const index = numbers.indexOf(max);
    return {index, max};
}

export default main;