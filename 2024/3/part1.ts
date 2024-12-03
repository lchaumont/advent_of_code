const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");
    
    const regex = /mul\((\d+),(\d+)\)/g;

    let result = 0;

    lines.forEach((line: string) => {
        [...line.matchAll(regex)].forEach((match) => {
            const l = parseInt(match[1]);
            const r = parseInt(match[2]);
    
            result += l * r;
        });
    });

    return result;
};

export default main;
