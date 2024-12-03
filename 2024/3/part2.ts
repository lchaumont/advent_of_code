const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");
    
    const regex = /(?:mul\((\d+),(\d+)\))|do(?:n't)?\(\)/g;

    let result = 0;

    let enabled: boolean = true;

    lines.forEach((line: string) => {
        [...line.matchAll(regex)].forEach((match) => {
            if (match[0].startsWith("don't")) {
                enabled = false;
                return;
            }

            if (match[0].startsWith("do")) {
                enabled = true;
                return;
            }

            if (!enabled) return;

            const l = parseInt(match[1]);
            const r = parseInt(match[2]);
    
            result += l * r;
        });
    });

    return result;
};

export default main;
