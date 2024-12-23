export class DisjointSet<T> {
    private parent: Map<T, T>;
    private rank: Map<T, number>;

    constructor() {
        this.parent = new Map();
        this.rank = new Map();
    }

    // Find operation with path compression
    find(x: T): T {
        if (!this.parent.has(x)) {
            this.parent.set(x, x);
            this.rank.set(x, 0);
        }
        if (this.parent.get(x) !== x) {
            // Path compression: make the parent of x point directly to the root
            this.parent.set(x, this.find(this.parent.get(x)!));
        }
        return this.parent.get(x)!;
    }

    // Union operation with union by rank
    union(x: T, y: T): void {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX !== rootY) {
            // Union by rank: attach the smaller tree to the root of the larger tree
            if (this.rank.get(rootX)! > this.rank.get(rootY)!) {
                this.parent.set(rootY, rootX);
            } else if (this.rank.get(rootX)! < this.rank.get(rootY)!) {
                this.parent.set(rootX, rootY);
            } else {
                this.parent.set(rootY, rootX);
                this.rank.set(rootX, this.rank.get(rootX)! + 1);
            }
        }
    }

    // Check if two elements are in the same set
    connected(x: T, y: T): boolean {
        return this.find(x) === this.find(y);
    }

    // Method to get all subsets
    getAllSubsets(): T[][] {
        const subsets: Map<T, T[]> = new Map();

        // Group elements by their root
        for (const element of this.parent.keys()) {
            const root = this.find(element);
            if (!subsets.has(root)) {
                subsets.set(root, []);
            }
            subsets.get(root)?.push(element);
        }

        // Convert the Map values into an array of subsets
        return Array.from(subsets.values());
    }
}