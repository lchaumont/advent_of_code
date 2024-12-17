const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    const instructions = lines[3].substring(8).split(",").map((x: string) => parseInt(x));
    let instructionPointer = 0;
    let dontIncrement = false;

    const registers = {
        "A": parseInt(lines[0].substring(11)),
        "B": parseInt(lines[1].substring(11)),
        "C": parseInt(lines[2].substring(11)),
    };

    const combo = (n: number): number => {
        if (n >= 0 && n <= 3) return n;
        
        switch (n) {
            case 4 : return registers["A"];
            case 5 : return registers["B"];
            case 6 : return registers["C"];
            default: throw new Error("Invalid combo : " + n);
        }
    }

    const result: number[] = []

    const opcodes: {[key: number]: (operand: number) => void} = {
        0: (operand: number) => {registers["A"] = registers["A"] >> combo(operand)},
        1: (operand: number) => {registers["B"] = registers["B"] ^ operand},
        2: (operand: number) => {registers["B"] = combo(operand) % 8},
        3: (operand: number) => {
            const ra = registers["A"];
            if (ra === 0) return;
            instructionPointer = operand;
            dontIncrement = true;
        },
        4: (_: number) => {registers["B"] = registers["B"] ^ registers["C"]},
        5: (operand: number) => {result.push(combo(operand) % 8)},
        6: (operand: number) => {registers["B"] = registers["A"] >> combo(operand)},
        7: (operand: number) => {registers["C"] = registers["A"] >> combo(operand)},
    }

    let i = 0;
    const max = 10000;

    while (instructionPointer < instructions.length && i < max) {
        const opcode = instructions[instructionPointer];
        const operand = instructions[instructionPointer + 1];

        // console.log(instructionPointer, opcode, operand);

        opcodes[opcode](operand);

        if (!dontIncrement) instructionPointer += 2;
        dontIncrement = false;

        i++;
        if (i === max) throw new Error("Infinite loop");
    }
    
    return result.join(",");
};

export default main;