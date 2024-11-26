const main = (input: string) => {
    const lines: number[][] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line: string) => line.split(" | ")[1].split(" ").map((n: string) => n.length));
    
    let result: number = 0;

    for (const line of lines) {
        result += line
        .filter(size => size === 2 || size === 3 || size === 4 || size === 7).length;
    }

    console.log("Part 1 :", result);
};

export default main;