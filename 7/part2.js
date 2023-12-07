import fs from "fs";

const main = (input) => {
    const getHandPower = (hand) => {
        if (hand.split("").every((card) => card === hand[0])) return 6;

        if (hand.split("").some((card) => {
            return hand.split("").filter((c) => c === card).length === 4;
        })) return 5;
        
        if (hand.split("").some((card) => {
            return hand.split("").filter((c) => c === card).length === 3;
        }) && hand.split("").some((card) => {
            return hand.split("").filter((c) => c === card).length === 2;
        })) return 4;

        if (hand.split("").some((card) => {
            return hand.split("").filter((c) => c === card).length === 3;
        })) return 3;

        const firstPair = hand.split("").find((card) => {
            return hand.split("").filter((c) => c === card).length === 2;
        });

        if (firstPair) {
            const secondPair = hand.split("").find((card) => {
                return hand.split("").filter((c) => c === card && c !== firstPair && card !== firstPair).length === 2;
            });

            if (secondPair) return 2;
            else return 1;
        }

        return 0;
    };

    const getFinalHandPower = (hand) => {
        let best = 0;

        if (hand.includes("J")) {
            const cardPossibilities = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
            for (const cardPossibility of cardPossibilities) {
                const handReplaced = hand.replaceAll("J", cardPossibility);
                const handPower = getHandPower(handReplaced);
                best = Math.max(best, handPower);
            }
        } else {
            best = getHandPower(hand);
        }

        return best;
    };

    const getCardPower = (card) => {
        const mappings = {
            "A" : 14,
            "K" : 13,
            "Q" : 12,
            "J" : 1,
            "T" : 10,
            "9" : 9,
            "8" : 8,
            "7" : 7,
            "6" : 6,
            "5" : 5,
            "4" : 4,
            "3" : 3,
            "2" : 2,
        }

        return mappings[card];
    };

    const sort = (a, b) => {
        if (a.handPower > b.handPower) return 1;
        if (a.handPower < b.handPower) return -1;
        else {
            // By card power
            const aCards = a.hand.split("");
            const bCards = b.hand.split("");

            for (let i = 0; i < aCards.length; i++) {
                if (getCardPower(aCards[i]) > getCardPower(bCards[i])) return 1;
                if (getCardPower(aCards[i]) < getCardPower(bCards[i])) return -1;
            }
        }
    };

    input = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    const data = input.map((line) => {
        const [hand, bid] = line.split(" ");
        return {
            hand,
            bid,
            handPower : getFinalHandPower(hand),
        };
    });

    const dataSorted = data.sort(sort);
    
    fs.writeFile('./7/sorted2.json', JSON.stringify(dataSorted), err => {
        if (err) {
          console.error(err);
        }
      });

    let sum = 0;
    for (let i = 0; i < dataSorted.length; i++) {
        sum += parseInt(dataSorted[i].bid) * (i + 1);
    }
    console.log(sum);
};

export default main;
