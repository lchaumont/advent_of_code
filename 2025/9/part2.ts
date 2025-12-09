type RedTile = {
    pos: number[];
    index: number;
};

const main = (input: string) => {
    const tiles: RedTile[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line: string, index) => ({pos: line.split(",").map((c) => parseInt(c)), index}));

    let anwser = 0;

    const isInsideArea = (tx: number, ty: number): boolean => {
        let inside = false;
        let count = 0;

        if (tx === 2 && ty === 5) {
            console.log()
        }

        for (let i = 0; i <= tx; i++) {
            const sameColumn = tiles.filter(({pos}) => pos[0] === i);

            if (tx === 2 && ty === 5) {
            console.log(sameColumn)
        }

            for (let j = 0; j < sameColumn.length - 1; j++) {
                const t1 = sameColumn[j];
                const t2 = sameColumn[j + 1];

                if (t1.index === t2.index - 1 || (t1.index === 0 && t2.index === tiles.length - 1)) {
                    if ((t1.pos[1] <= ty && t2.pos[1] >= ty) || (t2.pos[1] <= ty && t1.pos[1] >= ty)) {
                        if (inside) {
                            inside = false;
                            count++;
                        } else {
                            inside = true;
                            count++;
                        }

                        break;
                    }
                }
            }
        }

        if (tx === 2 && ty === 5) {
            console.log(count)
        }

        // console.log(tx, ty, count % 2 !== 0);
        return count % 2 !== 0;
    };

    for (let i = 0; i < tiles.length; i++) {
        for (let j = i + 1; j < tiles.length; j++) {
            const c1 = tiles[i].pos;
            const c2 = tiles[j].pos;
            const c3 = [c1[0], c2[1]];
            const c4 = [c2[0], c1[1]];

            // console.log(c1, c2, c3, c4)

            if (isInsideArea(c3[0], c3[1]) && isInsideArea(c4[0], c4[1])) {
                const area = getArea(c1, c2);
                anwser = Math.max(anwser, area);
            }
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
