import _ from "lodash";
import fs from "fs";

const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    const dataUnflat = input
        .map((line, rowIndex) => {
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

    const S = data.find((item) => item.symbol === "S");
    const minX = Math.min(...data.map((item) => item.x));
    const maxX = Math.max(...data.map((item) => item.x));
    const minY = Math.min(...data.map((item) => item.y));
    const maxY = Math.max(...data.map((item) => item.y));
    console.log(minX, maxX, minY, maxY);

    let queue = [];
    const alreadyVisited = new Set();
    const final = new Set();
    queue.push(getMapKey(S));

    for (let i = 0; i < 500; i++) {
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

                if (i % 2 === 1) final.add(key);
                queue.push(key);
            });

            alreadyVisited.add(keyWithStep);
        }
    }

    const distinct = [...new Set(queue)];
    distinct.forEach((key) => {
        final.add(key);
    });
    console.log("Size # first plate : " + final.size);

    let countmpty = 0;
    const log = dataUnflat.map((line) => {
        return line.map((item) => {
            if (final.has(getMapKey(item))) {
                return "O";
            } else {
                if (item.symbol === ".") countmpty++;
                return item.symbol;
            }
        }).join("");
    }).join("\n");

    console.log("Size - first plate : " + countmpty);

    fs.writeFile("./21/view.txt", log, (err) => {
        if (err) {
            console.error(err);
        }
    });
};

export default main;
