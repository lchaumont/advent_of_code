import { assert } from "console";
import { Trie } from "../../lib/Trie";

const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line: string) => line.trim() !== "");

    const trie = new Trie();
    lines.forEach((line: string) => {
        trie.insert(line);
    });

    const searchRating = (str: string, condition: (n1: number, n2: number) => boolean): string => {
        const numberOfOne = trie.searchCount(str + "1");
        const numberOfZero = trie.searchCount(str + "0");

        if (numberOfOne + numberOfZero <= 1) {
            const possibles = trie.getAllFinalStrings(str);
            assert(possibles.length === 1);
            return possibles[0];
        }

        if (condition(numberOfOne, numberOfZero)) {
            return searchRating(str + "1", condition);
        } else {
            return searchRating(str + "0", condition);
        }
    }

    const oxygenGeneratorRatingBinary = searchRating("", (n1: number, n2: number) => n1 >= n2);
    const co2ScrubberRatingBinary = searchRating("", (n1: number, n2: number) => n1 < n2);

    const oxygenGeneratorRating = parseInt(oxygenGeneratorRatingBinary, 2);
    const co2ScrubberRating = parseInt(co2ScrubberRatingBinary, 2);

    console.log(`Oxygen generator rating: ${oxygenGeneratorRating}`);
    console.log(`CO2 scrubber rate: ${co2ScrubberRating}`);
    console.log(oxygenGeneratorRating * co2ScrubberRating);
};

export default main;
