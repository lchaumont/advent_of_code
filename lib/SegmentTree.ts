export class SegmentTree {
    tree: number[];
    nums: number[];

    constructor(nums: number[]) {
        this.nums = nums;
        this.tree = Array(4 * nums.length).fill(0);

        if (nums.length > 0) {
            this.buildTree(0, 0, nums.length - 1);
        }
    }

    private buildTree(treeIndex: number, start: number, end: number): void {
        if (start === end) {
            this.tree[treeIndex] = this.nums[start];
            return;
        }

        const mid = start + Math.floor((end - start) / 2);

        this.buildTree(2 * treeIndex + 1, start, mid);
        this.buildTree(2 * treeIndex + 2, mid + 1, end);

        this.tree[treeIndex] = this.tree[2 * treeIndex + 1] + this.tree[2 * treeIndex + 2];
    }

    update(index: number, value: number): void {
        this.updateTree(0, 0, this.nums.length - 1, index, value);
    }

    private updateTree(treeIndex: number, start: number, end: number, index: number, value: number): void {
        if (start === end) {
            this.nums[index] = value;
            this.tree[treeIndex] = value;
            return;
        }

        const mid = start + Math.floor((end - start) / 2);

        if (index <= mid) {
            this.updateTree(2 * treeIndex + 1, start, mid, index, value);
        } else {
            this.updateTree(2 * treeIndex + 2, mid + 1, end, index, value);
        }

        this.tree[treeIndex] = this.tree[2 * treeIndex + 1] + this.tree[2 * treeIndex + 2];
    }

    queryRange(left: number, right: number): number {
        return this.rangeSumQuery(0, 0, this.nums.length - 1, left, right);
    }

    private rangeSumQuery(treeIndex: number, start: number, end: number, left: number, right: number): number {
        if (start > right || end < left) {
            return 0;
        }

        if (start >= left && end <= right) {
            return this.tree[treeIndex];
        }

        const mid = start + Math.floor((end - start) / 2);

        const leftSum = this.rangeSumQuery(2 * treeIndex + 1, start, mid, left, right);
        const rightSum = this.rangeSumQuery(2 * treeIndex + 2, mid + 1, end, left, right);

        return leftSum + rightSum;
    }
}
