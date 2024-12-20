const main = (input: string) => {
    const instructions: string[] = input
        .replaceAll("\r", "")
        .split("")

    const seen = new Set<string>();
    const toKey = (x: number, y: number) => `${x},${y}`;

    const current = { x: 0, y: 0 };
    seen.add(toKey(current.x, current.y));

    for (const instruction of instructions) {
        switch (instruction) {
            case "^":
                current.y++;
                break;
            case "v":
                current.y--;
                break;
            case ">":
                current.x++;
                break;
            case "<":
                current.x--;
                break;
        }

        seen.add(toKey(current.x, current.y));
    }

    return seen.size;
};

export default main;