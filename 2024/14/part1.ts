const main = (input: string) => {
    const robots: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
    }> = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line) => {
            const [pos, vel] = line.split(" ");
            const [x, y] = pos
                .substring(2)
                .split(",")
                .map((n) => parseInt(n));
            const [vx, vy] = vel
                .substring(2)
                .split(",")
                .map((n) => parseInt(n));
            return {x, y, vx, vy};
        });

    const gridWidth = 101;
    const gridHeight = 103;

    const midWidth = Math.floor(gridWidth / 2);
    const midHeight = Math.floor(gridHeight / 2);

    const seconds = 100;

    let [tl, tr, bl, br] = [0, 0, 0, 0];

    robots.forEach(r => {
        r.x = (r.x + r.vx * seconds) % gridWidth;
        r.y = (r.y + r.vy * seconds) % gridHeight;

        if (r.x < 0) r.x += gridWidth;
        if (r.y < 0) r.y += gridHeight;
    
        if (r.x !== midWidth && r.y !== midHeight) {
            if (r.x < midWidth && r.y > midHeight) tl++
            if (r.x > midWidth && r.y > midHeight) tr++
            if (r.x < midWidth && r.y < midHeight) bl++
            if (r.x > midWidth && r.y < midHeight) br++
        }
    })

    return tl * tr * bl * br;
};

export default main;
