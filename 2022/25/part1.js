const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    console.log(input);

    let sum = 0;
    for (const line of input) {
        const chars = line.split("");

        let innerSum = 0;
        for (let i = chars.length - 1; i >= 0; i--) {
            const charValue = chars[i] === "-" ? -1 : chars[i] === "=" ? -2 : parseInt(chars[i]);
            innerSum += charValue * Math.pow(5, chars.length - i - 1);
        }

        sum += innerSum;
    }

    console.log(sum);

    function toBase5(num) {
        const digits = [];
        while (num > 0) {
            let remainder = num % 5;
            num = Math.floor(num / 5);
            if (remainder > 2) {
                remainder -= 5;
                num += 1;
            }
            digits.push(remainder);
        }

        const reversed = digits.reverse();
        return reversed
            .map((digit) => {
                switch (digit) {
                    case -2:
                        return "=";
                    case -1:
                        return "-";
                    case 0:
                        return "0";
                    case 1:
                        return "1";
                    case 2:
                        return "2";
                    default:
                        return "";
                }
            })
            .join("");
    }

    console.log(toBase5(sum));
};

export default main;
