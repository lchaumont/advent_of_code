const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    const pos = {x: 0, y: 0, aim: 0};

    lines.forEach((line: string) => {
        let [dir, distString] = line.split(" ");
        const dist = parseInt(distString);

        if (dir === "forward") {
            pos.x = pos.x + dist;
            pos.y = pos.y + pos.aim * dist;
        } else if (dir === "down") {
            pos.aim = pos.aim + dist;
        } else if (dir === "up") {
            pos.aim = pos.aim - dist;
        }
    });

    console.log(pos);
    console.log(pos.x * pos.y);
};

export default main;
