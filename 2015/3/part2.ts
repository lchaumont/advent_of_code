const main = (input: string) => {
    const instructions: string[] = input.replaceAll("\r", "").split("");

    const seen = new Set<string>();
    const toKey = (x: number, y: number) => `${x},${y}`;

    const currentSanta = {x: 0, y: 0};
    const currentRobot = {x: 0, y: 0};
    seen.add(toKey(currentSanta.x, currentSanta.y));

    for (let i = 0; i < instructions.length; i++) {
        const current = i % 2 === 0 ? currentSanta : currentRobot;

        switch (instructions[i]) {
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
