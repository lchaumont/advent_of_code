import _ from "lodash";

const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    const data = input.map((line) => {
        const [direction, number] = line.split(" ")
        return {direction, number: parseInt(number)}
    });

    let visited = [{x: 0, y: 0}];
    let positions = Array.from({length: 10}, () => {});

    for (let i = 0; i < positions.length; i++) {
        positions[i] = {
            head: i === 0,
            tail: i === 9,
            previous: {x: 0, y: 0},
            current: {x: 0, y: 0},
        };
    }

    function shouldElementMove(f, s) {
        const xDelta = Math.abs(f.current.x - s.current.x);
        const yDelta = Math.abs(f.current.y - s.current.y);

        return xDelta === 2 || yDelta === 2;
    }

    function moveHead(direction, f, s) {
        f.previous.x = f.current.x;
        f.previous.y = f.current.y;

        switch (direction) {
            case "U":
                f.current.y = f.current.y + 1;
                break;
            case "D":
                f.current.y = f.current.y - 1;
                break;
            case "L":
                f.current.x = f.current.x - 1;
                break;
            case "R":
                f.current.x = f.current.x + 1;
                break;
        }

        if (shouldElementMove(f, s)) {
            s.previous.x = s.current.x;
            s.previous.y = s.current.y;

            s.current.x = f.previous.x;
            s.current.y = f.previous.y;
        }

        for (let i = 1; i < positions.length - 1; i++) {
            const ff = positions[i];
            const ss = positions[i + 1];

            if (shouldElementMove(ff, ss)) {
                ss.previous.x = ss.current.x;
                ss.previous.y = ss.current.y;

                ss.current.x = ff.previous.x;
                ss.current.y = ff.previous.y;
            }
        }

        const tail = positions[positions.length - 1];
        if (!visited.some((pos) => pos.x === tail.current.x && pos.y === tail.current.y)) {
            visited.push({...tail.current});
        }
    }

    for (const move of data) {
        const {direction, number} = move;

        for (let j = 0; j < number; j++) {
            moveHead(direction, positions[0], positions[1]);
        }
    }

    console.log(positions);
    console.log(visited);
    console.log(visited.length);
};

export default main;