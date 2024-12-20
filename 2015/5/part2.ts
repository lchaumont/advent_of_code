const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    const regex11 = /(..).*\1/;
    const regex2 = /(.).\1/;

    let result = 0;

    for (const line of lines) {
        if (regex11.test(line) && regex2.test(line)) {
            result++;
        }
    }

    return result;
};

export default main;