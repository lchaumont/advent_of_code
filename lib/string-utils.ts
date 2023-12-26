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

export function replaceAllOccurrences(str: string, search: string, replacement: string): string {
    return str.split(search).join(replacement);
}

export function compressString(str: string): string {
    return str.replace(/(.)\1+/g, (match, char) => `${char}${match.length}`);
}
