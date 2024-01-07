export class TrieNode {
    children: Map<string, TrieNode> = new Map();
    count: number = 0;
    isEndOfWord: boolean = false;
}

export class Trie {
    private root: TrieNode = new TrieNode();

    insert(word: string): void {
        let node = this.root;
        node.count++;

        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char)!;
            node.count++;
        }

        node.isEndOfWord = true;
    }

    search(word: string, from?: TrieNode): boolean {
        const node = this.findNode(word, from);
        return node ? node.isEndOfWord : false;
    }

    searchCount(word: string, from?: TrieNode): number {
        const node = this.findNode(word, from);
        return node ? node.count : 0;
    }

    startsWith(word: string, from?: TrieNode): boolean {
        const node = this.findNode(word, from);
        return node !== null;
    }

    findNode(prefix: string, from?: TrieNode): TrieNode | null {
        let node = from || this.root;

        for (const char of prefix) {
            if (!node.children.has(char)) {
                return null;
            }
            node = node.children.get(char)!;
        }

        return node;
    }

    getAllFinalStrings(prefix: string, from?: TrieNode): string[] {
        const node = this.findNode(prefix, from);
        const result: string[] = [];

        if (node) {
            this.getAllStringsRecursive(node, prefix, result);
        }

        return result;
    }

    private getAllStringsRecursive(node: TrieNode, currentString: string, result: string[]): void {
        if (node.isEndOfWord) {
            result.push(currentString);
        }

        for (const [char, childNode] of node.children) {
            this.getAllStringsRecursive(childNode, currentString + char, result);
        }
    }

    log(): void {
        this.logRecursive(this.root, "");
    }

    private logRecursive(node: TrieNode, prefix: string): void {
        console.log(`${prefix} (${node.count})`);

        for (const [char, childNode] of node.children) {
            this.logRecursive(childNode, `${prefix}${char}`);
        }
    }
}
