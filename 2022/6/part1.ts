import {countChars} from "../../lib/string-utils";

const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    const line = lines[0].split("");
    const array: string[] = [];

    for (let i = 0; i < line.length; i++) {
        if (array.length < 4) {
            array.push(line[i]);
        } else {
            array.shift();
            array.push(line[i]);

            const count = countChars(array.join(""));
            if (Object.values(count).every((value: number) => value === 1)) {
                console.log(i + 1);
                return;
            }
        }
    }
};

export default main;
