class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(element) {
        this.queue.push(element);
        this.sort();
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.queue.shift();
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    sort() {
        this.queue.sort((a, b) => a.totalWeight - b.totalWeight);
    }
}

const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    let data = input
        .map((line, y) => {
            return line.split("").map((char, x) => {
                return {
                    weight: parseInt(char),
                    x,
                    y,
                };
            });
        })
        .flat();

    function getLeftDirection(dir) {
        if (dir === "UP") return "LEFT";
        if (dir === "LEFT") return "DOWN";
        if (dir === "DOWN") return "RIGHT";
        if (dir === "RIGHT") return "UP";
    }

    function getRightDirection(dir) {
        if (dir === "UP") return "RIGHT";
        if (dir === "RIGHT") return "DOWN";
        if (dir === "DOWN") return "LEFT";
        if (dir === "LEFT") return "UP";
    }

    function getNextNode(x, y, dir) {
        if (dir === "UP") return {x, y: y - 1};
        if (dir === "RIGHT") return {x: x + 1, y};
        if (dir === "DOWN") return {x, y: y + 1};
        if (dir === "LEFT") return {x: x - 1, y};
    }

    function dijkstraWithRule(e) {
        const priorityQueue = new PriorityQueue();
        const ePos = e.split("-").map((n) => parseInt(n));
        const end = {x: ePos[0], y: ePos[1]};

        priorityQueue.enqueue({
            key: "1-0",
            straight: 1,
            dir: "RIGHT",
            totalWeight: 0,
        });

        priorityQueue.enqueue({
            key: "0-1",
            straight: 1,
            dir : "DOWN",
            totalWeight: 0
        });

        const cache = new Map();

        while (!priorityQueue.isEmpty()) {
            const {key, straight, dir, totalWeight} = priorityQueue.dequeue();
            const [x, y] = key.split("-").map((n) => parseInt(n));
            const node = data.find((node) => node.x === x && node.y === y);

            if (node === undefined) continue;
            if (node.weight === 9) continue;

            const weight = node.weight + totalWeight;
            if (x === end.x && y === end.y) {
                console.log("WEIGHT : " + weight);
                return;
            }

            const cacheKey = key + "-" + straight + "-" + dir;
            if (cache.has(cacheKey)) {
                if (cache.get(cacheKey) <= weight) continue;
            }
            cache.set(cacheKey, weight);

            if (straight >= 4) {
                const leftDir = getLeftDirection(dir);
                const nextNode2 = getNextNode(x, y, leftDir);
                priorityQueue.enqueue({
                    key: nextNode2.x + "-" + nextNode2.y,
                    straight: 1,
                    dir: leftDir,
                    totalWeight: weight,
                });

                const rightDir = getRightDirection(dir);
                const nextNode3 = getNextNode(x, y, rightDir);
                priorityQueue.enqueue({
                    key: nextNode3.x + "-" + nextNode3.y,
                    straight: 1,
                    dir: rightDir,
                    totalWeight: weight,
                });
            }

            if (straight < 10) {
                const nextNode = getNextNode(x, y, dir);
                priorityQueue.enqueue({
                    key: nextNode.x + "-" + nextNode.y,
                    straight: straight + 1,
                    dir,
                    totalWeight: weight,
                });
            }
        }
    }

    const maxX = data.reduce((max, node) => Math.max(max, node.x), 0);
    const maxY = data.reduce((max, node) => Math.max(max, node.y), 0);

    dijkstraWithRule(maxX + "-" + maxY);
};

export default main;
