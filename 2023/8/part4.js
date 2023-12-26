function gcd(a, b) {
    return (!b) ? a : gcd(b, a % b);
}

function lcm(...args) {
    return args.reduce((a, b) => (a * b) / gcd(a, b));
}

console.log(lcm(11309, 19199, 12361, 16043, 13939, 18673));