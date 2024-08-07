import { countChars, countOccurrences, extractNumbers } from "../../lib/string-utils";

const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .replaceAll(":", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    let count = 0;

    for (const line of lines) {
        const [rules, char, password] = line.split(" ");
        const [min, max] = extractNumbers(rules, "-");

        // const sizeOfCharInPassword = countChars(password)[char];
        const sizeOfCharInPassword = countOccurrences(password, char);
        
        if (min <= sizeOfCharInPassword && sizeOfCharInPassword <= max) count++;
    }

    console.log(count)
};

export default main;
