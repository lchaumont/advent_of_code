import { Queue } from "../../lib/Queue";
import {Stack} from "../../lib/Stack";

type Block = {
    type: "EMPTY" | "FILLED";
    with: number | null;
    length: number;
};

const main = (input: string) => {
    const chars: string[] = input.split("");

    const blocks: Block[] = [];

    for (let i = 0; i < chars.length; i++) {
        const emptyBlock = i % 2 === 1;
        const char = chars[i];

        if (emptyBlock && char !== "0") {
            blocks.push({type: "EMPTY", with: null, length: parseInt(char)});
        } else if (!emptyBlock) {
            blocks.push({type: "FILLED", with: i / 2, length: parseInt(char)});
        }
    }

    let result = 0;
    let currentIndex = 0;
    let queueEmptyIndexes = new Queue<number>();

    // Get the empty indexes
    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];

        if (block.type === "EMPTY") {
            for (let j = 0; j < block.length; j++) {
                queueEmptyIndexes.enqueue(currentIndex);
                currentIndex++;
            }
        } else {
            for (let j = 0; j < block.length; j++) {
                currentIndex++;
            }
        }
    }

    // Reverse
    for (let i = blocks.length - 1; i >= 0; i--) {
        const block = blocks[i];

        if (block.type === "FILLED") {
            for (let j = 0; j < block.length; j++) {
                const emptyIndex = queueEmptyIndexes.dequeue();

                if (emptyIndex !== undefined && emptyIndex < currentIndex) {
                    result += emptyIndex * block.with!;
                } else {
                    result += (currentIndex - 1) * block.with!;
                }

                currentIndex--;
            }
        } else {
            for (let j = 0; j < block.length; j++) {
                currentIndex--;
            }
        }
    }

    return result;
};

export default main;
