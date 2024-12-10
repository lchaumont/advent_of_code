import fs from "fs";

type Block = {
    type: "EMPTY" | "FILLED";
    with: number | null;
    length: number;
    position: number;
};

const logState = (blocks: Block[]) => {
    const state = blocks.map((b) => b.type === "EMPTY" ? ".".repeat(b.length) : b.with!.toString().repeat(b.length)).join("");
    console.log(state);
};

const main = (input: string) => {
    const chars: string[] = input.split("");

    const blocks: Block[] = [];

    for (let i = 0; i < chars.length; i++) {
        const emptyBlock = i % 2 === 1;
        const char = chars[i];

        if (emptyBlock) {
            blocks.push({type: "EMPTY", with: null, length: parseInt(char), position: i});
        } else {
            blocks.push({type: "FILLED", with: i / 2, length: parseInt(char), position: i});
        }
    }
    
    logState(blocks.sort((a, b) => a.position - b.position));

    for (let i = blocks.length - 1; i >= 0; i--) {
        const block = blocks[i];

        if (block.type === "FILLED") {
            const firstSlotWithEnoughSpace = blocks.find((b) => b.type === "EMPTY" && b.length >= block.length && b.position <= i);
            //console.log("Search for : ", block, "Found : ", firstSlotWithEnoughSpace);

            if (firstSlotWithEnoughSpace) {
                const blockPositionBeforeSwap = block.position;
                const emptyPositionBeforeSwap = firstSlotWithEnoughSpace.position;

                blocks.filter((b) => b.position >= firstSlotWithEnoughSpace.position)
                      .forEach((b) => b.position++);

                block.position = emptyPositionBeforeSwap;
                firstSlotWithEnoughSpace.length -= block.length;

                // Insert new empty block
                blocks.push({type: "EMPTY", with: null, length: block.length, position: blockPositionBeforeSwap});
            }
        }

        logState(blocks.sort((a, b) => a.position - b.position));
    }

    const sorted = blocks.sort((a, b) => a.position - b.position);

    let result = 0;
    let currentIndex = 0;

    sorted.forEach((block) => {
        if (block.length > 0) {
            for (let i = 0; i < block.length; i++) {
                if (block.type === "FILLED") {
                    result += currentIndex * block.with!;
                }

                currentIndex++;
            }
        }
    });

    //fs.writeFileSync("2024/9/output.txt", JSON.stringify(sorted, null, 1));

    return result;
};

export default main;
