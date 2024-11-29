const main = (input: string) => {
    enum Direction {
        NORTH,
        SOUTH,
        WEST,
        EAST
    };

    type Instruction = {
        prefix: InstructionPrefix,
        distance: number
    };

    enum InstructionPrefix {
        LEFT,
        RIGHT
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
                case Direction.NORTH : return Direction.WEST;
                case Direction.SOUTH : return Direction.EAST;
                case Direction.WEST : return Direction.SOUTH;
                case Direction.EAST : return Direction.NORTH;
            }
        } else {
            switch (current) {
                case Direction.NORTH : return Direction.EAST;
                case Direction.SOUTH : return Direction.WEST;
                case Direction.WEST : return Direction.NORTH;
                case Direction.EAST : return Direction.SOUTH;
            }
        }
    };

    const applyInstruction = (currentPosition: {x: number, y: number, direction: Direction}, instruction: Instruction) => {
        const {prefix, distance} = instruction;
        const nextDirection = getNextDirection(currentPosition.direction, prefix);

        currentPosition.direction = nextDirection;

        if (nextDirection === Direction.NORTH) currentPosition.y += distance;
        else if (nextDirection === Direction.EAST) currentPosition.x += distance;
        else if (nextDirection === Direction.SOUTH) currentPosition.y -= distance;
        else currentPosition.x -= distance;
    }

    let initialPosition = {
        x: 0,
        y: 0,
        direction: Direction.NORTH
    };

    instructions.forEach(i => {
        applyInstruction(initialPosition, i)
        console.log(initialPosition);
    });

    console.log(Math.abs(initialPosition.x) + Math.abs(initialPosition.y));
};

export default main;
