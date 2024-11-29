const main = (input: string) => {
    enum Direction {
        NORTH,
        SOUTH,
        WEST,
        EAST,
    }

    type Instruction = {
        prefix: InstructionPrefix;
        distance: number;
    };

    enum InstructionPrefix {
        LEFT,
        RIGHT,
    }

    const instructions: Instruction[] = input
        .replaceAll("\r", "")
        .split(",")
        .map((instruction): Instruction => {
            const trimmed = instruction.trim();
            const prefix = trimmed.startsWith("L") ? InstructionPrefix.LEFT : InstructionPrefix.RIGHT;
            const distance = Number(trimmed.substring(1));
            return {prefix, distance};
        });

    const getNextDirection = (current: Direction, instruction: InstructionPrefix): Direction => {
        if (instruction === InstructionPrefix.LEFT) {
            switch (current) {
                case Direction.NORTH:
                    return Direction.WEST;
                case Direction.SOUTH:
                    return Direction.EAST;
                case Direction.WEST:
                    return Direction.SOUTH;
                case Direction.EAST:
                    return Direction.NORTH;
            }
        } else {
            switch (current) {
                case Direction.NORTH:
                    return Direction.EAST;
                case Direction.SOUTH:
                    return Direction.WEST;
                case Direction.WEST:
                    return Direction.NORTH;
                case Direction.EAST:
                    return Direction.SOUTH;
            }
        }
    };

    const applyInstruction = (
        currentPosition: {
            x: number;
            y: number;
            direction: Direction;
            alreadyVisited: Array<{x: number; y: number}>;
            found: boolean;
        },
        instruction: Instruction
    ) => {
        const {prefix, distance} = instruction;

        const nextDirection = getNextDirection(currentPosition.direction, prefix);

        currentPosition.direction = nextDirection;

        for (let i = 0; i < distance; i++) {
            if (nextDirection === Direction.NORTH) currentPosition.y += 1;
            else if (nextDirection === Direction.EAST) currentPosition.x += 1;
            else if (nextDirection === Direction.SOUTH) currentPosition.y -= 1;
            else currentPosition.x -= 1;

            const currentIsAlreadyVisited =
                currentPosition.alreadyVisited.find((p) => p.x === currentPosition.x && p.y === currentPosition.y) !==
                undefined;
            if (currentIsAlreadyVisited === true) {
                currentPosition.found = true;
                break;
            } else {
                currentPosition.alreadyVisited.push({x: currentPosition.x, y: currentPosition.y});
            }
        }
    };

    let initialPosition = {
        x: 0,
        y: 0,
        direction: Direction.NORTH,
        alreadyVisited: [{x: 0, y: 0}],
        found: false,
    };

    instructions.forEach((i) => {
        if (!initialPosition.found) applyInstruction(initialPosition, i);
    });

    console.log(Math.abs(initialPosition.x) + Math.abs(initialPosition.y));
};

export default main;
