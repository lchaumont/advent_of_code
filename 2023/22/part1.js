const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    function generateId() {
        return Math.random().toString(36).substr(2, 9);
    }

    const data = input
        .map((line) => {
            const [left, right] = line.split("~");
            const [x1, y1, z1] = left.split(",").map(Number);
            const [x2, y2, z2] = right.split(",").map(Number);

            const delta = {
                x: x2 - x1,
                y: y2 - y1,
                z: z2 - z1,
            };

            let direction;
            if (delta.x !== 0) {
                direction = "x";
            } else if (delta.y !== 0) {
                direction = "y";
            } else if (delta.z !== 0) {
                direction = "z";
            } else {
                direction = "single";
            }

            const blocks = [];
            if (direction !== "single") {
                for (let i = 0; i < Math.abs(delta[direction]) + 1; i++) {
                    const block = {
                        x: x1,
                        y: y1,
                        z: z1,
                    };

                    if (direction === "x") block.x += i;
                    else if (direction === "y") block.y += i;
                    else if (direction === "z") block.z += i;

                    blocks.push(block);
                }
            } else {
                blocks.push({x: x1, y: y1, z: z1});
            }

            return {
                id: generateId(),
                p1: {x: x1, y: y1, z: z1},
                p2: {x: x2, y: y2, z: z2},
                direction: direction,
                blocks,
                canBeRemovedSafely: true,
                belows: new Set(),
                belowsId: new Set(),
            };
        })
        .sort((a, b) => a.p1.z - b.p1.z);

    const floor = {
        id: "floor",
        p1: {x: 0, y: 0, z: 0},
        p2: {x: 0, y: 0, z: 0},
        direction: undefined,
        blocks: undefined,
        canBeRemovedSafely: false,
    };

    function sortPositions(a, b) {
        if (a.z !== b.z) return a.z - b.z;
        if (a.x !== b.x) return a.x - b.x;
        if (a.y !== b.y) return a.y - b.y;
    }

    // Return the blocks that just are just below this block
    function getBelow(block) {
        if (block.p1.z === 1) {
            block.belows.add(floor);
            block.belowsId.add(floor.id);
            return block.belows;
        }

        if (block.direction === "z" || block.direction === "single") {
            const below = data.find((b) => b.blocks.some((b2) => b2.z === block.p1.z - 1 && b2.x === block.p1.x && b2.y === block.p1.y));
            if (below) {
                block.belows.add(below);
                block.belowsId.add(below.id);
            }
        }

        if (block.direction === "x" || block.direction === "y") {
            for (const blockItem of block.blocks) {
                const below = data.find((b) =>
                    b.blocks.some((b2) => b2.z === blockItem.z - 1 && b2.x === blockItem.x && b2.y === blockItem.y)
                );
                if (below) {
                    block.belows.add(below);
                    block.belowsId.add(below.id);
                }
            }
        }

        return block.belows;
    }

    //console.log(data.sort(sortPositions))

    // Move all blocks down until they are on top of another block
    for (const block of data) {
        let belows = getBelow(block);

        while (belows.size === 0) {
            block.p1.z--;
            block.p2.z--;
            block.blocks.forEach((b) => b.z--);

            belows = getBelow(block);
        }
    }

    // Mark all blocks that can't be removed safely
    for (const block of data) {
        const belows = getBelow(block);

        if (belows.size === 1) {
            belows.forEach((b) => (b.canBeRemovedSafely = false));
        }
    }

    console.log(data.filter((b) => b.canBeRemovedSafely).length);
};

export default main;
