const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    const regex1 = /([aeiou].*){3,}/;
    const regex2 = /(.)\1/;
    const regex3 = /(ab|cd|pq|xy)/;

    let result = 0;

    for (const line of lines) {
        if (regex1.test(line) && regex2.test(line) && !regex3.test(line)) {
            result++;
        }
    }

    return result;
};

export default main;