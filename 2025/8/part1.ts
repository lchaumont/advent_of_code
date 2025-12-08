type Box = {
    key: string;
    x: number;
    y: number;
    z: number;
    circuit?: Circuit["id"];
};

type Circuit = {
    id: number;
    boxes: Box[];
};

type Distance = {
    b1: Box;
    b2: Box;
    value: number;
};

const main = (input: string) => {
    const boxes: Box[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line: string): Box => {
            const [x, y, z] = line.split(",").map((v) => parseInt(v));
            return {key: getKey(x, y, z), x, y, z};
        });

    const distances: Distance[] = [];
    for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
            distances.push(getDistance(boxes[i], boxes[j]));
        }
    }

    distances.sort((d1, d2) => d1.value - d2.value);

    const circuits: Map<Circuit["id"], Circuit> = new Map();
    let counterIdCircuit = 1;

    for (let i = 0; i < 1000; i++) {
        const d = distances[i];
        const {b1, b2} = d;

        if (b1.circuit !== undefined && b2.circuit !== undefined) {
            if (b1.circuit === b2.circuit) continue;

            const c1: Circuit = circuits.get(b1.circuit)!;
            const c2: Circuit = circuits.get(b2.circuit)!;

            c2.boxes.forEach(b => b.circuit = c1.id);
            c1.boxes.push(...c2.boxes);
            circuits.delete(c2.id);
        } else if (b1.circuit === undefined && b2.circuit === undefined) {
            const circuit: Circuit = {id: counterIdCircuit++, boxes: []};
            b1.circuit = circuit.id;
            b2.circuit = circuit.id;
            circuit.boxes.push(b1, b2);
            circuits.set(circuit.id, circuit);
        } else if (b1.circuit !== undefined) {
            const circuit: Circuit = circuits.get(b1.circuit)!;
            b2.circuit = circuit.id;
            circuit.boxes.push(b2);
        } else if (b2.circuit !== undefined) {
            const circuit: Circuit = circuits.get(b2.circuit)!;
            b1.circuit = circuit.id;
            circuit.boxes.push(b1);
        }
    }

    //console.log([...circuits.entries()].map(c => c[1].boxes.map(b => JSON.stringify(b))));

    const circuitsArray = [...circuits.values()];
    circuitsArray.sort((c1, c2) => c2.boxes.length - c1.boxes.length);

    let answer = 1;

    for (let i = 0; i < 3; i++) {
        answer *= circuitsArray[i].boxes.length;
    }

    return answer;
};

const getDistance = (b1: Box, b2: Box): Distance => {
    const distance = Math.sqrt(Math.pow(b1.x - b2.x, 2) + Math.pow(b1.y - b2.y, 2) + Math.pow(b1.z - b2.z, 2));
    return {b1, b2, value: distance};
};

const getKey = (x: number, y: number, z: number): Box["key"] => {
    return String(x) + "," + String(y) + "," + String(z);
};

export default main;
