const main = (input: string) => {
    const [inital, instructions]: string[] = input
        .replaceAll("\r", "")
        .split("\n\n")
        .filter((line: string) => line.trim() !== "");

    const wires: Wire[] = [];

    for (const i of inital.split("\n")) {
        const [identifier, value] = i.split(": ");
        const wire = new Wire(identifier);
        wire.value = value === "1" ? true : value === "0" ? false : null;
        wires.push(wire);
    }

    const getWire = (identifier: string): Wire => {
        const inWires = wires.find((w) => w.identifier === identifier);
        if (inWires) return inWires;

        const wire = new Wire(identifier);
        wires.push(wire);
        return wire;
    };

    for (const i of instructions.split("\n")) {
        const [operation, out] = i.split(" -> ");
        const [left, operator, right] = operation.split(" ");

        const leftWire = getWire(left);
        const rightWire = getWire(right);
        const outWire = getWire(out);

        const gate = new Gate(leftWire, rightWire, operator as "OR" | "AND" | "XOR");
        outWire.gate = gate;
    }

    const binary = wires
        .filter((w) => w.identifier.startsWith("z"))
        .sort((a, b) => b.identifier.localeCompare(a.identifier))
        .map((w) => (w.getValue() ? 1 : 0))
        .join("");

    return parseInt(binary, 2);
};

class Wire {
    identifier: string;
    gate: Gate | null = null;
    value: boolean | null = null;

    constructor(identifier: string) {
        this.identifier = identifier;
    }

    getValue(): boolean {
        if (this.value !== null) return this.value;

        if (this.gate === null) throw new Error("No gate found");

        const leftValue = this.gate.left.getValue();
        const rightValue = this.gate.right.getValue();

        let result = null;

        switch (this.gate.operator) {
            case "OR":
                result = leftValue || rightValue;
                break;
            case "AND":
                result = leftValue && rightValue;
                break;
            case "XOR":
                result = leftValue !== rightValue;
                break;
            default:
                throw new Error("Invalid operator");
        }

        this.value = result;
        return result;
    }
}

class Gate {
    left: Wire;
    right: Wire;
    operator: "OR" | "AND" | "XOR";

    constructor(left: Wire, right: Wire, operator: "OR" | "AND" | "XOR") {
        this.left = left;
        this.right = right;
        this.operator = operator;
    }
}

export default main;
