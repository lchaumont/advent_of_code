export function reverseString(str: string): string {
    return str.split("").reverse().join("");
}

export function isPalindrome(str: string): boolean {
    const reversed = reverseString(str);
    return str === reversed;
}

export function countOccurrences(mainStr: string, subStr: string): number {
    const regex = new RegExp(subStr, "g");
    const matches = mainStr.match(regex);
    return matches ? matches.length : 0;
}

export function compressString(str: string): string {
    return str.replace(/(.)\1+/g, (match, char) => `${char}${match.length}`);
}

export function extractNumbers(str: string, splitter?: string): number[] {
    if (!splitter) splitter = " ";
    return str.split(splitter).map(number => parseInt(number)).filter(number => !isNaN(number));
}

export function extractNumbers2(str: string): number[] {
    return str.match(/\d+/g)?.map(number => parseInt(number)) ?? [];
}

export function countChars(str: string): Record<string, number> {
    const chars: Record<string, number> = {};
    str.split("").forEach(char => {
        if (chars[char]) {
            chars[char]++;
        } else {
            chars[char] = 1;
        }
    });
    return chars;
}