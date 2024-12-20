import {isNumber} from "../../lib/number-utils";
import {Queue} from "../../lib/Queue";

const main = (input: string) => {
    const regex = /([a-z0-9]+) ([A-Z]+) ([a-z0-9]+)/;

    const lines = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line: string) => {
            const [l, r] = line.split(" -> ");

            let operation = null;
            let operand1 = null;
            let operand2 = null;

            if (l.indexOf(" ") === -1) {
                operation = "AFFECTATION";
                operand1 = isNumber(l) ? parseInt(l) : l;
            } else if (l.startsWith("NOT")) {
                operation = "NOT";
                operand1 = l.substring(4);
            } else {
                const match = l.match(regex)!;
                operand1 = isNumber(match[1]) ? parseInt(match[1]) : match[1];
                operation = match[2];
                operand2 = isNumber(match[3]) ? parseInt(match[3]) : match[3];
            }

            return {
                operation,
                operand1,
                operand2,
                to: r,
            };
        });

    let wires: {[key: string]: number} = {};

    const getValueForOperand = (operand: string | number) => (typeof operand === "string" ? wires[operand] : operand);

    const operations: {
        [key: string]: (operand1: number, operand2: number | null, to: string) => void;
    } = {
        AFFECTATION: (operand1, _, to) => {
            if (wires[to] === undefined) wires[to] = operand1;
        },
        AND: (operand1, operand2, to) => (wires[to] = operand1 & operand2!),
        OR: (operand1, operand2, to) => (wires[to] = operand1 | operand2!),
        LSHIFT: (operand1, operand2, to) => (wires[to] = operand1 << operand2!),
        RSHIFT: (operand1, operand2, to) => (wires[to] = operand1 >> operand2!),
        NOT: (operand1, _, to) => (wires[to] = 65535 - operand1),
    };

    const queue = new Queue<{
        operation: string;
        operand1: string | number;
        operand2: string | number | null;
        to: string;
    }>();

    lines.forEach((line) => queue.enqueue(line));

    while (!queue.isEmpty()) {
        const {operation, operand1, operand2, to} = queue.dequeue()!;

        const op1Value = getValueForOperand(operand1);
        const op2Value = operand2 === null ? null : getValueForOperand(operand2!);

        if (op1Value === undefined || op2Value === undefined) {
            queue.enqueue({operation, operand1, operand2, to});
            continue;
        }

        operations[operation](op1Value, op2Value, to);
    }

    const a = wires["a"];
    wires = {b: a};

    lines.forEach((line) => queue.enqueue(line));

    while (!queue.isEmpty()) {
        const {operation, operand1, operand2, to} = queue.dequeue()!;

        const op1Value = getValueForOperand(operand1);
        const op2Value = operand2 === null ? null : getValueForOperand(operand2!);

        if (op1Value === undefined || op2Value === undefined) {
            queue.enqueue({operation, operand1, operand2, to});
            continue;
        }

        operations[operation](op1Value, op2Value, to);
    }

    return wires["a"];
};

export default main;
