import {Stack} from "../../lib/Stack";

const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    type Dir = {
        name: string;
        size: number;
        subDirs: string[];
    };

    const directories: Dir[] = [];
    const stack: Stack<Dir> = new Stack<Dir>();

    lines.forEach((line: string) => {
        if (line.startsWith("$ cd")) {
            const destination: string = line.split(" ")[2];

            if (destination === "..") {
                const popped: Dir = stack.pop() as Dir;
                directories.push(popped);

                const peek = stack.peek() as Dir;
                peek.subDirs.push(popped.name);
                peek.size += popped.size;
            } else {
                stack.push({
                    name: destination,
                    size: 0,
                    subDirs: [],
                });
            }
        }

        if (line.match(/^\d+\s/)) {
            const size: number = parseInt(line.split(" ")[0]);
            const peek = stack.peek() as Dir;
            peek.size += size;
        }
    });

    while (stack.size() > 0) {
        const popped: Dir = stack.pop() as Dir;
        directories.push(popped);

        const peek = stack.peek();
        if (peek) {
            peek.subDirs.push(popped.name);
            peek.size += popped.size;
        }
    }

    console.log(stack);
    console.log(directories);

    const rootSize = directories[directories.length - 1].size;

    const result = directories
        .filter((dir: Dir) => 70000000 - rootSize + dir.size > 30000000)
        .map((dir: Dir) => dir.size)
        .sort((a: number, b: number) => a - b)[0];

    console.log(result);
};

export default main;
