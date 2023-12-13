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

    const dp = new Map();
    function recursive(records, counts, index) {
        if (dp.has(`${records}-${counts}`)) {
            return dp.get(`${records}-${counts}`);
        }

        if (index === records.length) {
            const r = testIfValid(records, counts) ? 1 : 0;
            dp.set(`${records}-${counts}`, r);
            return r;
        }

        if (records[index] === "?") {
            // Somme des cas où ? = . && Somme des cas où ? = #
            const asDot = recursive(records.substring(0, index) + "." + records.substring(index + 1), counts, index + 1);
            const asHash = recursive(records.substring(0, index) + "#" + records.substring(index + 1), counts, index + 1);
            dp.set(`${records}-${counts}`, asDot + asHash);
            return asDot + asHash;
        } else {
            const r = recursive(records, counts, index + 1);
            dp.set(`${records}-${counts}`, r);
            return r;
        }
    }

    let sum = 0;
    for (const d of data) {
        const {records, counts} = d;
        
        const score = recursive(records, counts, 0);
        console.log(records, counts, score);
        sum += score;

        console.log(dp);
        console.log(dp.length);
    }

    console.log("Somme: ", sum);
};

export default main;
