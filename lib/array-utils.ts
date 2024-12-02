export function reverseArray<T>(arr: T[]): T[] {
    return arr.slice().reverse();
}

export function transposeMatrix<T>(matrix: T[][]): T[][] {
    return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

export function rotateMatrix90<T>(matrix: T[][]): T[][] {
    return transposeMatrix(reverseArray(matrix));
}

/**
 * Chunks an array into smaller arrays of a specified size.
 * @example
 * const arr = [1, 2, 3, 4, 5, 6, 7, 8];
 * const chunkSize = 3;
 * const result = chunkArray(arr, chunkSize);
 * console.log(result); // [[1, 2, 3], [4, 5, 6], [7, 8]]
 * @param arr The array to chunk.
 * @param chunkSize The size of each chunk.
 * @returns An array of chunks.
 */
export function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
    return Array.from({length: Math.ceil(arr.length / chunkSize)}, (_, index) =>
        arr.slice(index * chunkSize, index * chunkSize + chunkSize)
    );
}

export function removeDuplicates<T>(arr: T[]): T[] {
    return Array.from(new Set(arr));
}

/**
 * Returns all possible combinations of k elements from the given array.
 * @example
 * const elements = [1, 2, 3, 4];
 * const k = 2;
 * const result = combinations(elements, k);
 * console.log(result); // [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]
 * @param elements The array of elements.
 * @param k The number of elements in each combination.
 */
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

/**
 * Returns all possible permutations of the given array.
 * @example
 * const elements = [1, 2, 3];
 * const result = permutations(elements);
 * console.log(result); // [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 2, 1], [3, 1, 2]]
 * @param elements The array of elements.
 * @returns An array of permutations.
 */
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

/**
 * Merge intervals.
 * @example
 * const intervals = [[1, 3], [2, 6], [8, 10], [15, 18]];
 * const result = mergeIntervals(intervals);
 * console.log(result); // [[1, 6], [8, 10], [15, 18]]
 * @param intervals  
 * @returns 
 */
export function mergeIntervals(intervals: [number, number][]): [number, number][] {
    const result: [number, number][] = [];

    intervals.sort((a, b) => a[0] - b[0]);

    let currentInterval = intervals[0];
    for (let i = 1; i < intervals.length; i++) {
        const [currentStart, currentEnd] = currentInterval;
        const [nextStart, nextEnd] = intervals[i];

        if (currentEnd >= nextStart) {
            currentInterval = [currentStart, Math.max(currentEnd, nextEnd)];
        } else {
            result.push(currentInterval);
            currentInterval = intervals[i];
        }
    }

    result.push(currentInterval);
    return result;
}

export function groupBy<K extends string | number | symbol, T>(arr: T[], key: (item: T) => K): Record<K, T[]> {
    return arr.reduce((groups, item) => {
        const group = key(item);
        if (!groups[group]) groups[group] = [];
        groups[group].push(item);
        return groups;
    }, {} as Record<K, T[]>);
}

export function countBy<K extends string | number | symbol, T>(arr: T[], key: (item: T) => K): Record<K, number> {
    return arr.reduce((counts, item) => {
        const group = key(item);
        if (!counts[group]) counts[group] = 0;
        counts[group]++;
        return counts;
    }, {} as Record<K, number>);
}
