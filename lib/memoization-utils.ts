type MemoTable = Record<string, any>;

export function memoize<T>(func: (...args: any[]) => T): (...args: any[]) => T {
    const memoTable: MemoTable = {};

    return function (...args: any[]): T {
        const key = JSON.stringify(args);

        if (key in memoTable) {
            return memoTable[key];
        }

        const result = func(...args);
        memoTable[key] = result;

        return result;
    };
}
