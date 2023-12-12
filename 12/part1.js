import _ from "lodash";

const main = (input) => {
    input = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    const data = input.map((line) => {
        const [records, counts] = line.split(" ");
        return {
            records,
            counts: counts.split(",").map(Number),
        };
    });

    function testIfValid(records, counts) {
        const s = records.split(".").filter((r) => r !== "").map((r) => r.length);
        return _.isEqual(s, counts);
    }

    function recursive(records, counts, index) {
        if (index === records.length) {
            if (testIfValid(records, counts)) return 1
            else return 0;
        }

        if (records[index] === "?") {
            // Somme des cas où ? = . && Somme des cas où ? = #
            const asDot = recursive(records.substring(0, index) + "." + records.substring(index + 1), counts, index + 1);
            const asHash = recursive(records.substring(0, index) + "#" + records.substring(index + 1), counts, index + 1);
            return asDot + asHash;
        } else {
            return recursive(records, counts, index + 1);
        }
    }

    let sum = 0;
    for (const d of data) {
        const {records, counts} = d;
        
        const score = recursive(records, counts, 0);
        console.log(records, counts, score);
        sum += score;
    }

    console.log("Somme: ", sum);
};

export default main;
