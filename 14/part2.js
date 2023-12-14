const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    let data = input
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

    function joinBoard(board) {
        return board
            .map((ball) => ball.symbol)
            .join("")
            .match(/.{1,10}/g)
            .join("");
    }

    function unjoinBoard(board, rowLength) {
        return board
            .split("")
            .map((symbol, index) => {
                return {
                    symbol,
                    x: index % rowLength,
                    y: Math.floor(index / rowLength),
                };
            })
            .flat();
    }

    const alreadySeen = new Set();
    alreadySeen.add(joinBoard(data));

    function tiltBoard(b, direction, rowLength, columnLength) {
        const board = [...b];

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

        if (direction === "south") {
            for (let r = 0; r < rowLength; r++) {
                const column = board.filter((ball) => ball.x === r);
                let balls = [];

                for (let c = 0; c < columnLength; c++) {
                    const cur = column.find((ball) => ball.y === c && ball.x === r);
                    if (cur && cur.symbol === "#") {
                        balls.forEach((ball) => (ball.symbol = "."));
                        for (let k = 0; k < balls.length; k++) {
                            const ball = column.find((ball) => ball.y === c - k - 1 && ball.x === r);
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
                        const ball = column.find((ball) => ball.y === columnLength - k - 1 && ball.x === r);
                        ball.symbol = "O";
                    }
                }
            }
        }

        if (direction === "west") {
            for (let c = 0; c < columnLength; c++) {
                const row = board.filter((ball) => ball.y === c);
                let balls = [];

                for (let r = rowLength - 1; r >= 0; r--) {
                    const cur = row.find((ball) => ball.x === r && ball.y === c);
                    if (cur && cur.symbol === "#") {
                        balls.forEach((ball) => (ball.symbol = "."));
                        for (let k = 0; k < balls.length; k++) {
                            const ball = row.find((ball) => ball.x === r + k + 1 && ball.y === c);
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
                        const ball = row.find((ball) => ball.x === k && ball.y === c);
                        ball.symbol = "O";
                    }
                }
            }
        }

        if (direction === "east") {
            for (let c = 0; c < columnLength; c++) {
                const row = board.filter((ball) => ball.y === c);
                let balls = [];

                for (let r = 0; r < rowLength; r++) {
                    const cur = row.find((ball) => ball.x === r && ball.y === c);
                    if (cur && cur.symbol === "#") {
                        balls.forEach((ball) => (ball.symbol = "."));
                        for (let k = 0; k < balls.length; k++) {
                            const ball = row.find((ball) => ball.x === r - k - 1 && ball.y === c);
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
                        const ball = row.find((ball) => ball.x === rowLength - k - 1 && ball.y === c);
                        ball.symbol = "O";
                    }
                }
            }
        }

        return board;
    }

    function logBoard(board) {
        console.log("----------------------------");
        console.log(
            board
                .map((ball) => ball.symbol)
                .join("")
                .match(/.{1,10}/g)
                .join("\n")
        );
    }

    function calculateSum(board) {
        return board.reduce((acc, ball) => {
            if (ball.symbol === "O") {
                return acc + (columnLength - ball.y);
            }
    
            return acc;
        }, 0);
    }

    const rowLength = data[data.length - 1].y + 1;
    const columnLength = data[data.length - 1].x + 1;

    let found = false;
    let finalBoard = null;
    let checkCycle = false;
    let cycleBegin = null;
    let cycle = [];
    let cycleBeginIndex = null;
    let cycleEndIndex = null;
    for (let i = 0; i < 1000; i++) {
        if (i % 1000000 === 0) console.log(i);

        data = tiltBoard(data, "north", rowLength, columnLength);
        data = tiltBoard(data, "west", rowLength, columnLength);
        data = tiltBoard(data, "south", rowLength, columnLength);
        data = tiltBoard(data, "east", rowLength, columnLength);

        const currentBoard = joinBoard(data);

        if (!found && checkCycle && cycleBegin === currentBoard) {
            found = true;
            cycleEndIndex = i;
            console.log("Cycle end Index : " + (i));
            break;
        } else if (!found && checkCycle) {
            cycle.push(currentBoard);
        }

        if (!found && !checkCycle && alreadySeen.has(currentBoard)) {
            checkCycle = true;
            cycleBegin = currentBoard;
            cycleBeginIndex = i;
            cycle.push(currentBoard);
            console.log("Cycle begin Index : " + i);
        }

        //logBoard(data);
        alreadySeen.add(currentBoard);
    }

    const finalBoardIndex = (1000000000 - cycleBeginIndex) % (cycleEndIndex - cycleBeginIndex) - 1;
    //console.log(1000000000 - cycleBeginIndex)
    //console.log(cycleEndIndex - cycleBeginIndex)
    //console.log(finalBoardIndex);
    finalBoard = cycle[finalBoardIndex];
    //console.log(finalBoard);

    finalBoard = unjoinBoard(finalBoard, rowLength);

    logBoard(finalBoard);
    
    const sum = calculateSum(finalBoard);
    console.log(sum);
    console.log(cycle.length);
};

export default main;
