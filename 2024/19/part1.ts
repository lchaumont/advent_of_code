import {Trie} from "../../lib/Trie";

const main = (input: string) => {
    const [t, d]: string[] = input.replaceAll("\r", "").split("\n\n");

    const towels = t.split(", ");
    const designs = d.split("\n");

    const trie = new Trie();
    for (const towel of towels) {
        trie.insert(towel);
    }

    return designs.reduce((acc, design) => acc + (trie.isRecreatable(design) ? 1 : 0), 0);
};

export default main;
