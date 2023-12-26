import _ from "lodash";
import fs from "fs";

const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    const dataUnflat = input.map((line, rowIndex) => {
        return line.split("").map((symbol, colIndex) => {
            return {
                symbol,
                x: colIndex,
                y: rowIndex,
            };
        });
    });

    const data = dataUnflat.flat();

    function getMapKey(pos) {
        return `${pos.x},${pos.y}`;
    }

    const map = new Map();
    data.forEach((item) => {
        map.set(getMapKey(item), item.symbol);
    });

    const minX = 0;
    const maxX = data[data.length - 1].x;
    const minY = 0;
    const maxY = data[data.length - 1].y;
    console.log(minX, maxX, minY, maxY);

    const S = data.find((item) => item.x === maxX / 2 && item.y === maxY / 2);
    console.log(S);

    function bfs(start, nbrIteration, even = false) {
        let queue = [];
        const alreadyVisited = new Set();
        const set = new Set();
        queue.push(start);

        for (let i = 0; i < nbrIteration; i++) {
            const queueC = [...queue];
            queue = [];
            while (queueC.length > 0) {
                const key = queueC.shift();
                const keyWithStep = key + "-" + (i % 2);
                if (alreadyVisited.has(keyWithStep)) continue;

                const [x, y] = key.split(",").map(Number);
                [
                    {x: x + 1, y},
                    {x: x - 1, y},
                    {x, y: y + 1},
                    {x, y: y - 1},
                ].forEach((pos) => {
                    const key = getMapKey(pos);
                    const keyWithStep = key + "-" + (i % 2);
                    if (map.get(key) === "#") return;
                    if (alreadyVisited.has(keyWithStep)) return;
                    if (pos.x < minX || pos.x > maxX || pos.y < minY || pos.y > maxY) return;

                    if (i % 2 === (even ? 0 : 1)) set.add(key);
                    queue.push(key);
                });

                alreadyVisited.add(keyWithStep);
            }
        }

        const log = dataUnflat.map((line) => {
            return line.map((item) => {
                if (set.has(getMapKey(item))) {
                    return "O";
                } else {
                    return item.symbol;
                }
            }).join("");
        }).join("\n");

        fs.writeFile(`./21/${start}${even ? "-even": "-odd"}.txt`, log, (err) => {
            if (err) {
                console.error(err);
            }
        });

        return set.size;
    }

    const n = 202300;

    const oddFull = bfs(getMapKey(S), 130);
    const evenFull = bfs(getMapKey(S), 130, true);

    const corner1Odd = bfs("130,130", 65, true);
    const corner1Even = bfs("130,130", 65);

    const corner2Odd = bfs("0,130", 65, true);
    const corner2Even = bfs("0,130", 65);

    const corner3Odd = bfs("0,0", 65, true);
    const corner3Even = bfs("0,0", 65);

    const corner4Odd = bfs("130,0", 65, true);
    const corner4Even = bfs("130,0", 65);

    const cardinal1 = bfs("0,65", 130);
    const cardinal2 = bfs("130,65", 130);
    const cardinal3 = bfs("65,0", 130);
    const cardinal4 = bfs("65,130", 130);

    console.log(oddFull, evenFull, corner1Even, corner1Odd, corner2Even, corner2Odd, corner3Even, corner3Odd, corner4Even, corner4Odd, cardinal1, cardinal2, cardinal3, cardinal4);

    const sum = (n-1)*(n-1) * oddFull + n*n*evenFull + cardinal1 + cardinal2 + cardinal3 + cardinal4 + (n-1) * corner1Odd + (n-1) * corner2Odd + (n-1) * corner3Odd + (n-1) * corner4Odd + n * corner1Even + n * corner2Even + n * corner3Even + n * corner4Even;
    console.log(sum);
};

export default main;
