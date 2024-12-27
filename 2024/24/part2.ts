// Not a general solution, just exploring logs and guess the permutations

const main = (input: string) => {
    const [inital, instructions]: string[] = input
        .replaceAll("\r", "")
        .split("\n\n")
        .filter((line: string) => line.trim() !== "");

    let wires: Wire[] = [];

    const getWire = (identifier: string): Wire => {
        const inWires = wires.find((w) => w.identifier === identifier);
        if (inWires) return inWires;

        const wire = new Wire(identifier);
        wires.push(wire);
        return wire;
    };

    const permute = (p1: string, p2: string) => {
        const p1Wire = wires.find((w) => w.identifier === p1)!;
        const p2Wire = wires.find((w) => w.identifier === p2)!;

        const p1Gate = p1Wire.gate!;
        const p2Gate = p2Wire.gate!;

        p1Wire.gate = p2Gate;
        p2Wire.gate = p1Gate;
    };

    const makePermutations = () => {
        permute("z16", "fkb");
        permute("rqf", "nnr");
        permute("z31", "rdn");
        permute("z37", "rrn");
    };

    const reset = () => {
        wires = [];

        for (const i of inital.split("\n")) {
            const [identifier, value] = i.split(": ");
            const wire = new Wire(identifier);
            wire.value = value === "1" ? true : value === "0" ? false : null;
            wires.push(wire);
        }

        for (const i of instructions.split("\n")) {
            const [operation, out] = i.split(" -> ");
            const [left, operator, right] = operation.split(" ");

            const leftWire = getWire(left);
            const rightWire = getWire(right);
            const outWire = getWire(out);

            const gate = new Gate(leftWire, rightWire, operator as "OR" | "AND" | "XOR");
            outWire.gate = gate;
        }

        makePermutations();
    };

    reset();

    const log = () => {
        console.log(
            "x-",
            wires
                .filter((w) => w.identifier.startsWith("x"))
                .sort((a, b) => b.identifier.localeCompare(a.identifier))
                .map((w) => (w.getValue() ? 1 : 0))
                .join("")
        );

        console.log(
            "y-",
            wires
                .filter((w) => w.identifier.startsWith("y"))
                .sort((a, b) => b.identifier.localeCompare(a.identifier))
                .map((w) => (w.getValue() ? 1 : 0))
                .join("")
        );

        console.log(
            "z",
            wires
                .filter((w) => w.identifier.startsWith("z"))
                .sort((a, b) => b.identifier.localeCompare(a.identifier))
                .map((w) => (w.getValue() ? 1 : 0))
                .join("")
        );
    };

    const evaluate = (x: bigint, y: bigint, logging: boolean = false): bigint => {
        for (const w of wires) {
            if (w.identifier.startsWith("x")) {
                const bitId = parseInt(w.identifier.substring(1));
                w.value = ((x >> BigInt(bitId)) & 1n) === 1n;
            }

            if (w.identifier.startsWith("y")) {
                const bitId = parseInt(w.identifier.substring(1));
                w.value = ((y >> BigInt(bitId)) & 1n) === 1n;
            }
        }

        const binary = wires
            .filter((w) => w.identifier.startsWith("z"))
            .sort((a, b) => b.identifier.localeCompare(a.identifier))
            .map((w) => (w.getValue() ? 1 : 0))
            .join("");

        if (logging) log();

        reset();

        return BigInt("0b" + binary);
    };

    OUTER: for (let i = 0n; i < 45n; i++) {
        for (let j = 0n; j < 45n; j++) {
            const x = BigInt(1n << i);
            const y = BigInt(1n << j);
            const r = evaluate(x, y);
            //console.log(i, j, r);
            if (r !== x + y) {
                const z = wires.find((w) => w.identifier === "z" + j)!;
                const z2 = wires.find((w) => w.identifier === "z" + (j + 1n))!;
                z.log();
                console.log("------");
                z2.log();
                console.log(i, j, r);
                break OUTER;
            }
        }
    }

    return ["z16", "fkb", "rqf", "nnr", "z31", "rdn", "z37", "rrn"].sort((a, b) => a.localeCompare(b)).join(",");
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

    log = (maxDepth: number = 8, currentDepth: number = 0) => {
        if (currentDepth > maxDepth) return;
        console.log(" ".repeat(currentDepth), this.identifier);
        if (this.gate) {
            this.gate.log(maxDepth, currentDepth + 1);
        }
    };
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

    log = (maxDepth: number = 8, currentDepth: number = 0) => {
        if (currentDepth > maxDepth) return;
        console.log(" ".repeat(currentDepth), this.operator);
        this.left.log(maxDepth, currentDepth);
        this.right.log(maxDepth, currentDepth);
    };
}

export default main;
