const main = (input: string) => {
    const tiles: number[][] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line: string) => line.split(",").map((c) => parseInt(c)));

    let anwser = 0;

    for (let i = 0; i < tiles.length; i++) {
        for (let j = i + 1; j < tiles.length; j++) {
            const area = getArea(tiles[i], tiles[j]);
            anwser = Math.max(anwser, area);
        }
    }

    return anwser;
};

const getArea = (t1: number[], t2: number[]): number => {
    const dx = Math.abs(t1[0] - t2[0]);
    const dy = Math.abs(t1[1] - t2[1]);
    return (dx + 1) * (dy + 1);
};

export default main;