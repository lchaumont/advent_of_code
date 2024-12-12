import {Grid} from "../../lib/Grid";

const main = (input: string) => {
    const chars: string[][] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line: string) => line.split(""));

    const grid = new Grid<string>(chars.length, chars[0].length, ".");

    chars.forEach((row: string[], y: number) => {
        row.forEach((char: string, x: number) => {
            grid.setCellValue(x, y, char);
        });
    });

    const areas: Array<{
        type: string;
        cells: Array<{x: number; y: number}>;
        area: number;
        perimeter: number;
    }> = [];

    const seen = new Set<string>();
    const fromPositionToKey = (x: number, y: number) => `${x},${y}`;

    const dfs = (x: number, y: number, type: string, cells: Array<{x: number; y: number}>) => {
        if (seen.has(fromPositionToKey(x, y))) {
            return;
        }

        cells.push({x, y});
        seen.add(fromPositionToKey(x, y));

        grid.getNeighborsIndex(x, y)
            .filter(([x, y]) => grid.getCellValue(x, y) === type)
            .forEach(([x, y]) => dfs(x, y, type, cells));
    };

    const calculatePerimeter = (type: string, cells: Array<{x: number; y: number}>): number => {
        return cells.reduce((acc, {x, y}) => 
            acc + (4 - grid.getNeighborsIndex(x, y).filter(([x, y]) => grid.getCellValue(x, y) === type).length)
        , 0);
    };

    for (let x = 0; x < grid.rows; x++) {
        for (let y = 0; y < grid.cols; y++) {
            if (seen.has(fromPositionToKey(x, y))) {
                continue;
            }

            const type = grid.getCellValue(x, y);
            const cells: Array<{x: number; y: number}> = [];
            dfs(x, y, type, cells);

            areas.push({
                type,
                cells,
                area: cells.length,
                perimeter: calculatePerimeter(type, cells),
            });
        }
    }

    const result = areas.reduce((acc, {cells, area}) => {
        const nbCorners = cells.reduce((acc2, {x, y}) => {
            const [l, r, t, b, tl, bl, tr, br] = grid.getNeighborsIndex(x, y, true, true);
            
            const isLeftOut = !grid.isInGridBounds(l[0], l[1]) || cells.find(({x: x2, y: y2}) => x2 === l[0] && y2 === l[1]) === undefined;
            const isRightOut = !grid.isInGridBounds(r[0], r[1]) || cells.find(({x: x2, y: y2}) => x2 === r[0] && y2 === r[1]) === undefined;
            const isTopOut = !grid.isInGridBounds(t[0], t[1]) || cells.find(({x: x2, y: y2}) => x2 === t[0] && y2 === t[1]) === undefined;
            const isBottomOut = !grid.isInGridBounds(b[0], b[1]) || cells.find(({x: x2, y: y2}) => x2 === b[0] && y2 === b[1]) === undefined;

            const isTlInner = !isTopOut && !isLeftOut && (!grid.isInGridBounds(tl[0], tl[1]) || cells.find(({x: x2, y: y2}) => x2 === tl[0] && y2 === tl[1]) === undefined);
            const isBlInner = !isBottomOut && !isLeftOut && (!grid.isInGridBounds(bl[0], bl[1]) || cells.find(({x: x2, y: y2}) => x2 === bl[0] && y2 === bl[1]) === undefined);
            const isTrInner = !isTopOut && !isRightOut && (!grid.isInGridBounds(tr[0], tr[1]) || cells.find(({x: x2, y: y2}) => x2 === tr[0] && y2 === tr[1]) === undefined);
            const isBrInner = !isBottomOut && !isRightOut && (!grid.isInGridBounds(br[0], br[1]) || cells.find(({x: x2, y: y2}) => x2 === br[0] && y2 === br[1]) === undefined);

            let n = 0;

            if (isLeftOut && isTopOut) n++;
            if (isTopOut && isRightOut) n++;
            if (isRightOut && isBottomOut) n++;
            if (isBottomOut && isLeftOut) n++;
            
            if (isTlInner) n++;
            if (isBlInner) n++;
            if (isTrInner) n++;
            if (isBrInner) n++;

            return acc2 + n;
        }, 0);
        
        return acc + nbCorners * area
    }, 0);

    return result;
};

export default main;
