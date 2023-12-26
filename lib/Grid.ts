interface IGrid<T> {
    readonly rows: number;
    readonly cols: number;
    getCellValue(row: number, col: number): T;
    setCellValue(row: number, col: number, value: T): void;
    getNeighbors(row: number, col: number): T[];
    transpose(): Grid<T>;
    deepCopy(): Grid<T>;
    fill(callback: (row: number, col: number) => T): void;
    log(): void;
}

export class Grid<T> implements IGrid<T> {
    private data: T[][];
    readonly rows: number;
    readonly cols: number;

    constructor(rows: number, cols: number, initialValue: T) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array.from({length: rows}, () => Array(cols).fill(initialValue));
    }

    getCellValue(row: number, col: number): T {
        if (this.isInGridBounds(row, col)) {
            return this.data[row][col];
        }
        throw new Error("Cell out of grid bounds.");
    }

    setCellValue(row: number, col: number, value: T): void {
        if (this.isInGridBounds(row, col)) {
            this.data[row][col] = value;
        } else {
            throw new Error("Cell out of grid bounds.");
        }
    }

    private isInGridBounds(row: number, col: number): boolean {
        return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
    }

    getNeighbors(row: number, col: number, includesDiagonals = false): T[] {
        const neighbors: T[] = [];

        const neighborsDelta = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        if (includesDiagonals) neighborsDelta.push([-1, -1], [-1, 1], [1, -1], [1, 1])

        for (const [deltaRow, deltaCol] of neighborsDelta) {
            const newRow = row + deltaRow;
            const newCol = col + deltaCol;

            if (this.isInGridBounds(newRow, newCol)) {
                neighbors.push(this.data[newRow][newCol]);
            }
        }

        return neighbors;
    }

    transpose(): Grid<T> {
        const transposedGrid = new Grid(this.rows, this.cols, this.data[0][0]);
        transposedGrid.fill((row, col) => this.getCellValue(col, row));
        return transposedGrid;
    }

    deepCopy(): Grid<T> {
        const copy = new Grid(this.rows, this.cols, this.data[0][0]);
        copy.fill((row, col) => this.getCellValue(row, col));
        return copy;
    }

    fill(callback: (row: number, col: number) => T): void {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.setCellValue(row, col, callback(row, col));
            }
        }
    }

    log(): void {
        console.log(this.data.reduce((acc, cur) => acc + cur.join(" ") + "\n", ""));
    }
}
