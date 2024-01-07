export function numberSort(a: number, b: number, reversed = false): number {
    if (a === b) return 0;
    if (reversed) return a > b ? -1 : 1;
    return a > b ? 1 : -1;
}

export function findFactors(num: number, sorted = false): number[] {
    const factors: number[] = [];
    for (let i = 1; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            factors.push(i);
            if (i !== num / i) {
                factors.push(num / i);
            }
        }
    }

    if (sorted) factors.sort(numberSort);
    return factors;
}

export function isPrime(num: number): boolean {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

export function generatePrimesUpToN(N: number): number[] {
    const primes: number[] = [];
    for (let i = 2; i <= N; i++) {
        if (isPrime(i)) {
            primes.push(i);
        }
    }
    return primes;
}

export function modExponentiation(base: number, exponent: number, mod: number): number {
    let result = 1;
    base = base % mod;
    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % mod;
        }
        exponent = Math.floor(exponent / 2);
        base = (base * base) % mod;
    }
    return result;
}

export function sum(...args: number[]): number {
    return args.reduce((acc, num) => acc + num, 0);
}

export function factorial(n: number): number {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

export function gdc(a: number, b: number): number {
    return b === 0 ? a : gdc(b, a % b);
}

export function greatestCommonDivisor(...args: number[]): number {
    return args.reduce(gdc);
}

export function lcm(a: number, b: number): number {
    return (a * b) / gdc(a, b);
}

export function leastCommonMultiple(...args: number[]): number {
    return args.reduce(lcm);
}

export function power(base: number, exponent: number): number {
    return exponent === 0 ? 1 : base ** exponent;
}

export function squareRoot(num: number): number {
    return Math.sqrt(num);
}