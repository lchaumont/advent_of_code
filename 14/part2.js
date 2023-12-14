import _ from "lodash";

const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    const data = input
        .map((line, rowIndex) => {
            return line.split("").map((symbol, colIndex) => {
                return {
                    symbol,
                    y: rowIndex,
                    x: colIndex,
                };
            });
        })
        .flat();

    const alreadySeen = new Set();
    alreadySeen.add(_.cloneDeep(data));

    function tiltBoard(board, direction, rowLength, columnLength) {
        if (direction === "north") {
            for (let r = 0; r < rowLength; r++) {
                const column = board.filter((ball) => ball.x === r);
                let balls = [];

                for (let c = columnLength - 1; c >= 0; c--) {
                    const cur = column.find((ball) => ball.y === c && ball.x === r);
                    if (cur && cur.symbol === "#") {
                        balls.forEach((ball) => (ball.symbol = "."));
                        for (let k = 0; k < balls.length; k++) {
                            const ball = column.find((ball) => ball.y === c + k + 1 && ball.x === r);
                            ball.symbol = "O";
                        }
                        balls = [];
                    }

                    if (cur && cur.symbol === "O") {
                        balls.push(cur);
                    }
                }

                if (balls.length > 0) {
                    balls.forEach((ball) => (ball.symbol = "."));
                    for (let k = 0; k < balls.length; k++) {
                        const ball = column.find((ball) => ball.y === k && ball.x === r);
                        ball.symbol = "O";
                    }
                }
            }
        }

        alreadySeen.add(_.cloneDeep(board));
    }

    function logBoard(board) {
        console.log(
            board
                .map((ball) => ball.symbol)
                .join("")
                .match(/.{1,10}/g)
                .join("\n")
        );
    }

    const rowLength = Math.max(data.map((ball) => ball.x)) + 1;
    const columnLength = Math.max(data.map((ball) => ball.y)) + 1;

    tiltBoard(data, "north", rowLength, columnLength);

    for (let item of alreadySeen) {
        console.log("----------------------------");
        logBoard(item);
    }
};

export default main;
