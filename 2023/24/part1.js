import _ from "lodash";

const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    const data = input.map((line) => {
        const [positions, velocity] = line.split("@");
        const [px, py, pz] = positions.split(",").map((x) => parseInt(x.trim()));
        const [vx, vy, vz] = velocity.split(",").map((x) => parseInt(x.trim()));

        const a = vy / vx;
        const b = py - a * px;

        return { px, py, pz, vx, vy, vz, a, b };
    });

    const minBoundary = 200000000000000;
    const maxBoundary = 400000000000000;

    let count = 0;
    for (let i = 0; i < data.length; i++) {
        const { px, py, pz, vx, vy, vz, a, b } = data[i];

        for (let j = i + 1; j < data.length; j++) {
            const { px: px2, py: py2, pz: pz2, vx: vx2, vy: vy2, vz: vz2, a: a2, b: b2 } = data[j];

            // Search intersection
            const x = (b2 - b) / (a - a2);
            const y = a * x + b;

            if (x >= minBoundary && x <= maxBoundary && y >= minBoundary && y <= maxBoundary) {
                // Check if the intersection did not occur in the past with the initial positions
                const tx1 = (x - px) / vx;
                const tx2 = (x - px2) / vx2;
                if (tx1 >= 0 && tx2 >= 0) count++;
            }
        }
    }

    console.log(count);
};

export default main;
