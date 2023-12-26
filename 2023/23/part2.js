const main = (input) => {
    class Node {
        constructor(data) {
            this.data = data;
            this.next = null;
            this.prev = null;
        }
    }

    class Deque {
        constructor() {
            this.head = null;
            this.tail = null;
            this.size = 0;
        }

        push(data) {
            const node = new Node(data);

            if (!this.head) {
                this.head = node;
                this.tail = node;
            } else {
                this.tail.next = node;
                node.prev = this.tail;
                this.tail = node;
            }

            this.size++;
        }

        shift() {
            if (!this.head) return null;

            const data = this.head.data;

            if (this.head === this.tail) {
                this.head = null;
                this.tail = null;
            } else {
                this.head = this.head.next;
                this.head.prev = null;
            }

            this.size--;

            return data;
        }

        length() {
            return this.size;
        }
    }

    input = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    function getMapKey(x, y) {
        return `${x}-${y}`;
    }

    let data = input.map((line, rowIndex) => {
        return line
            .split("")
            .map((char, columnIndex) => {
                return {
                    x: columnIndex,
                    y: rowIndex,
                    value: char,
                };
            })
            .filter((pos) => pos.value !== "#");
    });

    data = data.flat();
    const start = data[0];
    const end = data[data.length - 1];

    const map = new Map();
    data.forEach((pos) => {
        map.set(getMapKey(pos.x, pos.y), 0);
    });

    function getOppositeDirection(direction) {
        if (direction === "left") return "right";
        if (direction === "right") return "left";
        if (direction === "top") return "bottom";
        if (direction === "bottom") return "top";
        if (direction === "unknown") return "unknown";
    }

    function getPossibleStep(pos) {
        const {x, y, direction, visited} = pos;
        const from = getOppositeDirection(direction);

        return [
            {x: x - 1, y, key: getMapKey(x - 1, y), direction: "left", visited: new Set(visited)},
            {x: x + 1, y, key: getMapKey(x + 1, y), direction: "right", visited: new Set(visited)},
            {x, y: y - 1, key: getMapKey(x, y - 1), direction: "top", visited: new Set(visited)},
            {x, y: y + 1, key: getMapKey(x, y + 1), direction: "bottom", visited: new Set(visited)},
        ].filter((pos) => {
            const {key} = pos;

            if (!map.has(key)) return false;
            if (pos.direction === from) return false;
            if (pos.visited.has(key)) return false;

            pos.visited.add(key);
            return true;
        });
    }

    // Get all points that split the path
    let corners = data.filter((pos) => {
        const {x, y} = pos;

        const possibleSteps = [
            {x: x - 1, y},
            {x: x + 1, y},
            {x, y: y - 1},
            {x, y: y + 1},
        ].filter((p) => {
            const {x, y} = p;
            const key = getMapKey(x, y);
            const value = map.get(key);

            if (value === undefined) return false;
            return true;
        });

        if (possibleSteps.length > 2) return true;
    });

    corners = [start, ...corners, end];
    corners.forEach((corner) => {
        corner.linkedCorners = [];
    });

    // For each corner, get the only path to others linked corners
    for (const corner of corners) {
        const queue = [{...corner, direction: "unknown", length: 0}];

        let safeLoop = 0;
        const safeLoopMax = 100000;

        while (queue.length > 0 && safeLoop < safeLoopMax) {
            const current = queue.shift();
            const possibleSteps = getPossibleStep(current);

            FOR_STEP: for (const step of possibleSteps) {
                const correspondingCorner = corners.find((c) => c.x === step.x && c.y === step.y);
                if (correspondingCorner) {
                    corner.linkedCorners.push({x: step.x, y: step.y, length: current.length + 1});
                    break FOR_STEP;
                }

                queue.push({...step, length: current.length + 1});
            }

            safeLoop++;
        }
    }

    // Now each corners have the only path to others linked corners, with the length associated.
    // Find the longest path from start to end.
    let queue = new Deque();
    const p = new Set();
    p.add(getMapKey(start.x, start.y));
    queue.push({...start, length: 0, path: p});
    let safeLoop = 0;
    const safeLoopMax = 20000000;
    let max = 0;
    let maxPath = [];
    let maxEdgeLength = Math.max(...corners.flatMap((c) => c.linkedCorners.map((lc) => lc.length)));

    const beforeLastNodePos = end.linkedCorners[0];
    const beforeLastNode = corners.find((c) => c.x === beforeLastNodePos.x && c.y === beforeLastNodePos.y);
    beforeLastNode.linkedCorners = beforeLastNode.linkedCorners.filter((lc) => lc.x === end.x || lc.y === end.y);

    console.log(JSON.stringify(corners, null, 2));

    while (queue.length() > 0 && safeLoop < safeLoopMax) {
        const current = queue.shift();

        if (current.x === end.x && current.y === end.y) {
            if (current.length > max) {
                max = current.length;
                maxPath = current.path;
            }
        }

        if (current.path.size < 6) {
            // Just take the heaviest path
            const linkedCorners = current.linkedCorners
                .sort((a, b) => b.length - a.length)
                .filter((lc) => {
                    const key = getMapKey(lc.x, lc.y);
                    return !current.path.has(key);
                });

            const linkedCorner = linkedCorners[0];
            const key = getMapKey(linkedCorner.x, linkedCorner.y);

            const corner = corners.find((c) => c.x === linkedCorner.x && c.y === linkedCorner.y);
            const path = new Set(current.path);
            path.add(key);
            queue.push({...corner, length: current.length + linkedCorner.length, path});
        } else {
            for (const linkedCorner of current.linkedCorners) {
                const key = getMapKey(linkedCorner.x, linkedCorner.y);
                if (current.path.has(key)) continue;

                const newLength = current.length + linkedCorner.length;
                // Pruning: if the current path length plus the maximum possible length from the current node
                // is less than the longest path found so far, skip this path
                if (newLength + maxEdgeLength * (corners.length - current.path.length + 1) <= max) continue;

                const corner = corners.find((c) => c.x === linkedCorner.x && c.y === linkedCorner.y);
                const path = new Set(current.path);
                path.add(key);
                queue.push({...corner, length: newLength, path});
            }
        }

        if (safeLoop % 100000 === 0) console.log(safeLoop, " - Current max : ", max, " - Path : ", maxPath);
        safeLoop++;
    }

    if (safeLoop === safeLoopMax) console.log("Safe loop max reached");

    console.log("Max : ", max);
    console.log("Path : ", [...maxPath]);
};

export default main;