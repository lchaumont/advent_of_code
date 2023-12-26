export function reverseArray<T>(arr: T[]): T[] {
    return arr.slice().reverse();
}

export function transposeMatrix<T>(matrix: T[][]): T[][] {
    return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

export function rotateMatrix90<T>(matrix: T[][]): T[][] {
    return transposeMatrix(reverseArray(matrix));
}

export function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
    return Array.from({length: Math.ceil(arr.length / chunkSize)}, (_, index) =>
        arr.slice(index * chunkSize, index * chunkSize + chunkSize)
    );
}

export function removeDuplicates<T>(arr: T[]): T[] {
    return Array.from(new Set(arr));
}

export function combinations<T>(elements: T[], k: number): T[][] {
    const result: T[][] = [];

    function combine(current: T[], start: number): void {
        if (current.length === k) {
            result.push([...current]);
            return;
        }

        for (let i = start; i < elements.length; i++) {
            current.push(elements[i]);
            combine(current, i + 1);
            current.pop();
        }
    }

    combine([], 0);
    return result;
}

export function permutations<T>(elements: T[]): T[][] {
    const result: T[][] = [];

    function permute(arr: T[], index: number): void {
        if (index === arr.length - 1) {
            result.push([...arr]);
            return;
        }

        for (let i = index; i < arr.length; i++) {
            [arr[index], arr[i]] = [arr[i], arr[index]];
            permute([...arr], index + 1);
        }
    }

    permute([...elements], 0);
    return result;
}
