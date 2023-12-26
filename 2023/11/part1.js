const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    let data = [];
    for (let y = 0; y < input.length; y++) {
        const line = input[y].split("");
        for (let x = 0; x < line.length; x++) {
            data.push({x, y, value: line[x]});
        }
    }
    
    const t = data.filter((d) => d.value !== ".");
    console.log(t);

    // Expand the universe;
    const rowsToExpand = [];
    const columnsToExpand = [];
    const expantionFactor = 1000000

    for (let y = 0; y < input.length; y++) {
        const row = data.filter((d) => d.y === y);
        if (row.every((d) => d.value === ".")) {
            rowsToExpand.push(y);
        }
    }

    for (let x = 0; x < input.length; x++) {
        const row = data.filter((d) => d.x === x);
        if (row.every((d) => d.value === ".")) {
            columnsToExpand.push(x);
        }
    }

    for (let i = 0; i < rowsToExpand.length; i++) {
        const expandIndex = rowsToExpand[i];
        data.filter((d) => d.y >= expandIndex + i * (expantionFactor - 1)).forEach((d) => d.y = d.y + expantionFactor - 1);
    }

    for (let i = 0; i < columnsToExpand.length; i++) {
        const expandIndex = columnsToExpand[i];
        data.filter((d) => d.x >= expandIndex + i * (expantionFactor - 1)).forEach((d) => d.x = d.x + expantionFactor - 1);
    }

    data = data.filter((d) => d.value !== ".");
    console.log(data);

    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
            const distX = Math.abs(data[i].x - data[j].x);
            const distY = Math.abs(data[i].y - data[j].y);
            const distance = distX + distY;

            //console.log(data[i], data[j], distX, distY, distance);
            sum += distance;
        }
    }

    console.log(sum);
};

export default main;
