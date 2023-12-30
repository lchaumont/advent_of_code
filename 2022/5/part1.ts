import { Stack } from "../../lib/Stack";
import { extractNumbers } from "../../lib/string-utils";

const main = (input: string) => {
    const [initialsStacks, instructions]: string[] = input.replaceAll("\r", "").split("\n\n");

    const parsedStacks = initialsStacks.split("\n").map((stack: string) => stack.replaceAll(/\s+/g, " ").split(" "));
    
    const stacks = new Map<number, Stack<string>>();
    parsedStacks[parsedStacks.length - 1].forEach(number => {
        stacks.set(parseInt(number), new Stack<string>());
    });

    for (let i = parsedStacks.length - 2; i >= 0; i--) {
        parsedStacks[i].forEach((char, index) => {
            if (char === "***") return;
            
            char = char.replaceAll(/[\[\]]/g, "");
            stacks.get(index + 1)?.push(char);
        })
    }

    instructions.split("\n").forEach(instruction => {
        const [numberToExtract, from, to] = extractNumbers(instruction, " ");

        for (let i = 0; i < numberToExtract; i++) {
            const char = stacks.get(from)?.pop();
            if (!char) break;
            stacks.get(to)?.push(char);
        }
    });
    
    console.log(stacks)

    let result = "";
    stacks.forEach((stack) => {
        result += stack.pop()?.toString();
    });

    console.log(result);
};

export default main;
